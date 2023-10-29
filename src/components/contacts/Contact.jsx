import PropTypes from "prop-types";
import { useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { ModalDeleteConfirm } from "../modals/ModalDeleteConfirm";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export const Contact = (props) => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const {deleteContacts } = useAuth();


  const closeModalDelete = (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsOpenModalDelete(false);
  };

  const eliminarContacto=async()=> {
    console.log(props.contact_id)
    await deleteContacts(props.contact_id, props.owner_id)
  }

  return (
    <>
      <div className="bg-lightgray w-[16rem] h-[10rem] flex items-center justify-center  p-6 font-quicksand rounded-lg ">
        <div className="flex flex-col items-center  py-3">
          <img
            src={`${props.image}`}
            alt="profile-pic"
            className="w-[5rem] h-[5rem] object-cover rounded-full"
          />
          <h5 className="text-gray-500 text-sm pt-1 truncate w-45 text-center">
            {props.email}
          </h5>
          <h3 className="font-semibold pt-1 truncate w-40 text-center">
            {props.name}
          </h3>
        </div>
        <div className=" h-full -m-4 ">
          <div
            onClick={() => setIsOpenModalDelete(true)}
            className=" flex items-start justify-start text-lg p-1 -mt-3 text-red-500 hover:bg-gray-200 rounded-full"
          >
            <RiDeleteBin4Fill />
          </div>
        </div>
      </div>

      <ModalDeleteConfirm isOpen={isOpenModalDelete} onClose={closeModalDelete}>
        <div className="p-4">
          <h1 className="text-lg font-bold text-center text-primary mb-4">
            ¿Estás seguro que deseas eliminar de tus contactos a <br />
            <span className="text-gray-500">{props.name}?</span>
          </h1>

          <div className="flex justify-around mt-6">
            <Button
              onClick={closeModalDelete}
              className="p-5 hover:bg-gray-500"
            >
              Cancelar
            </Button>
            <Button className="bg-red-500 hover:bg-gray-500" onClick={eliminarContacto}>Confirmar </Button>
          </div>
        </div>
      </ModalDeleteConfirm>
    </>
  );
};

Contact.propTypes = {
  image: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  onOpenModal: PropTypes.func,
  contact_id: PropTypes.number,
  owner_id: PropTypes.number,
};
