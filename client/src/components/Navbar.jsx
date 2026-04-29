import React, { useState } from 'react';
import { Menu, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <nav className="w-full px-8 md:px-16 py-4 flex justify-between items-center bg-[#FAF9F6] border-b border-gray-200 sticky top-0 z-50">
        
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-normal tracking-tighter cursor-pointer" style={{ fontFamily: 'Georgia, serif' }}>
          Dreamstay<span className="text-gray-400">.</span>
        </Link>

        {/* Right: User Menu */}
        <div className="flex items-center gap-5">
          <div 
            onClick={handleUserClick}
            className="flex items-center gap-3 border border-gray-200 bg-white px-3 py-1.5 rounded-full cursor-pointer hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
          >
            <Menu size={16} className="text-gray-600" />
            <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
              {user ? user.name[0].toUpperCase() : <User size={14} />}
            </div>
          </div>
        </div>
      </nav>

      {/* Login/Signup Modal */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
