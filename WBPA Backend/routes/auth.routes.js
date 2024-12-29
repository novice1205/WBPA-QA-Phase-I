import express from 'express';
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middlewares/verifyToken.middlewares.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login', login);
router.get('/logout',logout);

router.post('/verify-email',verifyEmail);
router.post('/forgot-password',forgotPassword);

router.post('/reset-password/:token',resetPassword);

router.get('/profile',verifyToken, checkAuth);

export default router;