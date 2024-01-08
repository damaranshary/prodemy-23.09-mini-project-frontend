import { AiFillPlusCircle, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { getAllProducts } from "../../lib/swr/productSWR";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../component/Modal";
import Form from "../../component/Form";

const ProductList = () => {
  const { data: productsData, isLoading, isError } = getAllProducts();
  const [getProductById, setGetProductById] = useState();
  const [typeSubmit, settypeSubmit] = useState();

  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [showModal, setShowModal] = useState(false);

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setFilteredProducts(productsData?.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue, productsData]);

  const tableHeader = ["Nama", "Gambar", "Harga", "Kategori", ""];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <main className="m-5 flex min-h-screen flex-col gap-y-10 overflow-x-auto lg:container sm:mx-10 lg:mx-auto lg:mb-10">
      <div className="w-full rounded-xl border border-gray-200 px-10 py-5">
        <h1 className="px-1 text-xl font-bold">Daftar Produk</h1>

        <div className="container my-5 flex w-full flex-row items-center justify-between gap-x-5 px-1">
          <input
            type="text"
            id="search"
            name="search"
            value={searchValue}
            onChange={handleOnChange}
            className="flex-1 rounded-full border border-gray-300 px-5 py-2 md:w-96 md:flex-initial"
            placeholder="Cari produk"
          />
          <button
            className="flex flex-row items-center gap-x-2 px-5 py-3 text-sm rounded-lg"
            onClick={() => {
              setShowModal(true);
              setGetProductById(null);
              settypeSubmit("handleSubmitNewData");
            }}
          >
            Tambah Produk <AiFillPlusCircle />
          </button>
        </div>
        <table className="min-w-full table-fixed border-collapse divide-y divide-gray-300 border-gray-300 text-sm lg:table-auto">
          <thead className="mb-5 rounded-xl">
            <tr>
              {tableHeader.map((header) => (
                <th key={header} className="px-3 py-4 text-start text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts?.map(({ id, title, image, price, category }) => (
              <tr key={id} className="hover:cursor-pointer hover:bg-gray-100">
                <td className="px-3">{title}</td>
                <td className="px-3 py-3">
                  <img src={image} className="w-40" alt="thumbnail" />
                </td>
                <td className="px-3">{"Rp. " + price.toLocaleString("id-ID")}</td>
                <td className="px-3">{category}</td>
                <td className="px-3 py-3 flex flex-row gap-x-2">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setGetProductById(filteredProducts.filter((list) => list.id == id)[0]);
                      settypeSubmit("handleUpdateData");
                    }}
                    className="py-1 text-sm text-blue-500 rounded-full outline-0 outline-blue-500 hover:bg-blue-500 hover:text-white px-2"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => {
                      console.log(id);
                    }}
                    className="py-1 text-sm text-red-500 rounded-full outline-0 outline-red-500 hover:bg-red-500 hover:text-white px-2"
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isVisible={showModal} onClose={setShowModal}>
        <Form text="Tambah Produk" product={getProductById} typeSubmit={typeSubmit} />
      </Modal>
    </main>
  );
};

export default ProductList;
