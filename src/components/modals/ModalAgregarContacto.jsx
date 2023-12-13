import { RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { SearchBar } from "../ui/SearchBar";
import { ListContact } from "../contacts/ListContact";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Empty } from "antd";

export const ModalAgregarContacto = ({ isOpen, onClose, children }) => {
  const { user, getContactsWithStatus, filteredUsers } = useAuth();

  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (user && user.id) {
      getContactsWithStatus(user.id);
    }
  }, [user]);


  
  const handleSearch = (value) => {
    setSearchValue(value);

    const filteredContacts = filteredUsers.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContacts(filteredContacts);
  };

  let displayContacts = searchValue ? filteredContacts : filteredUsers;
    

  return (
    <div
      className={
        isOpen
          ? "fixed inset-0 flex my-20 justify-center z-50 transition-opacity duration-300 ease-in-out"
          : "hidden"
      }
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white w-[90%] md:w-[80%] p-4 rounded-lg shadow-lg flex flex-col">
        <RiCloseLine
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 hover:bg-gray-200 rounded-full text-2xl"
          onClick={onClose}
        />
        <h1 className="text-lg font-bold text-center text-primary mb-4  pt-5">
          Lista de usuarios
        </h1>
        <SearchBar onSearch={handleSearch} />

        <div className="overflow-y-auto max-h-[800px]">
          {displayContacts.length === 0 ? (
            <div className="mt-20">
              <Empty />
            </div>
          ) : (
            displayContacts.map((contact) => (
              <ListContact
                key={contact.id}
                id={contact.id}
                name={contact.name}
                gravatar={contact.gravatar}
                email={contact.email}
                is_contact={contact.is_contact}
                is_you={contact.id === user.id}
              />
            ))
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

ModalAgregarContacto.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
