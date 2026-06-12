import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] border-t border-gray-800 pt-12 sm:pt-16 pb-8">
      <div className="container mx-auto px-5 sm:px-6">

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[#6366F1]">Tech</span> Digi
            </Link>
            <p className="text-gray-400 text-sm sm:text-base max-w-xs sm:max-w-sm mb-4 sm:mb-6 leading-relaxed">
              Empowering businesses with AI-driven digital marketing solutions, stunning web design, and measurable growth.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-[#6366F1] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#6366F1] transition-colors">Services</Link></li>
              <li><Link to="/news" className="hover:text-[#6366F1] transition-colors">News</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/privacy" className="hover:text-[#6366F1] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#6366F1] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Tech Digi. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/admin" className="hover:text-white transition-colors">Admin Login</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
