const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order (يخصم من المخزون تلقائيًا)
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'السلة فارغة' });
    }

    // التحقق من توفر المخزون الفعلي قبل تأكيد الطلب (أمان ضد التلاعب)
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, error: `المنتج ${item.name} غير موجود` });
      }
      if (product.stock < item.qty) {
        return res.status(400).json({
          success: false,
          error: `الكمية المتاحة من ${product.name} هي ${product.stock} فقط`,
        });
      }
    }

    // خصم الكمية من المخزون
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty },
      });
    }

    const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'الطلب غير موجود' });
    }
    order.status = req.body.status;
    await order.save();
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};