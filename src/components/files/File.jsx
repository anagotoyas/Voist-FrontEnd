import { Menu } from "@headlessui/react";
import PropTypes from "prop-types";
import {
  RiDeleteBin6Fill,
  RiEyeFill,
  RiFile3Fill,
  RiFolder3Fill,
  RiMore2Fill,
  RiPencilFill,
  RiUserAddFill,
} from "react-icons/ri";
import { ModalInfo } from "../modals/ModalInfo";
import { useState } from "react";
import { ContenidoEliminarFile } from "../modals/ContenidoEliminarFile";
import { ContenidoActualizarFile } from "../modals/ContenidoActualizarFile";
import { useAuth } from "../../context/AuthContext";
import { ContactAccess } from "../contacts/ContactAccess";
import { ModalCompartirAcceso } from "../modals/ModalCompartirAcceso";

export const File = (props) => {
  const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const { loadContactsShared } = useAuth();

  const { title, created_at, updated_at, duration, id } = props.item;

  function formatDateTime(dateTimeString) {
    const dateObj = new Date(dateTimeString);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");

    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
  }
  // function formatDate(dateTimeString) {
  //   const dateObj = new Date(dateTimeString);
  //   const day = dateObj.getDate().toString().padStart(2, "0");
  //   const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  //   const year = dateObj.getFullYear();

  //   return `${day}-${month}-${year}`;
  // }

  const formattedCreatedAt = formatDateTime(created_at);
  const formattedUpdatedAt = formatDateTime(updated_at);
  // const formattedUpdatedDate = formatDate(updated_at);

  const handleClickInfo = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const contacts = await loadContactsShared(id);
    // console.log(contacts)
    setModalContent({
      title: "Ver detalle",
      content: (
        <div className="py-4 px-3">
          <p className="py-2">
            <b>Título:</b> {title}
          </p>
          <p className="py-2">
            <b>Fecha de creación:</b> {formattedCreatedAt}
          </p>
          <p className="py-2">
            <b>Últ. actualización:</b> {formattedUpdatedAt}
          </p>
          {props.type === "file" ? (
            <div>
              <p className="py-2">
                <b>Duración:</b> {duration} hrs
              </p>
              <p className="py-2">
                <b>Usuarios invitados:</b>
              </p>
              <div className="overflow-y-auto max-h-[200px] ">
                <ContactAccess contacts={contacts} color="bg-lightgray" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ),
    });
    openModalInfo();
  };

  const handleDeleteConfig = (e) => {
    e.preventDefault();
    setModalContent({
      title: `¿Estás seguro de que deseas eliminar: ${title}?`,
      content: (
        <ContenidoEliminarFile
          id={id}
          onClose={closeModalInfo}
          type={props.type}
        />
      ),
    });

    openModalInfo();
  };
  const handleUpdateConfig = (e) => {
    e.preventDefault();

    setModalContent({
      title: `Actualizar título`,
      content: (
        <ContenidoActualizarFile
          id={id}
          title={title}
          onClose={closeModalInfo}
          type={props.type}
        />
      ),
    });
    openModalInfo();
  };

  const handleUpdateColaborators = async (e) => {
    e.preventDefault();

    const contacts = await loadContactsShared(id);
    setModalContent({
      title: `Colaboradores`,
      content: (
        <ModalCompartirAcceso
          id={id}
          title={title}
          onClose={closeModalInfo}
          type={props.type}
          contacts={contacts}
        />
      ),
    });
    openModalInfo();
  };

  const openModalInfo = () => {
    setIsOpenModalInfo(true);
  };
  const closeModalInfo = (e) => {
    if (e) {
      e.preventDefault();
    }

    setIsOpenModalInfo(false);
  };

  return (
    <div className="bg-lightgray w-[18rem] h-[6rem] flex justify-between p-4 font-quicksand rounded-lg hover:bg-gray-200">
      <div className="flex items-center px-2 justify-center">
        {props.type === "file" ? (
          <RiFile3Fill className="text-5xl text-primary" />
        ) : (
          <RiFolder3Fill className="text-5xl text-grey" />
        )}
      </div>
      <div className="flex flex-col justify-between px-2 flex-wrap">
        <h2 className="truncate w-40">{title}</h2>
        <h3 className="pt-2">
          <span className="font-bold">Ult act. </span>
          {props.date}
        </h3>
      </div>
      {props.owner !== false && (
        <Menu as="div" className="">
          <Menu.Button className="text-2xl hover:bg-white rounded-full">
            <RiMore2Fill className="" />
          </Menu.Button>
          <Menu.Items
            as="section"
            className="right-[12rem] relative bg-gray-100 w-60 rounded-lg shadow-lg p-6 m-auto z-10"
          >
            <div>
              <Menu.Item>
                <button
                  onClick={handleClickInfo}
                  className="flex items-center gap-4 p-2 rounded-lg transition-colors text-base font-quicksand w-full hover:bg-primary hover:text-white"
                >
                  <RiEyeFill /> Ver detalle
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={handleUpdateConfig}
                  className="flex items-center gap-4 p-2 rounded-lg transition-colors text-base font-quicksand w-full hover:bg-primary hover:text-white"
                >
                  <RiPencilFill /> Editar título
                </button>
              </Menu.Item>
              {props.type === "file" && (
                <Menu.Item>
                  <button
                    onClick={handleUpdateColaborators}
                    className="flex items-center gap-4 p-2 rounded-lg transition-colors text-base font-quicksand w-full hover:bg-primary hover:text-white"
                  >
                    <RiUserAddFill /> Añadir participantes
                  </button>
                </Menu.Item>
              )}

              <Menu.Item>
                <button
                  onClick={handleDeleteConfig}
                  className="flex items-center gap-4 p-2 rounded-lg transition-colors text-base font-quicksand w-full hover:bg-red-500 hover:text-white"
                >
                  <RiDeleteBin6Fill /> Eliminar
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      )}

      <ModalInfo isOpen={isOpenModalInfo} onClose={closeModalInfo}>
        <div className="p-3">
          <h1 className="text-lg font-bold text-center text-primary mb-4">
            {modalContent ? modalContent.title : ""}
          </h1>
          {modalContent ? modalContent.content : null}
        </div>
      </ModalInfo>
    </div>
  );
};

File.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  item: PropTypes.any,
  owner:PropTypes.any
};
