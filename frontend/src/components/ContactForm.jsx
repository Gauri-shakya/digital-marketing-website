import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/leads`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const resData = await response.json();
        if (resData.previewUrl) {
          console.log('%c💌 AUTOMATION WORKFLOW COMPLETE!', 'color: #6366F1; font-weight: bold; font-size: 16px;');
          console.log('%cClick here to view the automated email notification + AI summary:', 'color: #10B981; font-weight: bold;');
          console.log(resData.previewUrl);
        }
        
        toast.success('Message sent successfully! We will contact you soon.', {
          iconTheme: { primary: '#6366F1', secondary: '#fff' },
        });
        reset();
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-[#020617] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-indigo-600/5 rounded-full blur-[150px] sm:blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 border-t border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 group-focus-within:text-indigo-400 transition-colors">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full bg-slate-900/50 border-b-2 border-slate-700 px-3 sm:px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:bg-slate-800/50 transition-all rounded-t-xl text-sm sm:text-base"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-2 font-medium">{errors.name.message}</p>}
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 group-focus-within:text-indigo-400 transition-colors">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email address (e.g., name@example.com)' },
                  })}
                  className="w-full bg-slate-900/50 border-b-2 border-slate-700 px-3 sm:px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:bg-slate-800/50 transition-all rounded-t-xl text-sm sm:text-base"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-2 font-medium">{errors.email.message}</p>}
              </div>
            </div>

            {/* Phone & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 group-focus-within:text-indigo-400 transition-colors">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register('phone', {
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone number must be exactly 10 digits'
                    }
                  })}
                  maxLength="10"
                  className="w-full bg-slate-900/50 border-b-2 border-slate-700 px-3 sm:px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:bg-slate-800/50 transition-all rounded-t-xl text-sm sm:text-base"
                  placeholder="9876543210"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-2 font-medium">{errors.phone.message}</p>}
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 group-focus-within:text-indigo-400 transition-colors">
                  Service of Interest
                </label>
                <select
                  {...register('service')}
                  className="w-full bg-slate-900/50 border-b-2 border-slate-700 px-3 sm:px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-slate-800/50 transition-all rounded-t-xl appearance-none text-sm sm:text-base"
                >
                  <option value="SEO" className="bg-slate-900">SEO Optimization</option>
                  <option value="Social Media" className="bg-slate-900">Social Media Marketing</option>
                  <option value="Web Design" className="bg-slate-900">Web Design</option>
                  <option value="PPC" className="bg-slate-900">PPC Advertising</option>
                  <option value="Other" className="bg-slate-900">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="group">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 sm:mb-3 group-focus-within:text-indigo-400 transition-colors">
                Message
              </label>
              <textarea
                {...register('message')}
                rows="4"
                className="w-full bg-slate-900/50 border-b-2 border-slate-700 px-3 sm:px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:bg-slate-800/50 transition-all rounded-t-xl resize-none text-sm sm:text-base"
                placeholder="Tell us about your project goals..."
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-white text-indigo-950 font-black tracking-wide py-4 sm:py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-2 text-sm sm:text-base"
            >
              {isSubmitting ? 'Sending Request...' : 'Submit Request'}
            </motion.button>
          </form>

        </div>
      </div>
    </section>
  );
}
