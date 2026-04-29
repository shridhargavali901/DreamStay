import express from 'express';
import { createBooking, getUserBookings, cancelBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.delete('/:id', protect, cancelBooking); // 🔥 Naya DELETE Route add kar diya

export default router;
