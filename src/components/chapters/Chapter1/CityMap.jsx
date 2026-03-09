import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { STORY_STEPS } from './storyData';

const CityMap = ({ city, activeStep }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);

  const configs = {
    yerevan: {
      center: [44.5152, 40.1872],
      zoom: 14.5,
      pitch: 60,
      bearing: 25,
      baseColor: 'var(--color-ink)',
      heatOverlay: 'var(--color-coral)',
      opacity: 0.35,
    },
    vienna: {
      center: [16.3738, 48.2082],
      zoom: 14.5,
      pitch: 60,
      bearing: -15,
      baseColor: 'var(--color-surface)',
      heatOverlay: 'var(--color-teal)',
      opacity: 0.25,
    }
  };

  const config = configs[city] || configs.yerevan;
  const mapStyle = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

  useEffect(() => {
    if (map.current) return; // Initialize once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: STORY_STEPS[0][city].coords,
      zoom: config.zoom + 1, // Start slightly closer
      pitch: config.pitch,
      bearing: config.bearing,
      interactive: false, // Narrative section, no scrolling the map itself
      attributionControl: false,
    });

    const el = document.createElement('div');
    el.className = 'w-4 h-4 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-ink)] shadow-md transition-all duration-300';
    if(city === 'yerevan') el.style.backgroundColor = 'var(--color-coral)';
    if(city === 'vienna') el.style.backgroundColor = 'var(--color-teal)';

    markerRef.current = new maplibregl.Marker({ element: el })
      .setLngLat(STORY_STEPS[0][city].coords)
      .addTo(map.current);

    map.current.on('style.load', () => {
      // Add a line source to trace the path
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [STORY_STEPS[0][city].coords]
          }
        }
      });

      map.current.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': city === 'yerevan' ? '#ff6b6b' : '#2b8a3e', // Coral or tealish
          'line-width': 4,
          'line-opacity': 0.8,
          'line-dasharray': [1, 2] // Dotted line style representing walking path
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync Camera and Route when activeStep changes
  useEffect(() => {
    if (!map.current) return;

    const targetData = STORY_STEPS[activeStep][city];
    
    // Fly to new location
    map.current.flyTo({
      center: targetData.coords,
      zoom: config.zoom + 1.5, // Slightly varied zoom for cinematic effect
      speed: 0.8,
      curve: 1.5,
      essential: true
    });

    // Move marker
    if (markerRef.current) {
      markerRef.current.setLngLat(targetData.coords);
    }

    // Update Route Line Data (collect coordinates up to activeStep)
    const activeRouteCoordinates = STORY_STEPS.slice(0, activeStep + 1).map(step => step[city].coords);
    if (map.current.getSource('route')) {
      map.current.getSource('route').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: activeRouteCoordinates
        }
      });
    }

  }, [activeStep, city, config.zoom]);

  // Determine dynamic lighting based on time of day (activeStep)
  const getLightingFilter = () => {
    if (activeStep <= 1) return `brightness(1.1) contrast(1.1)`; // Morning/Late Morning
    if (activeStep === 2 || activeStep === 3) return `brightness(1.2) contrast(1.3)`; // Midday/Afternoon intense sun
    if (activeStep === 4) return `brightness(0.9) contrast(1.1)`; // Evening
    if (activeStep === 5) return `brightness(0.6) contrast(1.2)`; // Night
    return 'contrast(1.0)';
  };

  const getHeatHazeOpacity = () => {
    if (city === 'vienna') return 0; // Vienna stays cool
    if (activeStep === 1) return 0.2;
    if (activeStep === 2 || activeStep === 3) return 0.5; // Peak heat
    if (activeStep === 4) return 0.4; // Still hot evening (UHI)
    if (activeStep === 5) return 0.3; // Retained heat at night
    return 0.1;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--color-bg)] transition-all duration-1000 ease-in-out">
      
      {/* Container for the map */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full grayscale mix-blend-multiply opacity-70 transition-all duration-[2000ms] ease-in-out"
        style={{ filter: getLightingFilter() }}
      />
      
      {/* Base thermal gradient / Lighting Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-color transition-opacity duration-1000 ease-in-out"
        style={{ 
          backgroundColor: config.heatOverlay, 
          opacity: activeStep === 5 ? config.opacity * 0.5 : config.opacity // Slightly less intense base color at night
        }}
      />
      
      {/* Intense Heat Haze effects (Yerevan specific) */}
      {city === 'yerevan' && (
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-[3000ms] ease-in-out"
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, #ff8a66 0%, transparent 70%)',
            opacity: getHeatHazeOpacity(),
            transform: `scale(${1 + activeStep * 0.1})` // Haze pulses/grows over the day
          }}
        />
      )}
      
      {/* Nighttime / Cool shadows simulation */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms] ease-in-out mix-blend-multiply"
        style={{ 
          background: 'linear-gradient(to bottom right, transparent 20%, #1a1a2e 100%)',
          opacity: activeStep === 5 ? 0.7 : (city === 'vienna' ? 0.2 : 0) // Heavy night shading
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 100px rgba(26,26,46,0.3)' }}
      />
    </div>
  );
};

export default CityMap;
