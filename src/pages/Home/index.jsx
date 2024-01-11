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

function Home() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.products);
  const [query, setQuery] = useState(null);
  const [sort, setSort] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // console.log(query)
    // console.log(sort)
    // console.log(category)
  }, [cart, sort, category]);

  const {
    data: productData,
    isLoading,
    isError,
  } = getAllProducts(category, query, sort);

  const { data: categoriesData } = getAllCategories();

  const handleSortChange = (event) => {
    setSort(event.target.value);
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
  const handleDeleteProduct = (id) => {
    dispatch(removeFromCart(id));
  };

  if (isError) return <div>Error...</div>;

  return (
    <div className="flex justify-between">
      <div className="flex w-2/3 flex-col gap-7">
        <h1 className="mt-6 text-2xl font-bold">Daftar Produk</h1>
        <div className="flex gap-3 ">
          <button
            onClick={() => {
              setSort(null);
              setQuery(null);
              setCategory(null);
            }}
            className="w-32 rounded-lg bg-primary p-3 text-sm text-white"
          >
            Semua Produk
          </button>
          {categoriesData?.map((Categories) => (
            <button
              key={Categories.id}
              onClick={() => {
                setCategory(Categories.id);
              }}
              className="w-32 rounded-lg bg-primary p-3 text-sm text-white"
            >
              {Categories.name}
            </button>
          ))}
        </div>
        <div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="flex rounded-full border border-gray-500 px-5 py-2 md:w-96 md:flex-initial"
            />
            <select
              onChange={handleSortChange}
              className="ml-auto rounded-full border border-gray-500 p-2"
            >
              <option value="nameDesc">Name: High to Low</option>
              <option value="nameAsc">Name: Low to High</option>
              <option value="priceDesc">Price: Low to High</option>
              <option value="priceAsc">Price: Low to High</option>
            </select>
          </div>
          <div className="mt-8 grid w-fit grid-cols-3 gap-10 ">
            {isLoading ? (
              <BeatLoader color="#4959b6" size={10} />
            ) : (
              productData.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-3 rounded-xl bg-slate-100 p-2 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.image}
                      className="h-28 w-28 rounded-md object-cover"
                    />
                    <div className="w-full">
                      <h3 className="justify-center text-[15px] font-semibold">
                        {product.title}
                      </h3>
                      <p className="text-[15px] font-semibold">
                        Rp. {product.price.toLocaleString("Id-id")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="rounded-full bg-primary py-1 text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex h-fit w-3/12 flex-col gap-1 overflow-hidden rounded-2xl">
        <div className="flex w-full flex-col gap-5 bg-slate-200 p-5 ">
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
        </div>
        <div className="flex flex-col gap-7 bg-slate-200 p-5">
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
