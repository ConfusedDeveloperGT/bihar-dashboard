"use client";

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SeatDistributionChartProps {
  data: any[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-3 border border-primary text-sm shadow-xl">
        <p className="font-bold text-primary">{data.partyFull || data.party}</p>
        <p className="text-secondary mt-1">Seats: <span className="text-primary font-bold">{data.seats}</span></p>
      </div>
    );
  }
  return null;
};

const SeatDistributionChart = ({ data }: SeatDistributionChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-surface animate-pulse rounded-lg"></div>;

  // Filter out parties with 0 seats
  const chartData = data.filter(p => p.seats > 0).sort((a, b) => b.seats - a.seats);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="seats"
            nameKey="party"
            animationDuration={1500}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-secondary text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeatDistributionChart;
