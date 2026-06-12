import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, MessageSquare, TrendingUp, Activity } from 'lucide-react';

export default function AdminOverview({ setActiveTab }) {
  const [stats, setStats] = useState({ leads: [], services: [], testimonials: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [leadsRes, servicesRes, testRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/services'),
          fetch('/api/testimonials')
        ]);
        
        const leads = await leadsRes.json();
        const services = await servicesRes.json();
        const testimonials = await testRes.json();

        setStats({ leads, services, testimonials });
      } catch (error) {
        console.error('Error fetching overview stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const statCards = [
    { title: 'Total Leads', value: stats.leads.length, icon: Users, color: 'from-blue-500 to-cyan-400', tab: 'leads' },
    { title: 'Active Services', value: stats.services.length, icon: Briefcase, color: 'from-purple-500 to-pink-500', tab: 'services' },
    { title: 'Testimonials', value: stats.testimonials.length, icon: MessageSquare, color: 'from-emerald-500 to-teal-400', tab: 'testimonials' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Dashboard Overview</h2>
          <p className="text-slate-400">Welcome back to the Tech Digi CMS.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
          <Activity size={16} className="animate-pulse" />
          <span className="text-sm font-semibold">System Online</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-slate-800 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveTab(card.tab)}
                className="relative group cursor-pointer"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300`}></div>
                <div className="relative bg-slate-800 p-6 rounded-2xl flex items-center justify-between border border-slate-700">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">{card.title}</p>
                    <h3 className="text-3xl font-black text-white">{card.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Recent Activity / Leads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-400" /> Recent Leads
          </h3>
          <button onClick={() => setActiveTab('leads')} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
            View All →
          </button>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 uppercase font-medium text-xs">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Service Required</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : stats.leads.length === 0 ? (
                <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">No recent leads.</td></tr>
              ) : (
                stats.leads.slice(0, 5).map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                        {lead.service || 'General Inquiry'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
