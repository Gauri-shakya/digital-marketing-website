import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || "") + '/api/testimonials');
        if(res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-16 sm:py-24 bg-[#0F172A] overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <h4 className="text-[#6366F1] font-semibold uppercase tracking-wider mb-2 text-xs sm:text-sm">Testimonials</h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Client Success Stories</h2>
        </div>

        {loading ? (
           <div className="flex justify-center items-center h-[320px] text-slate-400">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
           <div className="text-center text-slate-400 h-[320px] flex items-center justify-center">No testimonials yet.</div>
        ) : (
          <div className="max-w-3xl mx-auto relative" style={{ minHeight: '320px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center px-2 sm:px-6 absolute w-full"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5 sm:mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                {/* Quote */}
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 leading-relaxed mb-8 sm:mb-10 italic">
                  "{testimonials[current].content}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#6366F1]"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <h4 className="text-base sm:text-lg font-bold text-white">{testimonials[current].name}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${current === index ? 'bg-[#6366F1] w-8' : 'bg-gray-600 w-2.5'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
