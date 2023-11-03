import PropTypes from "prop-types";
import { useState } from "react";
import { SearchContact } from "../ui/SearchContact";
import { SearchResultContacts } from "../contacts/SearchResultContacts";
import { ContactAccess } from "../contacts/ContactAccess";

export const ModalCompartirAcceso = ({ id, contacts }) => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);



  return (
    <div className="h-[15rem]">
      <SearchContact
        id={id}
        setResults={setResults}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        className="relative"
      />
      <SearchResultContacts
        results={results}
        searchValue={searchValue}
        className="absolute"
        idFile={id}
      />
      <div className="my-5 font-bold">
        <h1>Personas que tienen acceso:</h1>
      </div>
      <ContactAccess contacts={contacts} />
    </div>
  );
};

ModalCompartirAcceso.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  type: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      gravatar: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  busqueda: PropTypes.string,
};
