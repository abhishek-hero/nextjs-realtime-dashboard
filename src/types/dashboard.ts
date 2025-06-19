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

export type MarketTableProps = {
  tabData: PairData[];
  loading: boolean;
}; 