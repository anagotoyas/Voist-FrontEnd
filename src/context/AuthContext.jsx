import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";
import Cookie from "js-cookie";
import {
  getAllFiles,
  getAllFilesByFolder,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
  saveAudioBlobAsWAV,
  uploadAudio,
  getFileByContact,
  createSummary,
  saveSummary,
  countFiles,
  countFilesMonth
} from "../api/files.api";
import {
  getAllFolders,
  createFolder,
  deleteFolder,
  updateFolder
} from "../api/folder.api";
import {
  getContactList,
  deleteContact,
  getUsersWithStatus,
  addContact,
  editProfiles
} from "../api/contact.api";
import {
  infoFile,
  contactsStatus,
  shareContact,
  unshareContact
} from "../api/shared_file.api";
import {
  getConversation,
  createConversation,
  askQuestion,
} from '../api/conversation.api'


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
  const [filesShared, setFilesShared] = useState([]);
  const [folders, setFolders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [transcript, setTranscript] = useState(null);

  
  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/signup", data);
      setUser(res.data);
      setIsAuth(true);
     

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
    setErrors(null)
    
   
  };

  const usersCount = async () => {
    const res = await axios.get("/users-count");
    return res.data
  };

  const usersNew = async () => {
    const res = await axios.get("/users-new"); 
    return res.data
  };
  const findUsers = async (filter,page,limit) => {
    const res = await axios.get(`/users?filter=${filter}&page=${page}&limit=${limit}`); 
    return res.data
  };

  const findUser = async (id) => {
    const res = await axios.get(`/users/${id}`); 
    return res.data
  };

  const findTimeByUser = async (user) => {  
    const res = await axios.get(`/users/${user}/time`);
    return res.data;
  }
  const editProfile = async (user) => {  
    setLoading(true)
    const res = await editProfiles(user);
    setLoading(false)
    return res;
  }

  //File

  const loadFile = async (id) => {
    
    const res = await getFileById(id);
    setTranscript(res.data.transcript)
    
    return res.data;
  };

  const loadAllFiles = async () => {
   
    const res = await getAllFiles();
    
    setFiles(res.data);
    
   
  };
  const loadAllFilesShared = async () => {
   
    const res = await getFileByContact();
    
    setFilesShared(res.data);
    
   
  };

  const loadAllFilesByFolder = async (idFolder) => {
    const res = await getAllFilesByFolder( idFolder);
    return res.data;
  };

  const deleteFiles = async (id) => {
    setLoading(true);
    const res = await deleteFile(id);
    if (res.status === 204) {
      setFiles(files.filter((file) => file.id !== id));
    }
    setLoading(false);
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
      setLoading(true);
      await updateFile(id, data);
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message);
      }
    }
    setLoading(false);
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
  const uploadAudioWav = async (formData, fileName) => {
    console.log(`upload audio`);
    setLoading(true);
    try {
      const res = await uploadAudio(formData, fileName);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (data) => {
    try {
      const res = await createSummary(data);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }
  };

  const saveResume = async (data) => {
    try {
      const res = await saveSummary(data);
  
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }
  };

  const countFilesStored = async () => {
    const res = await countFiles();
    return res.data;
  }

  const countFilesStoredMonth = async () => {
    const res = await countFilesMonth();
    return res.data;
  }



  //Folder

  const loadAllFolders = async () => {
    const res = await getAllFolders();
    setFolders(res.data);
  };

  const saveFolder = async (title) => {
    setLoading(true);
    try {
      const res = await createFolder(title);
      setFolders([...folders, res.data]);
      setLoading(false);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }
    
  }

  const deleteFolders = async (id) => {
    setLoading(true);
    const res = await deleteFolder(id);
    if (res.status === 204) {
      setFolders(files.filter((file) => file.id !== id));
    }
    setLoading(false);
  };

  const renameFolder = async (id, title) => {
    setLoading(true);
    await updateFolder(id, title);
    
    setLoading(false);
  };

  //Contacts

  const loadAllContacts = async (id) => {
    const res = await getContactList(id);
    setContacts(res.data);
  };

  const deleteContacts = async (id,owner) => {
    setLoading(true);
    const res = await deleteContact(id, owner);
    if (res.status === 204) {
      setContacts(contacts.filter((contact) => contact.contact_id !== id));
    }
    setLoading(false);
  };

  const getContactsWithStatus = async (id) => {
   
    const res=await getUsersWithStatus(id);
    setFilteredUsers(res.data);
   
  };

  const createContact = async (data) => {
    setLoading(true);
    try {
      const res = await addContact(data);
      setContacts([...contacts, res]);
     
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      }
    }
    setLoading(false);
  };

  //shared files

  const loadContactsShared = async (id) => {
    const res = await infoFile(Number(id));
    return res.data;
  }
  const loadContactsStatus = async (id) => {
    const res = await contactsStatus(id);
    return res.data
  }
  const shareFile = async (idFile,id) => {
    setLoading(true);

    const res = await shareContact(idFile,id);
    setLoading(false);
    return res.data

  }
  const unshareFile = async (idFile,id) => {
    setLoading(true)
    const res = await unshareContact(idFile,id);
    setLoading(false)
    return res.data
  }

  //conversation

  const loadConversation = async (id) => {  
    const res = await getConversation(id);
    return res.data;
  }

  const createConversations = async (classId, question, answer) => {
    const res = await createConversation(classId, question, answer);
    return res.data;
  }

  const askQuestions = async (urlPdf,question) => {
    const res = await askQuestion(urlPdf,question);
    return res.data;
  }





  useEffect(() => {
    // setLoading(true)
    
    if (Cookie.get('token')) {
      axios
        .get(`/profile`)
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
        folders,
        saveFolder,
        uploadAudioWav,
        deleteFolders,
        renameFolder,
        loadAllContacts,
        contacts,
        deleteContacts,
        getContactsWithStatus,
        filteredUsers,
        createContact,
        loadContactsShared,
        loadContactsStatus,
        shareFile,
        unshareFile ,
        loadAllFilesShared,
        filesShared,
        transcript,
        createResume,
        saveResume,
        loadConversation,
        createConversations,
        askQuestions,
        usersCount,
        usersNew,
        countFilesStored,
        countFilesStoredMonth,
        findUsers,
        findUser,
        findTimeByUser,
        editProfile,
        setUser
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
