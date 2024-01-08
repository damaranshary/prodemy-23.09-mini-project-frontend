import axios from "axios";

export const fetchProducts = async (url) => {
  const response = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);

  return response.data;
};

export const fetchCategories = async (url) => {
  const response = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);

  return response.data;
};
