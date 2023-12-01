import PropTypes from "prop-types";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Spin } from "antd";

export const ContenidoActualizarFile = ({ id, title, type, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const [titulo, setTitulo] = useState(title);

  const { renameFolder, updateFiles } = useAuth();

  const handleTituloChange = (e) => {
    const newTitulo = e.target.value;
    setTitulo(e.target.value);
    if (newTitulo.trim().length >= 3) {
      setTitulo(newTitulo);
      setErrors("");
    } else {
      setErrors("El título debe tener al menos 3 caracteres");
    }
  };

  const editarTitulo = async () => {
    if (type === "file") {
      try {
        setLoading(true);

        await updateFiles(id, titulo);
        setLoading(false);

        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLoading(true);
        await renameFolder(id, titulo);
        setLoading(false);
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cerrar = (e) => {
    setTitulo(title);
    if (e) {
      e.preventDefault();
    }

    onClose(e);
  };

  return (
    <div>
      <Input value={titulo} onChange={handleTituloChange} />

      <div className="flex flex-col">
        {loading ? <Spin className=" mb-5" /> : ""}
        <div className="flex justify-around">
          <Button
            disabled={loading}
            onClick={(e) => cerrar(e)}
            className="p-5 hover:bg-gray-500"
          >
            Cancelar
          </Button>
          <Button
            disabled={loading || errors}
            onClick={editarTitulo}
            className={`bg-red-500 hover:bg-gray-500 ${errors ? 'cursor-not-allowed' : ''}`}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

ContenidoActualizarFile.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  type: PropTypes.string,
};
