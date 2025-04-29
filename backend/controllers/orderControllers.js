import orderModel from "../models/orderModels.js"
import userModel from "../models/userModels.js";


// Order data for admin panel
export const allOrder = async(req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Order data for frontend
export const userOrders = async(req,res) => {
    try {
        const {userId} = req.userId;
        console.log("userId received in userOrders:", userId);

        const orders = await orderModel.find({ userId });

        console.log("Orders found:", orders.length);

        res.json({ success: true, orders});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Placing order using cod
export const placeOrder = async(req,res) => {
    try {
        const userId = req.userId; // ✅ Use authenticated ID
        const { items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate( userId, {
            cartData: {}
        });
        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Placing order using stripe
export const placeOrderStripe = async(req,res) => {

}

// Placing order using razorpay
export const placeOrderRazorpay = async(req,res) => {

}

// Handle updating status from admin panel
export const updateStatus = async(req,res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate( orderId, {status})
        res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
}