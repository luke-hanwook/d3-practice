import React from "react";
import Rect from "./Rect";
import * as d3 from "d3";

const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const getArea = () => ({
  default: {
    width: 700,
    height: 270,
    margin: 30
  }
});

export const getScale = (xScale, yScale) => ({
  x:
    xScale ||
    d3
      .scaleBand()
      .domain([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
      .range([0, 700]),
  y:
    yScale ||
    d3
      .scaleLinear()
      .domain([0, 100])
      .range([270, 0]),
  color: colorArr =>
    d3
      .scaleLinear()
      .domain([0, 100])
      .range(colorArr)
});

function Chart() {
  const { width, height } = getArea().default;
  return (
    <svg width={width} height={height}>
      {/* 축 */}
      {data.map(m => (
        <Rect key={m} fill={"blue"} d={m} />
      ))}
    </svg>
  );
}

export default Chart;
