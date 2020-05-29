import React from "react";
import { getScale, getArea } from ".";

function Rect({ fill, d }) {
  const { x, y, color } = getScale();
  const { height, width, margin } = getArea().default;

  const location = (d) => ({
    x: x(d),
    y: y(d),
  });

  return (
    <>
      <rect
        x={location(d).x + margin}
        y={location(d).y + margin / 2.5}
        height={height - location(d).y}
        width={width / 10}
        fill={color(["white", "blue"])(d)}
      />
      <text
        x={location(d).x + width / 10 / 2 + margin}
        y={location(d).y + margin / 2.5}
      >
        {d}
      </text>
    </>
  );
}

export default Rect;
