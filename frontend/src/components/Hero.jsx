import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const words = ["Digital Landscape", "SEO Rankings", "Sales & Leads", "Brand Growth"];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [index, setIndex] = useState(0);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Text cycle handler
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#020617] pt-24 sm:pt-20 px-5 sm:px-6 overflow-hidden">
      
      {/* Interactive Mouse Spotlight */}
      <motion.div
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 150, mass: 0.5 }}
        className="hidden sm:block fixed top-0 left-0 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Static background orbs for mobile and texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto relative z-10 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-block mb-5 sm:mb-6 px-3 py-1.5 sm:px-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md"
        >
          <span className="text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            AI-Powered Marketing Agency
          </span>
        </motion.div>

        {/* Heading with Dynamic Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-5 sm:mb-6 leading-[1.2] tracking-tight"
        >
          Dominate your{' '}
          <br className="hidden sm:block" />
          <span className="inline-block min-w-[280px] sm:min-w-[400px] md:min-w-[600px] text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-glow"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-2xl text-slate-400 mb-8 sm:mb-10 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto font-light leading-relaxed"
        >
          We engineer growth using data-driven strategies, beautiful design, and intelligent automation systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/services"
              className="px-7 py-4 sm:px-8 bg-white text-indigo-950 rounded-2xl font-bold transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2"
            >
              Explore Services
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="px-7 py-4 sm:px-8 glass-pill text-white rounded-2xl font-bold hover:bg-slate-800/60 transition-all flex items-center justify-center"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
