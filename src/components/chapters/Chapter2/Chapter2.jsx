import React, { useState, useMemo } from 'react';
import * as Slider from '@radix-ui/react-slider';
import TopographyMap from './TopographyMap';
import ClimatePanel from './ClimatePanel';
import { interpolateClimateData } from './historicalData';

const Chapter2 = () => {
  const [currentYear, setCurrentYear] = useState(1950);
  const [activeMetric, setActiveMetric] = useState('temp'); // temp, precip, sunshine

  // Memoize the interpolated data so it recalculates smoothly as the slider drags
  const climateData = useMemo(() => interpolateClimateData(currentYear), [currentYear]);

  return (
    <section id="chapter2" className="relative w-full h-[150vh] bg-[var(--color-bg)] flex flex-col pointer-events-auto z-20">
      
      {/* Sticky fullscreen layer containing Map + UI */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Background 3D Map */}
        <TopographyMap  
          vegetationDensity={climateData.vegetationDensity} 
        />

        {/* Main UI Overlay Container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
          
          {/* Top Header */}
          <div className="w-full flex justify-between items-start pointer-events-none">
            <div className="max-w-2xl mt-12 md:mt-16">
              <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-ink)] tracking-tight drop-shadow-md">
                Before the Concrete
              </h2>
              <p className="font-body text-base md:text-xl text-[var(--color-ink)] mt-4 font-medium leading-relaxed max-w-lg shadow-sm bg-[var(--color-surface)]/80 backdrop-blur-md p-4 rounded-[var(--radius)] pointer-events-auto">
                Yerevan sits in a natural bowl surrounded by mountains. Explore how rapid urbanization has stripped the valley's natural cooling mechanisms over 70 years.
              </p>
            </div>
          </div>

          {/* Center-Left Data Panel */}
          <div className="flex-grow flex items-center justify-start pointer-events-none mt-4 md:mt-0">
              <div className="pointer-events-auto">
                  {/* Metric Toggles */}
                  <div className="flex gap-2 mb-3 ml-2">
                      <button 
                          onClick={() => setActiveMetric('temp')}
                          className={`px-3 py-1.5 shadow-md rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-colors ${activeMetric === 'temp' ? 'bg-[var(--color-coral)] text-white' : 'bg-[var(--color-surface)]/90 text-[var(--color-ink)] hover:bg-[var(--color-surface)]'}`}
                      >
                          Temp
                      </button>
                      <button 
                          onClick={() => setActiveMetric('precip')}
                          className={`px-3 py-1.5 shadow-md rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-colors ${activeMetric === 'precip' ? 'bg-[var(--color-teal)] text-white' : 'bg-[var(--color-surface)]/90 text-[var(--color-ink)] hover:bg-[var(--color-surface)]'}`}
                      >
                          Precip
                      </button>
                      <button 
                          onClick={() => setActiveMetric('sunshine')}
                          className={`px-3 py-1.5 shadow-md rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-colors ${activeMetric === 'sunshine' ? 'bg-[#eab308] text-white' : 'bg-[var(--color-surface)]/90 text-[var(--color-ink)] hover:bg-[var(--color-surface)]'}`}
                      >
                          Sun
                      </button>
                  </div>
                  
                  <ClimatePanel climateData={climateData} metric={activeMetric} />
              </div>
          </div>

          {/* Bottom Interactive Timeline Slider */}
          <div className="w-full max-w-4xl mx-auto pb-4 pointer-events-auto">
            <div className="bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] p-6 rounded-2xl shadow-xl flex flex-col gap-4">
              
              <div className="flex justify-between items-center text-[var(--color-ink)] font-mono text-xs md:text-sm font-bold tracking-widest uppercase">
                <span>1950: Natural Baseline</span>
                <span className="text-[var(--color-coral)] text-xl font-display">{currentYear}</span>
                <span>2024: Peak Concrete</span>
              </div>

              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-[40px] z-[100] cursor-pointer"
                value={[currentYear]}
                min={1950}
                max={2024}
                step={1}
                onValueChange={(val) => setCurrentYear(val[0])}
              >
                <Slider.Track className="bg-[var(--color-surface)] relative grow rounded-full h-[8px] overflow-hidden border border-[var(--color-border)]">
                  <Slider.Range className={`absolute rounded-full h-full transition-colors duration-300 ${currentYear > 2000 ? 'bg-[var(--color-coral)]' : 'bg-[var(--color-teal)]'}`} />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-8 h-8 focus:outline-none focus:ring-4 focus:ring-[var(--color-coral)]/30 transition-transform cursor-grab active:cursor-grabbing bg-[var(--color-ink)] rounded-full border-4 border-white shadow-[0_4px_15px_rgba(0,0,0,0.5)] transform -translate-y-[1px]"
                  aria-label="Year"
                />
              </Slider.Root>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Chapter2;