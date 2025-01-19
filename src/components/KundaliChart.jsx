import { useEffect, useRef } from "react";
import * as d3 from "d3";

const KundaliChart = ({ chartData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!chartData) {
      console.log("No chart data available");
      return;
    }

    console.log("Rendering chart with data:", chartData);

    // Clear existing SVG content
    const svgElement = svgRef.current;
    while (svgElement?.firstChild) {
      svgElement.removeChild(svgElement.firstChild);
    }

    const width = 500;
    const height = 500;
    const outerRadius = 250;
    const innerRadius = 210;
    const planetRingRadius = 200;
    const planetRingInnerRadius = 160;
    const center = { x: width / 2, y: height / 2 };

    const zodiacData = [
      { name: "ARIES", symbol: "♈" },
      { name: "TAURUS", symbol: "♉" },
      { name: "GEMINI", symbol: "♊" },
      { name: "CANCER", symbol: "♋" },
      { name: "LEO", symbol: "♌" },
      { name: "VIRGO", symbol: "♍" },
      { name: "LIBRA", symbol: "♎" },
      { name: "SCORPIO", symbol: "♏" },
      { name: "SAGITTARIUS", symbol: "♐" },
      { name: "CAPRICORN", symbol: "♑" },
      { name: "AQUARIUS", symbol: "♒" },
      { name: "PISCES", symbol: "♓" }
    ];

    const planetSymbols = {
      "Sun": "☉",
      "Moon": "☽",
      "Mars": "♂",
      "Mercury": "☿",
      "Jupiter": "♃",
      "Venus": "♀",
      "Saturn": "♄",
      "Uranus": "⛢",
      "Neptune": "♆",
      "Pluto": "♇"
    };

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    svg.selectAll("*").remove();

    // Draw outer black circle with zodiac signs
    svg.append("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", outerRadius)
      .attr("fill", "black")
      .attr("stroke", "none");

    // Draw inner white circle for planets
    svg.append("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", innerRadius)
      .attr("fill", "white")
      .attr("stroke", "black");

    // Draw planet ring
    svg.append("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", planetRingRadius)
      .attr("fill", "lightgrey")
      .attr("stroke", "darkgrey")
      .attr("stroke-width", "2");

    svg.append("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", planetRingInnerRadius)
      .attr("fill", "white")
      .attr("stroke", "darkgrey")
      .attr("stroke-width", "2");

    // Add zodiac names in outer ring
    zodiacData.forEach((zodiac, i) => {
      const radius = outerRadius - 25;
      const startAngle = i * 30 - 90; // Start at top (-90) and go clockwise
      const endAngle = startAngle + 30;
      const midAngle = (startAngle + endAngle) / 2;
      
      // Calculate the mid-point for text placement
      const x = center.x + radius * Math.cos(midAngle * Math.PI / 180);
      const y = center.y + radius * Math.sin(midAngle * Math.PI / 180);

      // Add text directly at the calculated position
      svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("fill", "white")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("transform", `rotate(${midAngle + 90},${x},${y})`) // Rotate text to follow the circle
        .text(zodiac.name);
    });

    // Draw house connection lines from inner circle to planet ring
    Object.values(chartData.houses).forEach(angle => {
      const angleRad = (angle - 90) * Math.PI / 180;
      svg.append("line")
        .attr("x1", center.x + planetRingInnerRadius * Math.cos(angleRad))
        .attr("y1", center.y + planetRingInnerRadius * Math.sin(angleRad))
        .attr("x2", center.x + planetRingRadius * Math.cos(angleRad))
        .attr("y2", center.y + planetRingRadius * Math.sin(angleRad))
        .attr("stroke", "white")
        .attr("stroke-width", "2");
    });
	// Draw house connection lines 
	for (let angle = 0; angle < 360; angle += 30) {
	  const angleRad = (angle - 90) * Math.PI / 180;
	  svg.append("line")
		.attr("x1", center.x + innerRadius * Math.cos(angleRad))
		.attr("y1", center.y + innerRadius * Math.sin(angleRad))
		.attr("x2", center.x + outerRadius * Math.cos(angleRad))
		.attr("y2", center.y + outerRadius * Math.sin(angleRad))
		.attr("stroke", "white")
		.attr("stroke-width", "2");
	}

    // Add planets using symbols in inner circle
    Object.entries(chartData.planet_positions).forEach(([planet, angle]) => {
      const angleRad = (angle - 90) * Math.PI / 180;
      const r = innerRadius * 0.85
      const x = center.x + r * Math.cos(angleRad);
      const y = center.y + r * Math.sin(angleRad);

      const planetGroup = svg.append("g")
        .attr("class", "planet-group")
        .attr("transform", `translate(${x}, ${y})`);

      planetGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "24px")
        .attr("fill", "black")
        .text(planetSymbols[planet] || planet);

      // Add line from planet symbol to outer circle
      svg.append("line")
        .attr("x1", x)
        .attr("y1", y)
        .attr("x2", center.x + outerRadius * Math.cos(angleRad))
        .attr("y2", center.y + outerRadius * Math.sin(angleRad))
        .attr("stroke", "black")
        .attr("stroke-width", "1");

      // Add line from planet symbol to planet ring
      svg.append("line")
        .attr("x1", x)
        .attr("y1", y)
        .attr("x2", center.x + planetRingRadius * Math.cos(angleRad))
        .attr("y2", center.y + planetRingRadius * Math.sin(angleRad))
        .attr("stroke", "darkgrey")
        .attr("stroke-width", "1");

      // Add tooltip for planet name
      const tooltip = svg.append("text")
        .attr("x", x)
        .attr("y", y - 20)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .attr("visibility", "hidden")
        .text(planet);

      planetGroup.on("mouseover", () => {
        tooltip.attr("visibility", "visible");
      }).on("mouseout", () => {
        tooltip.attr("visibility", "hidden");
      });
    });

  }, [chartData]);

  if (!chartData) return <div>No chart data available</div>;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        ref={svgRef}
        width="500"
        height="500"
        viewBox="0 0 500 500"
        style={{ border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default KundaliChart;