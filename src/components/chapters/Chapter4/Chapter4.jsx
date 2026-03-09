import React, { useState, useEffect } from 'react';
import GlobeMap from '../../map/GlobeMap';

const Chapter4 = () => {
  const [activeFact, setActiveFact] = useState(0);

  const facts = [
    {
      title: "Sunshine Capital",
      value: "2,700+",
      unit: "Hours/Year",
      description: "Yerevan naturally absorbs massive amounts of solar radiation annually, intensifying the Urban Heat Island effect significantly."
    },
    {
      title: "Daily Average",
      value: "7.5",
      unit: "Hours/Day",
      description: "Compared to cities like Paris (4.7h) or London (4.5h), Yerevan's constant sun exposure bakes its concrete infrastructure."
    },
    {
      title: "Heat Retention",
      value: "3-5°C",
      unit: "Warmer",
      description: "The city center, with its dense tuff and basalt buildings, retains the day's solar heat long into the night."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [facts.length]);

  return (
    <section 
      id="chapter4" 
      className="min-h-screen w-full bg-[var(--color-bg)] flex flex-col justify-center items-center py-24 px-6 relative border-t border-[var(--color-border)]"
    >
      <div className="max-w-[var(--content-max)] mx-auto w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Globe Visualization */}
        <div className="w-full flex-1">
          <GlobeMap />
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-mono text-sm text-[var(--color-teal)] uppercase tracking-widest">Chapter 4</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-ink)] tracking-tight">
            The Solar Challenge
          </h2>
          <div className="font-body text-lg text-[var(--color-ink)]/80 leading-relaxed border-l-2 border-[var(--color-coral)] pl-6 space-y-4">
            <p>
              Before implementing cooling strategies, we must understand the primary heat source. 
              Yerevan is famous for its bright, sun-drenched days, but this geographical asset 
              becomes a liability in a dense urban environment.
            </p>
          </div>
          
          {/* Dynamic Facts Carousel */}
          <div className="mt-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] p-6 relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-coral)] transition-all duration-300"></div>
            
            <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-widest mb-4">Solar Heat Factors</p>
            
            <div className="min-h-[140px] flex flex-col justify-center">
              <div 
                key={activeFact} 
                className="animate-fade-in-up"
              >
                <h3 className="font-display text-xl font-bold text-[var(--color-ink)] mb-1">
                  {facts[activeFact].title}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-mono text-4xl font-bold text-[var(--color-coral)]">
                    {facts[activeFact].value}
                  </span>
                  <span className="font-mono text-sm text-[var(--color-ink)]/60 uppercase">
                    {facts[activeFact].unit}
                  </span>
                </div>
                <p className="font-body text-sm text-[var(--color-ink)]/80 leading-relaxed">
                  {facts[activeFact].description}
                </p>
              </div>
            </div>
            
            {/* Fact Indicators */}
            <div className="flex gap-2 mt-4">
              {facts.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveFact(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeFact ? 'w-6 bg-[var(--color-coral)]' : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-coral)]/50'
                  }`}
                  aria-label={`Show fact ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h4 className="font-display text-lg font-bold text-[var(--color-ink)] mb-4">Mitigation Strategies</h4>
            <ul className="grid grid-cols-2 gap-4">
              <li className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink)] uppercase">
                <span className="w-2 h-2 rounded-full bg-[var(--color-teal)]" />
                Green Roofs
              </li>
              <li className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink)] uppercase">
                <span className="w-2 h-2 rounded-full bg-[var(--color-teal)]" />
                Cool Pavements
              </li>
              <li className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink)] uppercase">
                <span className="w-2 h-2 rounded-full bg-[var(--color-teal)]" />
                Urban Canopies
              </li>
              <li className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink)] uppercase">
                <span className="w-2 h-2 rounded-full bg-[var(--color-teal)]" />
                Water Corridors
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Chapter4;