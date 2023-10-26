import { RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Button as Boton } from "../ui/index";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

export const ModalUploadAudio = ({ isOpen, onClose }) => {
  const [audioFileName, setAudioFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  const { saveAudio, createFiles } = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id_folder = searchParams.get("idCarpeta");

  const handleClose = () => {
    setAudioFileName("");
    setSelectedFile(null);
    setFileList([]);
    onClose();
  };

  const props = {
    beforeUpload: (file) => {
      const isWav = file.type === "audio/wav" || file.name.endsWith(".wav");
      if (!isWav) {
        message.error(`${file.name} is not a WAV file`);
        setAudioFileName("");
      } else {
        setSelectedFile(file);
        const newFileList = [ file];
        setFileList(newFileList);
      }

      isWav || Upload.LIST_IGNORE;
      return false;
    },
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log(audioFileName);
      let formData = new FormData();

      formData.append("audio", selectedFile);

      try {
        console.log(formData);
        const resp = await createFiles(audioFileName, id_folder);
        await saveAudio(formData, resp.id);
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    } else {
      console.error("No se seleccionó ningún archivo de audio");
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
          onClick={handleClose}
        />

        <h1 className="text-lg font-medium">Subir archivo</h1>
        <Input
          placeholder="Titulo de la grabación"
          className="mt-5 text-md"
          value={audioFileName}
          archivo
          onChange={(e) => setAudioFileName(e.target.value)}
        />
        <Upload
          {...props}
          customRequest={({ onSuccess }) => onSuccess("ok")}
          className="mt-5"
          maxCount={1}
          fileList={fileList}

          accept="audio/wav"
        >
          <Button icon={<UploadOutlined />}>Sube tu archivo wav</Button>
        </Upload>

        <div className={`flex items-center justify-center `}>
          <Boton className={`mt-5 text-center px-5  ${(!audioFileName || !selectedFile) ? 'bg-gray-500 text-white' : ''}`} onClick={handleUpload} disabled={!audioFileName || !selectedFile}>
            Crear archivo
          </Boton>
        </div>
      </div>
    </div>
  );
};

ModalUploadAudio.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
