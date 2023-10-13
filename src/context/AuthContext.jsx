import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";
import Cookie from "js-cookie";
import {
  getAllFiles,
  getAllFilesByFolder,
  getAllFilesByKeyword,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
  saveAudioBlobAsWAV,
} from "../api/files.api";
import {
  getAllFolders
} from "../api/folder.api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
 

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setIsAuth(true);
      localStorage.setItem("userID", res.data.id);

      return res.data;
    } catch (error) {
      if (error.response && Array.isArray(error.response.data)) {
        console.error(error.response.data);
        setErrors(error.response.data);
      } else {
        console.error();
        setErrors([error.response.data.message]);
      }
    } finally {
      setLoading(false);
    }
  };

  const signin = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/signin", data);
      setUser(res.data);
      setIsAuth(true);

      localStorage.setItem("userID", res.data.id);

      return res.data;
    } catch (error) {
      if (error.response && Array.isArray(error.response.data)) {
        console.error(error.response.data);
        setErrors(error.response.data);
      } else {
        console.error();
        setErrors([error.response.data.message]);
      }
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    await axios.post("/signout");
    Cookie.remove("token");
    setUser(null);
    setIsAuth(false);
    
    localStorage.removeItem("userID");
  };

  //File

  const loadFile = async (id) => {
    
    const res = await getFileById(id);
    
    return res.data;
  };

  const loadAllFiles = async () => {
   
    const res = await getAllFiles(localStorage.getItem("userID"));
    
    setFiles(res.data);
    
   
  };

  const loadAllFilesByFolder = async (idFolder) => {
    const res = await getAllFilesByFolder(localStorage.getItem("userID"), idFolder);
    return res.data;
  };
  const loadAllFilesByKeyword = async (keyword) => {
    const res = await getAllFilesByKeyword(localStorage.getItem("userID"), keyword);
    return res.data;
  };

  const deleteFiles = async (id) => {
    const res = await deleteFile(id);
    if (res.status === 204) {
      setFiles(files.filter((file) => file.id !== id));
    }
  };
  const createFiles = async (file, idFolder) => {
    try {
      const res = await createFile(file, idFolder);
      setFiles([...files, res]);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }
  };

  const updateFiles = async (id, data) => {
    try {
      const res = await updateFile(id, data);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message);
      }
    }
  };

  const saveAudio = async (formData, id) => {
    console.log(`save audio`);
    setLoading(true);
    try {
      const res = await saveAudioBlobAsWAV(formData, id);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  //Folder

  const loadAllFolders = async () => {
    const res = await getAllFolders(localStorage.getItem("userID"));
    setFolders(res.data);
  };



  useEffect(() => {
    // setLoading(true)
    const userID = localStorage.getItem("userID");
    if (userID!==null) {
      axios
        .get(`/profile/${userID}`)
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
          setIsAuth(true);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setIsAuth(false);
          //  setLoading(false)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        signup,
        signin,
        signout,
        loading,
        loadAllFiles,
        loadFile,
        createFiles,
        updateFiles,
        deleteFiles,
        saveAudio,
        files,
        loadAllFilesByFolder,
        loadAllFolders,
        loadAllFilesByKeyword,
        folders,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
