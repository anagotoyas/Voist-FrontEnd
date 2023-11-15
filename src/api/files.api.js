import axios from "./axios";
import axios_flask from './axios_flask'

export const getAllFiles = async () => {
  return axios.get(`/all-files/`);
};
export const getAllFilesByFolder = async ( folderId) => {
  return axios.get(`/all-files/${folderId}`);
};


export const getFileById = async (fileId) => {
  return axios.get(`/files/${fileId}`);
};
export const getFileByContact = async () => {
  return axios.get(`/files-contact`);
};

export const createFile = async (title, idFolder) => {
  
    return axios.post(`/files`, { title, idFolder});
  
  
};

export const updateFile = async (fileId, title) => {
  return axios.put(`/files/${fileId}`, { title });
};

export const deleteFile = async (fileId) => {
  return axios.delete(`/files/${fileId}`);
};

export const addAccessUser = async (fileId, userId) => {
  return axios.post("/add-user", { fileId, userId });
};

export const removeAccessUser = async (fileId, userId) => {
  return axios.post("/remove-user", { fileId, userId });
};

export const setFilePath = async (fileId, filePath) => {
  axios.put(`/set-file-path/${fileId}`, { filePath });
};


export const saveAudioBlobAsWAV = async (formData, id) => {
  return axios.post(`/save-file/${id}`, formData,{ headers: {
    'Content-Type': 'multipart/form-data',
  }})
};

export const uploadAudio = async (formData,fileName)=>{
  return axios.post(`/upload/${fileName}`, formData,{ headers: {
    'Content-Type': 'multipart/form-data',
  }})
}

export const createSummary = async (data)=>{
  return axios_flask.post(`/resume`, data)
}

export const saveSummary = async (data)=>{
  return axios.post(`/createSummary`, data)
}
export const countFilesMonth = async ()=>{
  return axios.get(`/files-month`)
}
export const countFiles = async ()=>{
  return axios.get(`/files-count`)
}


