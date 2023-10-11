import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

import {
  getAllFiles,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
 
} from "../api/files.api";


export const FileContext = createContext();

export const useAuth = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useAuth must be used within an FileContext");
  }
  return context;
};

export function FileProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState(null);
  // const [loading, setLoading] = useState(false)

  const loadFile = async id =>{
    const res = await getFileById(id)
    return res.data
  }

  const loadAllFiles = async () =>{
    const res = await getAllFiles()
    return res.data
  }
  const deleteFiles = async (id) =>{
    const res = await deleteFile(id)
    if(res.status===204){
      setFiles(files.filter(file=>file.id!==id))
    }
  }
  const createFiles = async (file)=>{
    try{
      const res = await createFile(file);
      setFiles([...files, res.data]);
      return res.data
    } catch (error){
      if(error.response){
        setErrors(error.response.data)
      }
    }
  }

  const updateFiles = async (id,data)=>{
    try{
      const res = await updateFile(id,data)
      return res.data
    } catch(error){
      if(error.response){
        setErrors(error.response.data.message)
      }
    }
  }

 

  return (
    <FileContext.Provider
      value={{
        files,
        loadAllFiles,
        loadFile,
        createFiles,
        updateFiles,
        deleteFiles,
        errors
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

FileProvider.propTypes = {
  children: PropTypes.node,
};
