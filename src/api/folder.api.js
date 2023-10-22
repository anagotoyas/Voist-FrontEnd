import axios from "./axios";

export const getAllFolders = async () => {
  return axios.get(`/all-folders`);
};

export const getFolderById = async (folderId) => {
  return axios.get(`/folders/${folderId}`);
};

export const createFolder = async (title) => {
  
    return axios.post(`/folders`, { title});
  
  
};

export const updateFolder = async (folderId, title) => {
  return axios.put(`/folders/${folderId}`, { title });
};

export const deleteFolder = async (folderId) => {
  return axios.delete(`/folders/${folderId}`);
};

