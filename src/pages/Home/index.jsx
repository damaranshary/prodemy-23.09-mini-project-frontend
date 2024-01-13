import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  addToCart,
  removeFromCart,
  confirmWishlist,
  reserCart,
} from "../../store/slices/productSlice";
import { getAllProducts } from "../../lib/swr/productSWR";
import { getAllCategories } from "../../lib/swr/categorySWR";
import QuantityButton from "../../components/Button/QuantityButton";
import { BeatLoader } from "react-spinners";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.get("q");

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(null);
  const [category, setCategory] = useState(null);

  const {
    data: productData,
    isLoading,
    isError,
  } = getAllProducts(category, queryParams ? queryParams : null, sort);

  const { data: categoriesData } = getAllCategories();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchOnSubmit = (e) => {
    e.preventDefault();

    if (query === "") {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete("q");
        return newParams.toString();
      });
      return;
    }

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("q", query);
      return newParams.toString();
    });
  };

  const handleAddToCart = (item) => {
    const payload = {
      ...item,
      qty: 1,
    };
    dispatch(addToCart(payload));
  };

  const handleConfirmWishlist = () => {
    alert("Produk berhasil di order");
    dispatch(reserCart());
  };

  useEffect(() => {
    query && setSearchValue(query);
  }, []);

  if (isError) return <div>Error...</div>;

  return (
    <div className="relative m-5 flex min-h-screen flex-row justify-between gap-x-10 overflow-x-auto pe-5 sm:mx-auto lg:mb-10">
      <div className="flex flex-col gap-7 sm:w-6/12 md:w-7/12 lg:w-8/12">
        <h1 className="mt-6 text-2xl font-bold">Daftar Produk</h1>
        <div className="flex gap-3 ">
          <button
            onClick={() => {
              setCategory(null);
            }}
            className={`flex flex-row items-center justify-between gap-x-2 rounded-full border border-gray-300 px-5 py-2 hover:cursor-pointer font-semibold ${
              category === null
                ? "bg-primary p-3 text-sm text-white"
                : "bg-white text-primary"
            }`}
          >
            Semua Produk
          </button>
          {categoriesData?.map((categoryData) => (
            <button
              key={categoryData.id}
              onClick={() => {
                setCategory(categoryData.id);
              }}
              className={`flex flex-row items-center justify-between gap-x-2 rounded-full border border-gray-300 px-5 py-2 hover:cursor-pointer font-semibold ${
                categoryData.id === category
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
            >
              {categoryData.name}
            </button>
          ))}
        </div>
        <div>
          <div className="flex justify-between">
            <form onSubmit={handleSearchOnSubmit}>
              <input
                type="text"
                id="search"
                name="search"
                value={query}
                onChange={handleSearchChange}
                className="flex-1 rounded-full border border-gray-300 px-5 py-2 md:w-96 md:flex-initial"
                placeholder="Cari produk"
              />
            </form>
            <select
              onChange={handleSortChange}
              className="ms-0 rounded-full border border-gray-300 px-5"
            >
              <option value="nameAsc">Nama A-Z</option>
              <option value="nameDesc">Nama Z-A</option>
              <option value="priceDesc">Harga Tertinggi</option>
              <option value="priceAsc">Harga Terendah</option>
            </select>
          </div>
          <div className="mt-8 grid w-full grid-cols-2 gap-5 lg:grid-cols-3 ">
            {isLoading ? (
              <BeatLoader color="#4959b6" size={10} />
            ) : (
              productData.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-3 rounded-xl border border-gray-300 p-4 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <div className="flex flex-row gap-4">
                    <div className="h-24">
                      <img
                        src={product.image}
                        className="h-full w-24 rounded-xl object-cover"
                        alt={"gambar " + product.title}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <p className="mb-1 self-end text-sm">
                        {product.category}
                      </p>
                      <h3 className="line-clamp-1 justify-center text-sm">
                        {product.title}
                      </h3>
                      <p className="text-base font-semibold">
                        Rp. {product.price.toLocaleString("Id-id")}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="self-end rounded-full text-3xl text-white hover:text-white focus:outline-none"
                      >
                        <AiFillPlusCircle />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="border-xl sticky right-0 top-0 flex h-fit flex-1 flex-col gap-1 rounded-2xl border border-gray-300">
        <div className="flex w-full flex-col gap-5 p-5 ">
          <h1 className="text-lg font-semibold">Daftar Pesanan</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-5">
              {cart?.map((list) => (
                <div className="flex justify-between" key={list.id}>
                  <div className="flex gap-3">
                    <img
                      src={list.image}
                      alt="Gambar Produk"
                      className="w-16 rounded-lg"
                    />
                    <div>
                      <h1 className="text-sm font-semibold ">{list.title}</h1>
                      <h1 className="text-sm">
                        Rp. {list.price.toLocaleString("ID-id")}
                      </h1>
                    </div>
                  </div>
                  <QuantityButton productId={list.id} quantity={list.qty} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <h1 className="tex-sm font-semibold">Total</h1>
            <h1 className="tex-sm font-semibold">
              Rp.{" "}
              {cart.reduce(
                (accumulator, product) =>
                  accumulator + product.price * product.qty,
                0,
              )}
            </h1>
          </div>
          <h1 className="text-lg font-semibold">Payment Method</h1>
          <div className="flex justify-around">
            <button>
              <img
                src="https://pbs.twimg.com/profile_images/966253495547342848/_bjmYta5_400x400.jpg"
                alt="Dana"
                className="w-16 rounded-2xl"
              />
            </button>
            <button>
              <img
                src="https://seeklogo.com/images/B/bank-transfer-logo-291DE7CDB2-seeklogo.com.png"
                alt="Transfer Bank"
                className="h-16 w-16 rounded-2xl"
              />
            </button>
            <button>
              <img
                src="https://fintech.id/storage/files/shares/logo/logofi2/gopay-1.jpg"
                alt="Gopay"
                className="h-16 w-16 rounded-2xl"
              />
            </button>
          </div>
          <button
            onClick={handleConfirmWishlist}
            className="rounded-xl bg-primary p-2 text-white"
          >
            Confirm Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
