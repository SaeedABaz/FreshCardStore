import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export default function useGetProducts() {
    const getProducts = () => axios.get("https://ecommerce.routemisr.com/api/v1/products");
    const { isLoading, error, data: products, isError, isFetching } = useQuery({
        queryKey: ["getProducts"],
        queryFn: getProducts,
    
        staleTime: 5000,
        select : data => data.data.data,
        retry: ()=> confirm("Error in loading data, tr yagain?")
      });

      return { isLoading, error, products, isError, isFetching };
      
}
