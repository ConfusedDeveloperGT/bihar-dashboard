"use client";

import React, { useState } from 'react';
import { Search, Filter, Layers, BarChart3, ChevronDown, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for booth analysis
const mockBooths = [
  { id: 'B-101', name: 'Primary School, Kankarbagh (North)', totalVoters: 1250, turnout: 56.4, dominantCaste: 'Kayastha', winner: 'NDA', margin: 250 },
  { id: 'B-102', name: 'Primary School, Kankarbagh (South)', totalVoters: 1100, turnout: 52.1, dominantCaste: 'Kayastha', winner: 'NDA', margin: 180 },
  { id: 'B-103', name: 'Community Hall, Rajendra Nagar', totalVoters: 950, turnout: 61.2, dominantCaste: 'Yadav', winner: 'MGB', margin: 120 },
  { id: 'B-104', name: 'High School, Kumhrar', totalVoters: 1420, turnout: 58.9, dominantCaste: 'Kurmi', winner: 'NDA', margin: 400 },
  { id: 'B-105', name: 'Panchayat Bhavan, Agamkuan', totalVoters: 880, turnout: 65.5, dominantCaste: 'Paswan', winner: 'NDA', margin: 85 },
];

export default function AnalyticsPage() {
  const [selectedConstituency, setSelectedConstituency] = useState('Patna Sahib');
  
  return (
    <div className="p-6 space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-primary flex items-center gap-2">
            <Layers className="text-accent-primary" />
            Booth-Level Analytics
          </h1>
          <p className="text-secondary mt-1">
            Granular micro-level data analysis for polling booths and panchayats.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <select 
              value={selectedConstituency}
              onChange={(e) => setSelectedConstituency(e.target.value)}
              className="appearance-none bg-surface border border-primary text-primary rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-accent text-sm w-full md:w-64"
            >
              <option>Patna Sahib</option>
              <option>Kumhrar</option>
              <option>Danapur</option>
              <option>Nalanda</option>
              <option>Raghopur</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-5 border border-primary">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2 border-b border-subtle pb-2">
              <Filter size={16} /> Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2 block">Dominant Caste/Community</label>
                <div className="space-y-2">
                  {['Kayastha', 'Yadav', 'Kurmi', 'Muslim', 'Paswan', 'Bhumihar'].map(caste => (
                    <label key={caste} className="flex items-center gap-2 text-sm text-secondary cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-subtle text-accent focus:ring-accent" />
                      {caste}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2 block pt-4 border-t border-subtle">Historical Winner</label>
                <div className="space-y-2">
                  {['NDA', 'Mahagathbandhan', 'Others'].map(alliance => (
                    <label key={alliance} className="flex items-center gap-2 text-sm text-secondary cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-subtle text-accent focus:ring-accent" />
                      {alliance}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2 block pt-4 border-t border-subtle">Turnout Range</label>
                <input type="range" min="0" max="100" className="w-full accent-accent-primary" />
                <div className="flex justify-between text-xs text-tertiary mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 btn btn-primary py-2 text-sm">
              Apply Filters
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 border border-primary flex items-center gap-4">
              <div className="p-3 bg-surface rounded-full text-accent-primary border border-subtle"><CheckSquare size={20} /></div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wider font-bold">Total Booths</p>
                <p className="text-2xl font-bold text-primary">342</p>
              </div>
            </div>
            <div className="glass-card p-4 border border-[#FF6B00] flex items-center gap-4 bg-[#FF6B00]/5">
              <div className="p-3 bg-surface rounded-full text-[#FF6B00] border border-[#FF6B00]/30"><CheckSquare size={20} /></div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wider font-bold">NDA Strongholds</p>
                <p className="text-2xl font-bold text-[#FF6B00]">215</p>
              </div>
            </div>
            <div className="glass-card p-4 border border-[#008000] flex items-center gap-4 bg-[#008000]/5">
              <div className="p-3 bg-surface rounded-full text-[#008000] border border-[#008000]/30"><CheckSquare size={20} /></div>
              <div>
                <p className="text-xs text-secondary uppercase tracking-wider font-bold">MGB Strongholds</p>
                <p className="text-2xl font-bold text-[#008000]">127</p>
              </div>
            </div>
          </div>
          
          {/* Booth Table */}
          <div className="glass-card border border-primary rounded-xl overflow-hidden">
            <div className="p-4 border-b border-primary bg-surface/30 flex justify-between items-center">
              <h3 className="font-bold text-primary flex items-center gap-2"><BarChart3 size={18} className="text-accent-primary" /> Booth Performance Matrix</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" size={14} />
                <input type="text" placeholder="Search booth name/number..." className="bg-surface border border-subtle rounded-md py-1 pl-8 pr-3 text-sm focus:outline-none focus:border-accent" />
              </div>
            </div>
            
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface/50 border-b border-primary">
                  <tr>
                    <th className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider">Booth ID</th>
                    <th className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider text-right">Voters</th>
                    <th className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider text-right">Turnout</th>
                    <th className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider">Demography</th>
                    <th className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider">Lead</th>
                    <th className="px-4 py-3 text-xs font-bold text-secondary uppercase tracking-wider text-right">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBooths.map((booth, idx) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={booth.id} 
                      className="border-b border-subtle hover:bg-elevated cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-primary">{booth.id}</td>
                      <td className="px-4 py-3 text-sm text-secondary">{booth.name}</td>
                      <td className="px-4 py-3 text-sm text-secondary text-right">{booth.totalVoters}</td>
                      <td className="px-4 py-3 text-sm font-medium text-right" style={{ color: booth.turnout > 60 ? '#10b981' : 'inherit' }}>
                        {booth.turnout}%
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary">
                        <span className="px-2 py-0.5 rounded bg-surface border border-subtle text-xs">{booth.dominantCaste}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-bold" style={{ color: booth.winner === 'NDA' ? '#FF6B00' : '#008000' }}>
                        {booth.winner}
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary text-right">+{booth.margin}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-3 border-t border-primary bg-surface/30 text-xs text-tertiary text-center">
              Showing 5 of 342 booths in Patna Sahib. Apply filters to narrow down results.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
