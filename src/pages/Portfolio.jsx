import { useState, useEffect } from 'react';
import { getStocks } from '../services/stockService';
import StockList from '../components/stocks/StockList';
import AddStockModal from '../components/stocks/AddStockModal';

function Portfolio() {
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks();
  }, []);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Portfolio</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Stock
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        <StockList stocks={stocks} onUpdate={fetchStocks} />
      )}

      <AddStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={fetchStocks}
      />
    </div>
  );
}

export default Portfolio;