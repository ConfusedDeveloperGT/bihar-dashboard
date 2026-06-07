"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface BiharMapProps {
  geoJsonData: any;
  onDistrictClick?: (districtId: string) => void;
}

export default function BiharMap({ geoJsonData, onDistrictClick }: BiharMapProps) {
  // Center of Bihar roughly
  const center: [number, number] = [25.5941, 85.1376]; 

  if (!geoJsonData) return <div className="w-full h-full animate-pulse bg-surface rounded-lg flex items-center justify-center">Loading Map Data...</div>;

  const getDistrictColor = (districtId: string) => {
    // Generate random colors for now to simulate a choropleth
    const colors = ['#FF6B00', '#003366', '#008000', '#19AAED', '#0000FF'];
    return colors[districtId.length % colors.length];
  };

  const style = (feature: any) => {
    return {
      fillColor: getDistrictColor(feature.properties.id),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#fff',
          fillOpacity: 0.9
        });
        layer.bringToFront();
      },
      mouseout: (e: any) => {
        layer.setStyle({
          weight: 1,
          color: 'white',
          fillOpacity: 0.7
        });
      },
      click: () => {
        if (onDistrictClick) {
          onDistrictClick(feature.properties.id);
        }
      }
    });
  };

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-primary relative z-10">
      <MapContainer 
        center={center} 
        zoom={6.5} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        {/* We use a minimalist map tile or just let the GeoJSON fill it */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON 
          data={geoJsonData} 
          style={style} 
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}
