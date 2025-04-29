import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.originalUrl} | Token: ${req.headers.token || 'No Token'}`);
    next();
});

// Allow Preflight Requests for CORS

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true, // Allow cookies to be sent
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// api endpoints
app.get("/", (_,res) => {
    return res.status(200).json({
        msg:"I'm coming from backend",
        success:true
    })
});

app.use("/api/v2/user", userRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/cart", cartRouter);
app.use("/api/v2/order", orderRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT} || 5001`);
});