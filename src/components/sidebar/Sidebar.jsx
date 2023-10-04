import { useState } from "react";
import {
  RiCloudLine,
  RiContactsBookLine,
  RiFolderLine,
  RiHome5Line,
  RiMenu3Fill,
  RiCloseLine,
  RiArrowDownSLine,
  RiLogoutCircleRLine,
  RiUser3Line,
} from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { NavPage } from "../NavPage";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  

  const { signout } = useAuth();
  
  const salir = (async () => {
    const res = await signout();
    console.log(res)
  });



  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="min-h-screen">
      <div
        className={`fixed top-0 xl:left-0 bg-white w-3/5 md:w-[15rem] h-full border flex flex-col justify-between z-50 transition-all ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        <div className="">
          <img src="Logo.png" alt="logo" className="m-auto mt-5 w-[9rem]" />
          <ul className="mt-8 font-quicksand">
            <li>
              <Link
                to="/home"
                className="flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl"
              >
                <RiHome5Line className="text-xl" />
                Mi unidad
              </Link>
            </li>
            <li>
              <Link
                to="/mis-clases"
                className="flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl"
              >
                <RiFolderLine className="text-lg " />
                Mis clases
              </Link>
            </li>
            <li>
              <Link
                to="/compartido"
                className="flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl"
              >
                <RiCloudLine className="text-lg" />
                Compartido conmigo
              </Link>
            </li>
            <li>
              <Link
                to="/contactos"
                className="flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl"
              >
                <RiContactsBookLine className="text-lg" />
                Mis contactos
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Btn menu */}
      <button
        className="xl:hidden fixed bottom-6 right-6 bg-primary p-4 text-white rounded-full"
        onClick={toggleMenu}
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
      <header className="fixed  w-full xl:pl-[18rem] flex items-center justify-end p-4 pt-8 h-[4rem]">
        <Menu as="div">
          <Menu.Button className="flex items-center gap-4 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors  bg-lightgray">
            <img
              src="https://img.freepik.com/foto-gratis/feliz-joven_1098-20869.jpg"
              className="w-6 h-6 object-cover rounded-full"
            />
            <span className="font-quicksand">Usuarios Apellidos</span>
            <RiArrowDownSLine />
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
              className="absolute top-2 right-0 bg-gray-100 w-72 rounded-lg shadow-lg p-4"
            >
              <div>
                <Menu.Item>
                  <Link
                    href="#"
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-white transition-colors text-base font-quicksand"
                  >
                    <RiUser3Line /> Gestionar cuenta
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <button
                    onClick={()=>{salir()}}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-white transition-colors text-base font-quicksand w-full"
                  >
                    <RiLogoutCircleRLine /> Cerrar sesión
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <button className="flex items-center gap-4 hover:bg-gray-200 py-2 px-0 lg:px-4 rounded-lg transition-colors"></button>
      </header>
      <main className="xl:pl-[17rem] p-4 pt-[6rem]  h-screen w-screen">
        <NavPage/>
      </main>
    </div>
  );
};
