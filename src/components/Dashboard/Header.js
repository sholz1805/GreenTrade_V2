import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50 shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="text-green-900 md:hidden z-50"
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? (
            <FaTimes size={24} className="transition-transform duration-300" />
          ) : (
            <FaBars size={24} className="transition-transform duration-300" />
          )}
        </button>

        <div className="hidden md:flex items-center ml-4">
          <Image
            src="/GreenTradeLogoMain.png"
            alt="GreenTrade Logo"
            width={40}
            height={40}
            className="mb-1"
          />
          <h1 className="text-lg font-bold text-green-900 ml-2">GreenTrade</h1>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 border-2 border-green-900 text-green-900 font-medium hover:bg-green-100 transition-colors"
          aria-label="User account menu"
        >
          SA
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            <ul className="py-2">
              <li>
                <button
                  className="w-full px-4 py-2 text-left text-green-900 hover:bg-green-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="w-full px-4 py-2 text-left text-green-900 hover:bg-green-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;