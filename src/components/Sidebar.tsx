import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTools,
  faBox,
  faFlask,
  faRecycle,
  faWrench,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

interface ProductGroup {
  id: string;
  name: string;
  products: string[];
}

const Sidebar: React.FC = () => {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductGroups = async () => {
      try {
        const response = await axios.get("/api/getProductGroup");
        const sortedGroups = response.data.sort(
          (a: ProductGroup, b: ProductGroup) =>
            b.products.length - a.products.length
        );
        setProductGroups(sortedGroups);
      } catch (error) {
        console.error("Error fetching product groups:", error);
      }
    };

    fetchProductGroups();
  }, []);

  const getIcon = (groupName: string) => {
    switch (groupName.toLowerCase()) {
      case "kim khí & phụ kiện":
        return faTools;
      case "bao bì":
        return faBox;
      case "hóa chất":
        return faFlask;
      case "vật tư tiêu hao":
        return faRecycle;
      case "công cụ - dụng cụ":
        return faWrench;
      case "phụ tùng thay thế":
        return faCog;
      default:
        return faBox;
    }
  };

  const getColumnClass = (productsLength: number) => {
    if (productsLength <= 10) return "grid-cols-2";
    if (productsLength <= 15) return "grid-cols-3";
    return "grid-cols-4";
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-white border-r-2 border-gray-300 h-screen">
        <h2 className="text-lg font-semibold p-4 text-black">
          Danh mục sản phẩm
        </h2>
        <ul>
          {productGroups.map((group) => (
            <li
              key={group.id}
              className="relative"
              onMouseEnter={() => setHoveredGroup(group.id)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <div className="flex items-center justify-between w-full px-4 py-2 text-sm text-black hover:bg-gray-100">
                <span className="flex items-center">
                  <FontAwesomeIcon
                    icon={getIcon(group.name)}
                    className="mr-2 text-gray-600"
                  />
                  {group.name}
                </span>
                <span className="text-gray-600">
                  ({group.products.length})
                  <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </span>
              </div>
              {hoveredGroup === group.id && (
                <div
                  className="absolute left-full top-0 bg-white border border-gray-300 shadow-lg z-10"
                  style={{
                    width: "max-content",
                    maxWidth: "800px",
                    maxHeight: "80vh",
                  }}
                >
                  <h3 className="text-md font-semibold p-4 text-black border-b border-gray-200">
                    {group.name}/Vật tư tiêu hao
                  </h3>
                  <div
                    className="overflow-y-auto"
                    style={{ maxHeight: "calc(80vh - 60px)" }}
                  >
                    <div
                      className={`grid ${getColumnClass(
                        group.products.length
                      )} gap-2 p-4`}
                    >
                      {group.products.map((product, index) => (
                        <div
                          key={index}
                          className="text-sm text-black hover:bg-gray-100 cursor-pointer"
                        >
                          {product}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
