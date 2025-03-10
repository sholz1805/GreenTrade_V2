// utils/mockDB.js
let historicalPrices = [
    { date: '2023-01-01', Maize: 200, Cocoa: 300, Ginger: 150, Cashew: 400, Soybean: 250, Sesame: 350, 'Paddy Rice': 180, Sorghum: 220 },
    { date: '2023-01-15', Maize: 210, Cocoa: 310, Ginger: 160, Cashew: 410, Soybean: 260, Sesame: 360, 'Paddy Rice': 190, Sorghum: 230 },
  ];
  
  export const fetchHistoricalPrices = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return historicalPrices;
  };
  
  export const savePriceUpdate = async (newEntry) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update "database"
    const existingIndex = historicalPrices.findIndex(entry => entry.date === newEntry.date);
    if (existingIndex !== -1) {
      historicalPrices[existingIndex] = { ...historicalPrices[existingIndex], ...newEntry };
    } else {
      historicalPrices = [...historicalPrices, newEntry];
    }
    return historicalPrices;
  };