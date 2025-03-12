"use client";
import Link from "next/link";
import React from "react";
import {
  FaTable,
  FaChartBar,
  FaChartLine,
  FaChartArea,
} from "react-icons/fa";
import { RiTableView } from "react-icons/ri";
import { IoBarChartSharp } from "react-icons/io5";
import { MdOutlineSsidChart } from "react-icons/md";

const Card = ({ icon, title, description, iconColor, bgColor, path }) => {
  return (
    <Link href={path} className="block hover:no-underline">
      <div className="bg-white rounded-lg p-4 m-2 flex flex-col transition-transform transform hover:scale-105">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${bgColor} mb-4`}
        >
          <div className={`text-xl ${iconColor}`}>{icon}</div>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 text-left">
          {title}
        </h3>
        <p className="text-gray-600 text-sm text-left ">{description}</p>
      </div>
    </Link>
  );
};

const page = () => {
  const cardsData = [
    {
      icon: <FaChartLine />,
      title: "Price Projection",
      description: "Forecast future price trends based on historical data",
      iconColor: "text-green-600",
      bgColor: "bg-green-200",
      path: "/dashboard/charts-and-tables/price-projection",
    },
    {
      icon: <IoBarChartSharp />,
      title: "Co-efficient Chart",
      description: "Coefficient data representation.",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-200",
      path: "/dashboard/charts-and-tables/coefficient-chart",
    },
    {
      icon: <MdOutlineSsidChart />,
      title: "Inflation Chart",
      description: "Track inflation rates over time",
      iconColor: "text-red-600",
      bgColor: "bg-red-200",
      path: "/dashboard/charts-and-tables/inflation-chart",
    },
    {
      icon: <FaChartBar />,
      title: "Year on year Chart",
      description: "Compare annual performance metrics .",
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-200",
      path: "/dashboard/charts-and-tables/year-on-year-chart",
    },
    {
      icon: <FaChartArea />,
      title: "Price Volatility",
      description: "Visualize fluctuations in prices over a specified period",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-200",
      path: "/dashboard/charts-and-tables/price-volatility",
    },
    {
      icon: <RiTableView />,
      title: "Commodity Prices Table",
      description: "Detailed table of current and historical prices.",
      iconColor: "text-pink-600",
      bgColor: "bg-pink-200",
      path: "/dashboard/charts-and-tables/commodity-prices-table",
    },
    {
      icon: <FaTable />,
      title: "Price Averages Table",
      description: "display average prices.",
      iconColor: "text-teal-600",
      bgColor: "bg-teal-200",
      path: "/dashboard/charts-and-tables/price-averages-table",
    },
    {
      icon: <RiTableView />,
      title: "Co-efficient Table",
      description: "Present co-efficient table",
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-200",
      path: "/dashboard/charts-and-tables/coefficient-table",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-md mt-4 font-semibold text-gray-800 mb-4">
        Charts & Tables
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default page;
