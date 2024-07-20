import * as React from "react";
import axios from "axios";
import Products from "../../../model/data_model";

interface ProductListProps {
  searchTerm: string;
  searchKey: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm, searchKey }) => {
  const [allData, setAllData] = React.useState<Products[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const fetchAllData = async (searchTerm: string, searchKey: string) => {
    try {
      setLoading(true);
      const query = searchTerm && searchKey
        ? `searchTerm=${encodeURIComponent(searchTerm)}&searchKey=${encodeURIComponent(searchKey)}`
        : ``;
      const response = await axios.get(
        `/api/getProductData?${query}`
      );
      if (Array.isArray(response.data)) {
        setAllData(response.data);
      } else {
        setAllData([]);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllData(searchTerm, searchKey);
  }, [searchTerm, searchKey]);

  const totalCount = allData.length;
  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const paginatedData = React.useMemo(() => {
    const startIndex = (page - 1) * limit;
    return allData.slice(startIndex, startIndex + limit);
  }, [allData, page, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-black">Có lỗi xảy ra: {error.message}</div>;
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === page
              ? "bg-blue-500 text-white"
              : "bg-white text-black border border-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="box-border flex flex-col shrink-0 pb-8 mt-5 h-auto">
      <div className="box-border relative shrink-0 mt-5 h-auto">
        <h2 className="text-2xl font-bold text-black">Danh sách sản phẩm</h2>
      </div>
      <div className="box-border flex relative flex-col shrink-0 mt-5 h-auto overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Tên nhóm sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Thương hiệu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Quy cách
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Chất liệu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Hoàn thiện bề mặt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Giá bán
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {item.crdfd_nhomsanphamtext}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {item.crdfd_thuonghieu}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {item.crdfd_quycach}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {item.crdfd_chatlieu}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {item.crdfd_hoanthienbemat}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {item.cr1bb_giaban}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 text-black">
        <div className="flex items-center space-x-2">
          <span>Items per page:</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="p-2 border border-gray-300 rounded text-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <span className="ml-4">Total records: {totalCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Prev
          </button>
          {renderPageNumbers()}
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
            <svg
              className="h-4 w-4 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;