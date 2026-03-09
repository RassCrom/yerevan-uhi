import React from 'react';

const navLinks = [
  { id: 'prologue', title: 'Prologue' },
  { id: 'chapter1', title: 'Chapter 1' },
  { id: 'chapter2', title: 'Chapter 2' },
  { id: 'chapter3', title: 'Chapter 3' },
  { id: 'chapter4', title: 'Chapter 4' },
  { id: 'chapter5', title: 'Chapter 5' },
  { id: 'epilogue', title: 'Epilogue' },
];

const Footer = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[var(--color-ink)] text-[var(--color-bg)] overflow-hidden pt-24 md:pt-32 pb-12 border-t border-[var(--color-border)]">
      {/* Decorative Heat Map Background Elements */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute bottom-[-20%] left-[-10%] w-[80%] md:w-[60%] h-[100%] bg-[radial-gradient(circle_at_bottom_left,_var(--color-coral)_0%,_transparent_60%)] blur-[100px]" />
        <div className="absolute top-0 right-0 w-[50%] h-[80%] bg-[radial-gradient(ellipse_at_top_right,_var(--color-teal)_0%,_transparent_50%)] blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-[var(--content-max)] mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 mb-20 md:mb-32">
          
          {/* Brand / Storytelling Intro */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col items-start">
            <h3 className="font-display text-4xl md:text-5xl font-black uppercase leading-[0.9] text-[var(--color-surface)] mb-4 tracking-tight">
              Yerevan's<br/>
              <span className="text-[var(--color-bg)] drop-shadow-[0_0_15px_var(--color-coral)]">Heat</span><br/>
              Island
            </h3>
            <p className="font-body text-sm md:text-base text-[var(--color-bg)]/70 leading-relaxed border-l-2 border-[var(--color-coral)] pl-4 max-w-sm mt-4">
              A deep dive into the thermal dynamics of one of the world's oldest continuously inhabited cities. Data-driven storytelling for urban resilience.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2 md:col-start-7 lg:col-start-7">
            <h4 className="font-display text-lg font-bold uppercase tracking-widest text-[var(--color-gold)] mb-6">Directory</h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="group relative text-left font-body text-sm md:text-base text-[var(--color-bg)]/80 hover:cursor-pointer hover:text-[var(--color-coral)] transition-colors duration-300 flex items-center gap-2 w-fit"
                >
                  <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--color-teal)] text-xs">✦</span>
                  {link.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-coral)] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
          </div>

          {/* Credits / Data */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3 flex flex-col gap-10">
            <div>
              <h4 className="font-display text-lg font-bold uppercase tracking-widest text-[var(--color-teal)] mb-6">Authors</h4>
              <ul className="flex flex-col gap-2 font-body text-sm text-[var(--color-bg)]/80">
                <li className="normal-case tracking-normal">Data Visualisation — Beisenbayev Alikhan</li>
                <li className="normal-case tracking-normal">Data collection — <a href="https://www.linkedin.com/in/tolegen-akynzhanov/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-coral)] transition-colors duration-300">Akinzhanov Tolegen</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg font-bold uppercase tracking-widest text-[var(--color-teal)] mb-6">Data Sources</h4>
              <ul className="flex flex-col gap-2 font-body text-sm text-[var(--color-bg)]/80">
                <li className="normal-case tracking-normal">Landsat 8 — Surface Temperature</li>
                <li className="normal-case tracking-normal"><a href="https://www.mdpi.com/2073-4433/15/4/473" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-coral)] transition-colors duration-300">Improvement in the Adaptation and Resilience of the Green Areas of Yerevan City to Climate–Ecological Challenges</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Thanks and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 pt-8 border-t border-[var(--color-bg)]/20">
          {/* <div className="text-center md:text-left">
            <h5 className="font-body text-xs font-bold uppercase tracking-widest text-[var(--color-bg)]/50 mb-2">Special Thanks</h5>
            <p className="font-body text-xs text-[var(--color-bg)]/70 max-w-md">
              Generous support provided by the Urban Resilience Grant. Thanks to the community science volunteers who deployed mobile sensors during the August heatwave.
            </p>
          </div> */}
          
          <div className="text-center md:text-right font-mono text-[10px] uppercase tracking-widest text-[var(--color-bg)]/40">
            <p>© {new Date().getFullYear()} Yerevan Heat Island Project</p>
            {/* <p className="mt-1">Built for a cooler future</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;