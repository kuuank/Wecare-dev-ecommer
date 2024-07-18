import React, { useState } from "react";
import Header from "../Header";
import ProductList from "../SanPham/productList";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Pagination from "../paging";

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
      <div className="sticky top-0 bg-white z-50 p-2 shadow-lg border-b border-gray-300">
        <Header onSearch={handleSearch} />
      </div>
      <div className="flex flex-1">
        <button
          className="lg:hidden p-4 text-blue-500"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block lg:w-1/4 p-4 lg:mr-[2px]`} // Reduce margin-right to decrease gap
        >
          <Sidebar />
        </div>
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md m-4 lg:m-0 lg:w-3/4">
          {" "}
          {/* Adjust width to increase size of ProductList */}
          <ProductList searchTerm={searchTerm} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonHang;
