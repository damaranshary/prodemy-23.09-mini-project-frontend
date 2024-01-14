import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const CheckoutModal = ({ isOpen, handleConfirmCheckout, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <span className="text-5xl text-primary">
                  <AiOutlineCheckCircle />
                </span>
                <Dialog.Title
                  as="h3"
                  className="text-center text-lg font-bold leading-6"
                >
                  Checkout Berhasil
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Pesanan kamu sedang diproses
                  </p>
                </div>

                <button
                  className="mt-4 w-1/2 self-center rounded-full bg-primary px-5 py-2 text-sm text-white hover:bg-accent focus:outline-none"
                  onClick={() => {
                    handleConfirmCheckout();
                    closeModal();
                  }}
                >
                  Oke
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CheckoutModal;
