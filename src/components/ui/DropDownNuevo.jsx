import { Menu, Transition } from '@headlessui/react'
import { RiAddLine, RiFolderAddLine, RiVoiceprintLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export const DropDownNuevo = () => {
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
                    href="#"
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary hover:text-white transition-colors text-base font-quicksand"
                  >
                    <RiVoiceprintLine /> Iniciar grabación
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-4 p-2 rounded-lg  transition-colors text-base font-quicksand w-full hover:bg-primary hover:text-white"
                  >
                    <RiFolderAddLine /> Crear carpeta
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
    </>
  )
}
