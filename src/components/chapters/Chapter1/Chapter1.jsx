import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CityMap from './CityMap';
import CharacterCard from './CharacterCard';
import { STORY_STEPS } from './storyData';

gsap.registerPlugin(ScrollTrigger);

const CHARACTERS = {
  arman: {
    name: 'Arman',
    age: 34,
    city: 'Yerevan',
    occupation: 'Office Worker',
    location: 'Dense central district with little vegetation. Spends time navigating concrete sidewalks and asphalt crossings.',
    exposure: 'high'
  },
  anna: {
    name: 'Anna',
    age: 32,
    city: 'Vienna',
    occupation: 'Graphic Designer',
    location: 'Neighborhood near a park. Benefits from mature tree canopies and permeable surfaces along her commute.',
    exposure: 'moderate'
  }
};

const EnvironmentalPanel = ({ data, city }) => {
  if (!data) return null;
  const isExtreme = data.exposure === 'high' || data.exposure === 'extreme';

  return (
    <div className="bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-[var(--radius)] p-4 shadow-xl pointer-events-auto transition-transform duration-300 w-full max-w-[280px]">
       <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 mb-3">
         <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)]">Live Data</span>
         <span className={`font-display text-sm font-bold tracking-wider ${city === 'yerevan' ? 'text-[var(--color-coral)]' : 'text-[var(--color-teal)]'}`}>
           {data.locationName}
         </span>
       </div>
       <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-[2px]">Air Temp</span>
            <span className="font-display text-lg font-bold text-[var(--color-ink)] leading-none">{data.airTemp}</span>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-[2px]">Surf Temp</span>
            <span className={`font-display text-lg font-bold leading-none ${isExtreme ? 'text-[var(--color-coral)]' : 'text-[var(--color-ink)]'}`}>{data.surfaceTemp}</span>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-[2px]">Humidity</span>
            <span className="font-body text-xs font-semibold text-[var(--color-ink)]">{data.humidity}</span>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-[2px]">Shade</span>
            <span className={`font-body text-xs font-semibold uppercase ${data.shade === 'High' ? 'text-[var(--color-teal)]' : 'text-[var(--color-ink)]'}`}>{data.shade}</span>
          </div>
       </div>

       <div className="flex justify-between items-end border-t border-[var(--color-border)] pt-2 mt-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] font-bold">Heat Exps.</span>
          <span className={`font-body text-xs font-black uppercase tracking-wider ${isExtreme ? 'text-[var(--color-coral)]' : 'text-[var(--color-teal)]'}`}>
             {data.exposure}
          </span>
       </div>
    </div>
  );
};

