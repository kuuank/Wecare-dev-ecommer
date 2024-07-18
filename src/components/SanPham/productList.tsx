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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/getProductData?crdfd_nhomsanphamtext=${searchTerm}`
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

    fetchData();
  }, [searchTerm]); // Fetch data whenever searchTerm changes

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error.message}</div>;
  }

  return (
    <div className="box-border flex flex-col shrink-0 pb-8 mt-5 h-auto">
      <div className="box-border relative shrink-0 mt-5 h-auto">
        <h2 className="text-2xl font-bold text-black">Danh sách sản phẩm</h2>
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
    </div>
  );
};

export default ProductList;
