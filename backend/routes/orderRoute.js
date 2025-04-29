import express from 'express';
import { allOrder, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from '../controllers/orderControllers.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/authUser.js';

const router = express.Router();

// Admin features
router.route('/list').post(adminAuth, allOrder);
router.route('/status').post(adminAuth, updateStatus);

// Payment features
router.route('/place').post(authUser, placeOrder);
router.route('/stripe').post(authUser, placeOrderStripe);
router.route('/razorpay').post(authUser, placeOrderRazorpay);

// User feature
router.route('/userorders').post(authUser, userOrders);

export default router;