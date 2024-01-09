import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addNewProduct, updateProduct } from "../lib/axios/productAxios";
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getAllCategories } from "../lib/swr/categorySWR";

const Form = ({ text, product, typeSubmit }) => {
  const { data: getCategories, isLoading, error } = getAllCategories();

  const [img, setImg] = useState(product != null ? { url: product.image } : null);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    console.log("cek");
  }, [img]);

  if (error) {
    console.log(error);
  }

  const schema = yup.object().shape({
    title: yup.string().required("Nama produk harus diisi"),
    price: yup.number().typeError("Harga produk harus diisi"),
    category: yup.string().typeError("Kategori produk harus diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleOnChange = (event) => {
    const data = { file: event.target.files[0], url: URL.createObjectURL(event.target.files[0]) };

    console.log(data);
    setImg(data);
  };

  const handleSubmitNewData = (data) => {
    const payload = {
      title: data.title,
      image: img.file,
      price: data.price,
      categoryId: getCategories.filter((list) => list.name == data.category)[0].id,
    };

    addNewProduct(payload, reset, setImg);
  };

  const handleUpdateData = (data) => {
    const payload = {
      title: data.title,
      image: img.file,
      price: data.price,
      categoryId: getCategories.filter((list) => list.name == data.category)[0].id,
    };

    updateProduct(payload, product.id);
  };

  return (
    <>
      <h1 className="text-lg font-semibold text-center">{text}</h1>
      <form onSubmit={handleSubmit(eval(typeSubmit))} className="flex flex-col gap-3 p-3">
        <div className="flex flex-col">
          <label htmlFor="title">Nama Produk</label>
          <input {...register("title")} defaultValue={product?.title} id="title" type="text" className="inputForm" placeholder="Nama Produk" />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Harga</label>
          <input {...register("price")} defaultValue={product?.price} id="price" type="text" className="inputForm" placeholder="Harga" />
          <p className="text-xs text-red-500">{errors.price?.message}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="image">Upload Gambar</label>
          <div className="flex flex-col items-center">
            {img ? (
              <div className="w-44 h-28 border-2 rounded-lg border-black border-dashed flex flex-col justify-center items-center">
                <div className="border-black h-[80%] relative">
                  <img src={img.url} alt="Gambar Produk" className="text-sm h-full" />
                  <button
                    className="text-black text-xs font-bold absolute right-1 top-0"
                    onClick={() => {
                      setImg(null);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ) : (
              <div onClick={() => document.getElementById("image").click()} className="w-44 h-28 border-2 rounded-lg border-black border-dashed flex flex-col justify-center items-center hover:cursor-pointer">
                <input id="image" onChange={handleOnChange} type="file" className="inputForm" hidden required />
                <AiOutlineCloudUpload className="w-[50%] h-[50%]" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">Kategori</label>
          {isLoading ? (
            <div>Loading....</div>
          ) : (
            <>
              <select {...register("category")} id="category" className="inputForm" defaultValue={product?.category}>
                <option value="">Pilih Kategori</option>
                {getCategories?.map((list) => (
                  <option key={list.id} value={list.name}>
                    {list.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-red-500">{errors.category?.message}</p>
            </>
          )}
        </div>
        <button type="submit" className="border-2 rounded-lg hover:bg-slate-300">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
