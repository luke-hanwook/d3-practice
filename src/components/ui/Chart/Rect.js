import React from "react";
import { getScale, getArea } from ".";

function Rect({ fill, d }) {
  const { x, y, color } = getScale();
  const { height, width } = getArea().default;

  const location = d => ({
    x: x(d),
    y: y(d)
  });

  return (
    <>
      <rect
        x={location(d).x}
        y={location(d).y}
        height={height - location(d).y}
        width={width / 10}
        fill={color(["white", "blue"])(d)}
      />
      <rect
        x={location(d).x + width / 10 / 2}
        y={location(d).y}
        height={10}
        width={10}
        fill={color(["white", "red"])(d)}
        opacity="0.5"
      />
    </>
  );
}

export default Rect;
