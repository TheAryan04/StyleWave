import userModel from "../models/userModels.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);

        if(!userData){
            return res.status(404).json({success:false, message: "User not found" });
        };
        // Get the cart data, initialize it if it doesn't exist
        let cartData = userData.cartData || {};

        // Initialize item in cart if not already there
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Update the item count for the given size
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;  // Increment size count
        } else {
            cartData[itemId][size] = 1;   // Set initial size count to 1
        }

        await userModel.findByIdAndUpdate( userId, {cartData});
        res.status(200).json({success:true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: "Internal Server Error" });
    }
}

export const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData || {};

        cartData[itemId][size] = quantity;
        await userModel.findByIdAndUpdate( userId, {cartData});
        res.status(200).json({success:true, message: "Cart Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: "Internal Server Error" });
    }
}

export const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        if(!userData){
            return res.status(404).json({success:false, message: "User not found" });
        }
        const cartData = userData.cartData || {};
        res.status(200).json({success:true, cartData});
    } catch ( error) {
        console.log(error);
        res.status(500).json({success:false, message: "Internal Server Error" });
    }
}