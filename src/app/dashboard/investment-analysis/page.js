"use client"

import { useState, useEffect } from 'react';
import { MdCancel } from "react-icons/md";

const locations = ['Ibadan', 'Niger', 'Ife', 'Kano', 'Lagos'];
const commodities = ['Maize', 'Cocoa', 'Ginger', 'Cashew', 'Sorghum', 'Paddy Rice', 'Soybean', 'Sesame'];

const mockPrices = {
  Ibadan: { Maize: 1500, Cocoa: 1800, Ginger: 2000, Cashew: 2200, Sorghum: 1650, 'Paddy Rice': 2100, Soybean: 1950, Sesame: 2300 },
  Niger: { Maize: 1450, Cocoa: 1750, Ginger: 2100, Cashew: 2150, Sorghum: 1600, 'Paddy Rice': 2050, Soybean: 1900, Sesame: 2250 },
  Ife: { Maize: 1550, Cocoa: 1850, Ginger: 1950, Cashew: 2250, Sorghum: 1700, 'Paddy Rice': 2150, Soybean: 2000, Sesame: 2350 },
  Kano: { Maize: 1480, Cocoa: 1780, Ginger: 2050, Cashew: 2180, Sorghum: 1630, 'Paddy Rice': 2080, Soybean: 1930, Sesame: 2280 },
  Lagos: { Maize: 1600, Cocoa: 1900, Ginger: 2150, Cashew: 2350, Sorghum: 1750, 'Paddy Rice': 2200, Soybean: 2050, Sesame: 2400 }
};

const InvestmentAnalysis = () => {
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [investmentItems, setInvestmentItems] = useState([]);
  const [costName, setCostName] = useState('');
  const [costAmount, setCostAmount] = useState('');
  const [additionalCosts, setAdditionalCosts] = useState([]);
  const [summary, setSummary] = useState({ subtotal: 0, additional: 0, total: 0 });

  useEffect(() => {
    const subtotal = investmentItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const additional = additionalCosts.reduce((acc, cost) => acc + cost.amount, 0);
    setSummary({ subtotal, additional, total: subtotal + additional });
  }, [investmentItems, additionalCosts]);

  const addCommodity = () => {
    if (!selectedCommodity || !selectedLocation) return;

    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      commodity: selectedCommodity,
      location: selectedLocation,
      quantity: quantity,
      price: mockPrices[selectedLocation][selectedCommodity] || 0
    };

    setInvestmentItems([...investmentItems, newItem]);
    setSelectedCommodity('');
    setSelectedLocation('');
    setQuantity(1);
  };

  const addAdditionalCost = () => {
    if (!costName || !costAmount) return;
    
    const newCost = {
      id: Math.random().toString(36).substr(2, 9),
      name: costName,
      amount: Number(costAmount)
    };

    setAdditionalCosts([...additionalCosts, newCost]);
    setCostName('');
    setCostAmount('');
  };

  const removeItem = (id) => {
    setInvestmentItems(items => items.filter(item => item.id !== id));
  };

  const removeAdditionalCost = (id) => {
    setAdditionalCosts(costs => costs.filter(cost => cost.id !== id));
  };

  return (
    <div className="container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-8">
      {/* Summary Panel (Mobile First) */}
      <div className="w-full md:w-80 bg-white rounded-lg shadow-sm border p-4 md:p-6 order-1 md:order-2 mb-4 md:mb-0">
        <h2 className="text-sm font-semibold mb-3 md:mb-4 text-gray-800">Investment Summary</h2>
        
        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">₦{summary.subtotal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-gray-600">Additional Costs:</span>
            <span className="font-medium">₦{summary.additional.toLocaleString()}</span>
          </div>
          
          <div className="border-t pt-2 md:pt-3 flex justify-between text-xs md:text-sm font-semibold">
            <span>Total Investment:</span>
            <span>₦{summary.total.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full mt-4 md:mt-6 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-green-900 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          Save Investment Plan
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 order-2 md:order-1">
        <h1 className="text-sm font-semibold mb-3 md:mb-4 text-gray-800">Investment Analysis</h1>
        
        {/* Commodity Selection Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6 mb-4 md:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
            <div>
              <label className="block text-xs md:text-sm text-gray-700 mb-1 md:mb-2">Commodity</label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                className="w-full px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
              >
                <option value="">Select commodity</option>
                {commodities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs md:text-sm text-gray-700 mb-1 md:mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
              >
                <option value="">Select location</option>
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs md:text-sm text-gray-700 mb-1 md:mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                className="w-full px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
                min="1"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={addCommodity}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-green-900 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full min-w-[600px] md:min-w-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3">Commodity</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3">Location</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3">Qty</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3">Price</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3">Total</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3"></th>
                </tr>
              </thead>
              <tbody>
                {investmentItems.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm text-gray-600">{item.commodity}</td>
                    <td className="px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm text-gray-600">{item.location}</td>
                    <td className="px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm text-gray-600">{item.quantity}</td>
                    <td className="px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm text-gray-600">₦{item.price.toLocaleString()}</td>
                    <td className="px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm text-gray-600">₦{(item.quantity * item.price).toLocaleString()}</td>
                    <td className="px-2 py-1.5 md:px-4 md:py-3">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <MdCancel className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Costs Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
          <h2 className="text-sm font-semibold mb-3 md:mb-4 text-gray -800">Additional Costs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
            <div>
              <input
                type="text"
                value={costName}
                onChange={(e) => setCostName(e.target.value)}
                placeholder="Cost name"
                className="w-full px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                value={costAmount}
                onChange={(e) => setCostAmount(e.target.value)}
                placeholder="Amount"
                className="w-full px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm border rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <button
                onClick={addAdditionalCost}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-green-900 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Add Cost
              </button>
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full min-w-[400px] md:min-w-0">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3">Cost Name</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3">Amount</th>
                  <th className="text-left text-xs md:text-sm font-medium text-gray-700 px-2 py-2 md:px-4 md:py-3"></th>
                </tr>
              </thead>
              <tbody>
                {additionalCosts.map((cost) => (
                  <tr key={cost.id} className="border-t hover:bg-gray-50">
                    <td className="px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm text-gray-600">{cost.name}</td>
                    <td className="px-2 py-1.5 md:px-4 md:py-3 text-xs md:text-sm text-gray-600">₦{cost.amount.toLocaleString()}</td>
                    <td className="px-2 py-1.5 md:px-4 md:py-3">
                      <button 
                        onClick={() => removeAdditionalCost(cost.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <MdCancel className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAnalysis;