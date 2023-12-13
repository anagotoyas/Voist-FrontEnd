import { RiCloseLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { Input } from "antd";
import {  message } from "antd";
import { Button as Boton } from "../ui/index";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

export const ModalUploadFiles = ({ isOpen, children, onClose }) => {
  const [audioFileName, setAudioFileName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [fileList, setFileList] = useState([]);
  const [siguente, setSiguente] = useState(false);
  const [archivosList, setArchivosList] = useState([]);
  

  const {  createFiles, subirArchivo } = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id_folder = searchParams.get("idCarpeta");

  const handleClose = () => {
    setAudioFileName("");
   
    setFileList([]);
    setArchivosList([]);
    setSiguente(false);
    onClose();
  };
  
  const handleUpload = async () => {
    setSiguente(true);
  };

  const handleArchivoAdjuntosChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    setArchivosList(info.fileList);
  };

  const handleArchivosDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  const handleCreateClick = async () => {
   
      const formData2 = new FormData();
      archivosList.forEach((file) => {
        formData2.append("files", file.originFileObj);
      });

      try {
      
        const resp = await createFiles(audioFileName, id_folder, true);
        
      
         await subirArchivo(resp.id, formData2);
    
      } catch (error) {
        console.error("Error uploading the file:", error);
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

      <div className="relative bg-white w-[60%] p-4 rounded-lg shadow-lg flex flex-col justify-center">
        <RiCloseLine
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 hover:bg-gray-200 rounded-full text-2xl"
          onClick={handleClose}
        />

        <h1 className="text-lg font-medium">Subir material de clase</h1>
        {!siguente ? (
          <>
            {" "}
            <Input
              placeholder="Titulo de la grabación"
              className="mt-5 text-md"
              value={audioFileName}
              onChange={(e) => setAudioFileName(e.target.value)}
            />
           
            <div className={`flex items-center justify-center `}>
              <Boton
                className={`mt-5 text-center px-5  ${
                  audioFileName.trim().length < 3 ||
                  !audioFileName 
                    ? "bg-gray-500 text-white"
                    : ""
                }`}
                onClick={handleUpload}
                disabled={
                  audioFileName.trim().length < 3 ||
                  !audioFileName 
                }
              >
                Siguiente
              </Boton>
            </div>
          </>
        ) : (
          <div
            className={`flex items-center justify-center flex-col w-full mt-5`}
          >
            <Dragger
              className="w-full"
              name="archivos"
              multiple
              archivosList={archivosList}
              onChange={handleArchivoAdjuntosChange}
              onDrop={handleArchivosDrop}
              accept=".pdf"
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Dale click o arrastra los archivos a esta área para subirlos
              </p>
            </Dragger>

            <Boton
              className={`text-center mt-5 px-5 ${
                archivosList.length === 0 ? "bg-gray-500" : ""
              } `}
              onClick={handleCreateClick}
              disabled={archivosList.length === 0}
            >
              Crear
            </Boton>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
ModalUploadFiles.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};
