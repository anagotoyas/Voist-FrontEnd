import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
import { RiAddLine, RiVoiceprintLine } from "react-icons/ri";

import { Link } from "react-router-dom";

import { ModalGrabacion } from "../modals/ModalGrabacion";


export const DropDownNuevo = () => {
 
  const [isModalGrabacionOpen, setIsModalGrabacionOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // Evita la actualización de la página
    openModalGrabacion();
  };

   const openModalGrabacion = () => {
   
    setIsModalGrabacionOpen(true);
    // Cierra el ModalNuevo al abrir el ModalGrabacion
  };

  const closeModalGrabacion = () => {
    setIsModalGrabacionOpen(false);
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
                <Link
                  onClick={handleClick}
                  className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary hover:text-white transition-colors text-base font-quicksand"
                >
                  <RiVoiceprintLine /> Iniciar grabación
                </Link>
              </Menu.Item>

             
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
     
      <ModalGrabacion isOpen={isModalGrabacionOpen} onClose={closeModalGrabacion}>
        
        </ModalGrabacion>

    </>
  );
};
