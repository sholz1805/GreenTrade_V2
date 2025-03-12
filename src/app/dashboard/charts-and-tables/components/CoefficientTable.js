"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CoefficientTable = () => {
  const router = useRouter();

  return (
    <>
      <div className="p-2 flex justify-between items-center">
        <p className="text-sm font-semibold">Coefficient Table</p>
        <button
          onClick={() => router.push("/dashboard/charts-and-tables")}
          className="px-4 py-2 bg-green-900 text-white text-xs rounded hover:bg-green-700"
        >
          Back
        </button>
      </div>
      <div className="p-4 bg-white mt-6">Coefficient Table</div>
    </>
  );
};

export default CoefficientTable;
