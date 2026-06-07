"use client";

import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

interface CasteCompositionChartProps {
  data: any[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-3 border border-primary text-sm shadow-xl">
        <p className="font-bold text-primary">{data.name} <span className="text-tertiary">({data.nameHi})</span></p>
        <p className="text-secondary mt-1">Population: <span className="text-primary font-bold">{data.percentage}%</span></p>
      </div>
    );
  }
  return null;
};

const CasteCompositionChart = ({ data }: CasteCompositionChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[350px] w-full bg-surface animate-pulse rounded-lg"></div>;

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border-subtle)" />
          <XAxis 
            type="number" 
            domain={[0, 40]}
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} 
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
          />
          <YAxis 
            dataKey="abbreviation" 
            type="category" 
            tick={{ fill: 'var(--color-text-primary)', fontSize: 12, fontWeight: 'bold' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-surface)', opacity: 0.5 }} />
          <Bar dataKey="percentage" radius={[0, 4, 4, 0]} animationDuration={1500} barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CasteCompositionChart;
