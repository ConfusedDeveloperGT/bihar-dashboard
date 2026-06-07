"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Sun, Moon, Globe, Shield } from 'lucide-react';

const Header = () => {
  const [theme, setTheme] = useState('dark');
  
  // Basic theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="fixed top-0 right-0 h-[var(--header-height)] z-sticky bg-glass backdrop-blur-md border-b border-primary transition-all duration-300 w-full pl-[var(--sidebar-width)] flex items-center justify-between px-6">
      <div className="flex-1 max-w-xl relative">
        <input 
          type="text" 
          placeholder="Search districts, constituencies, leaders..." 
          className="input input-search"
        />
      </div>

      <div className="flex items-center gap-3 ml-4">
        <Link href="/admin" className="btn-icon btn-ghost" title="Admin Access">
          <Shield size={20} />
        </Link>
        <button className="btn-icon btn-ghost relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger"></span>
        </button>
        
        <button className="btn-icon btn-ghost" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="btn-icon btn-ghost" title="Change Language">
          <Globe size={20} />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 ml-2 border-2 border-primary cursor-pointer flex items-center justify-center text-white text-xs font-bold">
          RG
        </div>
      </div>
    </header>
  );
};

export default Header;
