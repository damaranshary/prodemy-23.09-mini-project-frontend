import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addNewProduct, updateProduct } from "../../lib/axios/productAxios";
import { useState } from "react";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { getAllCategories } from "../../lib/swr/categorySWR";
import { MoonLoader } from "react-spinners";
import SuccessModal from "../Modal/SuccessModal";

const Form = ({ text, product, typeSubmit, mutate }) => {
  const { data: getCategories, isLoading, error } = getAllCategories();

  const [img, setImg] = useState(product ? { url: product.image } : "");
  const [progressUpload, setProgressUpload] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [titleSuccessModal, setTitleSuccessModal] = useState();

  if (error) {
    console.log(error);
  }
  const schema = yup.object().shape({
    title: yup.string().required("Nama produk harus diisi"),
    price: yup.number().typeError("Harga produk harus diisi"),
    category: yup.number().typeError("Kategori produk harus diisi"),
    image: yup.object().typeError("Gambar produk harus diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: product?.title,
      price: product?.price,
      image: img ? { url: product?.image } : "",
      category: product
        ? getCategories.filter(
            (category) => category.name == product?.category,
          )[0].id
        : "",
    },
  });

  const handleOnChange = (event) => {
    console.log(event.target.files);
    const data = {
      file: event.target.files[0],
      url: URL.createObjectURL(event.target.files[0]),
    };
    setValue("image", data);
    setImg(data);
  };

  const handleSubmitNewData = (data) => {
    const payload = {
      title: data.title,
      image: img.file,
      price: data.price,
      categoryId: data.category,
    };

    addNewProduct(
      payload,
      reset,
      setImg,
      mutate,
      setProgressUpload,
      setTitleSuccessModal,
      setIsSuccessModalOpen,
    );
  };

  const handleUpdateData = (data) => {
    const payload = {
      title: data.title,
      image: img.file,
      price: data.price,
      categoryId: data.category,
    };

    updateProduct(
      payload,
      product.id,
      mutate,
      setProgressUpload,
      setTitleSuccessModal,
      setIsSuccessModalOpen,
    );
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
              <div className="relative flex h-28 w-44 flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary">
                <div className="h-[80%]">
                  <img
                    src={img.url}
                    alt="Gambar Produk"
                    className="h-full text-sm"
                  />
                  <AiOutlineDelete
                    className="absolute right-0 top-0 fill-red-500 hover:cursor-pointer hover:fill-red-700"
                    onClick={() => {
                      setImg(null);
                      setValue("image", "");
                    }}
                    size={17}
                  />
                </div>
              </div>
            ) : (
              <div
                onClick={() => document.getElementById("image").click()}
                className="group flex h-28 w-44 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 hover:cursor-pointer hover:border-accent"
              >
                <input
                  {...register("image")}
                  id="image"
                  onChange={handleOnChange}
                  type="file"
                  className="inputForm"
                  hidden
                />
                <AiOutlineCloudUpload className="h-[50%] w-[50%] fill-slate-300 group-hover:fill-accent" />
                <p className="text-xs text-red-500">{errors.image?.message}</p>
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
        {progressUpload > 0 ? (
          <div className="flex w-full justify-center rounded-full bg-accent p-1 hover:cursor-not-allowed">
            <MoonLoader size={18} color="white" />
          </div>
        ) : (
          <button
            type="submit"
            className="rounded-full border-2 bg-primary p-1 text-white hover:bg-accent"
          >
            Submit
          </button>
        )}
      </form>
      <SuccessModal
        text={titleSuccessModal}
        isOpen={isSuccessModalOpen}
        closeModal={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
};

export default Form;
