

import PropTypes from 'prop-types';


export const SearchBar = ({className}) => {
  return (
    <>
    <form  className={` w-full ${className} z-1`}>
         

           
            <input
              type="text"
              className="bg-gray-100/95 py-3 px-4 outline-none w-full rounded-lg border focus:bg-white focus:border-indigo-600"
              placeholder={`Buscar`}
            />
           
             
           
          
        </form>
        </>
  )
}

SearchBar.propTypes = {
  className: PropTypes.string
};
