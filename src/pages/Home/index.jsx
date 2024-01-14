import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  // setProducts,
  addToCart,
  removeFromCart,
  // confirmWishlist,
  resetCart,
} from "../../store/slices/cartSlice";
import { getAllProducts } from "../../lib/swr/productSWR";
import { getAllCategories } from "../../lib/swr/categorySWR";
import QuantityButton from "../../components/Button/QuantityButton";
import { BeatLoader } from "react-spinners";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import CheckoutModal from "../../components/Modal/CheckoutModal";

function Home() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.get("q");

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(null);
  const [category, setCategory] = useState(null);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const {
    data: productData,
    isLoading,
    isError,
  } = getAllProducts(category, queryParams ? queryParams : null, sort);

  const { data: categoriesData } = getAllCategories();

  const [paymentMethod, setPaymentMethod] = useState("");
  const paymentMethodOptions = [
    { name: "Gopay", value: "gopay", logo: "/assets/gopay-logo.png" },
    { name: "LinkAja", value: "link-aja", logo: "/assets/linkaja-logo.png" },
    { name: "DANA", value: "dana", logo: "/assets/dana-logo.png" },
    { name: "BCA", value: "bca-bank", logo: "/assets/bca-logo.webp" },
  ];

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

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    dispatch(resetCart());
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
            className={`flex flex-row items-center justify-between gap-x-2 rounded-full border border-gray-300 px-5 py-2 font-semibold hover:cursor-pointer ${
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
              className={`flex flex-row items-center justify-between gap-x-2 rounded-full border border-gray-300 px-5 py-2 font-semibold hover:cursor-pointer ${
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
              className="ms-0 rounded-full border border-gray-300 px-5 pe-10"
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
        <div className="flex w-full flex-col gap-y-5 p-5">
          <h1 className="text-lg font-semibold">Daftar Pesanan</h1>
          {cart.length > 0 ? (
            <>
              {" "}
              <div className="flex flex-col gap-4 ">
                {cart?.map((list) => (
                  <div
                    className="flex items-center justify-between border border-transparent border-b-gray-200 pb-3"
                    key={list.id}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={list.image}
                        alt="Gambar Produk"
                        className="h-16 w-16 rounded-lg"
                      />
                      <div className="flex flex-col">
                        <h4 className="text-sm font-semibold ">{list.title}</h4>
                        <p className="text-sm">
                          Rp. {list.price.toLocaleString("ID-id")}
                        </p>
                      </div>
                    </div>
                    <QuantityButton productId={list.id} quantity={list.qty} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between border-y-2 border-transparent border-y-gray-300 py-3">
                  <h1 className="text-base">Total Harga</h1>
                  <h1 className="text-lg font-semibold">
                    Rp.{" "}
                    {cart
                      .reduce(
                        (accumulator, product) =>
                          accumulator + product.price * product.qty,
                        0,
                      )
                      .toLocaleString("ID-id")}
                  </h1>
                </div>
                <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                  <RadioGroup.Label className="text-base font-semibold">
                    Metode Pembayaran
                  </RadioGroup.Label>
                  {paymentMethodOptions.map((option) => (
                    <RadioGroup.Option
                      key={option.name}
                      as={Fragment}
                      value={option.value}
                    >
                      {({ checked }) => (
                        <div
                          className={`mt-2 flex flex-row items-center justify-between rounded-xl border border-gray-200 px-5 py-2 hover:cursor-pointer ${
                            checked ? "bg-slate-500 text-white" : ""
                          }`}
                        >
                          <div className="flex w-full flex-row justify-between">
                            <p className="text-sm font-semibold">
                              {option.name}
                            </p>
                            <img
                              src={option.logo}
                              alt={option.name}
                              className="ml-2 h-5"
                            />
                          </div>
                        </div>
                      )}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
              </div>
              <button
                onClick={handleCheckout}
                disabled={paymentMethod === ""}
                className="rounded-xl bg-primary p-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-25"
              >
                Konfirmasi Pesanan
              </button>
              <CheckoutModal
                isOpen={isCheckoutModalOpen}
                handleConfirmCheckout={handleConfirmCheckout}
                closeModal={() => setIsCheckoutModalOpen(false)}
              />
            </>
          ) : (
            <p className="text-center">Keranjang Kosong</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
