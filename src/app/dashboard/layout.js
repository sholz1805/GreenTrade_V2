"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import LogoutModal from "@/components/LogoutModal"; 

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setIsModalOpen(false);
    // Perform logout logic here (e.g., clear tokens, etc.)
    router.push("/auth/signin"); 
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          onLogout={() => setIsModalOpen(true)} 
        />
        <main className="flex-1 p-4 bg-gray-100 text-black overflow-y-auto md:ml-64 pt-16">
          {children}
        </main>
      </div>

      <LogoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogout={handleLogout} 
      />
    </div>
  );
};

export default DashboardLayout;