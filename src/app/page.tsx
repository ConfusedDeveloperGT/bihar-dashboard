"use client";
import React, { useEffect, useState } from 'react';
import StatCard from '@/components/dashboard/StatCard';
import PartyStrengthChart from '@/components/charts/PartyStrengthChart';
import MapWrapper from '@/components/maps/MapWrapper';
import ElectionTimeline from '@/components/dashboard/ElectionTimeline';
import QuickNavGrid from '@/components/dashboard/QuickNavGrid';
import { Map, Users, Target, Landmark, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const isSupabaseConfigured = supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-id');

        if (isSupabaseConfigured) {
          const supabase = createClient();
          
          // Fetch latest Vidhan Sabha election
          const { data: electionData, error: elecErr } = await supabase
            .from('elections')
            .select('*')
            .eq('type', 'vidhan-sabha')
            .order('year', { ascending: false })
            .limit(1)
            .single();

          if (elecErr) throw elecErr;

          // Fetch results for this election
          const { data: resultsData, error: resErr } = await supabase
            .from('election_results')
            .select('*')
            .eq('election_id', electionData.id)
            .order('seats', { ascending: false });

          if (resErr) throw resErr;

          // Fetch caste demographics
          const { data: casteData, error: casteErr } = await supabase
            .from('caste_demographics')
            .select('*')
            .order('percentage', { ascending: false });

          if (casteErr) throw casteErr;

          setData({
            latestElection: {
              year: electionData.year,
              type: electionData.type,
              totalSeats: electionData.total_seats,
              totalVoters: electionData.total_voters,
              turnoutPercent: Number(electionData.turnout_percent),
              alliance: { 
                ruling: electionData.ruling_alliance,
                // Default parties since we only query main results
                parties: resultsData.slice(0, 4).map((r: any) => r.party)
              },
              results: resultsData.map((r: any) => ({
                party: r.party,
                partyFull: r.party_full,
                seats: r.seats,
                voteShare: Number(r.vote_share),
                color: r.color
              }))
            },
            demographics: {
              categories: casteData.map((c: any) => ({
                abbreviation: c.abbreviation,
                percentage: Number(c.percentage),
                color: c.color
              }))
            }
          });
          return;
        }
      } catch (dbError) {
        console.warn("Supabase fetch failed, falling back to static files:", dbError);
      }

      // Fallback: load from static files
      try {
        const [electionsRes, demographicsRes] = await Promise.all([
          fetch('/data/elections/vidhan-sabha-summary.json'),
          fetch('/data/demographics/caste-survey-2023.json')
        ]);
        
        const elections = await electionsRes.json();
        const demographics = await demographicsRes.json();
        
        setData({
          latestElection: elections.elections[0],
          demographics: demographics
        });
      } catch (e) {
        console.error("Error loading dashboard data from static fallback", e);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="animate-fade-in p-6 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-primary">
            Bihar Political Demography
          </h1>
          <p className="text-secondary mt-1 max-w-2xl">
            Real-time insights into elections, caste demographics, and historical voting trends across all 243 constituencies.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="btn btn-primary">
            Explore 2025 Map
          </button>
          <button className="btn border border-primary bg-surface hover:bg-elevated">
            Download Report
          </button>
        </div>
      </div>
      
      {/* Key Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Constituencies" 
          value={243} 
          icon={<Landmark size={24} />} 
          delay={0.1}
        />
        <StatCard 
          title="Total Voters" 
          value="7.6 Cr" 
          icon={<Users size={24} />} 
          trend={{ value: "4.2%", isPositive: true }}
          delay={0.2}
        />
        <StatCard 
          title="Districts" 
          value={38} 
          icon={<Map size={24} />} 
          delay={0.3}
        />
        <StatCard 
          title="Polling Booths" 
          value="90,712" 
          icon={<Target size={24} />} 
          trend={{ value: "1,200", isPositive: true }}
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            className="glass-card p-4 h-[500px] border border-primary relative z-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-heading font-bold text-primary">Interactive Electoral Map</h3>
              <div className="flex gap-2">
                <button className="btn btn-sm bg-accent-subtle text-accent-primary">Districts</button>
                <button className="btn btn-sm border border-primary hover:bg-elevated">Constituencies</button>
              </div>
            </div>
            
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <MapWrapper />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ElectionTimeline />
          </motion.div>
        </div>

        {/* Sidebar Widgets Area */}
        <div className="space-y-6">
          {/* Party Strength Chart Widget */}
          <motion.div 
            className="glass-card p-6 border-t-4 border-t-[#FF6B00]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm uppercase tracking-wider text-secondary font-medium">Party Strength</h3>
              <BarChart3 size={16} className="text-tertiary" />
            </div>
            
            {data ? (
              <div className="h-[250px] mt-4">
                <PartyStrengthChart data={data.latestElection.results} />
              </div>
            ) : (
              <div className="animate-pulse h-[250px] bg-surface rounded-lg mt-4 w-full"></div>
            )}
            
            {data && (
              <div className="mt-4 pt-4 border-t border-primary flex justify-between items-center text-sm">
                <span className="text-secondary">Ruling Alliance:</span>
                <span className="font-bold text-primary">{data.latestElection.alliance.ruling}</span>
              </div>
            )}
          </motion.div>

          {/* Demographics Summary Widget */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-sm uppercase tracking-wider text-secondary font-medium mb-4">Demographics Overview</h3>
            {data ? (
              <div className="space-y-4">
                {data.demographics.categories.map((cat: any) => (
                  <div key={cat.abbreviation}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary font-medium">{cat.abbreviation}</span>
                      <span className="text-secondary">{cat.percentage}%</span>
                    </div>
                    <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between"><div className="h-4 bg-surface w-8 rounded"></div><div className="h-4 bg-surface w-8 rounded"></div></div>
                    <div className="h-2 bg-surface rounded w-full"></div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="text-sm uppercase tracking-wider text-secondary font-medium mb-4">Quick Navigation</h3>
            <QuickNavGrid />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
