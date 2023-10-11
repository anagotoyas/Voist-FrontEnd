import axios from "./axios";

export const getAllFiles = async () => {
  return axios.get(`/all-files`);
};

export const getFileById = async (fileId) => {
  return axios.get(`/files/${fileId}`);
};

export const createFile = async (title) => {
  return axios.post("/files", { title});
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

export const saveAudioBlobAsWAV = async (fileId, audioBlob) => {
  return axios.post("/save-audio-blob-as-wav", {
    fileId,
    audioBlob,
  });
};

export const saveAudioFile = async (base64String) => {
  return axios.post("/save-wav", { audioData: base64String });
};
