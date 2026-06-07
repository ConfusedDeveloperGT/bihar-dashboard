"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map, 
  BarChart3, 
  Users, 
  Landmark, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Scale
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Elections', path: '/elections', icon: <Map size={20} /> },
    { name: 'Demographics', path: '/demographics', icon: <Users size={20} /> },
    { name: 'Constituencies', path: '/explore', icon: <Landmark size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Compare', path: '/compare', icon: <Scale size={20} /> },
  ];

  const bottomItems = [
    { name: 'Admin', path: '/admin', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen z-sidebar transition-all duration-300 bg-surface border-r border-primary flex flex-col ${
        collapsed ? 'w-[var(--sidebar-collapsed)]' : 'w-[var(--sidebar-width)]'
      }`}
    >
      <div className="flex items-center justify-between h-[var(--header-height)] px-4 border-b border-primary">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-primary truncate">
              Bihar Politics
            </span>
          </Link>
        )}
        
        {collapsed && (
          <Link href="/" className="mx-auto">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
          </Link>
        )}
      </div>

      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-elevated border border-primary flex items-center justify-center text-secondary hover:text-primary hover:border-accent z-10 shadow-sm"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-accent-subtle text-accent-primary font-medium' 
                  : 'text-secondary hover:bg-elevated hover:text-primary'
              }`}
              title={collapsed ? item.name : undefined}
            >
              <div className={isActive ? 'text-accent-primary' : 'text-tertiary'}>
                {item.icon}
              </div>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>

      <div className="p-3 border-t border-primary">
        {bottomItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-secondary hover:bg-elevated hover:text-primary"
            title={collapsed ? item.name : undefined}
          >
            <div className="text-tertiary">{item.icon}</div>
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
