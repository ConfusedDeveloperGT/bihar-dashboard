import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, PieChart, Landmark, Map, Database, FileText } from 'lucide-react';

const navItems = [
  { title: 'Caste Demographics', desc: 'Bihar Caste Survey 2023 Analysis', icon: <Users />, path: '/demographics/caste', color: 'from-blue-500 to-cyan-500' },
  { title: 'Election Results', desc: 'Vidhan Sabha & Lok Sabha', icon: <PieChart />, path: '/elections', color: 'from-orange-500 to-red-500' },
  { title: 'Constituency Profiler', desc: 'Detailed data per seat', icon: <Landmark />, path: '/explore', color: 'from-emerald-500 to-green-600' },
  { title: 'Interactive Map', desc: 'Choropleth district explorer', icon: <Map />, path: '/map', color: 'from-purple-500 to-indigo-600' },
];

const QuickNavGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {navItems.map((item, index) => (
        <Link key={item.title} href={item.path}>
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-5 h-full flex items-start gap-4 border border-primary group"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div>
              <h4 className="font-heading font-bold text-primary text-lg group-hover:text-accent-primary transition-colors">{item.title}</h4>
              <p className="text-secondary text-sm mt-1">{item.desc}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default QuickNavGrid;