const Chapter1 = () => {
  const scrollTrackerRef = useRef(null);
  
  const [activeStep, setActiveStep] = useState(0);
  const [showCharacterInfo, setShowCharacterInfo] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Setup GSAP ScrollTrigger to divide the container into 6 sections
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrackerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // Progress is 0 to 1. We have 6 steps (0 through 5).
          const stepIndex = Math.min(
            5, 
            Math.max(0, Math.floor(self.progress * STORY_STEPS.length))
          );
          
          setActiveStep(stepIndex);
          setScrollProgress(self.progress);

          if (self.progress > 0.05 && !hasScrolled) {
            setHasScrolled(true);
            setShowCharacterInfo(false); // Auto-hide character info when starting to scroll
          }
        }
      }
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [hasScrolled]);

  return (
    <section id="chapter1" ref={scrollTrackerRef} className={`relative w-full h-[600vh] bg-[var(--color-bg)] z-10 transition-opacity duration-700 ${activeStep === 5 && scrollProgress > 0.99 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Sticky Fullscreen Container */}
      <div className={`sticky top-0 h-screen w-full overflow-hidden flex z-0 pointer-events-auto transition-opacity duration-700 ${activeStep === 5 && scrollProgress > 0.99 ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Top-Left Controls */}
        <div className="absolute top-6 left-6 md:top-8 md:left-10 z-[100] flex gap-4 pointer-events-auto">
           <button
             onClick={() => setShowCharacterInfo(!showCharacterInfo)}
             className={`px-4 py-2 backdrop-blur-md rounded-full font-mono text-xs md:text-sm font-bold uppercase tracking-widest shadow-sm transition-all duration-300 hover:scale-105 border ${
               showCharacterInfo 
                 ? 'bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)]'
                 : 'bg-[var(--color-surface)]/80 text-[var(--color-ink)] border-[var(--color-border)] hover:bg-[var(--color-surface)]'
             }`}
           >
             {showCharacterInfo ? 'Hide Personas' : 'Show Personas'}
           </button>
        </div>

        {/* Narrative Header overlaying the map (Top Center) */}
        <div className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 z-30 w-full px-6 flex flex-col items-center text-center drop-shadow-lg pointer-events-none">
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-surface)] tracking-tight transition-opacity duration-500" style={{ opacity: showCharacterInfo ? 1 : 0.4 }}>
            Two Cities, One Summer Day
          </h2>
          
          {/* Time of Day Indicator */}
          <div className="mt-6 px-6 py-3 bg-[var(--color-ink)]/80 backdrop-blur-sm rounded-full border border-[var(--color-surface)]/20 shadow-xl pointer-events-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-teal)] font-bold mr-3">
              Time
            </span>
            <span className="font-display text-xl md:text-2xl font-bold text-[var(--color-surface)] tracking-wide transition-all duration-300">
              {STORY_STEPS[activeStep].timeOfDay}
            </span>
          </div>

          <p className="font-body text-base md:text-lg text-[var(--color-bg)] max-w-xl mt-6 font-medium leading-relaxed bg-[var(--color-ink)]/60 backdrop-blur-sm p-4 rounded-[var(--radius)]">
            {STORY_STEPS[activeStep].description}
          </p>
        </div>

        {/* Yerevan Side (Left) */}
        <div className="relative w-1/2 h-full border-r-2 border-[var(--color-surface)]/50 pointer-events-none">
          <CityMap city="yerevan" activeStep={activeStep} />
          
          {/* Bottom Containers */}
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex justify-center z-20 px-4 transition-all duration-500 transform">
            {/* Character Info */}
            <div className={`absolute bottom-0 w-full max-w-[400px] transition-all duration-500 origin-bottom pointer-events-auto ${showCharacterInfo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none hidden'}`}>
              <CharacterCard character={{ ...CHARACTERS.arman, stats: STORY_STEPS[activeStep].yerevan }} />
            </div>

            {/* Live Data Panel (Visible when Character Info is hidden) */}
            <div className={`absolute bottom-0 w-full max-w-[280px] transition-all duration-500 pointer-events-auto ${!showCharacterInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <EnvironmentalPanel data={STORY_STEPS[activeStep].yerevan} city="yerevan" />
            </div>
          </div>
        </div>

        {/* Vienna Side (Right) */}
        <div className="relative w-1/2 h-full pointer-events-none">
          <CityMap city="vienna" activeStep={activeStep} />
          
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex justify-center z-20 px-4 transition-all duration-500 transform">
            {/* Character Info */}
            <div className={`absolute bottom-0 w-full max-w-[400px] transition-all duration-500 origin-bottom pointer-events-auto ${showCharacterInfo ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none hidden'}`}>
              <CharacterCard character={{ ...CHARACTERS.anna, stats: STORY_STEPS[activeStep].vienna }} />
            </div>

            {/* Live Data Panel */}
            <div className={`absolute bottom-0 w-full max-w-[280px] transition-all duration-500 pointer-events-auto ${!showCharacterInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <EnvironmentalPanel data={STORY_STEPS[activeStep].vienna} city="vienna" />
            </div>
          </div>
        </div>

        {/* Center divider timeline/aesthetic line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[var(--color-surface)] to-transparent opacity-80 z-20 shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none" />
      
      </div>
    </section>
  );
};

export default Chapter1;