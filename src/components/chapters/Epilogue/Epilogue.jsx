import React from 'react';

const Epilogue = () => {
  return (
    <section 
      id="epilogue" 
      className="min-h-screen w-full bg-[var(--color-ink)] flex flex-col justify-center items-center py-32 px-6 relative border-t border-[var(--color-border)] overflow-hidden"
    >
      {/* Dark mode background decoration for dramatic effect */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none flex justify-center items-center">
         <div className="w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-[radial-gradient(circle_at_center,_var(--color-teal)_0%,_transparent_50%)] blur-[100px] opacity-30" />
      </div>

      <div className="max-w-[var(--content-narrow)] mx-auto w-full z-10 text-center flex flex-col items-center">
        
        <h2 className="font-display text-5xl md:text-7xl font-bold text-[var(--color-surface)] tracking-tight mb-8">
          Return to balance
        </h2>
        
        <div className="font-body text-xl md:text-2xl text-[var(--color-surface)]/80 leading-relaxed space-y-8 font-light max-w-2xl">
          <p>
          </p>
          <p className="text-[var(--color-gold)] font-medium">
          </p>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-20 px-8 py-4 border border-[var(--color-surface)]/30 rounded-full font-mono text-sm tracking-widest text-[var(--color-surface)] uppercase hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)] transition-colors duration-300"
        >
          Return to beginning
        </button>

      </div>
    </section>
  );
};

export default Epilogue;