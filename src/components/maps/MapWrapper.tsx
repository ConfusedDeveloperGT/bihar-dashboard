"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// Dynamically import the Leaflet map with ssr: false
// This prevents Next.js from trying to render Leaflet on the server
// where the `window` object doesn't exist.
const BiharMapDynamic = dynamic(() => import('./BiharMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-surface rounded-lg animate-pulse flex items-center justify-center border border-primary">
      <div className="text-secondary font-medium flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-accent-primary border-t-transparent animate-spin"></div>
        Loading Interactive Map...
      </div>
    </div>
  )
});

export default function MapWrapper() {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch('/data/geo/bihar-districts.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error loading GeoJSON", err));
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <BiharMapDynamic 
        geoJsonData={geoData} 
        onDistrictClick={(id) => console.log('Clicked district:', id)} 
      />
    </div>
  );
}
