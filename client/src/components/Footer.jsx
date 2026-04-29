import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-gray-200 pt-16 pb-8 px-8 md:px-16 mt-auto">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-normal tracking-tighter mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Dreamstay<span className="text-gray-400">.</span>
            </div>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-xs">
              Curating the world's most exceptional minimal and luxury properties for the modern traveler.
            </p>
          </div>
          
          {/* Explore Links */}
          <div>
            <h4 className="font-bold text-[13px] text-gray-900 mb-6 uppercase tracking-widest">Explore</h4>
            <ul className="space-y-4 text-[13px] text-gray-500 font-medium">
              <li className="hover:text-black cursor-pointer transition-colors">Villas</li>
              <li className="hover:text-black cursor-pointer transition-colors">Cabins</li>
              <li className="hover:text-black cursor-pointer transition-colors">Mansions</li>
              <li className="hover:text-black cursor-pointer transition-colors">City Lofts</li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-[13px] text-gray-900 mb-6 uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-[13px] text-gray-500 font-medium">
              <li className="hover:text-black cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-black cursor-pointer transition-colors">Cancellation Options</li>
              <li className="hover:text-black cursor-pointer transition-colors">Safety Information</li>
              <li className="hover:text-black cursor-pointer transition-colors">Privacy Settings</li>
            </ul>
          </div>

          {/* Socials - SVGs Logos (Bulletproof) */}
          <div>
            <h4 className="font-bold text-[13px] text-gray-900 mb-6 uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4">
              
              {/* Instagram Logo */}
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>

              {/* Twitter Logo */}
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </div>

              {/* LinkedIn Logo */}
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[13px] text-gray-400 font-medium">
            © 2026 Dreamstay, Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] text-gray-500 font-medium">
            <span className="hover:text-black cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-black cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-black cursor-pointer transition-colors">Sitemap</span>
            <span className="hover:text-black cursor-pointer transition-colors font-bold">English (US)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
