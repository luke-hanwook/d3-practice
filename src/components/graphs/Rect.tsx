import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { DataType } from "../../api";

type RectChartProps = {
  orientation: "vertical" | "horizental";
  children?: React.ReactElement;
  data: DataType[];
  scale: {
    x: any;
    y: any;
    z?: any;
  };
  idx?: number;
};

function RectChart({
  orientation,
  children,
  data,
  scale: { x, y, z },
}: RectChartProps) {
  const chartEl = useRef<SVGGElement>(null);

  // FIXME: refactoring
  useEffect(() => {
    if (chartEl.current) {
      const svg = d3.select(chartEl.current).selectAll(".bar");
      svg
        .data(data)
        .join(
          (enter) => enter.append("rect").attr("class", "new"),
          (update) => update.attr("class", "update"),
          (exit) => exit.remove()
        )
        .attr("class", "bar")
        .attr("x", (d) => x(d.x))
        .attr("y", (d) => y(d.y))
        .attr("height", (d) => y(0) - y(d.y))
        .attr("width", x.bandwidth())
        .attr("fill", (d) => `steelblue`);
    }
  }, [data, x, y, z, orientation]);

  return (
    <>
      <g ref={chartEl} />
      {children}
    </>
  );
}

export default RectChart;
