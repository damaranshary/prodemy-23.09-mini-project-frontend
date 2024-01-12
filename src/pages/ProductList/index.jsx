import {
  AiFillPlusCircle,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { getAllProducts } from "../../lib/swr/productSWR";
import { getAllCategories } from "../../lib/swr/categorySWR";
import { useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import FormModal from "../../components/Modal/FormModal";
import Form from "../../components/Form/Form";
import { deleteProduct } from "../../lib/axios/productAxios";
import ProductCard from "../../components/Card/ProductCard";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [getProductById, setGetProductById] = useState();
  const [typeSubmit, setTypeSubmit] = useState();

  const [searchValue, setSearchValue] = useState("");
  const [choosenCategory, setChoosenCategory] = useState(null);
  const [sortByValue, setSortByValue] = useState(null);

  const sortBy = searchParams.get("sortBy");
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  const { data: categoriesData } = getAllCategories();
  const {
    data: productsData,
    isLoading,
    isError,
    mutate,
  } = getAllProducts(
    choosenCategory ? choosenCategory.id : null,
    query ? query : null,
    sortBy ? sortBy : null,
  );

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).finally(() => mutate());
  };

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSortByName = () => {
    if (sortByValue === "nameAsc") {
      setSortByValue("nameDesc");
    } else {
      setSortByValue("nameAsc");
    }
  };

  const handleSortByPrice = () => {
    if (sortByValue === "priceAsc") {
      setSortByValue("priceDesc");
    } else {
      setSortByValue("priceAsc");
    }
  };

  const handleResetSortBy = () => {
    setSortByValue(null);
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
    sortBy && setSortByValue(sortBy);
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

  useEffect(() => {
    sortByValue &&
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("sortBy", sortByValue);
        return newParams.toString();
      });
  }, [sortByValue]);

  if (isError) return <div>Error...</div>;

  return (
    <main className="m-5 flex min-h-screen flex-col overflow-x-auto pe-5 sm:mx-auto lg:mb-10">
      <h1 className="text-2xl font-bold md:text-xl">
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
        <button
          className="flex flex-row items-center gap-x-2 rounded-full bg-primary px-5 py-2 text-sm text-white hover:bg-accent"
          onClick={() => {
            setIsFormModalOpen(true);
            setGetProductById(null);
            setTypeSubmit("handleSubmitNewData");
          }}
        >
          Tambah Produk <AiFillPlusCircle />
        </button>
      </div>
      <RadioGroup
        value={choosenCategory}
        onChange={setChoosenCategory}
        className="my-3 flex flex-row items-center gap-x-3 px-1 pb-2"
      >
        <RadioGroup.Label className="self-center text-base">
          Kategori :
        </RadioGroup.Label>
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
          <h4 className="w-2/12 px-3 py-3 text-sm md:text-base">Gambar</h4>
          <button
            className="flex w-3/12 flex-row items-center gap-x-2 border-none bg-none text-sm hover:cursor-pointer md:text-base"
            onClick={handleSortByName}
          >
            Nama
            {sortByValue === "nameAsc" && <AiOutlineArrowDown />}
            {sortByValue === "nameDesc" && <AiOutlineArrowUp />}
          </button>
          <button
            className="flex w-2/12 flex-row items-center gap-x-2 border-none bg-none px-3 text-sm hover:cursor-pointer focus:outline-none md:text-base"
            onClick={handleSortByPrice}
          >
            Harga
            {sortByValue === "priceAsc" && <AiOutlineArrowDown />}
            {sortByValue === "priceDesc" && <AiOutlineArrowUp />}
          </button>
          <h4 className="w-2/12 px-3 text-sm md:text-base">Kategori</h4>
          <div className="flex flex-1 flex-row items-end gap-x-2 border-none bg-none px-3 py-1 text-sm hover:cursor-pointer focus:outline-none md:text-base">
            <h4 className="w-2/12 self-end px-3">Aksi</h4>
          </div>
        </div>
        <ul className="flex flex-col gap-y-2">
          {productsData && productsData.length > 0 ? (
            productsData.map((product) => (
              <li
                key={product.id}
                className="mb-1 flex flex-row items-center border border-transparent border-y-gray-200 bg-white ps-3 hover:cursor-pointer hover:bg-gray-100"
              >
                <ProductCard
                  product={product}
                  handleDeleteProduct={handleDeleteProduct}
                  setIsFormModalOpen={setIsFormModalOpen}
                  setGetProductById={setGetProductById}
                  setTypeSubmit={setTypeSubmit}
                />
              </li>
            ))
          ) : (
            <div className="mt-2 w-full self-center text-center">
              {isLoading ? (
                <BeatLoader color="#4959b6" size={10} />
              ) : (
                "Produk tidak ditemukan"
              )}
            </div>
          )}
        </ul>
      </div>

      <FormModal isVisible={isFormModalOpen} onClose={setIsFormModalOpen}>
        <Form
          text="Tambah Produk"
          product={getProductById}
          typeSubmit={typeSubmit}
        />
      </FormModal>
    </main>
  );
};

export default ProductList;
