import express from 'express';
import { register, login, toggleWishlist, getSavedListings } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/wishlist', protect, toggleWishlist);
router.get('/wishlist', protect, getSavedListings); // Naya GET route

export default router;
