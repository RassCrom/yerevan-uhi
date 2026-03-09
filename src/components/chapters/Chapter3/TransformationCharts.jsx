import React, { useMemo, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BaseChart = ({ data, xKey, yKey, color, currentYear, valueFormatter }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      setDimensions({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { width, height } = dimensions;

  // margins
  const m = { t: 20, r: 20, b: 20, l: 30 };
  const w = width - m.l - m.r;
  const h = height - m.t - m.b;

  const xScale = useMemo(() => d3.scaleLinear().domain([1950, 2024]).range([0, w]).clamp(true), [w]);
  
  const yScale = useMemo(() => {
    const max = d3.max(data, d => d[yKey]);
    const yMin = yKey === 'greenSpace' ? 0 : 0;
    return d3.scaleLinear().domain([yMin, max * 1.1]).range([h, 0]);
  }, [data, h, yKey]);

  const areaRoot = useMemo(() => {
     if(w <=0) return "";
     return d3.area().x(d => xScale(d[xKey])).y0(h).y1(d => yScale(d[yKey])).curve(d3.curveMonotoneX)(data);
  }, [w, h, data, xScale, yScale, xKey, yKey]);

  const lineRoot = useMemo(() => {
    if(w <=0) return "";
    return d3.line().x(d => xScale(d[xKey])).y(d => yScale(d[yKey])).curve(d3.curveMonotoneX)(data);
  }, [w, h, data, xScale, yScale, xKey, yKey]);

  if(w <= 0) return <div ref={containerRef} className="w-full h-full" />;

  const currentX = xScale(currentYear);
  const currentDataPoint = data.reduce((prev, curr) => Math.abs(curr.year - currentYear) < Math.abs(prev.year - currentYear) ? curr : prev);
  const currentY = yScale(currentDataPoint[yKey]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg width={width} height={height}>
        <defs>
          <linearGradient id={`grad-${yKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <g transform={`translate(${m.l}, ${m.t})`}>
          <path d={areaRoot} fill={`url(#grad-${yKey})`} />
          <path d={lineRoot} fill="none" stroke={color} strokeWidth={2} />
          
          <line x1={0} y1={h} x2={w} y2={h} stroke="var(--color-border)" strokeWidth={1} />
          
          <text x={0} y={h + 15} fill="var(--color-muted)" fontSize={10} fontFamily="monospace" textAnchor="middle">1950</text>
          <text x={w} y={h + 15} fill="var(--color-muted)" fontSize={10} fontFamily="monospace" textAnchor="middle">2024</text>
          
          {/* Active Line & Dot */}
          {currentYear >= 1950 && (
            <>
              <line x1={currentX} y1={0} x2={currentX} y2={h} stroke="var(--color-ink)" strokeWidth={1} strokeDasharray="3,3" />
              <circle cx={currentX} cy={currentY} r={4} fill="var(--color-surface)" stroke={color} strokeWidth={2} />
              <text x={currentX} y={currentY - 10} fill={color} fontSize={12} fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {valueFormatter ? valueFormatter(currentDataPoint[yKey]) : currentDataPoint[yKey]}
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

const TransformationCharts = ({ activeStep, data, milestones }) => {
  const currentMilestone = milestones[activeStep] || milestones[0];
  const year = currentMilestone.yearEnd;

  return (
    <div className="flex flex-col gap-4 w-full h-full pointer-events-none">
      <div className="flex-1 bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-2xl p-4 shadow-xl flex flex-col">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
          Population Growth
        </h3>
        <div className="flex-1 mt-2">
            <BaseChart data={data} xKey="year" yKey="population" color="var(--color-ink)" currentYear={year} valueFormatter={(val) => (val/1000000).toFixed(1) + 'M'} />
        </div>
      </div>

      <div className="flex-1 bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-2xl p-4 shadow-xl flex flex-col">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
          Urban Footprint Expansion (km²)
        </h3>
        <div className="flex-1 mt-2">
            <BaseChart data={data} xKey="year" yKey="urbanArea" color="var(--color-coral)" currentYear={year} />
        </div>
      </div>

      <div className="flex-1 bg-[var(--color-surface)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-2xl p-4 shadow-xl flex flex-col">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
          Vegetation Cover Loss
        </h3>
        <div className="flex-1 mt-2">
            <BaseChart data={data} xKey="year" yKey="greenSpace" color="var(--color-teal)" currentYear={year} valueFormatter={(val) => val + '%'} />
        </div>
      </div>
    </div>
  );
};

export default TransformationCharts;
