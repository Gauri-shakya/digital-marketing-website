import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutDashboard, Briefcase, MessageSquare, LogOut, Users, Home } from 'lucide-react';
import AdminOverview from './AdminOverview';
import AdminServices from './AdminServices';
import AdminTestimonials from './AdminTestimonials';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Leads state
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      setError('Invalid password');
    }
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/leads`));
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeads(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center px-4">
        <Helmet><title>Admin Login | Tech Digi</title></Helmet>
        <div className="w-full max-w-md bg-[#1E293B] p-8 rounded-2xl shadow-2xl border border-gray-800 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6366F1]"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-left">{error}</p>}
            <button 
              type="submit" 
              className="w-full py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-bold transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-6">
             <a href="/" className="text-gray-400 hover:text-white text-sm">Return to Website</a>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return <AdminOverview setActiveTab={setActiveTab} />;
      case 'leads':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Leads Management</h2>
              <button onClick={fetchLeads} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
                Refresh Leads
              </button>
            </div>
            <div className="bg-[#1E293B] rounded-2xl shadow-xl overflow-hidden border border-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-[#0B1120] text-gray-300 uppercase font-medium">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {loadingLeads ? (
                      <tr><td colSpan="6" className="px-6 py-8 text-center">Loading...</td></tr>
                    ) : leads.length === 0 ? (
                      <tr><td colSpan="6" className="px-6 py-8 text-center">No leads found.</td></tr>
                    ) : (
                      leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                          <td className="px-6 py-4">{lead.email}</td>
                          <td className="px-6 py-4">{lead.phone || '-'}</td>
                          <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full bg-[#6366F1]/20 text-[#6366F1] text-xs font-semibold">{lead.service || 'N/A'}</span></td>
                          <td className="px-6 py-4 max-w-xs truncate" title={lead.message}>{lead.message || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{new Date(lead.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'services':
        return <AdminServices />;
      case 'testimonials':
        return <AdminTestimonials />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col md:flex-row">
      <Helmet><title>Admin CMS | Tech Digi</title></Helmet>
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E293B] border-r border-slate-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
            Tech Digi CMS
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Home size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'leads' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users size={20} /> Leads
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'services' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Briefcase size={20} /> Services
          </button>
          <button 
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'testimonials' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <MessageSquare size={20} /> Testimonials
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <a href="/" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white font-medium transition-colors">
            <LogOut size={20} /> Exit Admin
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

    </div>
  );
}
