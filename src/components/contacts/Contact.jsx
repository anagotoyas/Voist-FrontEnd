import { RiDeleteBin4Fill } from "react-icons/ri";
import PropTypes from "prop-types";

export const Contact = (props) => {
  return (
    <>
      <div className="bg-lightgray w-[13rem] h-[10rem] flex items-center justify-center  p-6 font-quicksand rounded-lg ">
        <div className="flex flex-col items-center ">
          <img
            src={`${props.image}`}
            alt="profile-pic"
            className="w-[5rem] h-[5rem] object-cover rounded-full"
          />
          <h5 className="text-gray-500 text-sm pt-1 truncate w-40 text-center">
            {props.email}
          </h5>
          <h3 className="font-semibold pt-1 truncate w-40 text-center">
            {props.name}
          </h3>
        </div>
        <div className=" h-full -m-4 ">
          <div  className=" flex items-start justify-start text-lg p-1 text-red-500 hover:bg-gray-200 rounded-full">
            <RiDeleteBin4Fill />
          </div>
        </div>
      </div>
    </>
  );
};

Contact.propTypes = {
  image: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
};
