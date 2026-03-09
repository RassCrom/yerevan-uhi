import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

/**
 * BaseMap Component
 * A reusable map template configured for Yerevan with light styling using vanilla maplibre-gl.
 * 
 * @param {boolean} is3D - Whether to tilt the map to 3D.
 * @param {object} initialViewState - Overrides for the starting camera position.
 * @param {string} className - Additional CSS classes for the map container.
 * @param {ReactNode} children - UI Overlays to render on top of the map.
 */
const BaseMap = ({ 
  is3D = false, 
  initialViewState = {},
  className = "",
  children
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Default view state centered on Yerevan
  const defaultViewState = {
    longitude: 44.5152,
    latitude: 40.1872,
    zoom: 11,
    pitch: is3D ? 60 : 0,
    bearing: is3D ? 15 : 0
  };

  const viewState = { ...defaultViewState, ...initialViewState };
  const mapStyle = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      pitch: viewState.pitch,
      bearing: viewState.bearing,
      interactive: true,
      attributionControl: false,
    });

    map.current.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
        showCompass: is3D,
      }),
      'bottom-right'
    );

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync is3D prop changes
  useEffect(() => {
    if (!map.current) return;
    map.current.easeTo({
      pitch: is3D ? 60 : 0,
      bearing: is3D ? 15 : 0,
      duration: 1000
    });
  }, [is3D]);

  return (
    <div className={`relative w-full h-[400px] rounded-[var(--radius)] overflow-hidden border border-[var(--color-border)] shadow-sm bg-[var(--color-surface)] ${className}`}>
      
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full absolute inset-0" />
      
      {/* Children for overlays (like floating UI, legends, etc.) */}
      <div className="absolute inset-0 pointer-events-none z-10">
         {children}
      </div>

      {/* Decorative inner shadow to blend with the UI kit */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(26,26,46,0.05)] rounded-[var(--radius)] z-20" />
    </div>
  );
};

export default BaseMap;
