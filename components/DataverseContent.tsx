import React, { useEffect, useState } from "react";
import { SOD, getSaleOrder_paging } from "../lib/dataverse";
import styles from "../styles/components/DataverseContent.module.css";

export const DataverseContent: React.FC = () => {
  const [data, setData] = useState<SOD[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const result = await getSaleOrder_paging();
        // console.log(result);
        const result2 = await getSaleOrder_paging(1, 10);

        setData(result2.saleOrders);
      } catch (error) {
        console.error("Error fetching data from Dataverse:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className={styles.loading}>Loading Dataverse content...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data || data.length === 0)
    return <div className={styles.empty}>No data available</div>;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sale Orders</div>
      {data.map((item: SOD, index: number) => (
        <div key={index} className={styles.item}>
          <h3 className={styles.itemTitle}>{item.crdfd_name}</h3>
          <p>Product: {item.crdfd_productname}</p>
          <p>Details: {item.crdfd_soonhangchitiet2}</p>
          <p>Total (without VAT): {item.crdfd_tongtienkhongvatnew}</p>
          <p>VAT: {item.crdfd_giatrivat}</p>
          <p>Customer: {item.crdfd_khachhangtext}</p>
          <p>Location: {item.crdfd_localtext}</p>
          <p>Sales Rep: {item.crdfd_nhanviensalestext}</p>
        </div>
      ))}
    </div>
  );
};

export default DataverseContent;
