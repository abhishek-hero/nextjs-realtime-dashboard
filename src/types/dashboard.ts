export type PairData = {
  symbol: string;
  price: number;
  change: number;
  chart: string;
  chartdata?: number[];
};

export type DataType = {
  hot: PairData[];
  new: PairData[];
}; 