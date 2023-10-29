import { RiUserAddLine } from "react-icons/ri";
import { SearchBar } from "../components/ui/SearchBar";
import { Contact } from "../components/contacts/Contact";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Empty } from "antd";


export const Contactos = () => {
  const { user, loadAllContacts, contacts } = useAuth();
  
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (user && user.id) {
      loadAllContacts(user.id);
    }
  }, [user]);

  const handleSearch = (value) => {
    setSearchValue(value);

    const filteredContacts = contacts.filter((item) =>
      item.contact_name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContacts(filteredContacts);
  };

  let displayContacts = searchValue ? filteredContacts : contacts;

  

  return (
    <div className="w-full">
      <h3 className="font-quicksand text-xl">Mis Contactos</h3>
      <section className="flex justify-between items-center md:gap-8 gap-4 flex-wrap md:flex-nowrap mt-6">
        <SearchBar className="" onSearch={handleSearch} />
        <button className="bg-primary text-white rounded-full flex w-[15rem] justify-center items-center gap-4 py-2 m-auto">
          <RiUserAddLine /> Agregar contacto
        </button>
      </section>
      <section className="my-4 pt-4 w-full flex flex-wrap gap-8 justify-center sm:justify-start">
        {displayContacts.length === 0 ? (
          <div className="flex items-center justify-center w-[90%] h-full mt-[5rem]">
            <Empty />
          </div>
        ) : (
          displayContacts.map((item) =>   (
              <Contact
                key={item.contact_id}
                image={item.contact_gravatar}
                email={item.contact_email}
                name={item.contact_name}
                contact_id={item.contact_id}
                owner_id={item.owner_id}
              
              />
            )
          )
        )}
      </section>

     
    </div>
  );
};
