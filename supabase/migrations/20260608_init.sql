-- 20260608_init.sql: Initial database schema for Bihar Political Demography Dashboard

-- 1. Create Divisions Table
CREATE TABLE IF NOT EXISTS public.divisions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Districts Table
CREATE TABLE IF NOT EXISTS public.districts (
    id TEXT PRIMARY KEY,
    division_id TEXT REFERENCES public.divisions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    population BIGINT NOT NULL,
    area NUMERIC NOT NULL,
    blocks INTEGER NOT NULL,
    assembly_constituencies TEXT[] NOT NULL,
    lok_sabha TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Elections Table
CREATE TABLE IF NOT EXISTS public.elections (
    id TEXT PRIMARY KEY, -- e.g., 'vs-2025', 'ls-2024'
    year INTEGER NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('vidhan-sabha', 'lok-sabha')),
    total_seats INTEGER NOT NULL,
    total_voters BIGINT NOT NULL,
    turnout_percent NUMERIC NOT NULL,
    ruling_alliance TEXT,
    chief_minister TEXT,
    key_takeaways TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Election Results Table
CREATE TABLE IF NOT EXISTS public.election_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    election_id TEXT REFERENCES public.elections(id) ON DELETE CASCADE NOT NULL,
    party TEXT NOT NULL,
    party_full TEXT NOT NULL,
    seats INTEGER NOT NULL,
    vote_share NUMERIC NOT NULL,
    color TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Caste Demographics Table
CREATE TABLE IF NOT EXISTS public.caste_demographics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    abbreviation TEXT UNIQUE NOT NULL,
    percentage NUMERIC NOT NULL,
    population BIGINT,
    color TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Caste Subgroups Table
CREATE TABLE IF NOT EXISTS public.caste_subgroups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.caste_demographics(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    percentage NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Create Religion Census 2011 Table
CREATE TABLE IF NOT EXISTS public.religion_census (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id TEXT REFERENCES public.districts(id) ON DELETE CASCADE UNIQUE NOT NULL,
    hindu NUMERIC NOT NULL,
    muslim NUMERIC NOT NULL,
    christian NUMERIC NOT NULL,
    others NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Create Booth Data Table (Digitized Admin Input)
CREATE TABLE IF NOT EXISTS public.booth_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    constituency TEXT NOT NULL,
    booth_number TEXT NOT NULL,
    polling_station_name TEXT NOT NULL,
    ebc_percent NUMERIC,
    obc_percent NUMERIC,
    general_percent NUMERIC,
    muslim_percent NUMERIC,
    dominant_subcaste TEXT,
    total_voters INTEGER,
    votes_polled INTEGER,
    nda_votes INTEGER,
    mgb_votes INTEGER,
    created_by UUID, -- Can refer to auth.users if needed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row-Level Security (RLS) on all tables
ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.election_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caste_demographics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caste_subgroups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.religion_census ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booth_data ENABLE ROW LEVEL SECURITY;

-- Create Public Read Access Policies (everyone can see the data)
CREATE POLICY "Allow anonymous select on divisions" ON public.divisions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anonymous select on districts" ON public.districts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anonymous select on elections" ON public.elections FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anonymous select on election_results" ON public.election_results FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anonymous select on caste_demographics" ON public.caste_demographics FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anonymous select on caste_subgroups" ON public.caste_subgroups FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anonymous select on religion_census" ON public.religion_census FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow anonymous select on booth_data" ON public.booth_data FOR SELECT TO anon, authenticated USING (true);

-- Create Authenticated Write Policies (only logged-in admins can write)
CREATE POLICY "Allow authenticated write on divisions" ON public.divisions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated write on districts" ON public.districts FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated write on elections" ON public.elections FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated write on election_results" ON public.election_results FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated write on caste_demographics" ON public.caste_demographics FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated write on caste_subgroups" ON public.caste_subgroups FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated write on religion_census" ON public.religion_census FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated write on booth_data" ON public.booth_data FOR ALL TO authenticated USING (true);
