import React, { useState } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Về chúng tôi", href: "/about" },
  { label: "Tin tức", href: "/news" },
  { label: "Đơn hàng", href: "/orders" },
  { label: "Kho vận", href: "/logistics" },
];

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn form reload lại trang

    // Gọi API khi người dùng nhấn tìm kiếm
    try {
      const response = await fetch(
        `/api/getProductData?crdfd_nhomsanphamtext=${searchTerm}`
      );
      const data = await response.json();
      console.log(data); // Bạn có thể xử lý dữ liệu này tiếp theo ý muốn của bạn
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <header className="box-border flex overflow-hidden overflow-x-hidden overflow-y-hidden relative flex-col shrink-0 mt-px mb-10 bg-white border border-solid shadow-sm border-neutral-400 grow-0 h-[150px] text-neutral-400">
      <img
        loading="lazy"
        alt="WeCare logo"
        src="https://cdn.builder.io/api/v1/image/assets%2F72645f1c581446d9b326ff62153df84b%2F4cabc051b75443448a1a92bff409187c"
        className="box-border object-contain object-left overflow-hidden absolute top-px shrink-0 mr-0 aspect-square h-[77px] left-[33px] max-w-[148px] min-h-[20px] min-w-[20px] w-[67px]"
      />
      <div className="box-border flex relative flex-col shrink-0">
        <div className="flex flex-row">
          <h1 className="pb-3 pl-12 mt-3 mb-auto ml-14 text-4xl text-cyan-600 font-[bold]">
            WECARE
          </h1>
          <form
            onSubmit={handleSubmit}
            className="box-border flex absolute items-center self-center py-2 pr-4 pl-3.5 rounded-3xl bg-white h-[51px] left-[346px] max-w-[662px] shadow-[0_6px_10px_rgba(30,144,197,0.5)] top-[15px] w-[820px]"
          >
            <label htmlFor="search-input" className="sr-only">
              Tìm kiếm và nhấn enter
            </label>
            <input
              id="search-input"
              type="text"
              placeholder="Tìm kiếm và nhấn enter"
              className="grow px-4 py-2.5 ml-2.5 rounded-3xl border-[none] w-[70%]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị searchTerm khi người dùng nhập input
            />
            <button
              type="submit"
              className="ml-4 py-2.5 px-5 bg-sky-500 rounded-3xl text-white cursor-pointer border-none"
            >
              Search
            </button>
          </form>

          <div className="flex items-center ml-auto">
            <a
              href="/login"
              className="flex items-center justify-center w-10 h-10 ml-4 text-cyan-500"
            >
              <FaUser size={24} />
            </a>
            <a
              href="/cart"
              className="flex items-center justify-center w-10 h-10 ml-4 text-cyan-500"
            >
              <FaShoppingCart size={24} />
            </a>
          </div>
        </div>
      </div>
      <nav className="flex gap-0 self-stretch my-auto max-md:justify-center">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="pr-4 pl-5 my-auto text-cyan-600 no-underline"
          >
            <h4>{item.label}</h4>
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
