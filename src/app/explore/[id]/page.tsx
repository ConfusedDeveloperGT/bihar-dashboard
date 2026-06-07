"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Users, History, CheckCircle } from 'lucide-react';
import HistoricalTrendsChart from '@/components/charts/HistoricalTrendsChart';
import StatCard from '@/components/dashboard/StatCard';

export default function ConstituencyProfilePage({ params }: { params: { id: string } }) {
  const [constituencyName, setConstituencyName] = useState('');
  
  useEffect(() => {
    // Reconstruct name from slug (e.g., patna-sahib -> Patna Sahib)
    const name = params.id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setConstituencyName(name);
  }, [params.id]);

  // Mock historical data for the chart
  const historicalData = [
    { year: '2005', NDA: 42, MGB: 38, Others: 20 },
    { year: '2010', NDA: 55, MGB: 25, Others: 20 },
    { year: '2015', NDA: 35, MGB: 52, Others: 13 },
    { year: '2020', NDA: 48, MGB: 45, Others: 7 },
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div>
        <Link href="/explore" className="inline-flex items-center gap-2 text-tertiary hover:text-primary transition-colors mb-4 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Hierarchy
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-heading font-bold tracking-tight text-primary">
              {constituencyName || 'Loading...'}
            </h1>
            <div className="flex items-center gap-2 text-secondary mt-2">
              <MapPin size={16} />
              <span>Assembly Constituency • Patna District</span>
            </div>
          </div>
          <div className="bg-surface border border-primary px-4 py-2 rounded-lg flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#FF6B00]"></div>
            <div>
              <p className="text-xs text-tertiary font-medium uppercase tracking-wider">Current MLA (2020)</p>
              <p className="font-bold text-primary">Nand Kishore Yadav (BJP)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Voters" value="3,45,210" icon={<Users size={24} />} />
        <StatCard title="Polling Stations" value="342" icon={<MapPin size={24} />} />
        <StatCard title="2020 Turnout" value="52.4%" icon={<CheckCircle size={24} />} />
        <StatCard title="Winning Margin" value="42,000" icon={<History size={24} />} trend={{ value: "Up", isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Historical Trends */}
        <div className="glass-card p-6 border border-primary lg:col-span-2">
          <h3 className="text-lg font-bold text-primary font-heading mb-6 flex items-center gap-2">
            <History className="text-accent-primary" size={20} />
            Historical Vote Share Trends
          </h3>
          <div className="h-[350px]">
            <HistoricalTrendsChart data={historicalData} />
          </div>
        </div>

        {/* Demographics Estimates */}
        <div className="glass-card p-6 border border-primary">
          <h3 className="text-lg font-bold text-primary font-heading mb-6 flex items-center gap-2">
            <Users className="text-accent-primary" size={20} />
            Estimated Demographics
          </h3>
          <p className="text-sm text-secondary mb-4">Approximate breakdown based on 2023 state averages adjusted for urban centers.</p>
          
          <div className="space-y-4">
            {[
              { label: 'EBC', value: 32, color: '#f59e0b' },
              { label: 'OBC', value: 25, color: '#10b981' },
              { label: 'General', value: 22, color: '#ef4444' },
              { label: 'SC/ST', value: 15, color: '#8b5cf6' },
              { label: 'Muslim', value: 6, color: '#008000' },
            ].map(group => (
              <div key={group.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-primary font-medium">{group.label}</span>
                  <span className="text-secondary">{group.value}%</span>
                </div>
                <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${group.value}%`, backgroundColor: group.color }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 btn btn-sm border border-primary bg-surface hover:bg-elevated">
            View Booth-Level Details
          </button>
        </div>
      </div>
    </div>
  );
}
