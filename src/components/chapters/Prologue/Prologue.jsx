import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Howl } from 'howler';

gsap.registerPlugin(ScrollTrigger);

const HEAT_DATA = [
  { year: 1990, temp: 25.0, imageId: '/public/lst_1990.png' },
  { year: 2000, temp: 28.0, imageId: '/public/lst_2000.png' },
  { year: 2010, temp: 31.0, imageId: '/public/lst_2010.png' },
  { year: 2020, temp: 34.0, imageId: '/public/lst_2020.png' },
  { year: 2025, temp: 35.8, imageId: '/public/lst_2025.png' },
];

const Prologue = () => {
  const containerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const textRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const soundRef = useRef(null);
  const activeSound = useRef(false);

  useEffect(() => {
    // Slideshow interval
    const interval = setInterval(() => {
      setCurrentIdx((prev) => {
        const next = (prev + 1) % HEAT_DATA.length;
        // Update sound volume based on temperature
        if (soundRef.current && activeSound.current) {
          // Map index [0..4] to volume [0.2..1.0]
          const volume = 0.2 + (next / (HEAT_DATA.length - 1)) * 0.8;
          soundRef.current.volume(volume);
        }
        return next;
      });
    }, 2000); // 2 seconds per slide

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Init Audio (Placeholder city noise)
    soundRef.current = new Howl({
      // We'll use a public domain city traffic sound as placeholder
      src: ['https://actions.google.com/sounds/v1/water/crashing_waves.ogg'], // Replace. City sounds: 'https://actions.google.com/sounds/v1/environments/city_street_with_traffic.ogg' maybe? actually this one exists:
      loop: true,
      volume: 0, // Base volume
    });
    
    // We update src just in case
    soundRef.current.unload();
    soundRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=city-traffic-outdoor-6414.mp3'], // Pixabay free sound
      html5: true, // For streaming
      loop: true,
      volume: 0,
    });

    const enableAudio = () => {
      if (!activeSound.current) {
        soundRef.current.play();
        activeSound.current = true;
      }
      window.removeEventListener('scroll', enableAudio);
      window.removeEventListener('click', enableAudio);
    };

    window.addEventListener('scroll', enableAudio, { once: true });
    window.addEventListener('click', enableAudio, { once: true });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      window.removeEventListener('scroll', enableAudio);
      window.removeEventListener('click', enableAudio);
    };
  }, []);

  useEffect(() => {
    // GSAP Scroll Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      }
    });

    // Fade out map
    tl.to(mapContainerRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      duration: 1,
    }, 0);

    // Crawl text up
    tl.fromTo(textRef.current, {
      y: 150,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
    }, 0);

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <section 
      id="prologue" 
      ref={containerRef}
      className="min-h-[200vh] w-full relative bg-[var(--color-bg)]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Heatmap Slideshow */}
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 w-full h-full"
        >
          {HEAT_DATA.map((data, idx) => (
            <div 
              key={data.year}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{
                backgroundColor: 'var(--color-bg)',
              }}
            >
              {/* Image Placeholder */}
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-[2000ms]"
                style={{ 
                  backgroundImage: `url(${data.imageId})`,
                  transform: idx === currentIdx ? 'scale(.65)' : 'scale(.5)',
                }}
              />
            </div>
          ))}

          {/* Vignette effect (Edges fade to bg color) */}
          <div 
            className="absolute z-20 inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 20%, var(--color-bg) 90%)'
            }}
          ></div>

          {/* Information Overlay */}
          <div className="absolute top-10 right-10 flex flex-col items-end text-[var(--color-ink)] z-30 drop-shadow-md">
             <div className="font-display text-7xl font-bold tracking-tighter" style={{ color: 'var(--color-coral)' }}>
               {HEAT_DATA[currentIdx].year}
             </div>
             <div className="font-mono text-4xl font-semibold mt-2">
               {HEAT_DATA[currentIdx].temp.toFixed(1)}°C
             </div>
             <div className="font-sans text-sm mt-2 text-[var(--color-muted)] uppercase tracking-widest font-bold">
                Avg. Land Surface Temperature
             </div>
          </div>
        </div>

        {/* Scroll Reveal Text */}
        <div ref={textRef} className="z-40 px-6 max-w-[var(--content-narrow)] text-center">
           <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--color-coral)] leading-tight drop-shadow-sm">
             Do you like deep fried eggs? <br/>
             <span className="text-[var(--color-ink)] block mt-6 text-3xl md:text-4xl lg:text-5xl font-medium">Every 10 years Yerevan is heating by 3 degrees.</span>
           </h2>
        </div>

      </div>
    </section>
  );
};

export default Prologue;