import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import Navbar from "../components/Navbar";
import { DataType } from "../types/dashboard";
import { TABS } from "../constants/dashboard";
import MarketTable from "../components/MarketTable";

export default function Dashboard() {
  const [tab, setTab] = useState<keyof DataType>("hot");
  const [data, setData] = useState<DataType>({ hot: [], new: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(db, "/dashboard");
    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        try {
          const val = snapshot.val();
          setData({
            hot: val?.hot || [],
            new: val?.new || [],
          });
        } catch (error) {
          console.error("Error processing snapshot:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        // This handles permission/network errors from Firebase
        console.error("Firebase onValue error:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const tabData = data[tab];

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-8">
      <Navbar />
      <main className="max-w-4xl w-full mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-left text-gray-900">
          Catch Your Next Trading Opportunity
        </h1>
        <div className="flex flex-row mb-4 bg-gray-50 rounded-t-lg pt-2 px-2 gap-2">
          {TABS.map((t) => (
            <button
              key={t.value}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2 font-semibold border-b-2 transition-colors text-xs sm:text-sm ${
                tab === t.value
                  ? "border-[#59e1ff] text-[#59e1ff]"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setTab(t.value as keyof DataType)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <MarketTable tabData={tabData} loading={loading} />
      </main>
    </div>
  );
}
