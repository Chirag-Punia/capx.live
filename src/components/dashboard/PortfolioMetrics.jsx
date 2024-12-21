function PortfolioMetrics({ stocks }) {
  const totalValue = stocks.reduce((sum, stock) => 
    sum + (stock.currentPrice * stock.quantity), 0
  );

  const totalGainLoss = stocks.reduce((sum, stock) => 
    sum + ((stock.currentPrice - stock.purchasePrice) * stock.quantity), 0
  );

  const percentageChange = (totalGainLoss / totalValue) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Portfolio Value</h3>
        <p className="text-2xl font-semibold text-gray-900">
          ${totalValue.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Gain/Loss</h3>
        <p className={`text-2xl font-semibold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${totalGainLoss.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Percentage Change</h3>
        <p className={`text-2xl font-semibold ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {percentageChange.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default PortfolioMetrics;