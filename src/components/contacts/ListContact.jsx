import { RiAddLine, RiDeleteBin4Fill } from "react-icons/ri";

import PropTypes from "prop-types";


export const ListContact = (props) => {


  return (
    <>
      <div className=" my-2 p-2">
        <div className="flex flex-col">
         
            <div
              key={props.id}
              className="flex items-center justify-between mb-2 bg-lightgray p-4 rounded-lg"
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

              <div>
                <button
                  className={`px-3 py-2 rounded-lg text-white text-sm flex items-center ${
                    props.is_contact
                      ? "bg-red-500 hover:bg-gray-400"
                      : "bg-primary hover:bg-gray-400"
                  }`}
                >
                  {props.is_contact ? (
                    <>
                      Eliminar <RiDeleteBin4Fill className="pl-2 text-xl" />
                    </>
                  ) : (
                    <>
                      Agregar{" "}
                      <RiAddLine className="pl-2 text-[1.5rem] font-bold" />
                    </>
                  )}
                </button>
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
   
  };
  