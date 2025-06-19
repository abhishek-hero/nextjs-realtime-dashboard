import React, { useMemo } from "react";
import { PairData, MarketTableProps } from "../types/dashboard";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Image from "next/image";

const EmptyComponent = ({ title }: { title: string }) => {
  return (
    <tr>
      <td
        colSpan={5}
        className="text-center py-8 text-gray-400 text-xs sm:text-sm"
      >
        {title}
      </td>
    </tr>
  );
};

const MarketTable: React.FC<MarketTableProps> = React.memo(
  ({ tabData, loading }) => {
    const rows = useMemo(() => {
      if (loading) return <EmptyComponent title="Loading..." />;
      if (tabData.length === 0)
        return <EmptyComponent title="No data available" />;
      return tabData.map((item: PairData) => {
        const color = item.change > 0 ? "#22c55e" : "#ef4444";
        const iconMap: Record<string, string> = {
          "BTC/INR": "/coin1.jpeg",
          "LTC/INR": "/coin2.jpg",
          "BNB/INR": "/coin3.jpeg",
        };
        const iconSrc = iconMap[item.symbol] || "/coin1.jpeg";
        return (
          <tr
            key={item.symbol}
            className="hover:bg-gray-50 transition-colors p-2"
          >
            <td className="py-2 px-2 sm:px-4 text-gray-800 font-bold text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Image
                  src={iconSrc}
                  alt={item.symbol + " icon"}
                  width={20}
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span>{item.symbol}</span>
              </div>
            </td>
            <td className="py-2 px-2 sm:px-4 text-gray-800 font-bold text-xs sm:text-sm">
              ₹ {item.price.toLocaleString()}
            </td>
            <td
              className={`py-2 px-2 sm:px-4 font-bold text-xs sm:text-sm ${
                item.change > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.change} %
            </td>
            <td className="py-2 px-2 sm:px-4 font-bold text-xs sm:text-sm">
              <div className="h-8 flex items-center justify-center">
                <Sparklines
                  data={item.chartdata}
                  width={80}
                  height={24}
                  margin={0}
                >
                  <SparklinesLine color={color} />
                </Sparklines>
              </div>
            </td>
            <td className="py-2 px-2 sm:px-4 font-bold text-xs sm:text-sm">
              <button className="border border-[#59e1ff] text-gray-800 px-3 sm:px-4 py-1 rounded-full hover:bg-[#e0f8fd] font-bold w-full sm:w-auto">
                Trade
              </button>
            </td>
          </tr>
        );
      });
    }, [tabData, loading]);

    return (
      <div className="overflow-x-auto overflow-y-auto shadow-lg rounded-2xl bg-white p-2 h-[334px]">
        <table className="min-w-[600px] w-full bg-white rounded-lg text-xs sm:text-sm">
          <thead>
            <tr className="text-left text-gray-600 text-xs sm:text-sm font-semibold">
              {[
                "Trending Pairs",
                "Last Price",
                "24 hrs change",
                "Per/Day Chart",
                "Trade",
              ].map((header) => (
                <th key={header} className="py-2 px-2 sm:px-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
);

export default MarketTable;
