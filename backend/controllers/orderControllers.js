import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from '../models/order.js';
import Product from '../models/product.js';
import {getResetPasswordTemplate} from '../utils/emailTemplates.js';
import ErrorHandler from "../utils/errorHandler.js";

// Create new Order => /api/orders/new
// This is only to handle COD
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user: req.user._id
    });

    res.status(200).json({
        order
    });
});

// Get current user orders => /api/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({user: req.user._id});

    res.status(200).json({
        order
    });
});

// Get order details => /api/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler('No order found with this ID.', 404));
    }

    res.status(200).json({
        order
    });
});

// Get all orders - ADMIN => /api/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    res.status(200).json({
        orders
    });
});

// Update Order - ADMIN => /api/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler('No order found with this ID', 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    let productNotFound = false;

    // Update products stock
    for (const item of order.orderItems) {
        const product = await Product.findById(item.product.toString())
        if (!product) {
            productNotFound = true;
            break;
        }

        product.stock = product.stock - item.quantity;
        await product.save({validateBeforeSave: false});
        };

        if (productNotFound) {
            return next(new ErrorHandler('No product found with one or more IDs.', 404));
        }


    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    });
});

// Get order details => /api/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No order found with this ID.', 404));
    }

    await order.deleteOne();

    res.status(200).json({
        sucess: true
    });
});