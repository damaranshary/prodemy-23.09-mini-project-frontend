import useSWR from "swr";
import { fetchProducts } from "../axios/productAxios";

export const getAllProducts = (category, query, sortBy) => {
  let url = "http://localhost:8080/products";

  // if category is not null
  if (category) {
    url = `${url}?category=${category}`;

    // if query is not null and category is not null
    if (query) {
      url += `&q=${query}`;
    }

    // if sortBy is not null and category is not null and query is not null
    if (sortBy) {
      url += `&sortBy=${sortBy}`;
    }
  }
  // if category is null
  else {
    // if query is not null while category is null
    if (query) {
      url += `?q=${query}`;

      // if sortBy and query is not null while category is null
      if (sortBy) {
        url += `&sortBy=${sortBy}`;
      }
    }
    // if sortBy is not null but the query and category are null
    else {
      if (sortBy) {
        url += `?sortBy=${sortBy}`;
      }
    }
  }

  const { data, isLoading, error, mutate } = useSWR(url, fetchProducts);

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
};
