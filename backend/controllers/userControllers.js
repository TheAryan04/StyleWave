import bcrypt from "bcryptjs";
import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(401).json({ message: "Please fill in all fields",
                success:false,
            });
        };
        let user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({ message: "Invalid email or password",
                success:false,
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({ message: "Invalid email or password",
            success:false,
            });
        };

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie("token", token, {
            httpOnly: true, // ✅ Prevents XSS attacks
            sameSite: "strict", // ✅ CSRF protection
            maxAge: 24 * 60 * 60 * 1000, // ✅ 1 day expiration
        });

        // 📦 Send response with user info & token
        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cartData: user.cartData, // Send cart data if needed
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(401).json({ message: "Please fill in all fields",
                success:false,
            });
        };
        const user = await userModel.findOne({ email });
        if(user){
            return res.status(401).json({ message: "Email already exists",
            success:false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User created successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PSWD){
            const token = jwt.sign(email+password, process.env.SECRET_KEY);
            res.json({success:true, token});
        } else {
            res.json({success:false, message: 'Invalid details'});
        }
    } catch (error) {
        console.log(error);
    }
}

