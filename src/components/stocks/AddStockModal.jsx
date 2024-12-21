import { useState } from 'react';
import { addStock } from '../../services/stockService';
import toast from 'react-hot-toast';
import ButtonSpinner from '../common/ButtonSpinner';

function AddStockModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    symbol: '',
    companyName: '',
    purchasePrice: '',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addStock({
        ...formData,
        purchasePrice: parseFloat(formData.purchasePrice),
        quantity: parseInt(formData.quantity)
      });
      toast.success('Stock added successfully!');
      onAdd();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding stock');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Stock</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Symbol</label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Purchase Price (per share)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.purchasePrice}
              onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? <ButtonSpinner /> : 'Add Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStockModal;