import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransformationMap from './TransformationMap';
import TransformationCharts from './TransformationCharts';
import { MILESTONES, TIMELINE_DATA } from './transformationData';
import { Howl } from 'howler';

gsap.registerPlugin(ScrollTrigger);

const Chapter3 = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const soundRef = useRef(null);

  useEffect(() => {
    // Setup Audio
    soundRef.current = new Howl({
      src: ['#'], // Placeholder for audio/construction_noise.mp3
      loop: true,
      volume: 0,
    });
    // soundRef.current.play(); // Uncomment when actual file exists

    // Setup GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const stepCount = MILESTONES.length;
          const currentStep = Math.min(
            stepCount - 1,
            Math.max(0, Math.floor(self.progress * stepCount))
          );
          setActiveStep(currentStep);

          // Audio fade in as progress approaches end
          if (soundRef.current) {
             soundRef.current.volume(self.progress * 0.5);
          }
        }
      }
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, []);

  return (
    <section id="chapter3" ref={containerRef} className="relative w-full h-[500vh] bg-[var(--color-bg)]">
      
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex z-0 pointer-events-auto">
        
        {/* Background / Left Side: Map & Satellite */}
        <div className="absolute inset-0 z-0">
           <TransformationMap activeStep={activeStep} milestones={MILESTONES} />
        </div>

        {/* Foreground / Right Side: Narrative & Charts */}
        <div className="relative z-10 w-full h-full flex items-center justify-end px-6 md:px-12 pointer-events-none">
           <div className="w-full max-w-xl flex flex-col gap-6 h-[90vh] pb-10">
              
              {/* Header */}
              <div className="pointer-events-auto mt-6 md:mt-10">
                <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-ink)] tracking-tight drop-shadow-md bg-[var(--color-surface)]/80 backdrop-blur-md rounded-2xl p-4 md:p-6 inline-block">
                  The Transformation
                </h2>
                <p className="font-body text-base md:text-xl text-[var(--color-ink)] mt-4 font-medium leading-relaxed bg-[var(--color-surface)]/80 backdrop-blur-md p-4 rounded-[var(--radius)]">
                  Yerevan's transformation from a regional city to a sprawling metropolis happened remarkably quickly.
                </p>
              </div>

              {/* Scrollable Milestone Card */}
              <div className="flex-1 overflow-y-auto mt-4 pointer-events-auto hide-scrollbar">
                 <div className="bg-[var(--color-ink)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-2xl text-[var(--color-surface)] transition-all duration-500">
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-coral)] font-bold">
                       {MILESTONES[activeStep].decade}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mt-2">
                       {MILESTONES[activeStep].title}
                    </h3>
                    <p className="font-body text-sm md:text-base mt-4 text-[var(--color-surface)]/80 leading-relaxed">
                       {MILESTONES[activeStep].description}
                    </p>
                 </div>
              </div>

              {/* Charts Panel */}
              <div className="h-[45vh] w-full pointer-events-auto">
                 <TransformationCharts 
                   activeStep={activeStep} 
                   milestones={MILESTONES} 
                   data={TIMELINE_DATA} 
                 />
              </div>

           </div>
        </div>

      </div>

    </section>
  );
};

export default Chapter3;