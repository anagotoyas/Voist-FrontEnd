import { RiDeleteBin4Fill, RiUserAddFill } from "react-icons/ri";

import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

export const ListContact = (props) => {
  const { createContact, deleteContacts, user } = useAuth();

  const agregarContacto = (contact, id) => {
    if (contact) {
      deleteContacts(id, user.id);
    } else {
      const data = {
        owner_id: user.id,
        contact_id: id,
      };
      createContact(data);
    }
  };

  return (
    <>
      <div className=" my-2 p-2">
        <div className="flex flex-col">
          <div
            key={props.id}
            className="flex items-center justify-between mb-2 bg-lightgray p-4 rounded-lg flex-wrap md:flex-nowrap"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={props.gravatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2">
                <p className="text-sm font-semibold text-gray-700">
                  {props.name}
                </p>
                <p className="text-xs text-gray-500">{props.email}</p>
              </div>
            </div>

            <div className="w-full md:w-auto flex justify-center mt-4 md:mt-0">
              {props.is_you ? (
                <span className="text-sm text-center px-4 font-bold text-gray-500">Eres tú</span>
              ) : (
                <button
                  className={`px-3 py-2 rounded-lg text-white text-sm flex items-center ${
                    props.is_contact
                      ? "bg-red-500 hover:bg-gray-400"
                      : "bg-primary hover:bg-gray-400"
                  }`}
                  onClick={() => {
                    agregarContacto(props.is_contact, props.id);
                  }}
                >
                  {props.is_contact ? (
                    <>
                      <span>Eliminar</span>{" "}
                      <RiDeleteBin4Fill className="pl-2 text-[1.5rem]" />
                    </>
                  ) : (
                    <>
                      <span>Agregar</span>
                      <RiUserAddFill className="pl-2 text-[1.5rem] font-bold" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ListContact.propTypes = {
  id: PropTypes.number,
  gravatar: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  is_contact: PropTypes.bool,
  is_you: PropTypes.bool,
};
