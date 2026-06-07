"use client";

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity } from 'lucide-react';

const COLORS = ['#FF6B00', '#008000', '#0000FF', '#E91E63', '#9CA3AF'];

export default function ReligionDemographicsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/data/demographics/religion-census-2011.json');
        const censusData = await res.json();
        setData(censusData);
      } catch (e) {
        console.error("Error loading religion data", e);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-8 animate-fade-in pb-20">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-primary">
          Religious Demographics
        </h1>
        <p className="text-secondary mt-1">
          Based on the Census 2011 data, showing state and district-wise distribution.
        </p>
      </div>

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 border border-primary lg:col-span-1">
            <h3 className="text-lg font-bold text-primary font-heading mb-6">State Overall (2011)</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Hindu', value: data.stateLevel.hindu },
                      { name: 'Muslim', value: data.stateLevel.muslim },
                      { name: 'Christian', value: data.stateLevel.christian },
                      { name: 'Sikh', value: data.stateLevel.sikh },
                      { name: 'Others', value: data.stateLevel.others + data.stateLevel.buddhist + data.stateLevel.jain }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-surface rounded-lg border border-subtle">
              <p className="text-sm text-secondary">
                The Muslim population is heavily concentrated in the Seemanchal region (Kishanganj, Araria, Purnia, Katihar), which significantly impacts the electoral outcomes in these districts.
              </p>
            </div>
          </div>
          
          <div className="glass-card p-0 border border-primary lg:col-span-2 overflow-hidden">
            <div className="p-4 border-b border-primary bg-surface/50">
              <h3 className="text-lg font-bold text-primary font-heading">District-wise Breakdown</h3>
            </div>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-surface border-b border-primary z-10">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium text-secondary uppercase tracking-wider">District</th>
                    <th className="px-4 py-3 text-sm font-medium text-secondary uppercase tracking-wider">Hindu %</th>
                    <th className="px-4 py-3 text-sm font-medium text-secondary uppercase tracking-wider">Muslim %</th>
                    <th className="px-4 py-3 text-sm font-medium text-secondary uppercase tracking-wider">Others %</th>
                  </tr>
                </thead>
                <tbody>
                  {data.districtWise.map((d: any) => (
                    <tr key={d.district} className="border-b border-subtle hover:bg-elevated transition-colors">
                      <td className="px-4 py-3 font-medium text-primary">{d.district}</td>
                      <td className="px-4 py-3 text-secondary">{d.hindu}%</td>
                      <td className="px-4 py-3 text-secondary font-medium" style={{ color: d.muslim > 30 ? '#008000' : 'inherit' }}>
                        {d.muslim}%
                      </td>
                      <td className="px-4 py-3 text-tertiary">
                        {(d.christian + d.others).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
