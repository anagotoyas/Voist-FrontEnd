import PropTypes from "prop-types";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Spin } from "antd";

export const ContenidoEliminarFile = ({ onClose, id, type }) => {
  const [loading, setLoading] = useState(false);

  const { deleteFiles, deleteFolders } = useAuth();

  const eliminarFile = async () => {
    if (type === "file") {
      try {
        setLoading(true);
        await deleteFiles(id);
        setLoading(false);

        onClose;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLoading(true);
        await deleteFolders(id);
        setLoading(false);
        onClose;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col">
      {loading ? <Spin className=" mb-5" /> : ""}
      <div className="flex justify-around">
        <Button
          disabled={loading}
          onClick={onClose}
          className="p-5 hover:bg-gray-500"
        >
          Cancelar
        </Button>
        <Button
          disabled={loading}
          onClick={eliminarFile}
          className="bg-red-500 hover:bg-gray-500"
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};

ContenidoEliminarFile.propTypes = {
  id: PropTypes.number,
  onClose: PropTypes.func,
  type: PropTypes.string,
  onUpdateFilesList: PropTypes.func,
};
