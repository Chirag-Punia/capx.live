function TopPerformers({ stocks }) {
  const sortedStocks = [...stocks].sort((a, b) => {
    const aReturn = ((a.currentPrice - a.purchasePrice) / a.purchasePrice) * 100;
    const bReturn = ((b.currentPrice - b.purchasePrice) / b.purchasePrice) * 100;
    return bReturn - aReturn;
  }).slice(0, 3);

  return (
    <div className="space-y-4">
      {sortedStocks.map(stock => {
        const returnPercentage = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
        
        return (
          <div key={stock._id} className="flex justify-between items-center p-4 bg-gray-50 rounded">
            <div>
              <h3 className="font-medium">{stock.symbol}</h3>
              <p className="text-sm text-gray-500">{stock.companyName}</p>
            </div>
            <div className={`text-right ${returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <p className="font-medium">{returnPercentage.toFixed(2)}%</p>
              <p className="text-sm">${(stock.currentPrice - stock.purchasePrice).toFixed(2)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TopPerformers;