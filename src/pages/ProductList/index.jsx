import {
  AiFillPlusCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFilter,
} from "react-icons/ai";
import { getAllCategories, getAllProducts } from "../../lib/swr/productSWR";
import { Link, useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { RadioGroup } from "@headlessui/react";
import { BeatLoader } from "react-spinners";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState("");
  const [choosenCategory, setChoosenCategory] = useState(null);

  const category = searchParams.get("category");
  const query = searchParams.get("q");

  const { categoriesData } = getAllCategories();
  const {
    data: productsData,
    isLoading,
    isError,
  } = getAllProducts(
    choosenCategory ? choosenCategory.id : null,
    query ? query : null,
  );

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchOnSubmit = (e) => {
    e.preventDefault();

    if (searchValue === "") {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete("q");
        return newParams.toString();
      });
      return;
    }

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("q", searchValue);
      return newParams.toString();
    });
  };

  const handleResetCategory = () => {
    setSearchParams((prevParams) => {
      choosenCategory && setChoosenCategory(null);

      const newParams = new URLSearchParams(prevParams);
      newParams.delete("category");
      return newParams.toString();
    });
  };

  useEffect(() => {
    query && setSearchValue(query);
  }, []);

  useEffect(() => {
    category && categoriesData
      ? setChoosenCategory(
          categoriesData?.find((cat) => cat.id === parseInt(category)),
        )
      : setChoosenCategory(null);
  }, [category, categoriesData]);

  useEffect(() => {
    choosenCategory &&
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("category", choosenCategory.id);
        return newParams.toString();
      });
  }, [choosenCategory]);

  if (isError) return <div>Error...</div>;

  return (
    <main className="m-5 flex min-h-screen flex-col overflow-x-auto lg:container sm:mx-10 lg:mx-auto lg:mb-10">
      <h1 className="md:text-xl text-2xl font-bold">
        Daftar Produk {choosenCategory ? " - " + choosenCategory.name : ""}
      </h1>
      <div className="container my-5 flex w-full flex-row items-center justify-between gap-x-5 px-1">
        <form onSubmit={handleSearchOnSubmit}>
          <input
            type="text"
            id="search"
            name="search"
            value={searchValue}
            onChange={handleOnChange}
            className="flex-1 rounded-full border border-gray-300 px-5 py-2 md:w-96 md:flex-initial"
            placeholder="Cari produk"
          />
        </form>
        <Link to="/admin/add/product">
          <button className="flex flex-row items-center gap-x-2 rounded-full bg-primary px-5 py-2 text-sm text-white hover:bg-accent">
            Tambah Produk <AiFillPlusCircle />
          </button>
        </Link>
      </div>
      <RadioGroup
        value={choosenCategory}
        onChange={setChoosenCategory}
        className="flex flex-row items-center gap-x-3 pb-2 my-3 px-1"
      >
        <RadioGroup.Label className="text-base self-center">Kategori :</RadioGroup.Label>
        <div className="flex flex-row gap-x-3 self-center">
          {categoriesData?.map((category) => (
            <RadioGroup.Option key={category.id} as={Fragment} value={category}>
              <div
                className={`flex flex-row items-center justify-between gap-x-2 rounded-full border border-gray-300 px-5 py-2 hover:cursor-pointer ${
                  category.id === choosenCategory?.id
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                <p className="text-sm font-semibold">{category.name}</p>
                {category.id === choosenCategory?.id && (
                  <button onClick={handleResetCategory}>
                    <AiOutlineCloseCircle />
                  </button>
                )}
              </div>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="min-w-full ">
        <div className="mb-3 flex flex-row items-center border border-transparent border-y-gray-300 ps-3 font-semibold">
          <h4 className="text-sm md:text-base w-2/12 px-3 py-3">Gambar</h4>
          <h4 className="text-sm md:text-base w-3/12">Nama</h4>
          <h4 className="text-sm md:text-base w-2/12 px-3">Harga</h4>
          <h4 className="text-sm md:text-base w-2/12 px-3">Kategori</h4>
          <div className="text-sm md:text-base flex flex-1 flex-row items-end gap-x-2 px-3 py-1">
            <h4 className="w-2/12 self-end px-3">Aksi</h4>
          </div>
        </div>
        <ul className="flex flex-col gap-y-2">
          {productsData && productsData.length > 0 ? (
            productsData.map(({ id, title, image, price, category }) => (
              <li
                key={id}
                className="mb-1 flex flex-row items-center border border-transparent border-y-gray-200 bg-white ps-3 hover:cursor-pointer hover:bg-gray-100"
              >
                <div className="w-2/12 px-3 py-3">
                  <img src={image} className="w-12" alt={"gambar " + title} />
                </div>
                <div className="w-3/12 line-clamp-1">{title}</div>
                <div className="w-2/12 px-3">
                  {"Rp. " + price.toLocaleString("id-ID")}
                </div>
                <div className="w-2/12 px-3">{category}</div>
                <div className="flex flex-1 flex-row gap-x-2 px-3 py-1">
                  <button
                    onClick={() => {
                      console.log(id);
                    }}
                    className="me-2 flex flex-row items-center gap-x-2 rounded-full px-3 py-1 text-sm text-blue-500 outline-0 outline-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    <IconContext.Provider value={{ size: "1.5em" }}>
                      <AiOutlineEdit />
                    </IconContext.Provider>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log(id);
                    }}
                    className="me-2 flex flex-row items-center gap-x-2 rounded-full px-3 py-1 text-sm text-red-500 outline-0 outline-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <IconContext.Provider value={{ size: "1.5em" }}>
                      <AiOutlineDelete />
                    </IconContext.Provider>
                    Hapus
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className="mt-2 w-full self-center text-center">
              {isLoading ? <BeatLoader color="#4959b6" size={10}/> : "Produk tidak ditemukan"}
            </div>
          )}
        </ul>
      </div>
    </main>
  );
};

export default ProductList;
