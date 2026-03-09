import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import CITIES from '@data/avg_daily_sunshine_hours.json';

const GlobeMap = ({ className = "" }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [worldData, setWorldData] = useState(null);

  useEffect(() => {
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(data => {
      setWorldData(data);
    }).catch(err => console.error("Error fetching world data:", err));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width: w, height: h } = containerRef.current.getBoundingClientRect();
      setDimensions({ width: w, height: h });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2.2;
    
    // Initial rotation centered vaguely between Europe and Asia (Yerevan focus)
    const initialRotation = [-44.5152, -30, 0];

    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .precision(0.1)
      .rotate(initialRotation);

    const path = d3.geoPath().projection(projection);

    const graticule = d3.geoGraticule();

    // Definitions for filters and gradients
    const defs = svg.append("defs");

    // Glow filter for markers
    const filter = defs.append("filter")
      .attr("id", "glow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");
    
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur");
    
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Ocean Gradient for 3D effect
    const oceanGradient = defs.append("radialGradient")
      .attr("id", "oceanGradient")
      .attr("cx", "35%")
      .attr("cy", "35%")
      .attr("r", "60%");

    oceanGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "var(--color-bg)")
      .attr("stop-opacity", 1);
      
    oceanGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "var(--color-border)")
      .attr("stop-opacity", 0.5);

    // Globe background sphere (empty globe)
    svg.append("path")
      .datum({ type: "Sphere" })
      .attr("class", "sphere")
      .attr("d", path)
      .attr("fill", "url(#oceanGradient)")
      .attr("stroke", "var(--color-border)")
      .attr("stroke-width", 1);

    // Countries
    if (worldData) {
      svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(worldData.features)
        .enter().append("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("fill", "var(--color-ink)")
        .attr("fill-opacity", 0.03)
        .attr("stroke", "var(--color-border)")
        .attr("stroke-opacity", 0.8)
        .attr("stroke-width", 0.5);
    }

    // Graticule (grid)
    svg.append("path")
      .datum(graticule())
      .attr("class", "graticule")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "var(--color-ink)")
      .attr("stroke-opacity", 0.05)
      .attr("stroke-width", 0.5);

    // Group for markers
    const markers = svg.append("g").attr("class", "markers");

    // We use D3 drag behavior to rotate the globe
    const drag = d3.drag()
      .on("drag", (event) => {
        const rotate = projection.rotate();
        // Sensible rotation speed based on drag distance
        const k = 75 / projection.scale();
        projection.rotate([
          rotate[0] + event.dx * k,
          rotate[1] - event.dy * k
        ]);
        update();
      });

    svg.call(drag);

    // Function to render / update paths based on rotation
    const update = () => {
      // Update background sphere & graticule
      svg.select('.sphere').attr('d', path);
      if (worldData) {
        svg.selectAll('.country').attr('d', path);
      }
      svg.select('.graticule').attr('d', path);

      // Update cities
      const cityPoints = markers.selectAll(".city-group")
        .data(CITIES.cities);

      const cityGroupEnter = cityPoints.enter()
        .append("g")
        .attr("class", "city-group cursor-pointer")
        .on("mouseenter", function() {
          d3.select(this).select("circle")
            .transition().duration(200)
            .attr("r", 7)
            .attr("stroke-width", 2);
        })
        .on("mouseleave", function() {
          d3.select(this).select("circle")
            .transition().duration(200)
            .attr("r", 4)
            .attr("stroke-width", 1.5);
        });

      // City Icon (SVG map pin or dot)
      cityGroupEnter.append("circle")
        .attr("r", (d) => d.name === 'Yerevan' ? 8 : 5)
        .attr("fill", (d) => d.name === 'Yerevan' ? "var(--color-coral)" : "var(--color-teal)")
        .attr("stroke", "var(--color-bg)")
        .attr("stroke-width", 1.5)
        .attr("filter", "url(#glow)");

      // City Name
      cityGroupEnter.append("text")
        .text((d) => d.name)
        .attr("x", (d) => d.name === 'Yerevan' ? 14 : 10)
        .attr("y", -6)
        .attr("font-family", "var(--font-display)")
        .attr("font-size", (d) => d.name === 'Yerevan' ? "24px" : "16px")
        .attr("font-weight", (d) => d.name === 'Yerevan' ? "800" : "600")
        .attr("fill", "var(--color-ink)")
        .attr("class", "tracking-wide");

      // Sunshine Hours
      cityGroupEnter.append("text")
        .text((d) => `${d.sunshine_hours_daily_annum}h`)
        .attr("x", (d) => d.name === 'Yerevan' ? 14 : 10)
        .attr("y", (d) => d.name === 'Yerevan' ? 18 : 12)
        .attr("font-family", "var(--font-mono)")
        .attr("font-size", (d) => d.name === 'Yerevan' ? "20px" : "14px")
        .attr("font-weight", "bold")
        .attr("fill", "var(--color-coral)");

      const allCities = cityGroupEnter.merge(cityPoints);

      allCities.each(function(d) {
        // Calculate the screen coords
        const coords = projection([d.lng, d.lat]);
        
        // Hide points on the back side of the globe
        // We can do this by checking the path generator or using geoDistance
        const center = projection.invert([width/2, height/2]);
        const distance = d3.geoDistance([d.lng, d.lat], center);
        
        // if distance > Math.PI / 2, it's on the other side
        if (distance > Math.PI / 2 + 0.1 || !coords) {
          d3.select(this).style("display", "none");
        } else {
          d3.select(this)
            .style("display", "block")
            .attr("transform", `translate(${coords[0]},${coords[1]})`);
        }
      });
    };

    update();

    // Auto-rotation timer
    let timer = d3.timer((elapsed) => {
      const rotate = projection.rotate();
      projection.rotate([initialRotation[0] + elapsed * 0.005, rotate[1]]);
      update();
    });

    // Optional: Stop rotation on interaction
    svg.on("mousedown", () => timer.stop());
    svg.on("touchstart", () => timer.stop());

    return () => {
      timer.stop();
    };

  }, [dimensions, worldData]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-[500px] rounded-[var(--radius)] overflow-hidden border border-[var(--color-border)] shadow-sm bg-[var(--color-surface)] flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
    >
      <svg 
        ref={svgRef} 
        width={dimensions.width} 
        height={dimensions.height}
        className="w-full h-full"
      />
      <div className="absolute top-4 left-4 pointer-events-none">
        <h3 className="font-display text-2xl font-bold text-[var(--color-ink)]">Global Network</h3>
        <p className="font-body text-sm text-[var(--color-muted)]">3D Orthographic Projection</p>
      </div>
    </div>
  );
};

export default GlobeMap;
