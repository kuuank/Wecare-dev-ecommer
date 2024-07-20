/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  onSearch: (searchTerm: string, searchCategory: string) => void; // Function prop to handle search
}

const navItems: NavItem[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Về chúng tôi", href: "/about" },
  { label: "Tin tức", href: "/news" },
  { label: "Đơn hàng", href: "/orders" },
  { label: "Kho vận", href: "/logistics" },
];

const searchCategories = [
  "TÊN NHÓM SẢN PHẨM",
  "THƯƠNG HIỆU",
  "QUY CÁCH",
  "CHẤT LIỆU",
  "HOÀN THIỆN BỀ MẶT",
  "GIÁ BÁN"
];

const searchKeys: { [key: string]: string } = {
  "TÊN NHÓM SẢN PHẨM": "crdfd_nhomsanphamtext",
  "THƯƠNG HIỆU": "crdfd_thuonghieu",
  "QUY CÁCH": "crdfd_quycach",
  "CHẤT LIỆU": "crdfd_chatlieu",
  "HOÀN THIỆN BỀ MẶT": "crdfd_hoanthienbemat",
  "GIÁ BÁN": "cr1bb_giaban"
};

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState(searchCategories[0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the prop function passed from the parent to handle search and reload
    onSearch(searchTerm.trim(), searchKeys[searchCategory]);

    // Reset the input field
    setSearchTerm("");
  };

  return (
    <header className="box-border flex flex-col items-center bg-white border border-solid border-neutral-300 shadow-sm h-[120px] text-neutral-700">
      <div className="flex items-center justify-between w-full max-w-7xl px-5 py-3">
        <div className="flex items-center">
          <img
            loading="lazy"
            alt="WeCare logo"
            src="https://cdn.builder.io/api/v1/image/assets%2F72645f1c581446d9b326ff62153df84b%2F4cabc051b75443448a1a92bff409187c"
            className="h-[50px] w-auto"
          />
          <h1 className="ml-2 text-3xl text-cyan-600 font-bold">WECARE</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center py-2 px-5 bg-white border border-neutral-300 rounded-full shadow-sm max-w-2xl w-full mx-4"
        >
          <label htmlFor="search-category" className="sr-only">
            Chọn loại tìm kiếm
          </label>
          <select
            id="search-category"
            className="mr-3 py-2 px-3 text-base border-none rounded-full focus:outline-none"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            {searchCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="search-input" className="sr-only">
            Tìm kiếm và nhấn enter
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Tìm kiếm và nhấn enter"
            className="flex-grow px-3 py-2 text-base border-none rounded-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="ml-3 py-2 px-5 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-base font-medium cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex items-center">
          <a
            href="/login"
            className="flex items-center justify-center w-10 h-10 mx-2 text-cyan-600 hover:text-cyan-700"
          >
            <FaUser size={24} />
          </a>
          <a
            href="/cart"
            className="flex items-center justify-center w-10 h-10 mx-2 text-cyan-600 hover:text-cyan-700"
          >
            <FaShoppingCart size={24} />
          </a>
        </div>
      </div>

      <nav className="flex justify-center gap-6 w-full max-w-7xl mt-1">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="text-cyan-600 hover:text-cyan-700 text-base font-medium no-underline"
          >

            
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;