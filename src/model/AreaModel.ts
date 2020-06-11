export type Coordinate = { x: number; y: number };
export type KeysOfAxis = "range" | "top" | "bottom" | "left" | "right";
export type Axis = {
  [key in KeysOfAxis]: Coordinate;
};

export type Figure = {
  width?: number;
  height?: number;
  padding?: number;
  margin: number;
};

export type Area = {
  chart: Figure;
  wrapper: Figure;
};

const defaultAxis: Axis = {
  range: { x: 0, y: 0 },
  top: { x: 0, y: 0 },
  bottom: { x: 0, y: 0 },
  left: { x: 0, y: 0 },
  right: { x: 0, y: 0 },
};

class AreaModel {
  private chart: Figure;
  private wrapper: Figure;
  private axisOfChart: Axis = defaultAxis;
  private axisOfWrapper: Axis = defaultAxis;
  private chartCnt: number;

  constructor(area: Area, chartCnt: number) {
    // initialize..
    const {
      chart,
      chart: { width, height, margin },
      wrapper,
    } = area;

    this.chart = {
      ...chart,
      padding: wrapper.margin + margin,
    };

    this.wrapper = {
      ...wrapper,
      width: width! * chartCnt + margin * (chartCnt + 1) + wrapper.margin * 2,
      height: height! + margin * 2 + wrapper.margin * 2,
      padding: wrapper.margin,
    };

    this.chartCnt = chartCnt;
    this.setAxisOfChart();
    this.setAxisOfWrapper();
  }

  getChartFigure() {
    return this.chart;
  }

  getWrapperFigure() {
    return this.wrapper;
  }

  private setAxisOfChart() {
    const {
      chart: { width, height, margin, padding },
    } = this;
    this.axisOfChart = {
      ...defaultAxis,
      range: {
        x: width!,
        y: height!,
      },
      bottom: {
        x: padding!,
        y: height! + padding!,
      },
      left: {
        x: padding!,
        y: padding!,
      },
    };
  }

  getAxisOfChart() {
    return this.axisOfChart;
  }

  getTransFormWrapper() {
    return `translate(${this.getWrapperFigure().padding}, ${
      this.getWrapperFigure().padding
    })`;
  }

  getTransFormAxisBottomOfChart(i: number = 0) {
    const groupX =
      i * (this.getChartFigure().width! + this.getChartFigure().margin);

    return `translate(${this.getAxisOfChart().bottom.x + groupX}, ${
      this.getAxisOfChart().bottom.y
    })`;
  }

  getTransFormAxisLeftOfChart() {
    return `translate(${this.getAxisOfChart().left.x}, ${
      this.getAxisOfChart().left.y
    })`;
  }

  private setAxisOfWrapper() {
    const {
      wrapper: { width, height, margin, padding },
    } = this;

    // TODO: 자동화
    this.axisOfWrapper = {
      ...defaultAxis,
      range: {
        x: width! - margin * 2,
        y: height! - margin * 2,
      },
      bottom: {
        x: padding!,
        y: height! - padding!,
      },
      left: {
        x: padding!,
        y: padding!,
      },
    };
  }

  getAxisOfWrapper() {
    return this.axisOfWrapper;
  }

  getTransFormAxisBottomOfWrapper() {
    return `translate(${this.getAxisOfWrapper().bottom.x}, ${
      this.getAxisOfWrapper().bottom.y
    })`;
  }

  getTransFormAxisLeftOfWrapper() {
    return `translate(${this.getAxisOfWrapper().left.x}, ${
      this.getAxisOfWrapper().left.y
    })`;
  }

  getChartCnt() {
    return this.chartCnt;
  }
}

export default AreaModel;
