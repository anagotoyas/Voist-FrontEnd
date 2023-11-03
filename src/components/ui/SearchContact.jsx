// import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

export const SearchContact = ({ onSearch, id, setResults, setSearchValue,searchValue }) => {

  const { loadContactsStatus } = useAuth();

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    fetchData(newValue);

    if (onSearch) {
      onSearch(newValue);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (onSearch) {
        onSearch(searchValue);
      }
    }
  };

  const fetchData = async (name) => {
    const res = await loadContactsStatus(id);
    const filteredUsers = res.filter((user) => {
      return (
        name && user && user.name && user.name.toLowerCase().includes(name)
      );
    });
    setResults(filteredUsers);
  };

  return (
    <div className="bg-white border-2 border-lightgray w-[100%] rounded-md h-10 px-4 shadow-neutral-200	flex justify-center items-center">
      <RiSearch2Line className="text-primary" />
      <input
        type="text"
        placeholder="Buscar contacto..."
        className="bg-transparent h-[100%] w-[100%] ml-5 focus:outline-none"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};
SearchContact.propTypes = {
  onSearch: PropTypes.func,
  id: PropTypes.number,
  setResults: PropTypes.func,
  setSearchValue: PropTypes.func,
  searchValue: PropTypes.string,
};
