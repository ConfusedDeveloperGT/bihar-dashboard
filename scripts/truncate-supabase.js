require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function truncateTables() {
  console.log("🧹 Cleaning up old placeholder data in Supabase...");

  try {
    // Delete child tables first
    await supabase.from('booth_data').delete().neq('booth_number', 'impossible_value');
    await supabase.from('religion_census').delete().neq('district_id', 'impossible_value');
    await supabase.from('caste_subgroups').delete().neq('name', 'impossible_value');
    await supabase.from('election_results').delete().neq('party', 'impossible_value');
    
    // Delete parent tables next
    await supabase.from('caste_demographics').delete().neq('name', 'impossible_value');
    await supabase.from('elections').delete().neq('id', 'impossible_value');
    await supabase.from('districts').delete().neq('id', 'impossible_value');
    await supabase.from('divisions').delete().neq('id', 'impossible_value');

    console.log("✅ All tables cleaned successfully!");
  } catch (err) {
    console.error("❌ Error truncating tables:", err);
  }
}

truncateTables();
