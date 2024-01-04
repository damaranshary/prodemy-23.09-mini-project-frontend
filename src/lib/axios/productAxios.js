import axios from "axios";

export const fetchProducts = async (url) => {
  const response = await axios.get(url).then((res) => res.data);

  return response.data;
};
