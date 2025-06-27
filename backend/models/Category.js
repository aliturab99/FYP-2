const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Category ID is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters'],
    default: ''
  },
  icon: {
    type: String,
    default: '📦'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  productCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
CategorySchema.index({ id: 1 });
CategorySchema.index({ isActive: 1, order: 1 });

// Virtual for slug (URL-friendly version)
CategorySchema.virtual('slug').get(function() {
  return this.id;
});

// Pre-save middleware
CategorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = this.name.trim();
  }
  if (this.isModified('id')) {
    this.id = this.id.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

// Static method to get active categories
CategorySchema.statics.getActive = function() {
  return this.find({ isActive: true }).sort({ order: 1, name: 1 });
};

module.exports = mongoose.model('Category', CategorySchema);
