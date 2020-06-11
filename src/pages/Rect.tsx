import React from "react";
import { Chart, Axes } from "../components";
import { Axis } from "../components/Axes";
import { useData } from "../hooks";

import AreaModel from "../model/AreaModel";
import { getScale, loadScaleBand, loadScaleLinear } from "../utils/scaleUtil";
import { RectChart } from "../components/graphs";

function Rect() {
  const data = useData();

  const area = new AreaModel(
    {
      chart: { width: 200, height: 100, margin: 30 },
      wrapper: { margin: 30 },
    },
    1
  );

  const xAxis = getScale(
    loadScaleBand(
      data.map((m) => m.x),
      [0, area.getAxisOfWrapper().range.x]
    )
  );

  const yAxis = getScale(
    loadScaleLinear(
      data.map((m) => m.y),
      [area.getAxisOfWrapper().range.y, 0]
    )
  );

  const axes: Axis[] = [
    {
      orient: "axisLeft",
      scale: yAxis,
      transform: area.getTransFormAxisLeftOfWrapper(),
    },
    {
      orient: "axisBottom",
      scale: xAxis,
      transform: area.getTransFormAxisBottomOfWrapper(),
    },
  ];

  // TODO: Chart 컴포넌트를 템플릿으로 변경하기 -> axes..
  return (
    <>
      <h3>Rect</h3>
      <Chart figure={area.getWrapperFigure()}>
        <g transform={area.getTransFormWrapper()}>
          <RectChart
            data={data}
            orientation="vertical"
            scale={{ x: xAxis, y: yAxis }}
          />
        </g>
        <Axes axes={axes} />
      </Chart>
    </>
  );
}

export default Rect;
