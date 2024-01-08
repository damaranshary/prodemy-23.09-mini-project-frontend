import useSWR from "swr";
import { fetchCategories, fetchProducts } from "../axios/axios";

export const getAllProducts = (category) => {
  let url = "http://localhost:8080/products";

  if (category) {
    url = `${url}?category=${category}`;
  }

  const { data, isLoading, error } = useSWR(url, fetchProducts);

  return {
    data,
    isLoading,
    isError: error,
  };
};