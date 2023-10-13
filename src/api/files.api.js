import axios from "./axios";

export const getAllFiles = async (userId) => {
  return axios.get(`/all-files/${userId}`);
};
export const getAllFilesByFolder = async (userId, folderId) => {
  return axios.get(`/all-files/${userId}/${folderId}`);
};
export const getAllFilesByKeyword = async (userId, keyword) => {
  return axios.get(`/all-files/${userId}/${keyword}`);
};

export const getFileById = async (fileId) => {
  return axios.get(`/files/${fileId}`);
};

export const createFile = async (title, idFolder) => {
  
    return axios.post(`/files/${localStorage.getItem("userID")}`, { title, idFolder});
  
  
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
