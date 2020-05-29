import React, { useEffect } from "react";
import { getScale, getArea } from ".";
import * as d3 from "d3";

function Axis() {
  const { x, y } = getScale();
  const { height, width, margin } = getArea().default;

  useEffect(() => {
    d3.select(".x-axis")
      .attr("transform", `translate(${margin}, ${height})`)
      .call(d3.axisBottom(x));
    d3.select(".y-axis")
      .attr("transform", `translate(${margin}, 0)`)
      .call(d3.axisLeft(y).ticks(10));
  }, []);

  return (
    <>
      <g className="x-axis" />
      <g className="y-axis" />
    </>
  );
}

export default Axis;
