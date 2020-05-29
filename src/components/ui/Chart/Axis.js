import React, { useEffect } from "react";
import { getScale, getArea } from ".";
import * as d3 from "d3";

function Axis() {
  const { x, y } = getScale();
  const { height, width, margin } = getArea().default;

  useEffect(() => {
    d3.select(".x-axis")
      .attr("transform", `translate(${margin}, ${height + margin / 2.5})`)
      .call(d3.axisBottom(x));
    d3.select(".y-axis")
      .attr("transform", `translate(${margin}, ${margin / 2.5})`)
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
