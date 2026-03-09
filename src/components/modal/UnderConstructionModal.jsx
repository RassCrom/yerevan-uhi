import React, { useState, useEffect } from 'react';

const UnderConstructionModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)]/80 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius)] shadow-lg max-w-md w-full p-8 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="w-16 h-16 bg-[var(--color-coral)]/10 rounded-full flex items-center justify-center mb-6 relative z-10">
          <svg className="w-8 h-8 text-[var(--color-coral)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-ink)] mb-3 relative z-10">
          Under Construction
        </h2>
        
        <p className="font-body text-[var(--color-ink)]/70 mb-8 max-w-[280px] relative z-10">
          Yerevan's Urban Heat Island storytelling is currently being developed and not ready for production.
        </p>

        <button 
          onClick={() => setIsOpen(false)}
          className="w-full bg-[var(--color-teal)] hover:bg-[var(--color-teal)]/90 text-[var(--color-bg)] font-mono text-sm tracking-widest uppercase py-4 px-6 rounded-[var(--radius)] transition-colors duration-300 relative z-10 font-bold"
        >
          Proceed Anyway
        </button>
      </div>
    </div>
  );
};

export default UnderConstructionModal;
