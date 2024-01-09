import axios from "axios";

export const fetchCategories = async (url) => {
  const response = await axios.get(url).then((res) => res.data);

  return response.data;
};
