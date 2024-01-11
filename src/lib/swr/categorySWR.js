import useSWR from "swr";
import { fetchCategories } from "../axios/categoryAxios";

export const getAllCategories = () => {
  const { data, isLoading, error } = useSWR(
    "http://localhost:8081/categories",
    fetchCategories,
  );

  return {
    data,
    isLoading,
    error,
  };
};
