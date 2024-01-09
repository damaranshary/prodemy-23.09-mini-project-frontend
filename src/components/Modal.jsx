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
    <div id="wrapper" className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-10 backdrop-blur-[2px] overflow-y-scroll">
      <div className="w-1/4 flex flex-col">
        <button id="wrapper" className="text-white text-xl place-self-end" onClick={handleClose}>
          X
        </button>
        <div className="bg-white p-5 rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
