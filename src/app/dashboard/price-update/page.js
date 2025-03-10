"use client"

import { useState, useEffect } from 'react';
import { fetchHistoricalPrices, savePriceUpdate } from '../../../utils/mockDB';

const commodities = [
  'Maize',
  'Cocoa',
  'Ginger',
  'Cashew',
  'Soybean',
  'Sesame',
  'Paddy Rice',
  'Sorghum',
];

const UpdatePrices = () => {
  const [mode, setMode] = useState('single');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [singlePrice, setSinglePrice] = useState('');
  const [singleDate, setSingleDate] = useState('');
  const [bulkDate, setBulkDate] = useState('');
  const [bulkPrices, setBulkPrices] = useState(Object.fromEntries(commodities.map(c => [c, ''])));
  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [displayedPrices, setDisplayedPrices] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchHistoricalPrices();
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistoricalPrices(sortedData);
        setDisplayedPrices(sortedData.slice(0, 10));
      } catch (err) {
        setError('Failed to load historical prices');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (showAll) {
      setDisplayedPrices(historicalPrices);
    } else {
      setDisplayedPrices(historicalPrices.slice(0, 10));
    }
  }, [showAll, historicalPrices]);

  const handleBulkPriceChange = (commodity, value) => {
    setBulkPrices(prev => ({ ...prev, [commodity]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newEntry = mode === 'single' 
        ? { date: singleDate, [selectedCommodity]: Number(singlePrice) }
        : { date: bulkDate, ...Object.fromEntries(Object.entries(bulkPrices).map(([k, v]) => [k, Number(v)])) };

      const updatedData = await savePriceUpdate(newEntry);
      setHistoricalPrices(updatedData);

      if (mode === 'single') {
        setSelectedCommodity('');
        setSinglePrice('');
        setSingleDate('');
      } else {
        setBulkDate('');
        setBulkPrices(Object.fromEntries(commodities.map(c => [c, ''])));
      }
    } catch (err) {
      setError('Failed to save prices');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-sm font-semibold mb-4 text-gray-800">Commodity Price Management</h1>
      
      {!showAll && (
        <>
          {loading && <div className="mb-4 text-green-700 text-sm">Loading data...</div>}
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setMode('single')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                mode === 'single' 
                  ? 'bg-green-900 text-white shadow-md' 
                  : 'bg-gray-500 text-white hover:bg-gray-400 transition-colors'
              }`}
            >
              Single Update
            </button>
            <button
              onClick={() => setMode('bulk')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                mode === 'bulk' 
                  ? 'bg-green-900 text-white shadow-md' 
                  : 'bg-gray-500 text-white hover:bg-gray-400 transition-colors'
              }`}
            >
              Bulk Update
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            {mode === 'single' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Commodity</label>
                  <select
                    value={selectedCommodity}
                    onChange={(e) => setSelectedCommodity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
                    required
                  >
                    <option value="">Select commodity</option>
                    {commodities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Price (NGN)</label>
                  <input
                    type="number"
                    value={singlePrice}
                    onChange={(e) => setSinglePrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={singleDate}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSingleDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <div className="mb-4 max-w-xs">
                  <label className="block text-sm text-gray-700 mb-2">Bulk Update Date</label>
                  <input
                    type="date"
                    value={bulkDate}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBulkDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-700 px-4 py-3">Commodity</th>
                        <th className="text-left text-sm font-medium text-gray-700 px-4 py-3">Price (NGN)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commodities.map((commodity) => (
                        <tr key={commodity} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-600">{commodity}</td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={bulkPrices[commodity]}
                              onChange={(e) => handleBulkPriceChange(commodity, e.target.value)}
                              className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 outline-none"
                              required
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-900 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Saving...' : 'Save Prices'}
            </button>
          </form>
        </>
      )}

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-800">
            {showAll ? 'Full Price History' : 'Recent Price History'}
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-green-900 text-sm hover:underline"
          >
            {showAll ? 'View Recent' : 'View All'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-gray-700 font-medium">Date</th>
                {commodities.map((c) => (
                  <th key={c} className="text-left px-6 py-3 text-gray-700 font-medium">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedPrices.map((entry) => (
                <tr key={entry.date} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">{entry.date}</td>
                  {commodities.map((c) => (
                    <td key={c} className="px-6 py-4 text-gray-600">
                      {entry[c] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdatePrices;