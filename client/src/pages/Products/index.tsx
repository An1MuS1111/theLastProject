import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance/axiosInstance";

const Products = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance("/products");
        setProductsData(response.data);
      } catch (error) {
        console.error("error fetching products data");
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-2">
      {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Customers also purchased
      </h2> */}

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {productsData.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
