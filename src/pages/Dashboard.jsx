import { useState, useEffect } from 'react';
import { getStocks } from '../services/stockService';
import PortfolioChart from '../components/charts/PortfolioChart';
import PortfolioMetrics from '../components/dashboard/PortfolioMetrics';
import TopPerformers from '../components/dashboard/TopPerformers';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await getStocks();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
      <PortfolioMetrics stocks={stocks} />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Portfolio Distribution</h2>
          <PortfolioChart stocks={stocks} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Performers</h2>
          <TopPerformers stocks={stocks} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;