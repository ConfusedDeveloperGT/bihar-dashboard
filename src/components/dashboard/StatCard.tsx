"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  delay?: number;
}

const StatCard = ({ title, value, icon, trend, delay = 0 }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1500;
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += value / steps;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [value]);

  return (
    <motion.div 
      className="glass-card p-5 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform group-hover:scale-110">
        <div style={{ transform: 'scale(4)' }}>{icon}</div>
      </div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-secondary font-medium text-sm uppercase tracking-wider">{title}</h3>
        <div className="p-2 rounded-lg bg-surface border border-primary text-accent-primary">
          {icon}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-3xl font-heading font-bold text-primary mb-1">
          {displayValue}
        </div>
        
        {trend && (
          <div className={`text-sm font-medium flex items-center gap-1 ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
            <span className="text-tertiary font-normal ml-1">vs last election</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
