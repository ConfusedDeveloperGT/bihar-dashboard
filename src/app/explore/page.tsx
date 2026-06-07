"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExplorePage() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/data/hierarchy/divisions.json');
        const hierarchyData = await res.json();
        setData(hierarchyData);
      } catch (e) {
        console.error("Error loading hierarchy data", e);
      }
    };
    loadData();
  }, []);

  const filteredDivisions = data?.divisions.map((div: any) => {
    const filteredDistricts = div.districts.filter((d: any) => 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.assemblyConstituencies.some((ac: string) => ac.toLowerCase().includes(search.toLowerCase()))
    );
    return { ...div, districts: filteredDistricts };
  }).filter((div: any) => div.districts.length > 0);

  return (
    <div className="p-6 space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-primary">
            Constituency Profiler
          </h1>
          <p className="text-secondary mt-1">
            Navigate through Divisions, Districts, and all 243 Assembly Constituencies.
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" size={18} />
          <input 
            type="text" 
            placeholder="Search district or constituency..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-primary rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-accent text-sm"
          />
        </div>
      </div>

      {!data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-surface rounded-xl"></div>)}
        </div>
      ) : (
        <div className="space-y-10">
          {filteredDivisions?.map((division: any) => (
            <div key={division.id} className="space-y-4">
              <h2 className="text-xl font-heading font-bold text-primary flex items-center gap-2 border-b border-primary pb-2">
                <MapPin className="text-accent-primary" size={20} />
                {division.name} Division <span className="text-tertiary text-sm font-normal">({division.nameHi})</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {division.districts.map((district: any) => (
                  <motion.div 
                    whileHover={{ y: -4 }}
                    key={district.id} 
                    className="glass-card p-5 border border-primary hover:border-accent transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-primary group-hover:text-accent-primary transition-colors">{district.name}</h3>
                        <p className="text-xs text-secondary">{district.population.toLocaleString()} Population</p>
                      </div>
                      <span className="bg-surface px-2 py-1 rounded text-xs font-medium text-tertiary border border-subtle">
                        {district.assemblyConstituencies.length} ACs
                      </span>
                    </div>
                    
                    <div className="space-y-1 mt-4 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                      {district.assemblyConstituencies.map((ac: string) => (
                        <Link 
                          href={`/explore/${ac.toLowerCase().replace(/ /g, '-')}`} 
                          key={ac}
                          className="flex items-center justify-between text-sm py-1.5 px-2 rounded hover:bg-elevated text-secondary hover:text-primary transition-colors"
                        >
                          <span>{ac}</span>
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          
          {filteredDivisions?.length === 0 && (
            <div className="text-center py-12 glass-card border border-dashed border-primary">
              <p className="text-secondary">No districts or constituencies found matching "{search}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
