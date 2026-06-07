"use client";

import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

interface PartyStrengthChartProps {
  data: any[]; // The results array from our JSON
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-3 border border-primary text-sm shadow-xl">
        <p className="font-bold text-primary">{data.partyFull}</p>
        <p className="text-secondary mt-1">Seats Won: <span className="text-primary font-bold">{data.seats}</span></p>
        <p className="text-secondary">Vote Share: <span className="text-primary font-bold">{data.voteShare}%</span></p>
      </div>
    );
  }
  return null;
};

const PartyStrengthChart = ({ data }: PartyStrengthChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-surface animate-pulse rounded-lg"></div>;

  // Filter out parties with 0 seats and sort by seats
  const chartData = data
    .filter(p => p.seats > 0)
    .sort((a, b) => b.seats - a.seats);

  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-subtle)" />
          <XAxis 
            dataKey="party" 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} 
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-surface)', opacity: 0.5 }} />
          <Bar dataKey="seats" radius={[4, 4, 0, 0]} animationDuration={1500}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PartyStrengthChart;
