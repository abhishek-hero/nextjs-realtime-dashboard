// MarketTable component: displays trending pairs, prices, changes, mini charts, and trade button
import React, { useMemo } from "react";
import { PairData, MarketTableProps } from "../types/dashboard";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Image from "next/image";

// Shows a message row for loading or empty states
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

// Main table component
const MarketTable: React.FC<MarketTableProps> = React.memo(
  ({ tabData, loading }) => {
    // Memoize table rows for performance
    const rows = useMemo(() => {
      if (loading) return <EmptyComponent title="Loading..." />;
      if (tabData.length === 0)
        return <EmptyComponent title="No data available" />;
      return tabData.map((item: PairData) => {
        // Set chart color based on price change
        const color = item.change > 0 ? "#22c55e" : "#ef4444";
        // Map symbol to icon image
        const iconMap: Record<string, string> = {
          "BTC/INR": "/coin1.jpeg",
          "LTC/INR": "/coin2.jpg",
          "REGENT/INR": "/coin3.jpeg",
          "RICE/INR": "/coin1.jpeg",
          "ETH/INR": "/coin2.jpg",
          "DOGE/INR": "/coin3.jpeg",
          "ADA/INR": "/coin1.jpeg",
          "XRP/INR": "/coin2.jpg",
          "1000MUMU/INR": "/coin1.jpeg",
          "AVA/INR": "/coin2.jpg",
          "SHIB/INR": "/coin3.jpeg",
          "PEPE/INR": "/coin1.jpeg",
          "SOL/INR": "/coin2.jpg",
        };
        const iconSrc = iconMap[item.symbol] || "/coin1.jpeg";
        return (
          <tr
            key={item.symbol}
            className="hover:bg-gray-50 transition-colors p-2"
          >
            {/* Pair name and icon */}
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
            {/* Last price */}
            <td className="py-2 px-2 sm:px-4 text-gray-800 font-bold text-xs sm:text-sm">
              ₹ {item.price.toLocaleString()}
            </td>
            {/* 24h change, colored by positive/negative */}
            <td
              className={`py-2 px-2 sm:px-4 font-bold text-xs sm:text-sm ${
                item.change > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.change} %
            </td>
            {/* Mini chart for price trend */}
            <td className="py-2 px-2 sm:px-4 font-bold text-xs sm:text-sm">
              <div className="min-w-[80px] min-h-6 h-8">
                <Sparklines
                  data={item.chartdata}
                  width={80}
                  height={24}
                  margin={0}
                >
                  <SparklinesLine color={color} />
                </Sparklines>
              </div>
              {/* </div> */}
            </td>
            {/* Trade button */}
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
      // Table container with scroll and shadow
      <div className="shadow-lg rounded-2xl bg-white p-2 h-[334px] overflow-hidden">
        <div className="h-full overflow-x-auto">
          <div className="min-w-[600px] h-full flex flex-col">
            {/* Header Table (sticky header) */}
            <table className="w-full text-xs sm:text-sm">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-left text-gray-600 font-semibold">
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
            </table>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-xs sm:text-sm">
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default MarketTable;
