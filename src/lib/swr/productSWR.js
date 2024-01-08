import useSWR from "swr";
import { fetchProducts } from "../axios/axios";

export const getAllProducts = (category, query) => {
  let url = "http://localhost:8080/products";

  if (category) {
    url = `${url}?category=${category}`;

    if (query) {
      url += `&q=${query}`;
    }
  } else {
    if (query) {
      url = `${url}?q=${query}`;
    }
  }

  const { data, isLoading, error } = useSWR(url, fetchProducts);

  return {
    data,
    isLoading,
    isError: error,
  };
};

export const getAllCategories = () => {
  const { data, isLoading, error } = useSWR(
    "http://localhost:8080/categories",
    fetchProducts
  );

  return {
    categoriesData: data,
    isLoading,
    isError: error,
  };
}