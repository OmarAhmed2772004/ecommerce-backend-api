const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    category: {
      type: String,
      required: [true, 'Please select category'],
      enum: ['Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones'],
    },
    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);