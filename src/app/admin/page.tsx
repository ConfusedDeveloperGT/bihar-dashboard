"use client";

import React, { useState, useEffect } from 'react';
import { Lock, User, Key, Database, Users, Upload, LogOut, CheckCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('digitize');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const isSupabaseConfigured = supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-id');

        if (isSupabaseConfigured) {
          const supabase = createClient();
          const { data: { user: activeUser } } = await supabase.auth.getUser();
          if (activeUser) {
            setUser(activeUser);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error("Error checking active session:", err);
      }
    };
    checkUser();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const isSupabaseConfigured = supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-id');

      if (!isSupabaseConfigured) {
        // Fallback mock authentication if database is not configured
        if (email === "admin@bihardemography.in" && password === "password123") {
          setIsAuthenticated(true);
          setUser({ email: "admin@bihardemography.in" });
          setIsSubmitting(false);
          return;
        } else {
          throw new Error("Invalid mock credentials. (Note: Supabase is not configured yet, use admin@bihardemography.in / password123)");
        }
      }

      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const isSupabaseConfigured = supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-id');

      if (isSupabaseConfigured) {
        const supabase = createClient();
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error("Error signing out:", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const handleDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const dataToSave = {
      constituency: formData.get('constituency') as string,
      booth_number: formData.get('boothNumber') as string,
      polling_station_name: formData.get('boothName') as string,
      ebc_percent: Number(formData.get('ebcPercent')) || 0,
      obc_percent: Number(formData.get('obcPercent')) || 0,
      general_percent: Number(formData.get('generalPercent')) || 0,
      muslim_percent: Number(formData.get('muslimPercent')) || 0,
      dominant_subcaste: formData.get('dominantSubcaste') as string,
      total_voters: Number(formData.get('totalVoters')) || 0,
      votes_polled: Number(formData.get('votesPolled')) || 0,
      nda_votes: Number(formData.get('ndaVotes')) || 0,
      mgb_votes: Number(formData.get('mgbVotes')) || 0,
    };

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const isSupabaseConfigured = supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-id');

      if (!isSupabaseConfigured) {
        // Fallback mock saving if database is not configured
        setTimeout(() => {
          setIsSubmitting(false);
          alert("Mock Success: Booth data saved locally! (Supabase not configured)");
          form.reset();
        }, 1200);
        return;
      }

      const supabase = createClient();
      const { error: dbError } = await supabase
        .from('booth_data')
        .insert({
          ...dataToSave,
          created_by: user?.id || null
        });

      if (dbError) throw dbError;

      alert("Booth data digitized and saved to Supabase successfully!");
      form.reset();
    } catch (err: any) {
      alert("Error saving booth data: " + (err.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 animate-fade-in">
        <div className="glass-card p-8 border border-primary w-full max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-subtle"></div>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-surface border border-primary rounded-full flex items-center justify-center mx-auto mb-4 text-accent-primary">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-heading font-bold text-primary">Admin Access</h1>
            <p className="text-secondary text-sm mt-1">Sign in to manage demographic data</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg text-sm text-danger text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Username or Email</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                <input 
                  type="email" 
                  name="email"
                  defaultValue="admin@bihardemography.in"
                  required
                  className="w-full bg-surface border border-subtle rounded-lg py-2.5 pl-10 pr-4 text-primary focus:outline-none focus:border-accent transition-colors" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Password</label>
              <div className="relative">
                <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                <input 
                  type="password" 
                  name="password"
                  defaultValue="password123"
                  required
                  className="w-full bg-surface border border-subtle rounded-lg py-2.5 pl-10 pr-4 text-primary focus:outline-none focus:border-accent transition-colors" 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn btn-primary py-2.5 mt-2 flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Authenticate via Supabase"
              )}
            </button>
          </form>
          
          <div className="mt-6 p-3 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg text-xs text-secondary text-center">
            This is a secure area. All activities are logged and monitored.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden animate-fade-in">
      {/* Admin Sidebar */}
      <div className="w-full md:w-64 border-r border-primary bg-surface/30 p-4 flex flex-col gap-2 overflow-y-auto">
        <div className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2 px-3 pt-2">Database Management</div>
        
        <button 
          onClick={() => setActiveTab('digitize')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'digitize' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-secondary hover:bg-elevated hover:text-primary'}`}
        >
          <Database size={18} /> Digitize Booth Data
        </button>
        <button 
          onClick={() => setActiveTab('bulk')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'bulk' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-secondary hover:bg-elevated hover:text-primary'}`}
        >
          <Upload size={18} /> Bulk Import (CSV)
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-secondary hover:bg-elevated hover:text-primary'}`}
        >
          <Users size={18} /> Manage Users
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'reports' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-secondary hover:bg-elevated hover:text-primary'}`}
        >
          <FileText size={18} /> Generate PDF Reports
        </button>
        
        <div className="mt-auto pt-4 border-t border-subtle">
          <div className="px-3 pb-2 text-xs text-secondary truncate">
            User: {user?.email}
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Admin Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {activeTab === 'digitize' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary">Digitize Booth Data</h2>
              <p className="text-secondary mt-1">Manually enter PDF polling station data into the Supabase database.</p>
            </div>
            
            <div className="glass-card p-6 border border-primary">
              <form onSubmit={handleDataSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-primary border-b border-subtle pb-2">Location Identifier</h3>
                    
                    <div>
                      <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Assembly Constituency</label>
                      <select name="constituency" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent">
                        <option>181 - Digha</option>
                        <option>182 - Bankipur</option>
                        <option>183 - Kumhrar</option>
                        <option>184 - Patna Sahib</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Booth Number</label>
                      <input type="text" name="boothNumber" placeholder="e.g. 104A" required className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Polling Station Name</label>
                      <input type="text" name="boothName" placeholder="e.g. Primary School, Kankarbagh" required className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                    </div>
                  </div>

                  {/* Demographic Estimates */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-primary border-b border-subtle pb-2">Caste/Demographic Estimates</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">EBC %</label>
                        <input type="number" name="ebcPercent" placeholder="0" min="0" max="100" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">OBC %</label>
                        <input type="number" name="obcPercent" placeholder="0" min="0" max="100" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">General %</label>
                        <input type="number" name="generalPercent" placeholder="0" min="0" max="100" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Muslim %</label>
                        <input type="number" name="muslimPercent" placeholder="0" min="0" max="100" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Dominant Sub-caste (Optional)</label>
                        <input type="text" name="dominantSubcaste" placeholder="e.g. Yadav, Kurmi, Kayastha" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Electoral Performance */}
                <div className="space-y-4 pt-4 border-t border-primary">
                  <h3 className="text-sm font-bold text-primary border-b border-subtle pb-2">Electoral Performance (2020)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Total Voters</label>
                      <input type="number" name="totalVoters" placeholder="0" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">Votes Polled</label>
                      <input type="number" name="votesPolled" placeholder="0" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">NDA Votes</label>
                      <input type="number" name="ndaVotes" placeholder="0" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-tertiary uppercase tracking-wider mb-1">MGB Votes</label>
                      <input type="number" name="mgbVotes" placeholder="0" className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:border-accent" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6">
                  <button type="reset" className="px-4 py-2 text-sm text-secondary hover:text-primary transition-colors">Clear</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary py-2 px-6 flex items-center gap-2">
                    {isSubmitting ? (
                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <><CheckCircle size={16} /> Save to Database</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
        
        {activeTab !== 'digitize' && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Database size={48} className="mx-auto text-tertiary mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-primary">Module Under Development</h3>
              <p className="text-secondary mt-2">This feature is integrated into the Supabase database system structure.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

