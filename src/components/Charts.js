"use client"

import React from 'react';
import Chart from 'react-apexcharts';

export const BarChart = () => {
  const options = {
    chart: {
      type: 'bar',
      height: '100%',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    fill: {
      colors: ['#4F46E5'], 
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: 'Revenue Overview',
      align: 'left',
    },
  };

  const series = [
    {
      name: 'Revenue',
      data: [6500, 5900, 8000, 8100, 5600, 5500],
    },
  ];

  return (
    <Chart options={options} series={series} type="bar" height="100%" />
  );
};

export const LineChart = () => {
  const options = {
    chart: {
      type: 'line',
      height: '100%',
      toolbar: { show: false },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    title: {
      text: 'Sales Trend',
      align: 'left',
    },
    fill: {
      colors: ['#10B981'], 
    },
    dataLabels: {
      enabled: true,
    },
  };

  const series = [
    {
      name: 'Sales',
      data: [45, 60, 75, 50, 80, 90],
    },
  ];

  return (
    <Chart options={options} series={series} type="line" height="100%" />
  );
};