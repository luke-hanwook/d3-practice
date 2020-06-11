import React from "react";
import { Figure } from "../model/AreaModel";

type ChartProps = {
  children: React.ReactElement | React.ReactElement[];
  figure: Figure;
};

function Chart({ children, figure }: ChartProps) {
  return (
    <svg width={figure.width} height={figure.height}>
      {children}
    </svg>
  );
}

export default Chart;
