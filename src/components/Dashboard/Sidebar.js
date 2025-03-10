import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  IoSettingsOutline,
  IoPieChartOutline,
  IoAdd,
  IoPricetagsOutline,
  IoHomeOutline,
  IoPowerOutline,
  IoAnalytics,
} from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { AiOutlineFilePdf } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const [isDataManagementOpen, setIsDataManagementOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <>
      <nav
        className={`fixed w-64 bg-white border-r border-green-900 text-gray-800 h-[calc(100vh-4rem)] top-16 left-0 z-40 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="md:hidden p-4 border-b border-green-900">
          <div className="flex items-center">
            <Image
              src="/GreenTradeLogoMain.png"
              alt="logo"
              width={40}
              height={40}
              className="mb-2"
            />
            <h1 className="text-lg text-black font-bold ml-2">GreenTrade</h1>
          </div>
        </div>

        <ul className="space-y-2 p-4 mt-4 md:mt-0">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center text-sm p-3 rounded ${
                isActive("/dashboard")
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-50 hover:text-green-900"
              }`}
              onClick={toggleSidebar}
            >
              <IoHomeOutline size={20} className="mr-3" />
              Home
            </Link>
          </li>
          <li>
            <button
              className={`w-full text-sm text-left p-3 rounded flex items-center ${
                isDataManagementOpen
                  ? "bg-green-50 text-green-900"
                  : "hover:bg-green-50 hover:text-green-900"
              }`}
              onClick={() => setIsDataManagementOpen(!isDataManagementOpen)}
            >
              <IoSettingsOutline className="mr-3" size={20} />
              Data Management
              <span className="ml-auto">
                {isDataManagementOpen ? (
                  <FaChevronUp size={10} />
                ) : (
                  <FaChevronDown size={10} />
                )}
              </span>
            </button>

            {isDataManagementOpen && (
              <ul className="pl-4 space-y-1">
                <li>
                  <Link
                    href="/dashboard/price-update"
                    className={`flex items-center text-sm p-3 rounded ${
                      isActive("/dashboard/price-update")
                        ? "bg-green-700 text-white"
                        : "hover:bg-green-50 hover:text-green-900"
                    }`}
                    onClick={toggleSidebar}
                  >
                    <IoPricetagsOutline className="mr-3" size={20} />
                    Price Update
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/add-commodity"
                    className={`flex items-center text-sm p-3 rounded ${
                      isActive("/dashboard/add-commodity")
                        ? "bg-green-700 text-white"
                        : "hover:bg-green-50 hover:text-green-900"
                    }`}
                    onClick={toggleSidebar}
                  >
                    <IoAdd className="mr-3" size={20} />
                    Add Commodity
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/dashboard/charts"
              className={`flex items-center text-sm p-3 rounded ${
                isActive("/dashboard/charts")
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-50 hover:text-green-900"
              }`}
              onClick={toggleSidebar}
            >
              <IoPieChartOutline size={20} className="mr-3" />
              Charts and Tables
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/vendor-management"
              className={`flex items-center text-sm p-3 rounded ${
                isActive("/dashboard/vendor-management")
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-50 hover:text-green-900"
              }`}
              onClick={toggleSidebar}
            >
              <PiUsers size={20} className="mr-3" />
              Vendor Management
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/report"
              className={`flex items-center text-sm p-3 rounded ${
                isActive("/dashboard/report")
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-50 hover:text-green-900"
              }`}
              onClick={toggleSidebar}
            >
              <AiOutlineFilePdf size={20} className="mr-3" />
              Report
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/transaction-analysis"
              className={`flex items-center text-sm p-3 rounded ${
                isActive("/dashboard/transaction-analysis")
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-50 hover:text-green-900"
              }`}
              onClick={toggleSidebar}
            >
              <IoAnalytics size={20} className="mr-3" />
              Transaction Analysis
            </Link>
          </li>
        </ul>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-green-900 bg-white">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 border-2 border-green-900 text-green-900 font-medium hover:bg-green-100 transition-colors"
                aria-label="User  account menu"
              >
                SA
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">Shola Azeez</p>
              <p className="text-xs text-gray-500">sholz@greentrade.com</p>
            </div>
            
            <button
              className="ml-auto p-2 hover:bg-green-50 rounded-full transition-colors"
              onClick={onLogout}
            >
              <IoPowerOutline className="text-green-900" size={18} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;