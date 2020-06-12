type Data<X, Y, Z = {}> = {
  x: X;
  y: Y;
  z?: Z;
};

export type DataType = Data<string, number>;

const data: DataType[] = [
  { x: "A", y: 10 },
  { x: "B", y: 20 },
  { x: "C", y: 30 },
  { x: "D", y: 20 },
  { x: "E", y: 50 },
  { x: "F", y: 60 },
  { x: "G", y: 20 },
  { x: "H", y: 80 },
  { x: "I", y: 20 },
  { x: "J", y: 100 },
];

export default {
  list() {
    return new Promise<DataType[]>((res) => {
      setTimeout(() => {
        res(data);
      }, 2000);
    });
  },
};
