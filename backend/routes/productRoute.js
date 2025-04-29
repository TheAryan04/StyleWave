import express from 'express'
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productControllers.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.route('/add').post(adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), addProduct);
router.route('/list').get(listProducts);
router.route('/remove').post(adminAuth, removeProduct);
router.route('/single').get(singleProduct);

export default router;