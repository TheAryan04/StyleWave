import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userControllers.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/admin').post(adminLogin);

export default router;