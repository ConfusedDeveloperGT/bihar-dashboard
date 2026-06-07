"use client";

import React, { useState } from 'react';
import { Scale, ArrowRightLeft, Users, BarChart3, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for comparison
const constituencies = [
  { id: 'patna-sahib', name: 'Patna Sahib', district: 'Patna', winner: 'NDA', margin: 42000, ebc: 25, obc: 20, gen: 40, muslim: 5, scst: 10, turnout: 52.4 },
  { id: 'raghopur', name: 'Raghopur', district: 'Vaishali', winner: 'MGB', margin: 38000, ebc: 22, obc: 45, gen: 10, muslim: 8, scst: 15, turnout: 58.9 },
  { id: 'nalanda', name: 'Nalanda', district: 'Nalanda', winner: 'NDA', margin: 16000, ebc: 28, obc: 35, gen: 15, muslim: 10, scst: 12, turnout: 55.2 },
  { id: 'seamanchal', name: 'Kishanganj', district: 'Kishanganj', winner: 'Others', margin: 22000, ebc: 15, obc: 10, gen: 5, muslim: 68, scst: 2, turnout: 65.1 },
];

export default function ComparePage() {
  const [const1, setConst1] = useState(constituencies[0]);
  const [const2, setConst2] = useState(constituencies[1]);
  
  return (
    <div className="p-6 space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-primary flex items-center gap-2">
            <Scale className="text-accent-primary" />
            Constituency Comparison
          </h1>
          <p className="text-secondary mt-1">
            Head-to-head analysis of electoral and demographic metrics.
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <div className="md:col-span-2 glass-card p-4 border border-primary relative">
          <label className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2 block">Constituency A</label>
          <select 
            value={const1.id}
            onChange={(e) => setConst1(constituencies.find(c => c.id === e.target.value) || const1)}
            className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:outline-none focus:border-accent"
          >
            {constituencies.map(c => <option key={c.id} value={c.id}>{c.name} ({c.district})</option>)}
          </select>
        </div>
        
        <div className="md:col-span-1 flex justify-center">
          <div className="w-12 h-12 rounded-full bg-surface border border-accent flex items-center justify-center text-accent-primary shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)]">
            <ArrowRightLeft size={24} />
          </div>
        </div>
        
        <div className="md:col-span-2 glass-card p-4 border border-primary relative">
          <label className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2 block">Constituency B</label>
          <select 
            value={const2.id}
            onChange={(e) => setConst2(constituencies.find(c => c.id === e.target.value) || const2)}
            className="w-full bg-surface border border-subtle rounded-md py-2 px-3 text-primary focus:outline-none focus:border-accent"
          >
            {constituencies.map(c => <option key={c.id} value={c.id}>{c.name} ({c.district})</option>)}
          </select>
        </div>
      </div>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 gap-4">
        {/* Basic Stats Row */}
        <div className="glass-card overflow-hidden border border-primary">
          <div className="grid grid-cols-3 bg-surface/50 p-4 border-b border-primary text-center">
            <div className="font-bold text-xl text-primary">{const1.name}</div>
            <div className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center justify-center gap-2">
              <BarChart3 size={16} /> Metric
            </div>
            <div className="font-bold text-xl text-primary">{const2.name}</div>
          </div>
          
          <div className="divide-y divide-subtle">
            {/* Winner */}
            <div className="grid grid-cols-3 p-4 text-center items-center hover:bg-elevated transition-colors">
              <div className="font-bold" style={{ color: const1.winner === 'NDA' ? '#FF6B00' : const1.winner === 'MGB' ? '#008000' : '#888' }}>{const1.winner}</div>
              <div className="text-sm text-secondary">2020 Winner</div>
              <div className="font-bold" style={{ color: const2.winner === 'NDA' ? '#FF6B00' : const2.winner === 'MGB' ? '#008000' : '#888' }}>{const2.winner}</div>
            </div>
            
            {/* Margin */}
            <div className="grid grid-cols-3 p-4 text-center items-center hover:bg-elevated transition-colors">
              <div className={`font-bold ${const1.margin > const2.margin ? 'text-accent-primary' : 'text-primary'}`}>{const1.margin.toLocaleString()}</div>
              <div className="text-sm text-secondary">Winning Margin</div>
              <div className={`font-bold ${const2.margin > const1.margin ? 'text-accent-primary' : 'text-primary'}`}>{const2.margin.toLocaleString()}</div>
            </div>
            
            {/* Turnout */}
            <div className="grid grid-cols-3 p-4 text-center items-center hover:bg-elevated transition-colors">
              <div className={`font-bold ${const1.turnout > const2.turnout ? 'text-accent-primary' : 'text-primary'}`}>{const1.turnout}%</div>
              <div className="text-sm text-secondary">Voter Turnout</div>
              <div className={`font-bold ${const2.turnout > const1.turnout ? 'text-accent-primary' : 'text-primary'}`}>{const2.turnout}%</div>
            </div>
          </div>
        </div>

        {/* Demographics Comparison Row */}
        <div className="glass-card overflow-hidden border border-primary mt-6">
          <div className="bg-surface/50 p-4 border-b border-primary text-center flex items-center justify-center gap-2">
            <Users size={18} className="text-accent-primary" />
            <h3 className="font-bold text-primary">Demographic Comparison</h3>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Const 1 Bars */}
            <div className="space-y-4">
              <h4 className="font-bold text-center mb-4 text-primary">{const1.name}</h4>
              {[
                { label: 'EBC', value: const1.ebc, color: '#f59e0b' },
                { label: 'OBC', value: const1.obc, color: '#10b981' },
                { label: 'General', value: const1.gen, color: '#ef4444' },
                { label: 'Muslim', value: const1.muslim, color: '#008000' },
                { label: 'SC/ST', value: const1.scst, color: '#8b5cf6' },
              ].map(group => (
                <div key={group.label} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-right font-medium text-secondary">{group.label}</span>
                  <div className="flex-1 bg-surface h-4 rounded-full overflow-hidden flex justify-end">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${group.value}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-l-full" 
                      style={{ backgroundColor: group.color }}
                    />
                  </div>
                  <span className="w-8 text-xs font-bold text-primary">{group.value}%</span>
                </div>
              ))}
            </div>
            
            {/* Const 2 Bars */}
            <div className="space-y-4">
              <h4 className="font-bold text-center mb-4 text-primary">{const2.name}</h4>
              {[
                { label: 'EBC', value: const2.ebc, color: '#f59e0b' },
                { label: 'OBC', value: const2.obc, color: '#10b981' },
                { label: 'General', value: const2.gen, color: '#ef4444' },
                { label: 'Muslim', value: const2.muslim, color: '#008000' },
                { label: 'SC/ST', value: const2.scst, color: '#8b5cf6' },
              ].map(group => (
                <div key={group.label} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-bold text-primary">{group.value}%</span>
                  <div className="flex-1 bg-surface h-4 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${group.value}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-r-full" 
                      style={{ backgroundColor: group.color }}
                    />
                  </div>
                  <span className="w-16 text-xs text-left font-medium text-secondary">{group.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
