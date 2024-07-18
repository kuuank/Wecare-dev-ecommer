import React, { useState } from "react";
import Header from "../Header";
import ProductList from "../SanPham/productList";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

const DonHang: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="p-4">
        <Header onSearch={handleSearch} />
      </div>
      <div className="flex flex-1">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="lg:hidden p-4 text-blue-500" // Added text-blue-500 to change the color to blue
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        {/* Sidebar for desktop and toggleable sidebar for mobile */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block lg:w-1/4 p-4`}
        >
          <Sidebar />
        </div>
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md m-4 lg:m-0">
          <ProductList searchTerm={searchTerm} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonHang;
