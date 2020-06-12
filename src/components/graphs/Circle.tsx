import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { DataType } from "../../api";

type CircleChartProps = {
  children?: React.ReactElement;
  data: DataType[];
  scale: {
    x: any;
    y: any;
    z?: any;
  };
  idx?: number;
};

function CircleChart({ children, data, scale: { x, y, z } }: CircleChartProps) {
  const chartEl = useRef<SVGGElement>(null);

  // FIXME: refactoring
  useEffect(() => {
    if (chartEl.current) {
      const svg = d3.select(chartEl.current).selectAll(".dot");
      svg
        .data(data)
        .join(
          (enter) => enter.append("circle").attr("class", "new"),
          (update) => update.attr("class", "update"),
          (exit) => exit.remove()
        )
        .attr("class", "bar")
        .attr("r", 3.5)
        .attr("cx", (d) => x(d.x) + x.bandwidth() / 2)
        .attr("cy", (d) => y(d.y))
        .attr("height", (d) => y(0) - y(d.y))
        .attr("width", x.bandwidth())
        .attr("fill", (d) => `steelblue`);
    }
  }, [data, x, y, z]);

  return (
    <>
      <g ref={chartEl} />
      {children}
    </>
  );
}

export default CircleChart;
