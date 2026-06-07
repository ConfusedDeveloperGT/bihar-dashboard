const fs = require('fs');
const path = require('path');

const dataDir = path.join('C:\\Political Demography Dashboard', 'public', 'data');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Wrote ${filePath}`);
};

const divisions = [
  {
    id: "patna_div",
    name: "Patna",
    districts: [
      { id: "patna", name: "Patna", population: 5838465, area: 3202, blocks: 23, lokSabha: ["Pataliputra", "Patna Sahib"], assemblyConstituencies: ["Mokama", "Barh", "Bakhtiarpur", "Digha", "Bankipur", "Kumhrar", "Patna Sahib", "Fatuha", "Danapur", "Maner", "Phulwari", "Masaurhi", "Paliganj", "Bikram"] },
      { id: "nalanda", name: "Nalanda", population: 2877653, area: 2355, blocks: 20, lokSabha: ["Nalanda"], assemblyConstituencies: ["Asthawan", "Biharsharif", "Rajgir", "Islampur", "Hilsa", "Nalanda", "Harnaut"] },
      { id: "bhojpur", name: "Bhojpur", population: 2728407, area: 2395, blocks: 14, lokSabha: ["Arrah"], assemblyConstituencies: ["Sandesh", "Barhara", "Arrah", "Agiaon", "Tarari", "Jagdishpur", "Shahpur"] },
      { id: "rohtas", name: "Rohtas", population: 2959918, area: 3851, blocks: 19, lokSabha: ["Karakat", "Sasaram"], assemblyConstituencies: ["Chenari", "Sasaram", "Kargahar", "Dinara", "Nokha", "Dehri", "Karakat"] },
      { id: "buxar", name: "Buxar", population: 1706352, area: 1703, blocks: 11, lokSabha: ["Buxar"], assemblyConstituencies: ["Brahampur", "Buxar", "Dumraon", "Rajpur"] },
      { id: "kaimur", name: "Kaimur", population: 1626384, area: 3332, blocks: 11, lokSabha: ["Sasaram"], assemblyConstituencies: ["Ramgarh", "Mohania", "Bhabua", "Chainpur"] }
    ]
  },
  {
    id: "tirhut_div",
    name: "Tirhut",
    districts: [
      { id: "west_champaran", name: "West Champaran", population: 3935042, area: 5228, blocks: 18, lokSabha: ["Valmiki Nagar", "Paschim Champaran"], assemblyConstituencies: ["Valmiki Nagar", "Ramnagar", "Narkatiaganj", "Bagaha", "Lauriya", "Nautan", "Chanpatia", "Bettiah", "Sikta"] },
      { id: "east_champaran", name: "East Champaran", population: 5099371, area: 3968, blocks: 27, lokSabha: ["Purvi Champaran", "Sheohar"], assemblyConstituencies: ["Raxaul", "Sugauli", "Narkatia", "Harsidhi", "Govindganj", "Kesaria", "Kalyanpur", "Pipra", "Motihari", "Chiraiya", "Dhaka", "Madhuban"] },
      { id: "muzaffarpur", name: "Muzaffarpur", population: 4801062, area: 3172, blocks: 16, lokSabha: ["Muzaffarpur", "Vaishali"], assemblyConstituencies: ["Gaighat", "Aurai", "Minapur", "Bochahan", "Sakra", "Kurhani", "Kanti", "Baruraj", "Paroo", "Sahebganj", "Muzaffarpur"] },
      { id: "sitamarhi", name: "Sitamarhi", population: 3423574, area: 2294, blocks: 17, lokSabha: ["Sitamarhi"], assemblyConstituencies: ["Riga", "Bathnaha", "Parihar", "Sursand", "Bajpatti", "Sitamarhi", "Runnisaidpur", "Belsand"] },
      { id: "sheohar", name: "Sheohar", population: 656916, area: 349, blocks: 5, lokSabha: ["Sheohar"], assemblyConstituencies: ["Sheohar"] },
      { id: "vaishali", name: "Vaishali", population: 3495021, area: 2036, blocks: 16, lokSabha: ["Hajipur", "Vaishali"], assemblyConstituencies: ["Hajipur", "Lalganj", "Vaishali", "Mahua", "Raja Pakar", "Raghopur", "Patepur", "Mahanar"] }
    ]
  },
  {
    id: "saran_div",
    name: "Saran",
    districts: [
      { id: "saran", name: "Saran", population: 3951862, area: 2641, blocks: 20, lokSabha: ["Saran", "Maharajganj"], assemblyConstituencies: ["Ekma", "Manjhi", "Baniapur", "Taraiya", "Marhaura", "Chapra", "Garkha", "Amnour", "Parsa", "Sonepur"] },
      { id: "siwan", name: "Siwan", population: 3330464, area: 2219, blocks: 19, lokSabha: ["Siwan", "Maharajganj"], assemblyConstituencies: ["Jiradei", "Darauli", "Raghunathpur", "Daraunda", "Barharia", "Goriakothi", "Maharajganj", "Siwan"] },
      { id: "gopalganj", name: "Gopalganj", population: 2562012, area: 2033, blocks: 14, lokSabha: ["Gopalganj"], assemblyConstituencies: ["Baikunthpur", "Barauli", "Gopalganj", "Kuchaikote", "Bhorey", "Hathua"] }
    ]
  },
  {
    id: "darbhanga_div",
    name: "Darbhanga",
    districts: [
      { id: "darbhanga", name: "Darbhanga", population: 3937385, area: 2279, blocks: 18, lokSabha: ["Darbhanga"], assemblyConstituencies: ["Kusheshwar Asthan", "Gaura Bauram", "Benipur", "Alinagar", "Darbhanga Rural", "Darbhanga", "Hayaghat", "Bahadurpur", "Keoti", "Jale"] },
      { id: "madhubani", name: "Madhubani", population: 4487379, area: 3501, blocks: 21, lokSabha: ["Madhubani", "Jhanjharpur"], assemblyConstituencies: ["Harlakhi", "Benipatti", "Khajauli", "Babubarhi", "Bisfi", "Madhubani", "Rajnagar", "Jhanjharpur", "Phulparas", "Laukaha"] },
      { id: "samastipur", name: "Samastipur", population: 4261566, area: 2904, blocks: 20, lokSabha: ["Samastipur", "Ujiarpur"], assemblyConstituencies: ["Kalyanpur", "Warisnagar", "Samastipur", "Ujiarpur", "Morwa", "Sarairanjan", "Mohiuddinnagar", "Bibhutipur", "Rosera", "Hasanpur"] }
    ]
  },
  {
    id: "kosi_div",
    name: "Kosi",
    districts: [
      { id: "saharsa", name: "Saharsa", population: 1900661, area: 1687, blocks: 10, lokSabha: ["Khagaria", "Madhepura"], assemblyConstituencies: ["Sonbarsha", "Saharsa", "Simri Bakhtiarpur", "Mahishi"] },
      { id: "madhepura", name: "Madhepura", population: 2001762, area: 1788, blocks: 13, lokSabha: ["Madhepura"], assemblyConstituencies: ["Alamnagar", "Bihariganj", "Singheshwar", "Madhepura"] },
      { id: "supaul", name: "Supaul", population: 2229076, area: 2425, blocks: 11, lokSabha: ["Supaul"], assemblyConstituencies: ["Nirmali", "Pipra", "Supaul", "Triveniganj", "Chhatapur"] }
    ]
  },
  {
    id: "purnia_div",
    name: "Purnia",
    districts: [
      { id: "purnia", name: "Purnia", population: 3264619, area: 3229, blocks: 14, lokSabha: ["Purnia"], assemblyConstituencies: ["Amour", "Baisi", "Kasba", "Banmankhi", "Rupauli", "Dhamdaha", "Purnia"] },
      { id: "katihar", name: "Katihar", population: 3071029, area: 3057, blocks: 16, lokSabha: ["Katihar"], assemblyConstituencies: ["Katihar", "Kadwa", "Balrampur", "Pranpur", "Manihari", "Barari", "Korha"] },
      { id: "araria", name: "Araria", population: 2811569, area: 2830, blocks: 9, lokSabha: ["Araria"], assemblyConstituencies: ["Narpatganj", "Raniganj", "Forbesganj", "Araria", "Jokihat", "Sikti"] },
      { id: "kishanganj", name: "Kishanganj", population: 1690400, area: 1884, blocks: 7, lokSabha: ["Kishanganj"], assemblyConstituencies: ["Bahadurganj", "Thakurganj", "Kishanganj", "Kochadhaman"] }
    ]
  },
  {
    id: "bhagalpur_div",
    name: "Bhagalpur",
    districts: [
      { id: "bhagalpur", name: "Bhagalpur", population: 3037766, area: 2569, blocks: 16, lokSabha: ["Bhagalpur"], assemblyConstituencies: ["Bihpur", "Gopalpur", "Pirpainti", "Kahalgaon", "Bhagalpur", "Sultanganj", "Nathnagar"] },
      { id: "banka", name: "Banka", population: 2034763, area: 3020, blocks: 11, lokSabha: ["Banka"], assemblyConstituencies: ["Amarpur", "Dhauraiya", "Banka", "Katoria", "Belhar"] }
    ]
  },
  {
    id: "munger_div",
    name: "Munger",
    districts: [
      { id: "munger", name: "Munger", population: 1367765, area: 1419, blocks: 9, lokSabha: ["Munger"], assemblyConstituencies: ["Tarapur", "Jamalpur", "Munger"] },
      { id: "jamui", name: "Jamui", population: 1760405, area: 3098, blocks: 10, lokSabha: ["Jamui"], assemblyConstituencies: ["Sikandra", "Jamui", "Jhajha", "Chakai"] },
      { id: "khagaria", name: "Khagaria", population: 1666886, area: 1486, blocks: 7, lokSabha: ["Khagaria"], assemblyConstituencies: ["Alauli", "Khagaria", "Beldaur", "Parbatta"] },
      { id: "lakhisarai", name: "Lakhisarai", population: 1000912, area: 1228, blocks: 7, lokSabha: ["Munger"], assemblyConstituencies: ["Suryagarha", "Lakhisarai"] },
      { id: "begusarai", name: "Begusarai", population: 2970541, area: 1918, blocks: 18, lokSabha: ["Begusarai"], assemblyConstituencies: ["Cheria Bariarpur", "Bachhwara", "Teghra", "Matihani", "Sahebpur Kamal", "Begusarai", "Bakhri"] },
      { id: "sheikhpura", name: "Sheikhpura", population: 636342, area: 689, blocks: 6, lokSabha: ["Jamui"], assemblyConstituencies: ["Sheikhpura", "Barbigha"] }
    ]
  },
  {
    id: "magadh_div",
    name: "Magadh",
    districts: [
      { id: "gaya", name: "Gaya", population: 4391418, area: 4976, blocks: 24, lokSabha: ["Gaya"], assemblyConstituencies: ["Gurua", "Sherghati", "Imamganj", "Barachatti", "Bodh Gaya", "Gaya Town", "Tikari", "Belaganj", "Atri", "Wazirganj"] },
      { id: "nawada", name: "Nawada", population: 2219146, area: 2494, blocks: 14, lokSabha: ["Nawada"], assemblyConstituencies: ["Rajauli", "Hisua", "Nawada", "Gobindpur", "Warsaliganj"] },
      { id: "aurangabad", name: "Aurangabad", population: 2540073, area: 3305, blocks: 11, lokSabha: ["Aurangabad"], assemblyConstituencies: ["Goh", "Obra", "Nabinagar", "Kutumba", "Aurangabad", "Rafiganj"] },
      { id: "jehanabad", name: "Jehanabad", population: 1125313, area: 931, blocks: 7, lokSabha: ["Jahanabad"], assemblyConstituencies: ["Jehanabad", "Ghosi", "Makhdumpur"] },
      { id: "arwal", name: "Arwal", population: 700843, area: 638, blocks: 5, lokSabha: ["Jahanabad"], assemblyConstituencies: ["Arwal", "Kurtha"] }
    ]
  }
];

const vidhanSabhaSummary = {
  "2025": {
    "year": 2025,
    "totalSeats": 243,
    "results": [
      { "party": "RJD", "alliance": "Mahagathbandhan", "seats": 79, "voteShare": 24.5 },
      { "party": "BJP", "alliance": "NDA", "seats": 78, "voteShare": 23.8 },
      { "party": "JDU", "alliance": "NDA", "seats": 41, "voteShare": 15.2 },
      { "party": "INC", "alliance": "Mahagathbandhan", "seats": 18, "voteShare": 9.1 },
      { "party": "CPI_ML", "alliance": "Mahagathbandhan", "seats": 13, "voteShare": 3.8 },
      { "party": "LJP", "alliance": "NDA", "seats": 6, "voteShare": 6.5 },
      { "party": "HAM", "alliance": "NDA", "seats": 4, "voteShare": 2.1 },
      { "party": "VIP", "alliance": "NDA", "seats": 2, "voteShare": 1.8 },
      { "party": "AIMIM", "alliance": "Others", "seats": 1, "voteShare": 1.2 },
      { "party": "IND", "alliance": "Others", "seats": 1, "voteShare": 12.0 }
    ],
    "allianceSummary": [
      { "alliance": "NDA", "seats": 131, "voteShare": 49.4 },
      { "alliance": "Mahagathbandhan", "seats": 110, "voteShare": 37.4 },
      { "alliance": "Others", "seats": 2, "voteShare": 13.2 }
    ]
  },
  "2020": {
    "year": 2020,
    "totalSeats": 243,
    "results": [
      { "party": "RJD", "alliance": "Mahagathbandhan", "seats": 75, "voteShare": 23.1 },
      { "party": "BJP", "alliance": "NDA", "seats": 74, "voteShare": 19.5 },
      { "party": "JDU", "alliance": "NDA", "seats": 43, "voteShare": 15.4 },
      { "party": "INC", "alliance": "Mahagathbandhan", "seats": 19, "voteShare": 9.5 },
      { "party": "CPI_ML", "alliance": "Mahagathbandhan", "seats": 12, "voteShare": 3.2 },
      { "party": "AIMIM", "alliance": "Others", "seats": 5, "voteShare": 1.2 },
      { "party": "HAM", "alliance": "NDA", "seats": 4, "voteShare": 0.9 },
      { "party": "VIP", "alliance": "NDA", "seats": 4, "voteShare": 5.4 },
      { "party": "CPI", "alliance": "Mahagathbandhan", "seats": 2, "voteShare": 0.8 },
      { "party": "CPM", "alliance": "Mahagathbandhan", "seats": 2, "voteShare": 0.7 },
      { "party": "LJP", "alliance": "Others", "seats": 1, "voteShare": 5.7 },
      { "party": "BSP", "alliance": "Others", "seats": 1, "voteShare": 1.5 },
      { "party": "IND", "alliance": "Others", "seats": 1, "voteShare": 13.1 }
    ],
    "allianceSummary": [
      { "alliance": "NDA", "seats": 125, "voteShare": 41.2 },
      { "alliance": "Mahagathbandhan", "seats": 110, "voteShare": 37.3 },
      { "alliance": "Others", "seats": 8, "voteShare": 21.5 }
    ]
  },
  "2015": {
    "year": 2015,
    "totalSeats": 243,
    "results": [
      { "party": "RJD", "alliance": "Mahagathbandhan", "seats": 80, "voteShare": 18.4 },
      { "party": "JDU", "alliance": "Mahagathbandhan", "seats": 71, "voteShare": 16.8 },
      { "party": "BJP", "alliance": "NDA", "seats": 53, "voteShare": 24.4 },
      { "party": "INC", "alliance": "Mahagathbandhan", "seats": 27, "voteShare": 6.7 },
      { "party": "CPI_ML", "alliance": "Others", "seats": 3, "voteShare": 1.5 },
      { "party": "LJP", "alliance": "NDA", "seats": 2, "voteShare": 4.8 },
      { "party": "RLSP", "alliance": "NDA", "seats": 2, "voteShare": 2.6 },
      { "party": "HAM", "alliance": "NDA", "seats": 1, "voteShare": 2.3 },
      { "party": "IND", "alliance": "Others", "seats": 4, "voteShare": 22.5 }
    ],
    "allianceSummary": [
      { "alliance": "Mahagathbandhan", "seats": 178, "voteShare": 41.9 },
      { "alliance": "NDA", "seats": 58, "voteShare": 34.1 },
      { "alliance": "Others", "seats": 7, "voteShare": 24.0 }
    ]
  },
  "2010": {
    "year": 2010,
    "totalSeats": 243,
    "results": [
      { "party": "JDU", "alliance": "NDA", "seats": 115, "voteShare": 22.6 },
      { "party": "BJP", "alliance": "NDA", "seats": 91, "voteShare": 16.5 },
      { "party": "RJD", "alliance": "Others", "seats": 22, "voteShare": 18.8 },
      { "party": "INC", "alliance": "Others", "seats": 4, "voteShare": 8.4 },
      { "party": "LJP", "alliance": "Others", "seats": 3, "voteShare": 6.7 },
      { "party": "CPI", "alliance": "Others", "seats": 1, "voteShare": 1.7 },
      { "party": "JMM", "alliance": "Others", "seats": 1, "voteShare": 0.6 },
      { "party": "IND", "alliance": "Others", "seats": 6, "voteShare": 24.7 }
    ],
    "allianceSummary": [
      { "alliance": "NDA", "seats": 206, "voteShare": 39.1 },
      { "alliance": "Others", "seats": 37, "voteShare": 60.9 }
    ]
  }
};

const lokSabhaSummary = {
  "2024": {
    "year": 2024,
    "totalSeats": 40,
    "results": [
      { "party": "JDU", "alliance": "NDA", "seats": 12, "voteShare": 18.5 },
      { "party": "BJP", "alliance": "NDA", "seats": 12, "voteShare": 20.5 },
      { "party": "LJP", "alliance": "NDA", "seats": 5, "voteShare": 6.5 },
      { "party": "RJD", "alliance": "INDIA", "seats": 4, "voteShare": 22.1 },
      { "party": "INC", "alliance": "INDIA", "seats": 3, "voteShare": 9.2 },
      { "party": "CPI_ML", "alliance": "INDIA", "seats": 2, "voteShare": 3.5 },
      { "party": "HAM", "alliance": "NDA", "seats": 1, "voteShare": 1.5 },
      { "party": "IND", "alliance": "Others", "seats": 1, "voteShare": 18.2 }
    ],
    "allianceSummary": [
      { "alliance": "NDA", "seats": 30, "voteShare": 47.0 },
      { "alliance": "INDIA", "seats": 9, "voteShare": 34.8 },
      { "alliance": "Others", "seats": 1, "voteShare": 18.2 }
    ]
  },
  "2019": {
    "year": 2019,
    "totalSeats": 40,
    "results": [
      { "party": "BJP", "alliance": "NDA", "seats": 17, "voteShare": 23.6 },
      { "party": "JDU", "alliance": "NDA", "seats": 16, "voteShare": 21.8 },
      { "party": "LJP", "alliance": "NDA", "seats": 6, "voteShare": 7.9 },
      { "party": "INC", "alliance": "UPA", "seats": 1, "voteShare": 7.7 },
      { "party": "RJD", "alliance": "UPA", "seats": 0, "voteShare": 15.4 },
      { "party": "Others", "alliance": "Others", "seats": 0, "voteShare": 23.6 }
    ],
    "allianceSummary": [
      { "alliance": "NDA", "seats": 39, "voteShare": 53.3 },
      { "alliance": "UPA", "seats": 1, "voteShare": 23.1 },
      { "alliance": "Others", "seats": 0, "voteShare": 23.6 }
    ]
  },
  "2014": {
    "year": 2014,
    "totalSeats": 40,
    "results": [
      { "party": "BJP", "alliance": "NDA", "seats": 22, "voteShare": 29.4 },
      { "party": "LJP", "alliance": "NDA", "seats": 6, "voteShare": 6.4 },
      { "party": "RJD", "alliance": "UPA", "seats": 4, "voteShare": 20.1 },
      { "party": "RLSP", "alliance": "NDA", "seats": 3, "voteShare": 3.0 },
      { "party": "JDU", "alliance": "Others", "seats": 2, "voteShare": 15.8 },
      { "party": "INC", "alliance": "UPA", "seats": 2, "voteShare": 8.4 },
      { "party": "NCP", "alliance": "UPA", "seats": 1, "voteShare": 1.2 },
      { "party": "Others", "alliance": "Others", "seats": 0, "voteShare": 15.7 }
    ],
    "allianceSummary": [
      { "alliance": "NDA", "seats": 31, "voteShare": 38.8 },
      { "alliance": "UPA", "seats": 7, "voteShare": 29.7 },
      { "alliance": "Others", "seats": 2, "voteShare": 31.5 }
    ]
  }
};

const casteSurvey2023 = {
  "summary": {
    "totalPopulation": 130725310,
    "categories": [
      { "name": "EBC", "percentage": 36.01, "population": 47080514 },
      { "name": "OBC", "percentage": 27.12, "population": 35463936 },
      { "name": "SC", "percentage": 19.65, "population": 25689820 },
      { "name": "General", "percentage": 15.52, "population": 20291679 },
      { "name": "ST", "percentage": 1.68, "population": 2199361 }
    ]
  },
  "subCastes": [
    { "caste": "Yadav", "category": "OBC", "percentage": 14.26, "primaryAlignment": "RJD / Mahagathbandhan" },
    { "caste": "Kushwaha (Koeri)", "category": "OBC", "percentage": 4.21, "primaryAlignment": "JDU / NDA" },
    { "caste": "Kurmi", "category": "OBC", "percentage": 2.87, "primaryAlignment": "JDU / NDA" },
    { "caste": "Bania", "category": "OBC", "percentage": 2.31, "primaryAlignment": "BJP / NDA" },
    { "caste": "Teli", "category": "EBC", "percentage": 2.81, "primaryAlignment": "BJP / NDA" },
    { "caste": "Mallah", "category": "EBC", "percentage": 2.60, "primaryAlignment": "VIP / NDA" },
    { "caste": "Kanu", "category": "EBC", "percentage": 2.21, "primaryAlignment": "Divided" },
    { "caste": "Dhanuk", "category": "EBC", "percentage": 2.13, "primaryAlignment": "JDU / NDA" },
    { "caste": "Nonia", "category": "EBC", "percentage": 1.91, "primaryAlignment": "NDA" },
    { "caste": "Chandravanshi (Kahar)", "category": "EBC", "percentage": 1.64, "primaryAlignment": "JDU / NDA" },
    { "caste": "Nai", "category": "EBC", "percentage": 1.59, "primaryAlignment": "Divided" },
    { "caste": "Brahmin", "category": "General", "percentage": 3.65, "primaryAlignment": "BJP / NDA" },
    { "caste": "Rajput", "category": "General", "percentage": 3.45, "primaryAlignment": "BJP / NDA" },
    { "caste": "Bhumihar", "category": "General", "percentage": 2.86, "primaryAlignment": "BJP / NDA" },
    { "caste": "Kayastha", "category": "General", "percentage": 0.60, "primaryAlignment": "BJP / NDA" },
    { "caste": "Muslim (General/Upper)", "category": "General", "percentage": 4.80, "primaryAlignment": "RJD / Mahagathbandhan" },
    { "caste": "Paswan (Dusadh)", "category": "SC", "percentage": 5.31, "primaryAlignment": "LJP / NDA" },
    { "caste": "Chamar (Ravidas)", "category": "SC", "percentage": 5.25, "primaryAlignment": "Divided / Mahagathbandhan" },
    { "caste": "Musahar", "category": "SC", "percentage": 3.08, "primaryAlignment": "HAM / NDA" },
    { "caste": "Pasi", "category": "SC", "percentage": 0.98, "primaryAlignment": "Divided" },
    { "caste": "Dhobi", "category": "SC", "percentage": 0.83, "primaryAlignment": "Divided" }
  ]
};

const religionCensus = divisions.flatMap(div => div.districts.map(d => {
  let hinduPct = 82.7;
  let muslimPct = 16.9;
  let christianPct = 0.1;
  let sikhPct = 0.0;
  let buddhistPct = 0.0;
  let jainPct = 0.0;
  let otherPct = 0.3;

  if (d.id === "kishanganj") { hinduPct = 31.4; muslimPct = 68.0; }
  else if (d.id === "katihar") { hinduPct = 54.5; muslimPct = 44.5; }
  else if (d.id === "araria") { hinduPct = 56.7; muslimPct = 42.9; }
  else if (d.id === "purnia") { hinduPct = 60.9; muslimPct = 38.5; }
  else if (d.id === "sitamarhi") { hinduPct = 77.0; muslimPct = 21.6; }
  else if (d.id === "west_champaran") { hinduPct = 77.4; muslimPct = 22.0; }
  else if (d.id === "east_champaran") { hinduPct = 80.1; muslimPct = 19.4; }
  else if (d.id === "darbhanga") { hinduPct = 76.3; muslimPct = 22.7; }
  else if (d.id === "madhubani") { hinduPct = 80.8; muslimPct = 18.9; }
  else if (d.id === "samastipur") { hinduPct = 88.9; muslimPct = 10.6; }
  else if (d.id === "begusarai") { hinduPct = 86.2; muslimPct = 13.5; }
  else if (d.id === "bhagalpur") { hinduPct = 81.3; muslimPct = 17.7; }
  else if (d.id === "siwan") { hinduPct = 81.5; muslimPct = 18.3; }
  else if (d.id === "gopalganj") { hinduPct = 82.7; muslimPct = 17.0; }
  else if (d.id === "saran") { hinduPct = 89.2; muslimPct = 10.3; }
  else if (d.id === "gaya") { hinduPct = 88.0; muslimPct = 11.4; }
  else if (d.id === "rohtas") { hinduPct = 89.5; muslimPct = 10.1; }
  else if (d.id === "patna") { hinduPct = 91.7; muslimPct = 7.5; }
  else if (d.id === "nalanda") { hinduPct = 92.9; muslimPct = 6.6; }

  return {
    districtId: d.id,
    districtName: d.name,
    religionData: {
      Hindu: hinduPct,
      Muslim: muslimPct,
      Christian: christianPct,
      Sikh: sikhPct,
      Buddhist: buddhistPct,
      Jain: jainPct,
      Other: otherPct
    }
  };
}));

const constants = {
  "parties": [
    { "id": "RJD", "name": "Rashtriya Janata Dal", "color": "#008000" },
    { "id": "JDU", "name": "Janata Dal (United)", "color": "#003366" },
    { "id": "BJP", "name": "Bharatiya Janata Party", "color": "#FF9933" },
    { "id": "INC", "name": "Indian National Congress", "color": "#19AAED" },
    { "id": "LJP", "name": "Lok Janshakti Party (Ram Vilas)", "color": "#0000FF" },
    { "id": "HAM", "name": "Hindustani Awam Morcha", "color": "#A52A2A" },
    { "id": "VIP", "name": "Vikassheel Insaan Party", "color": "#FF0000" },
    { "id": "CPI_ML", "name": "Communist Party of India (Marxist–Leninist) Liberation", "color": "#FF0000" },
    { "id": "AIMIM", "name": "All India Majlis-e-Ittehadul Muslimeen", "color": "#006400" },
    { "id": "RLM", "name": "Rashtriya Lok Morcha", "color": "#FFA500" }
  ],
  "alliances": [
    {
      "id": "NDA",
      "name": "National Democratic Alliance",
      "members": ["BJP", "JDU", "LJP", "HAM", "RLM"]
    },
    {
      "id": "MGB",
      "name": "Mahagathbandhan / INDIA",
      "members": ["RJD", "INC", "CPI_ML", "VIP"]
    }
  ]
};

const run = () => {
  ensureDir(path.join(dataDir, 'hierarchy'));
  ensureDir(path.join(dataDir, 'elections'));
  ensureDir(path.join(dataDir, 'demographics'));

  writeJson(path.join(dataDir, 'hierarchy', 'divisions.json'), { divisions });
  writeJson(path.join(dataDir, 'elections', 'vidhan-sabha-summary.json'), vidhanSabhaSummary);
  writeJson(path.join(dataDir, 'elections', 'lok-sabha-summary.json'), lokSabhaSummary);
  writeJson(path.join(dataDir, 'demographics', 'caste-survey-2023.json'), casteSurvey2023);
  writeJson(path.join(dataDir, 'demographics', 'religion-census-2011.json'), religionCensus);
  writeJson(path.join(dataDir, 'constants.json'), constants);
};

run();
