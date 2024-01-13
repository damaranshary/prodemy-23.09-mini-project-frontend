import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ isVisible, onClose, children, isOpen }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors duration-300 ${
        isVisible ? "visible bg-black/40" : "invisible"
      }`}
    >
      <div
        className={`relative w-1/4  rounded-xl bg-white p-5 transition-all duration-300 ${
          isVisible ? "scale-105 opacity-100" : "opacity-0"
        } `}
      >
        <AiFillCloseCircle
          onClick={handleClose}
          className="absolute right-1 top-1 fill-red-500 hover:cursor-pointer hover:fill-red-700"
          size={20}
        />

        {isVisible ? children : <div className="opacity-20">{children}</div>}
        {/* gk di retrun null animasi atau trasition pas close modalnya jadi gk ada */}
        {/* {children} */}

        {/* pake return null animasi atau transition pas close modalnya jadi ada, tapi gk kebaca default valuenya*/}
        {/* {isVisible ? children : null} */}
      </div>
    </div>
  );
};

export default Modal;
