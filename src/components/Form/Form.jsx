import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addNewProduct, updateProduct } from "../../lib/axios/productAxios";
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getAllCategories } from "../../lib/swr/categorySWR";

const Form = ({ text, product, typeSubmit }) => {
  const { data: getCategories, isLoading, error } = getAllCategories();
  console.log(
    product &&
      getCategories.filter((category) => category.name == product?.category)[0]
        .id,
  );

  const [img, setImg] = useState();

  useEffect(() => {
    setImg(product ? { url: product.image } : null);
    console.log(img);
  }, [product]);

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
    const data = {
      file: event.target.files[0],
      url: URL.createObjectURL(event.target.files[0]),
    };

    console.log(data);
    setImg(data);
  };

  const handleSubmitNewData = (data) => {
    const payload = {
      title: data.title,
      image: img.file,
      price: data.price,
      categoryId: data.category,
    };

    addNewProduct(payload, reset, setImg);
  };

  const handleUpdateData = (data) => {
    const payload = {
      title: data.title,
      image: img.file,
      price: data.price,
      categoryId: data.category,
    };

    updateProduct(payload, product.id);
  };

  return (
    <>
      <h1 className="mt-3 text-center text-lg font-semibold">{text}</h1>
      <form
        onSubmit={handleSubmit(eval(typeSubmit))}
        className="flex flex-col gap-3 p-3"
      >
        <div className="flex flex-col">
          <label htmlFor="title">Nama Produk</label>
          <input
            {...register("title")}
            defaultValue={product?.title}
            id="title"
            type="text"
            className="inputForm"
            placeholder="Nama Produk"
          />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Harga</label>
          <input
            {...register("price")}
            defaultValue={product?.price}
            id="price"
            type="text"
            className="inputForm"
            placeholder="Harga"
          />
          <p className="text-xs text-red-500">{errors.price?.message}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="image">Upload Gambar</label>
          <div className="flex flex-col items-center">
            {img ? (
              <div className="flex h-28 w-44 flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary">
                <div className="relative h-[80%]">
                  <img
                    src={img.url}
                    alt="Gambar Produk"
                    className="h-full text-sm"
                  />
                  <button
                    className="absolute right-1 top-0 text-xs font-bold text-black"
                    onClick={() => {
                      setImg(null);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => document.getElementById("image").click()}
                className="group flex h-28 w-44 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 hover:cursor-pointer hover:border-accent"
              >
                <input
                  id="image"
                  onChange={handleOnChange}
                  type="file"
                  className="inputForm"
                  hidden
                  required
                />
                <AiOutlineCloudUpload className="h-[50%] w-[50%] fill-slate-300 group-hover:fill-accent" />
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
              <select
                {...register("category")}
                id="category"
                className="inputForm"
                defaultValue={
                  product
                    ? getCategories.filter(
                        (category) => category.name == product?.category,
                      )[0].id
                    : null
                }
              >
                <option value="">Pilih Kategori</option>
                {getCategories?.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-red-500">{errors.category?.message}</p>
            </>
          )}
        </div>
        <button
          type="submit"
          className="rounded-full border-2 bg-primary p-1 text-white hover:bg-accent"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
