import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { DataType } from "../../api";

type RectData = { type: string; value: number };
type StackData = { [key: string]: any };

type ChartProps = {
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

const isRectData = (data: StackData[] | RectData[]): data is RectData[] =>
  (data[0] as RectData).type !== undefined;

function RectChart({
  orientation,
  children,
  data,
  scale: { x, y, z },
}: ChartProps) {
  const chartEl = useRef<SVGGElement>(null);

  useEffect(() => {
    if (chartEl.current) {
      const svg = d3.select(chartEl.current).selectAll(".bar");
      //   if (orientation === "row" && isRectData(data)) {
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
        .attr("fill", (d) => `#0f34`);
      //   } else {
      //     svg
      //       .data(d3.stack().keys(["Mild", "Moderate", "Severe"])(data))
      //       .enter()
      //       .append("g")
      //       .attr("fill", (d) => z(d.key))
      //       .selectAll("rect")
      //       .data((d) => d)
      //       .enter()
      //       .append("rect")
      //       .attr("x", (d) => {
      //         return x(d.data.type);
      //       })
      //       .attr("y", (d) => {
      //         return y(d[1]);
      //       })
      //       .attr("height", (d) => y(d[0]) - y(d[1]))
      //       .attr("width", x.bandwidth());
      //   }
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
