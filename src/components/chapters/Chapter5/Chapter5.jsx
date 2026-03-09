import React from 'react';

const Chapter5 = () => {
  return (
    <section 
      id="chapter5" 
      className="min-h-screen w-full bg-[var(--color-surface)] flex flex-col justify-center items-center py-24 px-6 relative border-t border-[var(--color-border)]"
    >
      <div className="max-w-[var(--content-narrow)] mx-auto w-full z-10 text-center flex flex-col items-center">
        
        <p className="font-mono text-sm text-[var(--color-teal)] uppercase tracking-widest mb-4">Chapter 5</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-[var(--color-ink)] tracking-tight mb-8">
          A greener future
        </h2>
        
        <div className="font-body text-lg text-[var(--color-ink)]/80 leading-relaxed space-y-6">
          <p>
            The path forward demands a fundamental shift in how we build and maintain our city.
            Implementing data-driven green corridors could reverse the warming trend.
          </p>
          
          <div className="w-full h-80 border-2 border-dashed border-[var(--color-teal)]/30 rounded-lg flex flex-col items-center justify-center bg-[var(--color-bg)] mt-12 relative overflow-hidden p-6 group">
            <h3 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-coral)] mb-4 transition-transform group-hover:scale-105 duration-500">
               Interactive Simulation
            </h3>
            <span className="font-mono text-sm text-[var(--color-ink)] uppercase tracking-widest">
               Drag slider to plant trees
            </span>
            <div className="absolute inset-x-0 bottom-0 h-2 bg-[var(--color-border)]" />
            <div className="absolute left-0 bottom-0 h-2 bg-[var(--color-teal)] w-1/3 transition-all duration-1000 ease-in-out group-hover:w-2/3" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Chapter5;