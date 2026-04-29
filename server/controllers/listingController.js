import Listing from '../models/Listing.js';

export const getAllListings = async (req, res) => {
  try {
    const { category } = req.query; // URL se category nikalna
    let query = {};
    
    // Agar category pass hui hai aur wo "All Stays" nahi hai, toh filter lagao
    if (category && category !== 'All Stays') {
      query.category = category;
    }

    const listings = await Listing.find(query);
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
