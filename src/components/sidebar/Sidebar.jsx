import { useState } from "react";
import {
  RiCloudLine,
  RiContactsBookLine,
  RiMenu3Fill,
  RiCloseLine,
  RiArrowDownSLine,
  RiLogoutCircleRLine,
  RiUser3Line,
  RiFolder2Line,
  RiFile3Line,
  RiHome4Line,
  RiGroupLine
} from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavPage } from "../NavPage";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const publicUrl = window.location.origin;

  const { signout, user } = useAuth();

  const navigate = useNavigate();

  const salir = async () => {
    await signout();
    navigate("/login");
  };
  const location = useLocation();

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
          <img
            src={`${publicUrl}/Logo.png`}
            alt="Logo"
            className="m-auto mt-5 w-[9rem]"
          />
          <ul className={`mt-8 font-quicksand`}>
            {user.role === 2 ? (
              <>
                <li>
                  <Link
                    to="/home"
                    className={`flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl ${
                      location.pathname === "/home"
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    <RiFile3Line className="text-xl" />
                    Mis archivos
                  </Link>
                </li>

                <li>
                  <Link
                    to="/carpetas"
                    className={`flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl ${
                      location.pathname === "/carpetas"
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    <RiFolder2Line className="text-lg" />
                    Mis carpetas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compartido"
                    className={`flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl ${
                      location.pathname === "/compartido"
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    <RiCloudLine className="text-lg" />
                    Compartido conmigo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactos"
                    className={`flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl ${
                      location.pathname === "/contactos"
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    <RiContactsBookLine className="text-lg" />
                    Mis contactos
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/admin"
                    className={`flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl ${
                      location.pathname === "/admin"
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    <RiHome4Line className="text-lg" />
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/users"
                    className={`flex items-center gap-4 hover:bg-primary hover:text-white transition-colors py-2 px-4 rounded-xl ${
                      location.pathname === "/users"
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    <RiGroupLine className="text-lg" />
                    Gestión de Usuarios
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* Btn menu */}
      <button
        className="xl:hidden fixed bottom-6 right-6 bg-primary p-4 text-white rounded-full z-10"
        onClick={toggleMenu}
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
      <header className="fixed  w-full xl:pl-[18rem] flex items-center justify-end p-4  h-[4rem] bg-white top-0 py-4 border z-100">
        <Menu as="div">
          <Menu.Button className="flex items-center gap-4 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors  bg-lightgray z-100 static">
            <img
              src={`${user.gravatar}`}
              className="w-6 h-6 object-cover rounded-full"
            />
            <span className="font-quicksand">{user.name}</span>
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
              className="absolute top-2 right-0 bg-gray-100 w-72 rounded-lg shadow-lg p-4 z-100"
            >
              <div>
                <Menu.Item>
                  <Link
                    href="#"
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary hover:text-white transition-colors text-base font-quicksand"
                  >
                    <RiUser3Line /> Gestionar cuenta
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <button
                    onClick={() => {
                      salir();
                    }}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-base font-quicksand w-full"
                  >
                    <RiLogoutCircleRLine /> Cerrar sesión
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </header>
      <main className="xl:pl-[17rem] pt-[5rem] px-8 h-[calc(100vh-4rem)]">
        <NavPage />
      </main>
    </div>
  );
};
