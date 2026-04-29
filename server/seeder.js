import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/Listing.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const sampleListings = [
  { name: 'The Glass House', description: 'Pure minimal glass cabin.', location: 'Norway', category: 'Modern', price: 250, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000' },
  { name: 'Concrete Loft', description: 'Industrial design in heart of city.', location: 'Tokyo', category: 'Minimalist', price: 180, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000' },
  { name: 'White Villa', description: 'Cliffside luxury stay.', location: 'Greece', category: 'Classic', price: 420, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000' },
  { name: 'Desert Mirage', description: 'Sand-matte architectural marvel.', location: 'Dubai', category: 'Luxury', price: 890, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000' }
];

const seedDB = async () => {
  await Listing.deleteMany();
  await Listing.insertMany(sampleListings);
  console.log("✅ Database Seeded with Classy Properties!");
  process.exit();
};

seedDB();
