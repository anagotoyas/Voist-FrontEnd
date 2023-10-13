import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
import { RiAddLine, RiFolderAddLine } from "react-icons/ri";
import { ModalCarpeta } from "../modals/ModalCarpeta";

export const DropDownCarpeta = () => {
  const [isModalCarpetaOpen, setIsModalCarpetaOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); 
    openModalCarpeta();
  };

  const openModalCarpeta = () => {
    setIsModalCarpetaOpen(true);
  };

  const closeModalCarpeta = () => {
    setIsModalCarpetaOpen(false);
  };

  return (
    <>
      <Menu as="div">
        <Menu.Button className="flex items-center gap-4 hover:bg-primary hover:text-white py-2 px-4 rounded-lg transition-colors  bg-lightgray">
          <RiAddLine />

          <span className="font-quicksand">Nuevo</span>
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            as="section"
            className="top-2 absolute bg-gray-100 w-72 rounded-lg shadow-lg p-4"
          >
            <div>
              <Menu.Item>
                <button
                  onClick={handleClick}
                  className="flex items-center gap-4 p-2 rounded-lg  transition-colors text-base font-quicksand w-full hover:bg-primary hover:text-white"
                >
                  <RiFolderAddLine /> Crear carpeta
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <ModalCarpeta
        isOpen={isModalCarpetaOpen}
        onClose={closeModalCarpeta}
      ></ModalCarpeta>
    </>
  );
};
