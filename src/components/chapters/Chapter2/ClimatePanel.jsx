import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ClimatePanel = ({ climateData, metric = 'temp' }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!climateData || !chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Setup dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis (Months)
    const x = d3.scaleBand()
      .range([0, width])
      .domain(climateData.months.map(d => d.month))
      .padding(0.2);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .attr('class', 'font-mono text-[9px] fill-[var(--color-muted)]')
      .attr('dy', '1em');

    // Remove axis line
    svg.select('.domain').remove();

    // Setup Y axis based on metric
    let y, yAxis;
    if (metric === 'temp') {
      y = d3.scaleLinear()
        .domain([-10, 35]) // Fixed domain for strict comparison across decades
        .range([height, 0]);
      yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `${d}°`);
    } else if (metric === 'precip') {
      y = d3.scaleLinear()
        .domain([0, 80])
        .range([height, 0]);
      yAxis = d3.axisLeft(y).ticks(4).tickFormat(d => `${d}mm`);
    } else {
      y = d3.scaleLinear()
        .domain([100, 450])
        .range([height, 0]);
      yAxis = d3.axisLeft(y).ticks(4);
    }

    svg.append('g')
      .call(yAxis)
      .selectAll('text')
      .attr('class', 'font-mono text-[9px] fill-[var(--color-muted)]');
    svg.selectAll('.domain').remove();
    svg.selectAll('.tick line')
      .attr('stroke', 'var(--color-border)')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-dasharray', '2,2')
      .attr('x2', width); // Extend grid lines

    // Draw data
    if (metric === 'temp') {
      // Line Chart for Temp
      const line = d3.line()
        .x(d => x(d.month) + x.bandwidth() / 2)
        .y(d => y(d.temp))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(climateData.months)
        .attr('fill', 'none')
        .attr('stroke', 'var(--color-coral)')
        .attr('stroke-width', 3)
        .attr('d', line);

      // Add circles
      svg.selectAll('myCircles')
        .data(climateData.months)
        .enter()
        .append('circle')
        .attr('fill', 'var(--color-ink)')
        .attr('stroke', 'var(--color-coral)')
        .attr('stroke-width', 2)
        .attr('cx', d => x(d.month) + x.bandwidth() / 2)
        .attr('cy', d => y(d.temp))
        .attr('r', 4);

    } else {
      // Bar Chart for Precip / Sunshine
      const dataKey = metric === 'precip' ? 'precip' : 'sunshine';
      const color = metric === 'precip' ? 'var(--color-teal)' : '#facc15'; // Teal or Yellow

      svg.selectAll('mybar')
        .data(climateData.months)
        .enter()
        .append('rect')
        .attr('x', d => x(d.month))
        .attr('y', d => y(d[dataKey]))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d[dataKey]))
        .attr('fill', color)
        .attr('rx', 2);
    }

  }, [climateData, metric]);

  const facts = [
    { label: 'Elevation', value: '1006m' },
    { label: 'Latitude', value: '40.19°N' },
    { label: 'Climate Type', value: 'Semi-Arid (Dfb)' },
    { label: 'Annual Precip.', value: '365mm' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[420px] bg-[var(--color-surface)]/95 backdrop-blur-xl border border-[var(--color-border)] p-6 rounded-2xl shadow-2xl pointer-events-auto">
      
      {/* Header */}
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-ink)] tracking-tight">The Natural Climate</h3>
        <p className="font-body text-sm text-[var(--color-muted)] mt-1">Yerevan's baseline before concrete expansion.</p>
      </div>

      {/* Static Facts Grid */}
      <div className="grid grid-cols-2 gap-4 bg-[var(--color-bg)]/50 p-4 rounded-[var(--radius)]">
        {facts.map((fact, i) => (
          <div key={i}>
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-1">{fact.label}</span>
            <span className="font-body text-sm font-bold text-[var(--color-ink)]">{fact.value}</span>
          </div>
        ))}
      </div>

      {/* Dynamic Data Panel (tied to slider) */}
      <div className="border-t border-[var(--color-border)] pt-4">
        <div className="flex justify-between items-end mb-4">
           <div>
             <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-1">Active Year</span>
             <span className="font-display text-4xl font-black text-[var(--color-coral)]">{climateData.year}</span>
           </div>
           <div className="text-right">
             <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-1">Annual Avg</span>
             <span className="font-display text-2xl font-bold text-[var(--color-ink)]">{climateData.annualAvgTemp}°C</span>
           </div>
        </div>

        <div className="flex justify-between items-end mb-6">
           <div>
             <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-1">Summer Avg</span>
             <span className="font-display text-lg font-bold text-[var(--color-coral)]">{climateData.summerAvg}°C</span>
           </div>
           <div className="text-right">
             <span className="block font-mono text-[9px] uppercase tracking-widest text-[var(--color-muted)] mb-1">Winter Avg</span>
             <span className="font-display text-lg font-bold text-[#4facfe]">{climateData.winterAvg}°C</span>
           </div>
        </div>
      </div>

      {/* Interactive D3 Chart Area */}
      <div className="mt-2">
        <div className="flex gap-2 mb-4">  
          {/* We assume the parent handles the `metric` state, but we display the label */}
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)]">
            {metric === 'temp' ? 'Temperature (°C)' : metric === 'precip' ? 'Precipitation (mm)' : 'Sunshine (Hrs)'}
          </span>
        </div>
        
        {/* D3 Container */}
        <div className="w-full h-[200px]" ref={chartRef} />
      </div>

    </div>
  );
};

export default ClimatePanel;
