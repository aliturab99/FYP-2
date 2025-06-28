const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const Category = require('../models/Category');
const router = express.Router();

// Validation middleware
const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('image').trim().notEmpty().withMessage('Product image is required'),
  body('link').trim().notEmpty().withMessage('Product link is required'),
  body('category').trim().notEmpty().withMessage('Product category is required')
];

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const {
      category,
      featured,
      inStock,
      search,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 50
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(query)
    ]);

    res.json({
      products,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: products.length,
        totalProducts: total
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Increment view count
    await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
});

// POST /api/products - Create new product
router.post('/', validateProduct, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { name, price, image, link, category, description, featured = false } = req.body;

    // Verify category exists
    const categoryExists = await Category.findOne({ id: category, isActive: true });
    if (!categoryExists) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const newProduct = new Product({
      name,
      price: parseFloat(price),
      image,
      link,
      category,
      description,
      featured
    });

    const savedProduct = await newProduct.save();

    // Update category product count
    await Category.findOneAndUpdate(
      { id: category },
      { $inc: { productCount: 1 } }
    );

    res.status(201).json({ 
      success: true, 
      product: savedProduct 
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Product with this name already exists' });
    }
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', validateProduct, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { name, price, image, link, category, description, featured, inStock } = req.body;

    // Verify category exists
    const categoryExists = await Category.findOne({ id: category, isActive: true });
    if (!categoryExists) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price: parseFloat(price),
        image,
        link,
        category,
        description,
        featured,
        inStock,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ 
      success: true, 
      product: updatedProduct 
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get category before deletion
    const categoryId = product.category;

    await Product.findByIdAndDelete(req.params.id);

    // Update category product count
    await Category.findOneAndUpdate(
      { id: categoryId },
      { $inc: { productCount: -1 } }
    );

    res.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
});

// GET /api/products/category/:categoryId - Get products by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { sort = 'createdAt', order = 'desc', limit = 20 } = req.query;

    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    const products = await Product.find({ 
      category: categoryId, 
      isActive: true 
    })
    .sort(sortOptions)
    .limit(parseInt(limit))
    .lean();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products by category', details: error.message });
  }
});

// GET /api/products/featured - Get featured products
router.get('/featured', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const featuredProducts = await Product.find({ 
      featured: true, 
      isActive: true 
    })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .lean();

    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured products', details: error.message });
  }
});

module.exports = router;
