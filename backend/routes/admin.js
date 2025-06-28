const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const router = express.Router();

// Admin email configuration
const ADMIN_EMAILS = ['syedyawaraliturab@gmail.com', 'admin@medmagic.com'];

// Middleware to check admin access (simplified for now)
const isAdmin = (req, res, next) => {
  // In a real app, you'd verify JWT token and check user roles
  // For now, this is a placeholder - you can integrate with Clerk or your auth system
  const adminEmail = req.headers['x-admin-email'];
  
  if (!adminEmail || !ADMIN_EMAILS.includes(adminEmail)) {
    return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
  }
  
  next();
};

// GET /api/admin/stats - Get admin dashboard statistics
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const [
      totalProducts,
      totalCategories,
      activeProducts,
      featuredProducts,
      recentProducts,
      categoryStats
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ featured: true }),
      Product.find().sort({ createdAt: -1 }).limit(5).lean(),
      Category.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'id',
            foreignField: 'category',
            as: 'products'
          }
        },
        {
          $addFields: {
            productCount: { $size: '$products' }
          }
        },
        {
          $project: {
            id: 1,
            name: 1,
            icon: 1,
            productCount: 1,
            isActive: 1
          }
        },
        {
          $sort: { productCount: -1 }
        }
      ])
    ]);

    const stats = {
      overview: {
        totalProducts,
        totalCategories,
        activeProducts,
        featuredProducts,
        inactiveProducts: totalProducts - activeProducts
      },
      recentProducts: recentProducts.map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        createdAt: product.createdAt
      })),
      categoryStats,
      growth: {
        // You can add time-based growth calculations here
        productsThisMonth: await Product.countDocuments({
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }),
        categoriesThisMonth: await Category.countDocuments({
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        })
      }
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin statistics', details: error.message });
  }
});

// GET /api/admin/users - Get user statistics (placeholder)
router.get('/users', isAdmin, async (req, res) => {
  try {
    // This is a placeholder - in a real app, you'd fetch user data from your auth system
    const userStats = {
      totalUsers: 0,
      activeUsers: 0,
      newUsersThisMonth: 0,
      adminUsers: ADMIN_EMAILS.length,
      message: 'User management integration pending. Connect with Clerk or your auth system.'
    };

    res.json(userStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user statistics', details: error.message });
  }
});

// GET /api/admin/products - Get all products for admin (with additional details)
router.get('/products', isAdmin, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      status,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
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
    res.status(500).json({ error: 'Failed to fetch admin products', details: error.message });
  }
});

// PUT /api/admin/products/:id/toggle - Toggle product active status
router.put('/products/:id/toggle', isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: !product.isActive },
      { new: true }
    );

    res.json({ 
      success: true, 
      product: updatedProduct,
      message: `Product ${updatedProduct.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: 'Failed to toggle product status', details: error.message });
  }
});

// PUT /api/admin/products/:id/feature - Toggle product featured status
router.put('/products/:id/feature', isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { featured: !product.featured },
      { new: true }
    );

    res.json({ 
      success: true, 
      product: updatedProduct,
      message: `Product ${updatedProduct.featured ? 'featured' : 'unfeatured'} successfully`
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: 'Failed to toggle product featured status', details: error.message });
  }
});

// DELETE /api/admin/products/bulk - Bulk delete products
router.delete('/products/bulk', isAdmin, async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'Product IDs array is required' });
    }

    const result = await Product.deleteMany({ _id: { $in: productIds } });

    res.json({
      success: true,
      message: `${result.deletedCount} products deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk delete products', details: error.message });
  }
});

// GET /api/admin/analytics - Get detailed analytics
router.get('/analytics', isAdmin, async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;
    
    // Calculate date range based on timeframe
    let startDate;
    const endDate = new Date();
    
    switch (timeframe) {
      case '7d':
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const analytics = {
      timeframe,
      dateRange: { startDate, endDate },
      products: {
        created: await Product.countDocuments({
          createdAt: { $gte: startDate, $lte: endDate }
        }),
        totalViews: await Product.aggregate([
          { $group: { _id: null, totalViews: { $sum: '$views' } } }
        ]).then(result => result[0]?.totalViews || 0),
        avgPrice: await Product.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: null, avgPrice: { $avg: '$price' } } }
        ]).then(result => result[0]?.avgPrice || 0)
      },
      categories: {
        created: await Category.countDocuments({
          createdAt: { $gte: startDate, $lte: endDate }
        }),
        distribution: await Product.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: '$category', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ])
      }
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics', details: error.message });
  }
});

module.exports = router;
