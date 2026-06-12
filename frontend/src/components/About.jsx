import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Award } from 'lucide-react';

const stats = [
  { label: 'Happy Clients', value: '250+' },
  { label: 'Projects Done', value: '600+' },
  { label: 'Win Rate', value: '98%' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32 bg-[#020617] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h4 className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-sm tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            About Tech Digi
          </h4>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            We architect <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Digital Dominance</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Images & Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden group shadow-2xl border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-transparent mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="Our Team"
                className="w-full h-[400px] lg:h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Floating Glass Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-10 glass-panel p-6 sm:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 backdrop-blur-xl max-w-[240px] z-20"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Award className="text-white w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-white">10+</h3>
              </div>
              <p className="text-slate-300 font-medium text-sm leading-snug">Years of industry excellence & innovation</p>
            </motion.div>
          </motion.div>

          {/* Right Column: Content & Stats */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-slate-300 text-lg sm:text-xl leading-relaxed font-light">
                Tech Digi is more than just a digital marketing agency. We are an <strong className="text-white font-semibold">AI-powered growth engine</strong>. By combining cutting-edge technology with human creativity, we deliver scalable results that set you apart.
              </p>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                From hyper-targeted SEO optimization to viral social media campaigns, we handle every aspect of your digital presence with absolute precision and data-backed intelligence.
              </p>
            </motion.div>

            {/* Core Values / Features */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-800/40 transition-colors border border-transparent hover:border-slate-700/50">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Target className="text-indigo-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Data-Driven</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Every decision backed by deep analytics.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-800/40 transition-colors border border-transparent hover:border-slate-700/50">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <Zap className="text-purple-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">AI Automation</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Scale faster with intelligent workflows.</p>
                </div>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/60">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">{stat.value}</h3>
                  <p className="text-[11px] sm:text-xs text-indigo-300 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
