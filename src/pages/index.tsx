import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import Navbar from "../components/Navbar";
import { DataType } from "../types/dashboard";
import { TABS } from "../constants/dashboard";
import MarketTable from "../components/MarketTable";

// Dashboard page: fetches real-time data from Firebase and displays the main trading dashboard
export default function Dashboard() {
  // State for the selected tab (hot/new)
  const [tab, setTab] = useState<keyof DataType>("hot");
  // State for the dashboard data (hot/new lists)
  const [data, setData] = useState<DataType>({ hot: [], new: [] });
  // Loading state for data fetch
  const [loading, setLoading] = useState(true);

  // Fetch data from Firebase Realtime Database on mount
  useEffect(() => {
    const dataRef = ref(db, "/dashboard");
    // Subscribe to real-time updates
    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        try {
          const val = snapshot.val();
          // Set the hot and new lists from the database
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
        // Handles permission/network errors from Firebase
        console.error("Firebase onValue error:", error);
        setLoading(false);
      }
    );
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Get the data for the currently selected tab
  const tabData = data[tab];

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-8">
      {/* Navbar with logo, nav links, deposit button, avatar, and hamburger menu */}
      <Navbar />
      <main className="max-w-4xl w-full mx-auto">
        {/* Main heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-left text-gray-900">
          Catch Your Next Trading Opportunity
        </h1>
        {/* Tabs for Hot List and New List */}
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
        {/* Main market table (shows hot/new list) */}
        <MarketTable tabData={tabData} loading={loading} />
      </main>
    </div>
  );
}
