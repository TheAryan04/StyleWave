import express from "express";
import { addToCart, getUserCart, updateCart } from "../controllers/cartControllers.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();
router.route('/add').post(authUser, addToCart);
router.route('/update').post(authUser, updateCart);
router.route('/get').post(authUser, getUserCart);

export default router;