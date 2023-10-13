

import PropTypes from 'prop-types';
import { useState } from 'react';


export const SearchBar = ({className, onSearch}) => {

  const [searchValue, setSearchValue] = useState(''); 

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
   
    if (onSearch) {
      onSearch(newValue);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita la recarga de la página
      // Realiza la acción que deseas cuando se presiona "Enter"
      if (onSearch) {
        onSearch(searchValue);
      }
    }
  };

  return (
    <>
    <form  className={` w-full ${className} z-1`}>
         

           
            <input
              type="text"
              className="bg-gray-100/95 py-3 px-4 outline-none w-full rounded-lg border focus:bg-white focus:border-indigo-600"
              placeholder={`Buscar`}
              value={searchValue} 
              onChange={handleSearchChange} 
              onKeyDown={handleKeyPress}
            />
           
             
           
          
        </form>
        </>
  )
}

SearchBar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
};
