import axios from "./axios";

export const getAllFolders = async (userId) => {
  return axios.get(`/all-folders/${userId}`);
};

export const getFolderById = async (folderId) => {
  return axios.get(`/folders/${folderId}`);
};

export const createFolder = async (title) => {
  
    return axios.post(`/folders/${localStorage.getItem("userID")}`, { title});
  
  
};

export const updateFolder = async (folderId, title) => {
  return axios.put(`/folders/${folderId}`, { title });
};

export const deleteFolder = async (folderId) => {
  return axios.delete(`/folders/${folderId}`);
};

