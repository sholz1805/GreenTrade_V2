"use client";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const projectionData = [
  { max: 790, avg: 611, min: 515 },    
  { max: 840, avg: 652, min: 545 },    
  { max: 835, avg: 672, min: 602 },    
  { max: 1094, avg: 845, min: 676 },  
  { max: 1225, avg: 870, min: 650 },   
  { max: 1231, avg: 866, min: 685 },   
  { max: 1360, avg: 917, min: 692 },   
  { max: 1209, avg: 887, min: 636 },  
  { max: 1519, avg: 966, min: 652 },   
  { max: 1713, avg: 1054, min: 633 },  
  { max: 2229, avg: 1085, min: 584 },  
  { max: 2229, avg: 1085, min: 584 }, 
];

const getMockData = () => {
  const currentYear = 2025;
  const currentMonth = 1; 

 
  const historical = [];
  const startPrice = 500;
  const endPrice = 611; 
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear - 1, 2 + i); 
    const progress = i / 11;
    const price = startPrice + (endPrice - startPrice) * progress;
    
    historical.push({
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
      price: Math.round(price),
      ...(i === 11 ? { 
        min: endPrice,
        avg: endPrice, 
        max: endPrice  
      } : {
        min: null,
        avg: null,
        max: null
      })
    });
  }

  const projections = [];
  const firstProjection = {
    min: historical[11].price, 
    avg: historical[11].price,
    max: historical[11].price
  };
  
  projections.push({
    month: "March",
    year: 2025,
    prediction: firstProjection
  });
  
  for (let i = 1; i < 12; i++) {
    const date = new Date(currentYear, currentMonth + 1 + i);
    projections.push({
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
      prediction: projectionData[i]
    });
  }

  return { historical, projections };
};

const concatenateMonthYear = (month, year) => {
  return `${month.slice(0, 3)}'${year.toString().slice(2)}`;
};

const PriceProjectionGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [modifiedData, setModifiedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processData = (data) => {
      return [
        ...data.historical.map(entry => ({
          month: concatenateMonthYear(entry.month, entry.year),
          price: entry.price,
          min: entry.min,
          avg: entry.avg,
          max: entry.max,
        })),
        ...data.projections.map(entry => ({
          month: concatenateMonthYear(entry.month, entry.year),
          price: null,
          min: entry.prediction.min,
          avg: entry.prediction.avg,
          max: entry.prediction.max,
        }))
      ];
    };

    setTimeout(() => {
      const mockData = getMockData();
      setModifiedData(processData(mockData));
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (modifiedData.length > 0) {
      setChartData({
        options: {
          chart: {
            type: "line",
            height: 400,
            toolbar: { show: true },
            zoom: { enabled: false },
            fontFamily: "'Inter', sans-serif",
          },
          colors: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"],
          xaxis: {
            categories: modifiedData.map(d => d.month),
            labels: { 
              rotate: -90,
              style: { fontSize: "12px" },
              hideOverlappingLabels: false
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => `₦${value?.toFixed?.(0) || 'N/A'}`,
            },
          },
          stroke: {
            width: [3, 2, 2, 2],
            dashArray: [0, 5, 5, 5],
            curve: "smooth",
          },
          tooltip: {
            custom: ({ dataPointIndex, w }) => {
              const entry = modifiedData[dataPointIndex];
              const colors = w.config.colors;
              const isHistorical = dataPointIndex < 12;

              return `
                <div class="bg-white shadow-lg rounded-md border border-gray-100 text-xs">
                  <div class="px-3 py-2 bg-gray-50 border-b">
                    <strong>${entry.month}</strong>
                  </div>
                  <div class="p-2">
                    ${
                      isHistorical 
                        ? `
                          <div class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full" style="background:${colors[0]}"></span>
                            <span>Actual: ₦${entry.price}</span>
                          </div>
                        `
                        : `
                          <div class="space-y-1">
                            <div class="flex items-center gap-2">
                              <span class="w-3 h-3 rounded-full" style="background:${colors[1]}"></span>
                              <span>Max: ₦${entry.max}</span>
                            </div>
                            <div class="flex items-center gap-2">
                              <span class="w-3 h-3 rounded-full" style="background:${colors[2]}"></span>
                              <span>Avg: ₦${entry.avg}</span>
                            </div>
                            <div class="flex items-center gap-2">
                              <span class="w-3 h-3 rounded-full" style="background:${colors[3]}"></span>
                              <span>Min: ₦${entry.min}</span>
                            </div>
                          </div>
                        `
                    }
                  </div>
                </div>
              `;
            },
          },
          grid: {
            borderColor: "#e0e0e0",
            strokeDashArray: 1,
          },
          legend: {
            show: true,
            position: "top",
            horizontalAlign: "center",
            markers: { radius: 12 }
          }
        },
        series: [
          { name: "Actual Price", data: modifiedData.map(d => d.price) },
          { name: "Max Projection", data: modifiedData.map(d => d.max) },
          { name: "Avg Projection", data: modifiedData.map(d => d.avg) },
          { name: "Min Projection", data: modifiedData.map(d => d.min) },
        ],
      });
    }
  }, [modifiedData]);

  return (
    <div className="p-4 bg-white mt-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Commodity Price Projections</h2>
      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          <div className="animate-pulse">Loading market data...</div>
        </div>
      ) : (
        chartData && (
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={400}
          />
        )
      )}
    </div>
  );
};

export default PriceProjectionGraph;