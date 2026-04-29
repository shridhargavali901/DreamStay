import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, LogOut, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('trips'); 
  const [savedListings, setSavedListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user, token, logout, updateWishlist } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const savedRes = await axios.get('http://localhost:5000/api/auth/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedListings(savedRes.data);

        const bookingsRes = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookingsRes.data);
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [user, token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRemoveSaved = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); 
    try {
      const res = await axios.post('http://localhost:5000/api/auth/wishlist', 
        { listingId: id }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateWishlist(res.data); 
      setSavedListings((prevListings) => prevListings.filter(item => item._id !== id));
      toast.success("Property removed from saved.");
    } catch (error) {
      toast.error("Failed to remove property.");
    }
  };

  // 🚀 NAYA FUNCTION: Trip Cancel Karne Ke Liye
  const handleCancelTrip = async (id) => {
    // Ek chhota sa confirmation popup
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Screen se booking ko turant hatao
      setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== id));
      toast.success("Reservation cancelled successfully.");
    } catch (error) {
      toast.error("Failed to cancel the trip.");
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!user) return null;

  return (
    <div className="max-w-[1200px] mx-auto px-8 md:px-16 pt-16 pb-20">
      
      <div className="flex justify-between items-end border-b border-gray-200 pb-10 mb-10">
        <div>
          <h1 className="text-4xl font-normal mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Welcome, {user.name.split(' ')[0]}.
          </h1>
          <p className="text-gray-500 font-medium">{user.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-[13px] font-bold text-gray-600 hover:border-black hover:text-black transition-all"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <div className="flex gap-8 mb-10 border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('trips')}
          className={`pb-4 text-[14px] font-bold tracking-wide transition-all ${activeTab === 'trips' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Upcoming Trips
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`pb-4 text-[14px] font-bold tracking-wide transition-all ${activeTab === 'saved' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Saved Properties
        </button>
      </div>
      
      {loading ? (
        <div className="text-gray-400 font-medium">Curating your dashboard...</div>
      ) : (
        <>
          {activeTab === 'trips' && (
            bookings.length === 0 ? (
              <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl">
                <Calendar size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 font-medium">No trips booked... yet.</p>
                <Link to="/" className="inline-block mt-4 text-black font-bold underline underline-offset-4">Find your next escape</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bookings.map((booking) => (
                  <div key={booking._id} className="flex gap-4 p-4 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-shadow">
                    <div className="w-1/3 aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img src={booking.listing?.image} className="w-full h-full object-cover" alt="Property" />
                    </div>
                    <div className="w-2/3 flex flex-col justify-center">
                      <h3 className="font-bold text-[16px] text-gray-900 mb-1">{booking.listing?.location}</h3>
                      <p className="text-[13px] text-gray-500 mb-3">{booking.listing?.name}</p>
                      
                      <div className="bg-[#FAF9F6] p-3 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-[12px] font-bold text-gray-800 mb-1">
                          <Calendar size={14} className="text-gray-400" />
                          {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                        </div>
                        
                        {/* 🚀 CANCEL BUTTON AUR TOTAL PRICE KI BAR */}
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                          <span className="text-[14px] font-black">Total: ${booking.totalPrice}</span>
                          <button 
                            onClick={() => handleCancelTrip(booking._id)}
                            className="text-[12px] font-bold text-red-500 hover:text-red-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* ... Saved Tab Code unchanged */}
          {activeTab === 'saved' && (
            savedListings.length === 0 ? (
              <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl">
                <Heart size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 font-medium">You haven't saved any properties yet.</p>
                <Link to="/" className="inline-block mt-4 text-black font-bold underline underline-offset-4">Explore stays</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedListings.map((item) => (
                  <Link to={`/listing/${item._id}`} key={item._id} className="group card-frame rounded-2xl p-3 block relative">
                    <button 
                      onClick={(e) => handleRemoveSaved(e, item._id)}
                      className="absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-red-500 hover:scale-110 hover:bg-white transition-all shadow-sm"
                      title="Remove from saved"
                    >
                      <Heart size={16} className="fill-red-500" />
                    </button>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-gray-100">
                      <img src={item.image} className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="px-2 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[15px] text-gray-900 leading-none">{item.location}</h3>
                          <p className="text-[13px] text-gray-400 mt-1.5 font-medium">{item.name}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[13px] font-bold"><Star size={12} className="fill-black" /> {item.rating}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
