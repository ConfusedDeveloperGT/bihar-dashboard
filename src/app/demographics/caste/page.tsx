"use client";

import React, { useState, useEffect } from 'react';
import CasteCompositionChart from '@/components/charts/CasteCompositionChart';
import { Users, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CasteDemographicsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/data/demographics/caste-survey-2023.json');
        const surveyData = await res.json();
        setData(surveyData);
      } catch (e) {
        console.error("Error loading demographics data", e);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-8 animate-fade-in pb-20">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-primary">
          Caste Demographics
        </h1>
        <p className="text-secondary mt-1">
          Based on the historic Bihar Caste Survey 2023.
        </p>
      </div>

      <div className="glass-card p-4 border border-[#f59e0b] bg-[#f59e0b]/5 flex items-start gap-3">
        <AlertCircle className="text-[#f59e0b] shrink-0 mt-0.5" />
        <p className="text-sm text-secondary">
          <strong className="text-primary">Note on Data:</strong> The Bihar Caste-based Survey 2023 was a landmark exercise revealing that EBCs and OBCs constitute roughly 63% of the state's population. This data fundamentally alters electoral math across constituencies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 border border-primary">
          <div className="flex items-center gap-2 mb-6">
            <Users size={18} className="text-accent-primary" />
            <h3 className="text-lg font-bold text-primary font-heading">Overall Caste Composition</h3>
          </div>
          {data ? (
            <CasteCompositionChart data={data.categories} />
          ) : (
            <div className="h-[350px] bg-surface animate-pulse rounded-lg"></div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border border-primary h-full">
            <h3 className="text-lg font-bold text-primary font-heading mb-6">Detailed Breakdown</h3>
            {data ? (
              <div className="space-y-6">
                {data.categories.map((category: any) => (
                  <div key={category.name}>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                        <span className="font-bold text-primary">{category.abbreviation}</span>
                      </div>
                      <span className="font-bold" style={{ color: category.color }}>{category.percentage}%</span>
                    </div>
                    <div className="pl-5 space-y-2">
                      {category.subGroups.slice(0, 4).map((sub: any) => (
                        <div key={sub.name} className="flex justify-between text-sm">
                          <span className="text-secondary">{sub.name} <span className="text-tertiary">({sub.nameHi})</span></span>
                          <span className="text-primary font-medium">{sub.percentage}%</span>
                        </div>
                      ))}
                      {category.subGroups.length > 4 && (
                        <div className="text-xs text-tertiary pt-1 border-t border-subtle">
                          + {category.subGroups.length - 4} more sub-castes
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-surface rounded w-full"></div>)}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6 border border-primary">
        <h3 className="text-lg font-bold text-primary font-heading mb-6">General Political Alignments (Historical)</h3>
        <p className="text-secondary text-sm mb-4">Historical voting patterns based on post-poll surveys and expert analysis. These are broad trends and can vary significantly by candidate and local factors.</p>
        
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.politicalAlignments.map((alignment: any) => (
              <div key={alignment.caste} className="p-3 border border-subtle rounded-lg bg-surface/50 flex justify-between items-center">
                <span className="font-medium text-primary">{alignment.caste}</span>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-elevated font-bold">{alignment.primaryParty}</span>
                  {alignment.secondaryParty && (
                    <span className="px-2 py-1 text-xs rounded bg-surface border border-subtle text-tertiary">{alignment.secondaryParty}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[200px] bg-surface animate-pulse rounded-lg"></div>
        )}
      </div>
    </div>
  );
}
