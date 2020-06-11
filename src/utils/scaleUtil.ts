import * as d3 from "d3-scale";
import * as array from "d3-array";
// TODO: d3 type으로 좀 더 타이트하게

export type UnpackedFnType<T> = T extends (...args: any[]) => infer R ? R : any;

const createScaleType = <T, D, R>(type: T) => (domain: D, range: R) =>
  ({
    type,
    domain,
    range,
  } as const);

// adding scale...
const SCALE_BAND = "scaleBand" as const;
const SCALE_LINEAR = "scaleLinear" as const;
const SCALE_ORDINAL = "scaleOrdinal" as const;

export const loadScaleBand = createScaleType<
  "scaleBand",
  string[],
  [number, number]
>(SCALE_BAND);

export const loadScaleLinear = createScaleType<
  "scaleLinear",
  number[],
  [number, number]
>(SCALE_LINEAR);

export const loadScaleOrdinal = createScaleType<
  "scaleOrdinal",
  string[],
  string[]
>(SCALE_ORDINAL);

type ScaleTypes =
  | UnpackedFnType<typeof loadScaleBand>
  | UnpackedFnType<typeof loadScaleLinear>
  | UnpackedFnType<typeof loadScaleOrdinal>;

export const getScale = (scale: ScaleTypes) => {
  switch (scale.type) {
    case SCALE_BAND: {
      return d3[scale.type]().domain(scale.domain).range(scale.range);
    }
    case SCALE_LINEAR: {
      return d3[scale.type]()
        .domain([0, array.max(scale.domain)!])
        .range(scale.range);
    }
    case SCALE_ORDINAL: {
      return d3[scale.type]().range(scale.range);
    }
  }
};
