import React, { useEffect, useRef } from "react";
import { DataType } from "../../api";
import * as d3 from "d3";

type PathChartProps = {
  children?: React.ReactElement;
  data: DataType[];
  scale: {
    x: any;
    y: any;
    z?: any;
  };
  type: "line" | "area";
};

function Path({ data, children, scale: { x, y }, type }: PathChartProps) {
  const pathEl = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = d3.select(pathEl.current);

    const line = d3
      .line<DataType>()
      .curve(d3.curveBasis)
      .x((d) => x(d.x) + x.bandwidth() / 2)
      .y((d) => y(d.y));

    const area = d3
      .area<DataType>()
      .curve(d3.curveBasis)
      .x((d) => x(d.x) + x.bandwidth() / 2)
      .y0(y(0))
      .y1((d) => y(d.y));

    const datum = {
      line: {
        shape: line,
        fill: "none",
      },
      area: {
        shape: area,
        fill: "steelblue",
      },
    };

    svg
      .datum(data)
      .attr("fill", datum[type].fill)
      .attr("stroke", "steelblue")
      .attr("stroke-width", "1.5px")
      .attr("d", datum[type].shape);
  }, [data]);
  return (
    <>
      <path ref={pathEl} />
      {children}
    </>
  );
}

export default Path;
