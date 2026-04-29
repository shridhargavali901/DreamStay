import Booking from '../models/Booking.js';
import Listing from '../models/Listing.js';

export const createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut } = req.body;
    const userId = req.user.id;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return res.status(400).json({ message: 'Invalid dates' });
    const totalPrice = days * listing.price;

    const newBooking = await Booking.create({
      user: userId,
      listing: listingId,
      checkIn,
      checkOut,
      totalPrice
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('listing');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🚀 NAYA FUNCTION: Booking Cancel Karne Ke Liye
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Security: Sirf wahi user cancel kar paye jisne book kiya hai
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to cancel this trip' });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
