import {
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { getAllCategories, getAllProducts } from "../../lib/swr/productSWR";
import { Link, useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { RadioGroup } from "@headlessui/react";

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
    query ? query : null
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
    category
      ? setChoosenCategory(
          categoriesData?.find((cat) => cat.id === parseInt(category))
        )
      : setChoosenCategory(null);

      console.log(choosenCategory);
  }, []);

  useEffect(() => {
    choosenCategory &&
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("category", choosenCategory.id);
        return newParams.toString();
      });
  }, [choosenCategory]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <main className="m-5 flex min-h-screen flex-col gap-y-10 overflow-x-auto lg:container sm:mx-10 lg:mx-auto lg:mb-10">
      <div className="w-full rounded-xl border border-gray-200 px-10 py-5">
        <h1 className="px-1 text-xl font-bold">
          Daftar Produk {choosenCategory ? " - " + choosenCategory.name : ""}
        </h1>
        <RadioGroup
          value={choosenCategory}
          onChange={setChoosenCategory}
          className="pb-2"
        >
          <RadioGroup.Label className="text-sm">
            Pilih Kategori
          </RadioGroup.Label>
          <div className="flex flex-row">
            {categoriesData?.map((category) => (
              <RadioGroup.Option
                key={category.id}
                as={Fragment}
                value={category}
              >
                <div
                  className={`mt-2 flex flex-row items-center justify-between rounded-xl border border-gray-200 px-5 py-2 hover:cursor-pointer ${
                    category.id === choosenCategory?.id
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  <p className="text-sm font-semibold">{category.name}</p>
                </div>
              </RadioGroup.Option>
            ))}
            <button onClick={handleResetCategory}>Reset</button>
          </div>
        </RadioGroup>

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
            <button className="flex flex-row items-center gap-x-2 px-5 py-2 text-sm bg-blue-500 hover:bg-blue-700 rounded-full text-white">
              Tambah Produk <AiFillPlusCircle />
            </button>
          </Link>
        </div>
        <div className="min-w-full ">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row items-center font-semibold ps-3">
              <div className="w-2/12 px-3 py-3">Gambar</div>
              <div className="w-3/12">Nama</div>
              <div className="w-2/12 px-3">Harga</div>
              <div className="w-2/12 px-3">Kategori</div>
              <div className="flex-1 items-end flex flex-row px-3 py-1 gap-x-2">
                <div className="w-2/12 px-3 self-end">Aksi</div>
              </div>
            </div>
            {productsData?.map(({ id, title, image, price, category }) => (
              <div
                key={id}
                className="hover:cursor-pointer hover:bg-gray-100 flex flex-row items-center border rounded-xl ps-3 mb-1"
              >
                <div className="w-2/12 px-3 py-3">
                  <img src={image} className="w-12" alt={"gambar " + title} />
                </div>
                <div className="w-3/12">{title}</div>
                <div className="w-2/12 px-3">
                  {"Rp. " + price.toLocaleString("id-ID")}
                </div>
                <div className="w-2/12 px-3">{category}</div>
                <div className="flex-1 flex flex-row px-3 py-1 gap-x-2">
                  <button
                    onClick={() => {
                      console.log(id);
                    }}
                    className="flex flex-row py-1 gap-x-2 items-center text-sm text-blue-500 rounded-full outline-0 outline-blue-500 hover:bg-blue-500 hover:text-white px-3 me-2"
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
                    className="flex flex-row py-1 gap-x-2 items-center text-sm text-red-500 rounded-full outline-0 outline-red-500 hover:bg-red-500 hover:text-white px-3 me-2"
                  >
                    <IconContext.Provider value={{ size: "1.5em" }}>
                      <AiOutlineDelete />
                    </IconContext.Provider>
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductList;
