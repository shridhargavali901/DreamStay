import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, wishlist: user.wishlist || [] }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, wishlist: user.wishlist || [] }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { listingId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isLiked = user.wishlist.some(id => id.toString() === listingId.toString());

    let updatedUser;
    if (isLiked) {
      updatedUser = await User.findByIdAndUpdate(
        userId, 
        { $pull: { wishlist: listingId } }, 
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        userId, 
        { $addToSet: { wishlist: listingId } }, 
        { new: true }
      );
    }
    
    res.status(200).json(updatedUser.wishlist);
  } catch (error) {
    console.error("Error in toggleWishlist:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getSavedListings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
