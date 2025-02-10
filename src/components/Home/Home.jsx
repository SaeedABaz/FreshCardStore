import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import useGetProducts from '../../Hooks/useGetProducts';

export default function Home() {
  const { isLoading, error, products, isError, isFetching } = useGetProducts() ;

  return (
    <div>
      <div className="mb-4">
        <MainSlider />
        <CategorySlider />
      </div>

      {isLoading ? (
        <h2>Loading ....</h2>
      ) : error ? (
        <h2 className="text-red-500">Error fetching products!</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mt-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
