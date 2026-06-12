import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/services`));
        if(res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-[#020617] relative">
      <div className="container mx-auto px-5 sm:px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <h4 className="text-[#6366F1] font-semibold uppercase tracking-wider mb-2 text-xs sm:text-sm">Our Services</h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">What We Offer</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-slate-400">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center text-slate-400">No services available.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          >
            {services.map((service) => {
              const Icon = LucideIcons[service.icon] || LucideIcons.HelpCircle;
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="relative group rounded-3xl"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
                  <div className="relative h-full glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-start overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/5">
                    <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${service.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mb-5 sm:mb-6 flex items-center justify-center bg-gradient-to-br ${service.color} shadow-lg shadow-indigo-500/20`}>
                      <Icon className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-tight">{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-light text-sm sm:text-base">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}
