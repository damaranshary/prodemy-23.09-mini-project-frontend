import axios from "axios";

export const fetchProducts = async (url) => {
  const response = await axios.get(url).then((res) => res.data);

  return response.data;
};

export const addNewProduct = async (payload, reset, setImg) => {
  const data = await axios
    .post(`${import.meta.env.VITE_API_URL}/products`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100,
        );
        console.log(progress);
      },
    })
    .then(() => {
      alert("Successfully add product!");
      reset();
      setImg(null);
    })
    .catch((error) => console.log(error));

  return data;
};

export const updateProduct = async (payload, id) => {
  const data = await axios
    .put(`${import.meta.env.VITE_API_URL}/products/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      alert("Successfully update product!");
    })
    .catch((error) => console.log(error));

  return data;
};

export const deleteProduct = async (id) => {
  const data = await axios
    .delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return data;
};
