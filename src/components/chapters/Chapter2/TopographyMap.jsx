import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const TopographyMap = ({ vegetationDensity = 0.2 }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    // Initialize MapLibre GL JS centered on Yerevan Valley
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [44.5152, 40.1872],
      zoom: 11.5,
      minZoom: 10,
      maxBounds: [
        [44.3, 40.0], // Southwest bounds
        [44.7, 40.3]  // Northeast bounds
      ],
      pitch: 65, // High pitch for 3D effect
      bearing: -20, // Looking towards Mt. Ararat
      interactive: true,
      maxPitch: 85,
    });

    map.current.on('style.load', () => {
      // Add a 3D terrain source (Using Mapzen/Terrarium as a placeholder if Mapbox DEM isn't available)
      // Since MapLibre requires a specific DEM format, we'll simulate topography with 3D buildings and styling
      // to keep it performant without external paid API keys.
      
      map.current.addLayer({
        'id': '3d-buildings',
        'source': 'carto',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 13,
        'paint': {
          'fill-extrusion-color': '#e0e0e0',
          'fill-extrusion-height': ['get', 'render_height'],
          'fill-extrusion-base': ['get', 'render_min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-[150vh]">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full grayscale mix-blend-multiply opacity-80" />
      
      {/* Dynamic Vegetation Overlay controlled by the slider */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-in-out mix-blend-color"
        style={{ 
          backgroundColor: 'var(--color-teal)', 
          opacity: vegetationDensity * 0.6 // Scales down from 0.8 (1950) to 0.2 (2024)
        }}
      />
      
      {/* Concrete Expansion Overlay (grows as vegetation drops) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-in-out mix-blend-multiply"
        style={{ 
          backgroundColor: 'var(--color-surface)', 
          opacity: (1 - vegetationDensity) * 0.4
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 150px rgba(0,0,0,0.5)' }}
      />
    </div>
  );
};

export default TopographyMap;
