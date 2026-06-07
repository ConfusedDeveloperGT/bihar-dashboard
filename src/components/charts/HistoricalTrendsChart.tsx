"use client";

import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

interface HistoricalTrendsChartProps {
  data: any[];
}

const HistoricalTrendsChart = ({ data }: HistoricalTrendsChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-surface animate-pulse rounded-lg"></div>;

  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-subtle)" />
          <XAxis 
            dataKey="year" 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} 
            axisLine={{ stroke: 'var(--color-border)' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} 
            axisLine={false}
            tickLine={false}
            label={{ value: 'Vote %', angle: -90, position: 'insideLeft', fill: 'var(--color-text-tertiary)' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }} 
            itemStyle={{ fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          
          <Line type="monotone" dataKey="NDA" stroke="#FF6B00" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="MGB" stroke="#008000" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Others" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalTrendsChart;
