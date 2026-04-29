import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const categories = ['All Stays', 'Modern', 'Classic', 'Luxury', 'Minimalist'];

// 🌟 THE PREMIUM SKELETON CARD (Shimmer Effect)
const SkeletonCard = () => (
  <div className="card-frame rounded-2xl p-3">
    <div className="aspect-square rounded-xl mb-4 bg-gray-200 animate-pulse"></div>
    <div className="px-2 pb-2">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
          <div className="h-3 w-32 bg-gray-100 rounded animate-pulse"></div>
        </div>
        <div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-7 h-7 bg-gray-100 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [activeCat, setActiveCat] = useState('All Stays');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user, token, updateWishlist } = useAuthStore();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://dreamstay-2jev.onrender.com/api/listings?category=${activeCat}`);
        setListings(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setLoading(false);
      }
    };
    fetchListings();
  }, [activeCat]);

  const handleWishlist = async (e, id) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    if (!user) return toast.error("Please login first to save this property.");
    
    try {
      const res = await axios.post('https://dreamstay-2jev.onrender.com/api/auth/wishlist', 
        { listingId: id }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateWishlist(res.data); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist.");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 md:py-10">
      
      {/* Premium Hero Section */}
      <div className="relative w-full h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden mb-12 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000" 
          alt="Hero Stay" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[15%]"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-normal mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Discover your next stay.
          </h1>
          <p className="text-sm md:text-base font-medium text-white/90 max-w-xl mx-auto tracking-wide">
            An exclusive collection of minimalist villas, raw lofts, and architectural marvels curated for the modern traveler.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar mb-12">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2 rounded-full text-[12px] font-bold tracking-tight border transition-all whitespace-nowrap ${
              activeCat === cat 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🚀 DYNAMIC GRID WITH SKELETON LOADER */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* We render 8 dummy skeleton cards while loading */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <SkeletonCard key={n} />)}
        </div>
      ) : listings.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-400 font-medium">
          No properties found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {listings.map((item) => {
            const isLiked = user?.wishlist?.includes(item._id);

            return (
              <Link to={`/listing/${item._id}`} key={item._id} className="group card-frame rounded-2xl p-3 block relative">
                <button 
                  onClick={(e) => handleWishlist(e, item._id)}
                  className={`absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full hover:scale-110 transition-all ${
                    isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={16} className={isLiked ? 'fill-red-500' : ''} />
                </button>

                <div className="aspect-square rounded-xl overflow-hidden mb-4 border border-gray-100">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500" 
                    alt={item.name}
                  />
                </div>

                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[15px] text-gray-900 leading-none">{item.location}</h3>
                      <p className="text-[13px] text-gray-400 mt-1.5 font-medium">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[13px] font-bold">
                      <Star size={12} className="fill-black" /> {item.rating}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-[15px] font-bold">
                      ${item.price} <span className="text-gray-400 font-normal text-[12px]">/ night</span>
                    </p>
                    <div className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                       <MapPin size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
