import * as React from "react";
import axios from "axios";

type Product = {
  crdfd_nhomsanphamtext: string;
  crdfd_thuonghieu: string;
  crdfd_quycach: string;
  crdfd_chatlieu: string;
  crdfd_hoanthienbemat: string;
};

interface ProductListProps {
  searchTerm: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm }) => {
  const [data, setData] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(5);

  const fetchData = async (
    searchTerm: string,
    offset: number,
    limit: number
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/getProductData?crdfd_nhomsanphamtext=${searchTerm}&limit=${limit}&offset=${offset}`
      );
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData(searchTerm, page * limit, limit);
  }, [searchTerm, page, limit]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error.message}</div>;
  }

  const totalPages = data.length < limit ? page + 1 : page + 2;

  return (
    <div className="box-border flex flex-col shrink-0 pb-8 mt-5 h-auto">
      <div className="box-border relative shrink-0 mt-5 h-auto">
        <h2 className="text-2xl font-bold text-black">Danh sách sản phẩm</h2>
      </div>
      <div className="flex justify-between items-center mt-5 mb-2">
        <div className="flex items-center">
          <label className="mr-2">Items per page:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded text-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Page:</label>
          <input
            type="number"
            value={page + 1}
            onChange={(e) => setPage(Math.max(Number(e.target.value) - 1, 0))}
            className="p-2 w-16 border border-gray-300 rounded text-center text-black"
            min={1}
            max={totalPages}
          />
          <span className="ml-2">of {totalPages}</span>
        </div>
      </div>
      <div className="box-border flex relative flex-col shrink-0 mt-5 h-auto">
        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-black">
        <button
          className="px-4 py-2  bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 text-black"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          <svg
            className="h-5 w-5 inline-block text-black"
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
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="px-4 py-2 text-black bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.length < limit}
        >
          Next
          <svg
            className="h-5 w-5 inline-block"
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
  );
};

export default ProductList;
