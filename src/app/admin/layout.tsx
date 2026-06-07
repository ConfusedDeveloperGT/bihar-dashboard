import React from 'react';
import Link from 'next/link';
import { Shield, Home } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-primary flex flex-col">
      <header className="h-16 border-b border-primary bg-surface/50 backdrop-blur-md flex items-center justify-between px-6 z-10 relative">
        <div className="flex items-center gap-2 text-accent-primary">
          <Shield size={24} />
          <span className="font-heading font-bold text-xl tracking-tight">BiharDemography <span className="text-primary font-normal">| Admin</span></span>
        </div>
        
        <Link href="/" className="btn btn-sm border border-primary bg-surface hover:bg-elevated flex items-center gap-2">
          <Home size={16} /> Return to Public Site
        </Link>
      </header>
      
      <main className="flex-1 flex flex-col relative z-0">
        {/* We add a subtle grid background for the admin section */}
        <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        {children}
      </main>
    </div>
  );
}
