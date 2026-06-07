import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const timelineData = [
  { year: 2025, title: 'Vidhan Sabha', alliance: 'NDA', isFuture: true },
  { year: 2024, title: 'Lok Sabha', alliance: 'NDA' },
  { year: 2020, title: 'Vidhan Sabha', alliance: 'NDA' },
  { year: 2019, title: 'Lok Sabha', alliance: 'NDA' },
  { year: 2015, title: 'Vidhan Sabha', alliance: 'Mahagathbandhan' },
];

const ElectionTimeline = () => {
  return (
    <div className="glass-card p-6 w-full overflow-x-auto custom-scrollbar border border-primary">
      <h3 className="text-lg font-heading font-bold text-primary mb-6">Election Timeline</h3>
      
      <div className="flex items-center min-w-[600px] py-4 relative">
        {/* Central line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface -translate-y-1/2 z-0"></div>
        
        {timelineData.map((item, index) => (
          <div key={item.year} className="flex-1 flex flex-col items-center relative z-10">
            {/* Year Label */}
            <div className={`text-sm font-bold mb-3 ${item.isFuture ? 'text-accent-primary' : 'text-secondary'}`}>
              {item.year}
            </div>
            
            {/* Node */}
            <Link href={`/elections/${item.year}`} className="group relative">
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className={`w-6 h-6 rounded-full border-4 flex items-center justify-center
                  ${item.isFuture 
                    ? 'border-accent bg-surface animate-pulse-glow' 
                    : item.alliance === 'NDA' ? 'border-[#FF6B00] bg-surface' : 'border-[#008000] bg-surface'
                  } transition-all duration-300 group-hover:shadow-lg`}
              >
                <div className={`w-2 h-2 rounded-full ${item.isFuture ? 'bg-accent' : item.alliance === 'NDA' ? 'bg-[#FF6B00]' : 'bg-[#008000]'}`}></div>
              </motion.div>
              
              {/* Tooltip on hover */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-max bg-elevated border border-primary px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-20">
                <p className="text-sm font-bold text-primary">{item.title}</p>
                {!item.isFuture && <p className="text-xs text-secondary mt-1">Ruling: <span className="text-primary">{item.alliance}</span></p>}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionTimeline;
