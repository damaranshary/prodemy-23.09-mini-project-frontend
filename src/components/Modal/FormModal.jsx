// import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";

// const Modal = ({ isVisible, onClose, children }) => {
//   if (!isVisible) {
//     return null;
//   }

//   return (
//     <div
//       id="wrapper"
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-[2px]"
//     >
//       <div className="w-1/4">
//         <div className="relative rounded-lg bg-white p-5">
//           <AiFillCloseCircle
//             onClick={() => onClose(false)}
//             className="absolute right-1 top-1 fill-primary hover:cursor-pointer hover:fill-accent"
//             size={20}
//           />
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ isVisible, onClose, children }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors duration-200 ease-in-out ${
        isVisible ? "visible bg-black/40" : "invisible"
      }`}
    >
      <div
        className={`relative w-1/4  rounded-xl bg-white p-5 transition-all duration-200 ease-in-out ${
          isVisible ? "scale-110 opacity-100" : "opacity-0"
        } `}
      >
        <AiFillCloseCircle
          onClick={handleClose}
          className="absolute right-1 top-1 fill-red-500 hover:cursor-pointer hover:fill-red-700"
          size={20}
        />
        {/* gk di retrun null animasi atau trasition pas close modalnya jadi gk ada */}
        {/* {children} */}

        {/* pake return null animasi atau transition pas close modalnya jadi ada, tapi gk kebaca default valuenya*/}
        {isVisible ? children : null}
      </div>
    </div>
  );
};

export default Modal;
