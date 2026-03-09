import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { usePostHog } from 'posthog-js/react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const posthog = usePostHog();
  const [isOpen, setIsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const sections = [
    { id: 'prologue', title: t('header.prologue'), subtitle: t('header.prologue_sub') },
    { id: 'chapter1', title: t('header.chapter1'), subtitle: t('header.chapter1_sub') },
    { id: 'chapter2', title: t('header.chapter2'), subtitle: t('header.chapter2_sub') },
    { id: 'chapter3', title: t('header.chapter3'), subtitle: t('header.chapter3_sub') },
    { id: 'chapter4', title: t('header.chapter4'), subtitle: t('header.chapter4_sub') },
    { id: 'chapter5', title: t('header.chapter5'), subtitle: t('header.chapter5_sub') },
    { id: 'epilogue', title: t('header.epilogue'), subtitle: t('header.epilogue_sub') },
  ];

  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  // Language Dropdown State
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hy', label: 'HY' },
    { code: 'ru', label: 'RU' }
  ];
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  // Close language dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === i18n.language?.split('-')[0]) || languages[0];

  const handleLanguageSelect = (code) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
    posthog?.capture('language_selected', { language: code });
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    posthog?.capture('theme_toggled', { theme: newTheme });

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent body scroll when menu is open and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLangOpen) setIsLangOpen(false);
        else if (isOpen) setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLangOpen]);

  // Track mouse movements for the dynamic blob
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isOpen) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  const handleScroll = (id) => {
    setIsOpen(false);
    
    // Slight delay to allow menu closing animation to start before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseMenu = (e) => {
     // Close ONLY if clicking directly on the storytelling side
    if (e.target.closest('.storytelling-side') && !e.target.closest('.nav-container')) {
       setIsOpen(false);
    }
  }

  return (
    <>
      {/* Fixed Controls Container */}
      <div className="fixed top-6 md:top-8 right-6 md:right-10 z-[130] flex items-center gap-3 md:gap-4">
        
        {/* Language Dropdown Selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`group w-10 h-10 md:w-12 md:h-12 backdrop-blur-md rounded-full flex items-center justify-center focus:outline-none cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 font-mono text-xs md:text-sm font-bold uppercase tracking-widest ${
              isOpen || isLangOpen
                ? 'bg-[var(--color-bg)]/10 text-[var(--color-bg)] border border-[var(--color-bg)]/20 hover:bg-[var(--color-bg)]/30' 
                : 'bg-[var(--color-surface)]/80 text-[var(--color-ink)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]'
            }`}
            aria-label="Toggle Language Menu"
            aria-expanded={isLangOpen}
          >
            {currentLang.label}
          </button>

          {/* Dropdown Menu */}
          <div 
            className={`absolute top-full mt-2 w-12 md:w-14 bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-border)] rounded-full flex flex-col items-center py-2 gap-2 shadow-lg transition-all duration-300 origin-top transform ${
              isLangOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible pointer-events-none'
            }`}
          >
            {languages.filter(l => l.code !== currentLang.code).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full font-mono text-xs md:text-sm font-bold text-[var(--color-ink)]/70 hover:bg-[var(--color-coral)]/10 hover:text-[var(--color-coral)] transition-colors duration-200"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`group w-10 h-10 md:w-12 md:h-12 backdrop-blur-md rounded-full flex items-center justify-center focus:outline-none cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
            isOpen 
              ? 'bg-[var(--color-bg)]/10 text-[var(--color-bg)] border border-[var(--color-bg)]/20 hover:bg-[var(--color-bg)]/20' 
              : 'bg-[var(--color-surface)]/80 text-[var(--color-ink)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]'
          }`}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
             <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          ) : (
             <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          )}
        </button>

        {/* Floating Toggle Button (Burger) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group w-14 h-14 backdrop-blur-md rounded-full flex flex-col items-center justify-center gap-[6px] focus:outline-none cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${
            isOpen 
              ? 'bg-[var(--color-bg)]/10 border border-[var(--color-bg)]/20 shadow-none hover:bg-[var(--color-bg)]/20' 
              : 'bg-[var(--color-surface)]/80 border border-[var(--color-border)] hover:bg-[var(--color-surface)]'
          }`}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          <span
            className={`block w-8 h-[2px] transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'bg-[var(--color-bg)] translate-y-[8px] rotate-45 group-hover:bg-[var(--color-teal)]' 
                : 'bg-[var(--color-ink)] group-hover:bg-[var(--color-coral)]'
            }`}
          />
          <span
            className={`block w-8 h-[2px] transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'bg-[var(--color-bg)] opacity-0 translate-x-4' 
                : 'bg-[var(--color-ink)] group-hover:bg-[var(--color-coral)]'
            }`}
          />
          <span
            className={`block w-8 h-[2px] transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'bg-[var(--color-bg)] -translate-y-[8px] -rotate-45 group-hover:bg-[var(--color-teal)]' 
                : 'bg-[var(--color-ink)] group-hover:bg-[var(--color-coral)]'
            }`}
          />
        </button>
      </div>

      {/* Full Screen Menu Overlay - Split Layout */}
      <div
        ref={menuRef}
        onClick={handleCloseMenu}
        className={`fixed inset-0 z-[120] bg-[var(--color-surface)] flex flex-col md:flex-row overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        
        {/* Mouse Tracking Soft Gradient Blob */}
        <div 
          className="pointer-events-none absolute w-[400px] h-[400px] rounded-full mix-blend-multiply blur-[100px] bg-[var(--color-coral)]/30 transition-transform duration-500 ease-out z-0 hidden md:block"
          style={{
            transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
            opacity: isOpen ? 1 : 0
          }}
        />

        {/* Navigation Side (Left) */}
        <div 
          className={`nav-container relative w-full md:w-1/2 p-8 pt-24 md:p-12 lg:p-20 flex flex-col justify-center h-full max-h-screen overflow-y-auto transition-transform duration-700 delay-100 ease-[cubic-bezier(0.76,0,0.24,1)] z-10 ${
            isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-12 md:translate-y-0 md:-translate-x-24'
          }`}
        >
          {/* Decorative Animated Gradient Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 md:opacity-40">
            <div 
              className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-teal)_0%,_transparent_70%)] blur-[80px] md:blur-[120px] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-100 ${
                isOpen ? 'scale-100 translate-x-0 opacity-100' : 'scale-50 -translate-x-20 opacity-0'
              }`} 
            />
            <div 
              className={`absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)] blur-[70px] md:blur-[100px] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] delay-300 ${
                isOpen ? 'scale-100 translate-y-0 opacity-60' : 'scale-50 translate-y-20 opacity-0'
              }`} 
            />
          </div>

          <nav className="flex flex-col items-start gap-6 md:gap-8 w-full max-w-md mx-auto relative z-10">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={(e) => {
                   e.stopPropagation();
                   handleScroll(section.id)
                }}
                className={`group relative flex flex-col items-start text-start w-full transition-all duration-500 ease-out active:scale-[0.98] ${
                  isOpen 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-12'
                } hover:cursor-pointer`}
                style={{ transitionDelay: `${isOpen ? index * 80 + 200 : 0}ms` }}
              >
                <span className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-coral)]">
                  {section.title}
                </span>
                <span className="font-body text-xs md:text-sm text-[var(--color-muted)] mt-1 uppercase tracking-widest transition-colors duration-300 group-hover:text-[var(--color-teal)]">
                  {section.subtitle}
                </span>
                
                {/* Custom animated underline */}
                <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-[var(--color-coral)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
              </button>
            ))}
          </nav>
        </div>

        {/* Storytelling Visual Side (Right) */}
        <div 
          className={`storytelling-side hover:cursor-crosshair hidden md:flex w-1/2 relative bg-[var(--color-ink)] text-[var(--color-bg)] flex-col justify-between p-12 lg:p-20 overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-10 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Heat map abstract background */}
          <div className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none">
             <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_top_right,_var(--color-coral)_0%,_transparent_60%)] blur-[90px]" />
             <div className="absolute bottom-[-10%] left-[-20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_bottom_left,_var(--color-gold)_0%,_transparent_70%)] blur-[80px]" />
          </div>

          <div className="relative z-10 pt-12 pointer-events-none">
            <h3 className="font-display text-5xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.85] text-[var(--color-surface)] mb-8 tracking-tight">
              {t('header.title_part1')}<br/>
              <span className="text-[var(--color-bg)] drop-shadow-[0_0_30px_var(--color-coral)]">{t('header.title_part2')}</span><br/>
              {t('header.title_part3')}
            </h3>
            <p className="font-body text-lg lg:text-xl text-[var(--color-bg)]/80 max-w-md leading-relaxed border-l-2 border-[var(--color-coral)] pl-6">
              {t('header.story_desc')}
            </p>
          </div>

          <div className="relative z-10 flex justify-between items-end border-t border-[var(--color-bg)]/20 pt-8 mt-12 w-full pointer-events-none">
            <div>
              <p className="font-body uppercase tracking-widest text-xs text-[var(--color-bg)]/60 mb-2 font-bold">{t('header.summer_avg')}</p>
              <p className="font-display text-4xl lg:text-5xl font-bold text-[var(--color-gold)]">+4.5°C</p>
            </div>
            <div className="text-right">
              <p className="font-body uppercase tracking-widest text-xs text-[var(--color-bg)]/60 mb-2 font-bold">{t('header.status')}</p>
              <p className="font-display text-2xl lg:text-3xl font-bold text-[var(--color-coral)] tracking-wider">{t('header.critical')}</p>
            </div>
          </div>
        </div>

        {/* Decorative element for mobile only */}
        <div className="md:hidden absolute bottom-[-10%] right-[-10%] w-[80%] h-[30%] bg-[var(--color-coral)] blur-[80px] opacity-20 pointer-events-none z-10" />
      </div>
    </>
  );
};

export default Header;