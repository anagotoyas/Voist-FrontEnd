
import PropTypes from "prop-types";
import { RiUserAddFill, RiUserForbidFill } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";

export const SearchResultContacts = ({ results,idFile }) => {

    const {shareFile, unshareFile}=useAuth()

    const permisos = (agregado,id) =>{
        if(agregado){
            // console.log('eliminado',idFile,id)
            unshareFile(idFile,id)
        } else{
            // console.log('agregado',idFile,id)
            shareFile(idFile,id)
        }
    }


  return (
    <div>
      
        <div className="flex flex-col overflow-y-scroll max-h-[20rem] absolute w-[85%]  ">
          {results.map((result) => (
            <div
              key={result.id}
              className="flex justify-between items-center bg-lightgray w-[100%] rounded-md h-10 px-4 shadow-neutral-200 py-6 hover:bg-gray-300"
            >
              <div className="flex items-center">
                <img
                  className="w-8 h-8 rounded-full"
                  src={result.gravatar}
                  alt=""
                />
                <p className="ml-5 truncate w-[8rem] text-[1rem]">{result.name}</p>
              </div>
              <button
                className={
                  result.has_access
                    ? "bg-red-500 text-white px-2 rounded-md w-8 h-8"
                    : "bg-primary text-white px-2 rounded-md w-8 h-8"
                }
                onClick={(()=>permisos(result.has_access, result.id))}
              >
                {result.has_access ? <RiUserForbidFill className="w-4 h-4" /> : <RiUserAddFill className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
     
    </div>
  );
};
SearchResultContacts.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      gravatar: PropTypes.string,
      is_added: PropTypes.bool,
    })
  ),
    searchValue: PropTypes.string,
    idFile: PropTypes.number,
};
