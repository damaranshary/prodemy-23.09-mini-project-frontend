import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import { IconContext } from "react-icons";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ProductCard = ({
  setGetProductById,
  setIsFormModalOpen,
  product,
  handleDeleteProduct,
  setTypeSubmit,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="h-20 w-2/12 px-3 py-3">
        <img
          src={product.image}
          className="h-full w-12 rounded-xl object-cover"
          alt={"gambar " + product.title}
        />
      </div>
      <div className="line-clamp-1 w-3/12">{product.title}</div>
      <div className="w-2/12 px-3">
        {"Rp. " + product.price.toLocaleString("id-ID")}
      </div>
      <div className="w-2/12 px-3">{product.category}</div>
      <div className="flex flex-1 flex-row gap-x-2 px-3 py-1">
        <button
          onClick={() => {
            setIsFormModalOpen(true);
            setGetProductById(product);
            setTypeSubmit("handleUpdateData");
          }}
          className="me-2 flex flex-row items-center gap-x-2 rounded-full px-3 py-1 text-sm text-blue-500 outline-0 outline-blue-500 hover:bg-blue-500 hover:text-white"
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <AiOutlineEdit />
          </IconContext.Provider>
          <span>Edit</span>
        </button>
        <button
          onClick={openDeleteModal}
          className="me-2 flex flex-row items-center gap-x-2 rounded-full px-3 py-1 text-sm text-red-500 outline-0 outline-red-500 hover:bg-red-500 hover:text-white"
        >
          <IconContext.Provider value={{ size: "1.5em" }}>
            <AiOutlineDelete />
          </IconContext.Provider>
          Hapus
        </button>
        <DeleteModal
          productId={product.id}
          isOpen={isDeleteModalOpen}
          handleDeleteProduct={handleDeleteProduct}
          closeModal={closeDeleteModal}
        />
      </div>
    </>
  );
};

export default ProductCard;
