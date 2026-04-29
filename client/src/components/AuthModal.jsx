import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, register } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      onClose();
      setFormData({ name: '', email: '', password: '' });
    } else {
      alert(result.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
          />
          <motion.div 
            initial={{ scale: 0.98, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 10 }}
            className="relative w-full max-w-md bg-[#FAF9F6] border border-gray-200 rounded-[24px] p-10 shadow-xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
              <X size={18} />
            </button>
            
            <h2 className="text-2xl font-normal mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              {isLogin ? 'Welcome back.' : 'Create an account.'}
            </h2>
            <p className="text-[12px] text-gray-400 mb-8 font-medium tracking-tight">
              {isLogin ? 'Enter your credentials to continue.' : 'Join our curated community of travelers.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {!isLogin && (
                <input 
                  type="text" placeholder="Full Name" required
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-black outline-none transition-all font-medium"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              )}
              <input 
                type="email" placeholder="Email Address" required
                className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-black outline-none transition-all font-medium"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="password" placeholder="Password" required
                className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-black outline-none transition-all font-medium"
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button type="submit" className="w-full py-3.5 bg-black text-white rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-all mt-4">
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-[12px] text-gray-500 font-medium">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-black font-bold hover:underline underline-offset-4"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
