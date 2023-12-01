import { RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { Input } from "../ui/index";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Spin } from "antd";

export const ModalCarpeta = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const { saveFolder } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError("");
  };

  const cerrarModal = () => {
    setInputValue("");
    onClose();
  };

  const guardarCarpeta = async () => {
    if (inputValue.trim().length >= 3) {
      setLoading(true);
      await saveFolder(inputValue);
      setLoading(false);
      cerrarModal();
    } else {
      setError("El nombre de la carpeta debe tener al menos 3 caracteres");
    }
  };

  return (
    <div
      className={
        isOpen
          ? "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
          : "hidden"
      }
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white w-96 p-4 rounded-lg shadow-lg flex flex-col justify-center">
        <RiCloseLine
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 hover:bg-gray-200 rounded-full text-2xl"
          onClick={cerrarModal}
        />

        <div className="p-4 flex items-center flex-col justify-center h-[15rem]">
          {loading ? <Spin size="small" /> : null}
          <h2 className="text-lg font-medium">
            Ingrese el nombre de su carpeta
          </h2>
          <Input
            placeholder="Titulo"
            required
            value={inputValue}
            onChange={handleInputChange}
          ></Input>
          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={inputValue.trim().length < 3}
            className={`text-white px-8 py-2 mt-4 border rounded-md  ${
              loading ? "bg-gray-400" : ""
            } ${
              inputValue.trim().length < 3
                ? "cursor-not-allowed bg-gray-400"
                : "bg-primary"
            }`}
            onClick={guardarCarpeta}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

ModalCarpeta.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
