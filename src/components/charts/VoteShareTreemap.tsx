"use client";

import React, { useEffect, useState } from 'react';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

interface VoteShareTreemapProps {
  data: any[];
}

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, payload, colors, rank, name, color } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: 'var(--color-surface)',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {
        width > 50 && height > 30 ?
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="bold">
          {name}
        </text>
        : null
      }
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-3 border border-primary text-sm shadow-xl">
        <p className="font-bold text-primary">{data.partyFull || data.name}</p>
        <p className="text-secondary mt-1">Vote Share: <span className="text-primary font-bold">{data.voteShare}%</span></p>
      </div>
    );
  }
  return null;
};

const VoteShareTreemap = ({ data }: VoteShareTreemapProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-surface animate-pulse rounded-lg"></div>;

  const chartData = data
    .filter(p => p.voteShare > 0)
    .map(p => ({
      name: p.party,
      size: p.voteShare,
      color: p.color,
      partyFull: p.partyFull,
      voteShare: p.voteShare
    }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          width={400}
          height={200}
          data={chartData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent />}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default VoteShareTreemap;
