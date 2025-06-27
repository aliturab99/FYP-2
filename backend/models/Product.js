const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

// Virtual for formatted price
ProductSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Pre-save middleware
ProductSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = this.name.trim();
  }
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
