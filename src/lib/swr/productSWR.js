import useSWR from "swr";
import { fetchProducts } from "../axios/productAxios";

export const getAllProducts = () => {
  const { data, isLoading, error } = useSWR(
    "http://localhost:8080/products",
    fetchProducts
  );

  return {
    data,
    isLoading,
    error,
  };
};
