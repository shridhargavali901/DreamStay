import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListingDetails from './pages/ListingDetails';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans text-gray-900">
        
        {/* The Magic Toast Provider (Matte Dark Style) */}
        <Toaster 
          position="bottom-center" 
          toastOptions={{ 
            style: { background: '#222', color: '#fff', fontSize: '13px', fontWeight: '500', borderRadius: '100px', padding: '12px 24px', letterSpacing: '0.5px' } 
          }} 
        />
        
        <div className="flex-none">
          <Navbar />
        </div>
        
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <div className="flex-none">
          <Footer />
        </div>

      </div>
    </Router>
  );
}

export default App;
