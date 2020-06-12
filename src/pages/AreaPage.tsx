import React from "react";

import { Chart, Axes } from "../components";
import { Axis } from "../components/Axes";
import { useData } from "../hooks";

import AreaModel from "../model/AreaModel";
import { getScale, loadScaleBand, loadScaleLinear } from "../utils/scaleUtil";
import { PathChart } from "../components/graphs";

function AreaPage() {
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

  return (
    <>
      <h3>Area</h3>
      {data.length > 0 ? (
        <Chart figure={area.getWrapperFigure()}>
          <g transform={area.getTransFormWrapper()}>
            <PathChart data={data} scale={{ x: xAxis, y: yAxis }} type="area" />
          </g>
          <Axes axes={axes} />
        </Chart>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default AreaPage;
