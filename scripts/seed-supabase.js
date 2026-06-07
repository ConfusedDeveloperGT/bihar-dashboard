const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Manually parse .env.local to load keys
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] ? match[2].trim() : '';
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes('your-project-id')) {
  console.error('❌ Error: Please configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

async function main() {
  console.log('🚀 Starting Supabase Database Seeding...');

  try {
    // -------------------------------------------------------------
    // A. Seed Divisions and Districts
    // -------------------------------------------------------------
    console.log('📌 Seeding Divisions and Districts...');
    const divisionsPath = path.join(__dirname, '../public/data/hierarchy/divisions.json');
    if (fs.existsSync(divisionsPath)) {
      const divisionsData = JSON.parse(fs.readFileSync(divisionsPath, 'utf8'));
      
      for (const div of divisionsData.divisions) {
        // Seed Division
        const { error: divError } = await supabase.from('divisions').upsert({
          id: div.id,
          name: div.name,
          name_hi: div.nameHi
        });
        if (divError) throw new Error(`Divisions Seed Error: ${divError.message}`);

        // Seed Districts for this Division
        for (const dist of div.districts) {
          const { error: distError } = await supabase.from('districts').upsert({
            id: dist.id,
            division_id: div.id,
            name: dist.name,
            name_hi: dist.nameHi,
            population: dist.population,
            area: dist.area,
            blocks: dist.blocks,
            assembly_constituencies: dist.assemblyConstituencies || [],
            lok_sabha: dist.lokSabha || []
          });
          if (distError) throw new Error(`Districts Seed Error: ${distError.message}`);
        }
      }
      console.log('✅ Divisions and Districts seeded successfully.');
    } else {
      console.warn('⚠️ Warning: divisions.json not found!');
    }

    // -------------------------------------------------------------
    // B. Seed Caste Demographics
    // -------------------------------------------------------------
    console.log('📌 Seeding Caste Demographics...');
    const castePath = path.join(__dirname, '../public/data/demographics/caste-survey-2023.json');
    if (fs.existsSync(castePath)) {
      let casteData = JSON.parse(fs.readFileSync(castePath, 'utf8'));
      if (casteData.summary && casteData.summary.categories) {
        casteData.categories = casteData.summary.categories;
      }

      for (const cat of casteData.categories) {
        // Insert Category
        const { data: catRecord, error: catError } = await supabase.from('caste_demographics').upsert({
          name: cat.name,
          name_hi: cat.nameHi || cat.name,
          abbreviation: cat.abbreviation || cat.name,
          percentage: cat.percentage,
          population: cat.population || null,
          color: cat.color || '#cccccc'
        }, { onConflict: 'abbreviation' }).select();

        if (catError) throw new Error(`Caste Categories Seed Error: ${catError.message}`);
        
        const categoryId = catRecord[0].id;

        // Insert Subgroups from root subCastes array
        if (casteData.subCastes && casteData.subCastes.length > 0) {
          const categorySubcastes = casteData.subCastes.filter(sub => sub.category === cat.name);
          if (categorySubcastes.length > 0) {
            await supabase.from('caste_subgroups').delete().eq('category_id', categoryId);

            const subgroupsToInsert = categorySubcastes.map(sub => ({
              category_id: categoryId,
              name: sub.caste,
              name_hi: sub.caste,
              percentage: sub.percentage
            }));

            const { error: subError } = await supabase.from('caste_subgroups').insert(subgroupsToInsert);
            if (subError) throw new Error(`Caste Subgroups Seed Error: ${subError.message}`);
          }
        }
      }
      console.log('✅ Caste demographics and subgroups seeded successfully.');
    } else {
      console.warn('⚠️ Warning: caste-survey-2023.json not found!');
    }

    // -------------------------------------------------------------
    // C. Seed Religious Demographics
    // -------------------------------------------------------------
    console.log('📌 Seeding Religious Demographics...');
    const religionPath = path.join(__dirname, '../public/data/demographics/religion-census-2011.json');
    if (fs.existsSync(religionPath)) {
      const religionData = JSON.parse(fs.readFileSync(religionPath, 'utf8'));

      const dataArray = Array.isArray(religionData) ? religionData : religionData.districtWise;

      const recordsToInsert = dataArray.map(dist => {
        const dId = dist.districtId || dist.district.toLowerCase().replace(/\s+/g, '-');
        const rData = dist.religionData || dist;
        return {
          district_id: dId,
          hindu: rData.Hindu || rData.hindu || 0,
          muslim: rData.Muslim || rData.muslim || 0,
          christian: rData.Christian || rData.christian || 0,
          others: rData.Other || rData.others || 0
        };
      });

      // Check if mapped district IDs exist
      for (const rec of recordsToInsert) {
        const { error: relError } = await supabase.from('religion_census').upsert(rec, { onConflict: 'district_id' });
        if (relError) {
          console.warn(`⚠️ Warning: Failed to seed religion data for district "${rec.district_id}": ${relError.message}`);
        }
      }
      console.log('✅ Religious demographics seeded successfully.');
    } else {
      console.warn('⚠️ Warning: religion-census-2011.json not found!');
    }

    // -------------------------------------------------------------
    // D. Seed Elections & Results
    // -------------------------------------------------------------
    console.log('📌 Seeding Elections & Results...');
    const vidhanSabhaPath = path.join(__dirname, '../public/data/elections/vidhan-sabha-summary.json');
    const lokSabhaPath = path.join(__dirname, '../public/data/elections/lok-sabha-summary.json');

    const seedElections = async (filePath, type) => {
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Warning: ${path.basename(filePath)} not found!`);
        return;
      }
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const electionsArray = data.elections || Object.values(data);

      for (const elec of electionsArray) {
        const electionId = `${type === 'vidhan-sabha' ? 'vs' : 'ls'}-${elec.year}`;

        // Insert/Upsert Election
        const { error: elecError } = await supabase.from('elections').upsert({
          id: electionId,
          year: elec.year,
          type: type,
          total_seats: elec.totalSeats || (type === 'vidhan-sabha' ? 243 : 40),
          total_voters: elec.totalVoters || 75000000,
          turnout_percent: elec.turnoutPercent || 55.0,
          ruling_alliance: elec.alliance?.ruling || null,
          chief_minister: elec.chiefMinister || null,
          key_takeaways: elec.keyTakeaways || []
        });

        if (elecError) throw new Error(`Election (${electionId}) Seed Error: ${elecError.message}`);

        // Insert results
        if (elec.results && elec.results.length > 0) {
          // Clear old results for this election
          await supabase.from('election_results').delete().eq('election_id', electionId);

          const resultsToInsert = elec.results.map(res => ({
            election_id: electionId,
            party: res.party,
            party_full: res.partyFull || res.party,
            seats: res.seats,
            vote_share: res.voteShare,
            color: res.color || '#cccccc'
          }));

          const { error: resError } = await supabase.from('election_results').insert(resultsToInsert);
          if (resError) throw new Error(`Election Results (${electionId}) Seed Error: ${resError.message}`);
        }
      }
    };

    await seedElections(vidhanSabhaPath, 'vidhan-sabha');
    await seedElections(lokSabhaPath, 'lok-sabha');
    console.log('✅ Elections and Results seeded successfully.');

    console.log('🎉 Supabase database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding process:', error.message);
    process.exit(1);
  }
}

main();
