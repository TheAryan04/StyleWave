import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModels.js";

export const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, sizes, bestseller } = req.body;

        // ✅ Ensure `req.files` exists
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        // ✅ Get images dynamically
        const images = ["image1", "image2", "image3", "image4"]
            .map(key => req.files[key]?.[0])
            .filter(Boolean); // Removes undefined values

        if (images.length === 0) {
            return res.status(400).json({ message: "No valid images were uploaded" });
        }

        // ✅ Upload images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                    return result.secure_url;
                } catch (err) {
                    console.error("Cloudinary Upload Error:", err);
                    throw new Error("Image upload failed.");
                }
            })
        );
        // ✅ Safely parse `sizes`
        let parsedSizes;
        try {
            parsedSizes = sizes ? JSON.parse(sizes) : [];
            if (!Array.isArray(parsedSizes)) throw new Error();
        } catch (err) {
            return res.status(400).json({ message: "Invalid sizes format" });
        }

        // ✅ Create Product Object
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            sizes: parsedSizes,
            bestseller: bestseller === "true", // Convert to boolean
            image: imagesUrl, // Ensure correct field name
            date: Date.now(),
        };

        // ✅ Save to Database
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



// ✅ Get List of All Products
export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// ❌ Remove Product Based on Name or Category (No ID)
export const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body._id)
        res.json({success:true, message:'Product removed successfully'})

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// ✅ Get a Single Product by Name or Category (No ID)
export const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};