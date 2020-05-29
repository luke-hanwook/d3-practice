import React from "react";
import Rect from "./Rect";
import Axis from "./Axis";
import * as d3 from "d3";

const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const getArea = () => ({
  default: {
    width: 700,
    height: 270,
    margin: 30,
  },
});

export const getScale = (xScale, yScale) => ({
  x:
    xScale ||
    d3
      .scaleBand()
      .domain([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
      .range([0, getArea().default.width]),
  y:
    yScale ||
    d3.scaleLinear().domain([0, 100]).range([getArea().default.height, 0]),
  color: (colorArr) => d3.scaleLinear().domain([0, 100]).range(colorArr),
});

function Chart() {
  const { width, height, margin } = getArea().default;
  return (
    <svg width={width + margin} height={height + margin}>
      {data.map((m) => (
        <Rect key={m} fill={"blue"} d={m} />
      ))}
      <Axis />
    </svg>
  );
}

export default Chart;
