import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, MapPin, Wifi, Coffee, ArrowLeft, CreditCard, ShieldCheck, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // Payment Modal States
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`https://dreamstay-2jev.onrender.com/api/listings/${id}`);
        setListing(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  // Calculate Total Price
  const days = (checkIn && checkOut) ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))) : 0;
  const totalPrice = listing ? days * listing.price : 0;

  // Step 1: Validate dates and open modal
  const handleReserveClick = () => {
    if (!user) return toast.error("Please log in to reserve a stay.");
    if (!checkIn || !checkOut) return toast.error("Please select dates first.");
    setShowPayment(true);
  };

  // Step 2: Process fake payment & save to DB
  const confirmPaymentAndBook = async () => {
    setIsProcessing(true);
    
    // Simulate real bank processing delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      await axios.post('https://dreamstay-2jev.onrender.com/api/bookings', {
        listingId: listing._id,
        checkIn,
        checkOut
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Payment successful! Sanctuary reserved.");
      setShowPayment(false);
      navigate('/profile'); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed.");
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="pt-40 text-center font-medium text-gray-400">Opening the doors...</div>;
  if (!listing) return <div className="pt-40 text-center">Property not found.</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-8 pt-10 pb-20 relative">
      
      <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-bold text-gray-400 hover:text-black transition-colors mb-8">
        <ArrowLeft size={16} /> Back to all stays
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-normal mb-2" style={{ fontFamily: 'Georgia, serif' }}>{listing.name}</h1>
        <div className="flex justify-between items-center text-[13px] font-bold">
          <div className="flex gap-4">
            <span className="flex items-center gap-1 underline underline-offset-4"><Star size={14} className="fill-black" /> {listing.rating}</span>
            <span className="flex items-center gap-1 underline underline-offset-4 text-gray-500"><MapPin size={14} /> {listing.location}</span>
          </div>
        </div>
      </div>

      <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-gray-100 bg-gray-200 mb-12">
        <img src={listing.image} className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700" />
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <div className="pb-8 border-b border-gray-100">
            <h2 className="text-xl font-bold mb-1 text-gray-900">Hosted by Dreamstay Elite</h2>
            <p className="text-sm text-gray-500">Premium minimalist living.</p>
          </div>
          <div className="py-8 border-b border-gray-100 space-y-6">
            <p className="text-[15px] leading-relaxed text-gray-700">{listing.description}</p>
          </div>
          <div className="py-8">
            <h3 className="text-lg font-bold mb-6">What this place offers</h3>
            <div className="grid grid-cols-2 gap-y-4 text-[14px] text-gray-700">
              <span className="flex items-center gap-3"><Wifi size={18} /> High-speed WiFi</span>
              <span className="flex items-center gap-3"><Coffee size={18} /> Fresh Morning Coffee</span>
            </div>
          </div>
        </div>

        <div className="lg:w-[380px]">
          <div className="sticky top-28 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl shadow-black/5">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-black">${listing.price} <span className="text-sm font-normal text-gray-500">/ night</span></span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6 flex flex-col">
              <div className="flex border-b border-gray-200">
                <div className="flex-1 p-3 border-r border-gray-200">
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Check-in</label>
                  <input type="date" className="w-full outline-none text-[13px] font-bold" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="flex-1 p-3">
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Checkout</label>
                  <input type="date" className="w-full outline-none text-[13px] font-bold" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} />
                </div>
              </div>
            </div>

            {totalPrice > 0 && (
              <div className="flex justify-between items-center mb-6 text-[15px] font-bold text-gray-900 border-t border-gray-100 pt-4">
                <span>Total ({days} nights)</span>
                <span>${totalPrice}</span>
              </div>
            )}

            <button 
              onClick={handleReserveClick}
              className="w-full py-4 bg-black text-white rounded-xl font-bold text-[13px] uppercase tracking-widest hover:bg-gray-800 transition-all mb-4"
            >
              Reserve Stay
            </button>
            <p className="text-center text-[12px] text-gray-400">You won't be charged yet</p>
          </div>
        </div>
      </div>

      {/* 🚀 THE PREMIUM PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {!isProcessing && (
              <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-1 font-serif">Complete Payment</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <ShieldCheck size={14} className="text-green-600" /> Secure encrypted checkout
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-gray-500">{listing.name}</span>
                <span className="text-black">${listing.price} x {days} nights</span>
              </div>
              <div className="flex justify-between text-lg font-black border-t border-gray-200 pt-2 mt-2">
                <span>Total Due</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 relative">
              {isProcessing && (
                <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
                  <Loader2 size={32} className="animate-spin text-black mb-2" />
                  <p className="text-sm font-bold text-gray-900">Processing Payment...</p>
                </div>
              )}
              
              <div>
                <label className="block text-[11px] font-black uppercase text-gray-500 mb-2">Card Information</label>
                <div className="relative">
                  <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-black transition-colors" disabled={isProcessing} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input type="text" placeholder="MM/YY" className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:border-black transition-colors" disabled={isProcessing} />
                </div>
                <div className="flex-1">
                  <input type="text" placeholder="CVC" className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:border-black transition-colors" disabled={isProcessing} />
                </div>
              </div>
            </div>

            <button 
              onClick={confirmPaymentAndBook}
              disabled={isProcessing}
              className="w-full py-4 bg-black text-white rounded-xl font-bold text-[13px] uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400 flex justify-center items-center gap-2"
            >
              {isProcessing ? 'Confirming...' : `Pay $${totalPrice}`}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ListingDetails;
