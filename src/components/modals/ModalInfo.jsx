import { RiCloseLine } from 'react-icons/ri';
import PropTypes from "prop-types";

export const ModalInfo = ({ isOpen, onClose, children }) => {
  const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={
        isOpen
          ? "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
          : "hidden"
      }
      onClick={onClose} 
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose} 
      ></div>

      <div
        className="relative bg-white w-96 p-4 rounded-lg shadow-lg flex flex-col justify-center"
        onClick={stopPropagation} 
      >
        <RiCloseLine
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 hover-bg-gray-200 rounded-full text-2xl"
          onClick={onClose}
        />

        {children}
        
      </div>
    </div>
  );
};

ModalInfo.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
