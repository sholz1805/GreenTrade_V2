import React from "react";
import ReactDOM from "react-dom";
import { IoPowerOutline } from "react-icons/io5";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 sm:w-1/3">
        <IoPowerOutline className="text-red-500" size={40} />
        <h2 className="text-md text-black font-semibold">Confirm Logout</h2>
        <p className="text-sm text-black">Are you sure you want to log out?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
            onClick={() => {
              onLogout(); 
              onClose(); 
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;