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
const PORT = 5000;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.originalUrl} | Token: ${req.headers.token || 'No Token'}`);
    next();
});

// Allow Preflight Requests for CORS

const allowedOrigins = ["https://style-wave.vercel.app", "https://style-wave-admin.vercel.app", "http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors());

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
    console.log(`Server is running on port ${PORT}`);
});