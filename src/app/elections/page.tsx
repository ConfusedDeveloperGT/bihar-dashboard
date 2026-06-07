"use client";

import React, { useState, useEffect } from 'react';
import ElectionTable from '@/components/elections/ElectionTable';
import SeatDistributionChart from '@/components/charts/SeatDistributionChart';
import VoteShareTreemap from '@/components/charts/VoteShareTreemap';
import { Search, Filter, Download, PieChart, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ElectionsPage() {
  const [activeTab, setActiveTab] = useState('vidhan-sabha');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vsRes, lsRes] = await Promise.all([
          fetch('/data/elections/vidhan-sabha-summary.json'),
          fetch('/data/elections/lok-sabha-summary.json')
        ]);
        
        const vsData = await vsRes.json();
        const lsData = await lsRes.json();
        
        setData({
          'vidhan-sabha': vsData.elections[0],
          'lok-sabha': lsData.elections[0]
        });
      } catch (e) {
        console.error("Error loading election data", e);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-primary">
            Election Explorer
          </h1>
          <p className="text-secondary mt-1">
            Detailed constituency-wise results, vote shares, and historical data.
          </p>
        </div>
        
        <div className="flex gap-2 bg-surface p-1 rounded-lg border border-primary">
          <button 
            onClick={() => setActiveTab('vidhan-sabha')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'vidhan-sabha' ? 'bg-elevated text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
          >
            Vidhan Sabha
          </button>
          <button 
            onClick={() => setActiveTab('lok-sabha')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'lok-sabha' ? 'bg-elevated text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
          >
            Lok Sabha
          </button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 border border-primary">
          <div className="flex items-center gap-2 mb-6">
            <PieChart size={18} className="text-accent-primary" />
            <h3 className="text-lg font-bold text-primary font-heading">Seat Distribution</h3>
          </div>
          {data ? (
            <SeatDistributionChart data={data[activeTab].results} />
          ) : (
            <div className="h-[300px] bg-surface animate-pulse rounded-lg"></div>
          )}
        </div>

        <div className="glass-card p-6 border border-primary">
          <div className="flex items-center gap-2 mb-6">
            <LayoutGrid size={18} className="text-accent-primary" />
            <h3 className="text-lg font-bold text-primary font-heading">Vote Share Treemap</h3>
          </div>
          {data ? (
            <VoteShareTreemap data={data[activeTab].results} />
          ) : (
            <div className="h-[300px] bg-surface animate-pulse rounded-lg"></div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="glass-card border border-primary rounded-xl overflow-hidden mt-8">
        {/* Toolbar */}
        <div className="p-4 border-b border-primary bg-surface/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" size={18} />
            <input 
              type="text" 
              placeholder="Search constituency, candidate, or party..." 
              className="w-full bg-surface border border-primary rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-accent text-sm"
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="btn btn-sm border border-primary bg-surface hover:bg-elevated flex items-center gap-2">
              <Filter size={16} />
              Filters
            </button>
            <button className="btn btn-sm border border-primary bg-surface hover:bg-elevated flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="p-0">
          <ElectionTable />
        </div>
        
        <div className="p-4 border-t border-primary bg-surface/30 text-sm text-tertiary flex justify-between items-center">
          <span>Showing 1-6 of 243 constituencies</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-surface border border-primary disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 rounded bg-surface border border-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
