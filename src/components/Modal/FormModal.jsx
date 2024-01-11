import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose(false);
    }
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[2px]"
    >
      <div className="w-1/4">
        <div className="relative rounded-lg bg-white p-5">
          <AiFillCloseCircle
            onClick={() => onClose(false)}
            className="absolute right-1 top-1 fill-primary hover:cursor-pointer hover:fill-accent"
            size={20}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
