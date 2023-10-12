import axios from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// export const getUser = () => {
//   const { user } = useAuth();
//   return user;
// };

export const getAllFiles = async () => {
  
  try {
    const response = await axios.get(`/all-files/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    return null;
  }
};

export const getFileById = async (fileId) => {
  try {
    const response = await axios.get(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
};

export const createFile = async (title) => {
 
  try {
    const response = await axios.post("/files", { title });
    return response.data;
  } catch (error) {
    console.error("Error creating file:", error);
    return null;
  }
};

export const updateFile = async (fileId, title) => {
  try {
    const response = await axios.put(`/files/${fileId}`, { title });
    return response.data;
  } catch (error) {
    console.error("Error updating file:", error);
    return null;
  }
};

export const deleteFile = async (fileId) => {
  try {
    const response = await axios.delete(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    return null;
  }
};

export const addAccessUser = async (fileId, userId) => {
  try {
    const response = await axios.post("/add-user", { fileId, userId });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

export const removeAccessUser = async (fileId, userId) => {
  try {
    const response = await axios.post("/remove-user", { fileId, userId });
    return response.data;
  } catch (error) {
    console.error("Error removing user:", error);
    return null;
  }
};

export const setFilePath = async (fileId, filePath) => {
  try {
    const response = await axios.put(`/set-file-path/${fileId}`, { filePath });
    return response.data;
  } catch (error) {
    console.error("Error setting file path:", error);
    return null;
  }
};

export const saveAudioBlobAsWAV = async (formData,id) => {
  try {
    const response = await axios.post(`/save-file/${id}`, formData,{ headers: {
      'Content-Type': 'multipart/form-data',
    }})
    return response.data;
  } catch (error) {
    console.error("Error saving audio as WAV:", error);
    return null;
  }
};

