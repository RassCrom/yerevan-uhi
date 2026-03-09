import React from 'react';

const TransformationMap = ({ activeStep }) => {
  // activeStep goes from 0 (1920s) to 4 (2020s)
  // We fade in the modern satellite progressively
  const progress = Math.min(1, activeStep / 4);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--color-bg)]">
      
      {/* Base 1970s Natural Green Satellite Imagery */}
      <img 
        src="/assets/yerevan_1970_satellite.png" 
        alt="Yerevan 1970s Satellite"
        className="absolute inset-0 w-full h-full object-cover z-0 filter saturate-[1.2] brightness-90 transform scale-105"
      />

      {/* Modern 2024 Urban Concrete Satellite Imagery - Fades in */}
      <img 
        src="/assets/yerevan_2024_satellite.png" 
        alt="Yerevan 2024 Satellite"
        className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ease-in-out filter contrast-125 transform scale-105"
        style={{ opacity: progress }}
      />

      {/* Aesthetic color tinting based on era */}
      <div 
        className="absolute inset-0 z-20 transition-colors duration-1000 mix-blend-multiply pointer-events-none"
        style={{ 
          backgroundColor: `rgba(255, 127, 80, ${progress * 0.2})`, // Tint warmer/coral gradually
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)" // Vignette
        }}
      />

      {/* Satellite Imagery Origin Tag */}
      <div className="absolute top-8 left-8 z-30 opacity-70 font-mono text-white pointer-events-none drop-shadow-md">
        <p className="text-xl font-bold uppercase tracking-widest">{activeStep >= 3 ? '2024 Sentinel-2 Data' : '1970 Landsat Data'}</p>
        <p className="text-xs tracking-wider opacity-80 mt-1 uppercase">Automated Land Cover Classification</p>
      </div>

    </div>
  );
};

export default TransformationMap;
