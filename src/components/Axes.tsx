import React, { useRef, useEffect } from "react";
import * as d3 from "d3-selection";
import * as axis from "d3-axis";

export type Axis = {
  orient: keyof typeof axis;
  scale: any;
  transform: string;
};

type AxisProps = {
  axes: Axis[];
};

// FIXME: useMemo로 수정?
function AxisComponent({ orient, scale, transform }: Axis) {
  const axisEl = useRef<SVGGElement>(null);

  useEffect(() => {
    if (axisEl.current)
      d3.select(axisEl.current)
        .attr("transform", transform)
        .call(axis[orient](scale));
  }, [transform, orient, scale]);

  return <g ref={axisEl} />;
}

function Axes({ axes }: AxisProps) {
  return (
    <>
      {axes.map((axis, i) => (
        <AxisComponent key={i} {...axis} />
      ))}
    </>
  );
}

export default Axes;
