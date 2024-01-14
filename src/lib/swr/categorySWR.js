import useSWR from "swr";
import { fetchCategories } from "../axios/categoryAxios";

export const getAllCategories = () => {
  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/categories`,
    fetchCategories,
  );

  return {
    data,
    isLoading,
    error,
  };
};
