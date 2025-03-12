"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CoefficientChart = () => {
  const router = useRouter();

  return (
    <>
      <div className="p-2 flex justify-between items-center">
        <p className="text-sm font-semibold">Coefficient Chart</p>
        <button
          onClick={() => router.push("/dashboard/charts-and-tables")}
          className="px-4 py-2 bg-green-900 text-white text-xs rounded hover:bg-green-700"
        >
          Back
        </button>
      </div>
      <div className="p-4 bg-white mt-6">Coefficient Chart</div>
    </>
  );
};

export default CoefficientChart;
