import React from 'react';

const ExposureMeterIndicator = ({ level }) => {
  // level: 'high' or 'moderate'
  const isHigh = level === 'high';
  return (
    <div className="mt-4 border-t border-[var(--color-border)] pt-4">
      <div className="flex justify-between items-end mb-2">
        <span className="font-body text-xs uppercase tracking-widest font-bold text-[var(--color-muted)]">
          Heat Exposure
        </span>
        <span className={`font-display text-sm font-bold uppercase tracking-wider ${isHigh ? 'text-[var(--color-coral)]' : 'text-[var(--color-teal)]'}`}>
          {isHigh ? 'High' : 'Moderate'}
        </span>
      </div>
      <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden flex">
        <div 
          className={`h-full ${isHigh ? 'bg-[var(--color-coral)] w-[85%]' : 'bg-[var(--color-teal)] w-[40%]'}`} 
        />
      </div>
    </div>
  );
};

const CharacterCard = ({ character }) => {
  return (
    <div className="relative bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-[var(--radius)] p-6 md:p-8 w-[90%] md:w-[400px] shadow-2xl transition-transform duration-300 hover:-translate-y-2">
      
      {/* Header: Name and Demographics */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h4 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-ink)] leading-none">
            {character.name}
          </h4>
          <p className="font-body text-sm text-[var(--color-muted)] mt-1">
            {character.age} yo. • {character.occupation}
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] block">
            City
          </span>
          <span className="font-display text-lg font-bold text-[var(--color-ink)]">
            {character.city}
          </span>
        </div>
      </div>

      {/* Location Context */}
      <div className="mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1 block">
          Daily Environment
        </span>
        <p className="font-body text-sm text-[var(--color-ink)]/80 leading-relaxed border-l-2 border-[var(--color-border)] pl-3">
          {character.location}
        </p>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Air Temp
          </span>
          <span className="font-display text-2xl font-bold text-[var(--color-ink)]">
            {character.stats.airTemp}
          </span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Surface Temp
          </span>
          <span className={`font-display text-2xl font-bold ${character.exposure === 'high' ? 'text-[var(--color-coral)]' : 'text-[var(--color-ink)]'}`}>
            {character.stats.surfaceTemp}
          </span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Shade Coverage
          </span>
          <span className="font-body text-sm font-semibold text-[var(--color-ink)] uppercase">
            {character.stats.shade}
          </span>
        </div>
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted)] mb-1">
            Green Space
          </span>
          <span className={`font-body text-sm font-semibold uppercase ${character.exposure === 'moderate' ? 'text-[var(--color-teal)]' : 'text-[var(--color-ink)]'}`}>
            {character.stats.greenSpace}
          </span>
        </div>
      </div>

      {/* Exposure Meter */}
      <ExposureMeterIndicator level={character.exposure} />
    </div>
  );
};

export default CharacterCard;
