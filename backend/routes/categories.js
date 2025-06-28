const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const Product = require('../models/Product');
const router = express.Router();

// Validation middleware
const validateCategory = [
  body('id').trim().notEmpty().withMessage('Category ID is required'),
  body('name').trim().notEmpty().withMessage('Category name is required'),
  body('icon').optional().trim(),
  body('description').optional().trim(),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer')
];

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const { active = 'true', includeCount = 'false' } = req.query;

    let query = {};
    if (active === 'true') {
      query.isActive = true;
    }

    let categories = await Category.find(query).sort({ order: 1, name: 1 }).lean();

    // Include product count if requested
    if (includeCount === 'true') {
      for (let category of categories) {
        const productCount = await Product.countDocuments({ 
          category: category.id, 
          isActive: true 
        });
        category.productCount = productCount;
      }
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
});

// GET /api/categories/:id - Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Get product count
    const productCount = await Product.countDocuments({ 
      category: category.id, 
      isActive: true 
    });

    const categoryWithCount = {
      ...category.toObject(),
      productCount
    };

    res.json(categoryWithCount);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category', details: error.message });
  }
});

// POST /api/categories - Create new category
router.post('/', validateCategory, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { id, name, description, icon = '📦', order = 0 } = req.body;

    // Check if category ID already exists
    const existingCategory = await Category.findOne({ id });
    if (existingCategory) {
      return res.status(400).json({ error: 'Category with this ID already exists' });
    }

    const newCategory = new Category({
      id: id.toLowerCase().replace(/\s+/g, '-'),
      name,
      description,
      icon,
      order,
      isActive: true,
      productCount: 0
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({ 
      success: true, 
      category: savedCategory 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category with this ID already exists' });
    }
    res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
});

// PUT /api/categories/:id - Update category
router.put('/:id', validateCategory, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { name, description, icon, order, isActive } = req.body;

    const updatedCategory = await Category.findOneAndUpdate(
      { id: req.params.id },
      {
        name,
        description,
        icon,
        order,
        isActive,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ 
      success: true, 
      category: updatedCategory 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
});

// DELETE /api/categories/:id - Delete category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete category with existing products',
        message: `This category has ${productCount} products. Please reassign or delete them first.`
      });
    }

    await Category.findOneAndDelete({ id: req.params.id });

    res.json({ 
      success: true, 
      message: 'Category deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
});

// POST /api/categories/seed - Seed default categories
router.post('/seed', async (req, res) => {
  try {
    const defaultCategories = [
      { id: 'medications', name: 'Medications', icon: '💊', order: 1 },
      { id: 'medical-supplies', name: 'Medical Supplies', icon: '🏥', order: 2 },
      { id: 'devices', name: 'Medical Devices', icon: '🔬', order: 3 },
      { id: 'first-aid', name: 'First Aid', icon: '🩹', order: 4 },
      { id: 'hygiene', name: 'Hygiene Products', icon: '🧼', order: 5 },
      { id: 'baby-care', name: 'Baby Care', icon: '👶', order: 6 }
    ];

    const seededCategories = [];

    for (const categoryData of defaultCategories) {
      const existingCategory = await Category.findOne({ id: categoryData.id });
      
      if (!existingCategory) {
        const newCategory = new Category({
          ...categoryData,
          description: `Quality ${categoryData.name.toLowerCase()} for your medical needs`,
          isActive: true,
          productCount: 0
        });
        
        const saved = await newCategory.save();
        seededCategories.push(saved);
      }
    }

    res.json({
      success: true,
      message: `Seeded ${seededCategories.length} new categories`,
      categories: seededCategories
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed categories', details: error.message });
  }
});

// PUT /api/categories/:id/toggle - Toggle category active status
router.put('/:id/toggle', async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { id: req.params.id },
      { isActive: !category.isActive },
      { new: true }
    );

    res.json({ 
      success: true, 
      category: updatedCategory,
      message: `Category ${updatedCategory.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle category status', details: error.message });
  }
});

module.exports = router;
