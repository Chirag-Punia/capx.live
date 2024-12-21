import { useState } from 'react';
import { deleteStock } from '../../services/stockService';
import EditStockModal from './EditStockModal';

function StockList({ stocks, onUpdate }) {
  const [editingStock, setEditingStock] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      try {
        await deleteStock(id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting stock:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map(stock => {
            const gainLoss = (stock.currentPrice - stock.purchasePrice) * stock.quantity;
            const gainLossPercentage = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;

            return (
              <tr key={stock._id}>
                <td className="px-6 py-4 whitespace-nowrap">{stock.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stock.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stock.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">${stock.purchasePrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">${stock.currentPrice.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${gainLoss.toFixed(2)} ({gainLossPercentage.toFixed(2)}%)
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setEditingStock(stock)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stock._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingStock && (
        <EditStockModal
          stock={editingStock}
          isOpen={!!editingStock}
          onClose={() => setEditingStock(null)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}

export default StockList;