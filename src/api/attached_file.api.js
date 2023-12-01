import axios from "./axios";



export const getAttachedById = async (fileId) => {
  return axios.get(`/attachedFiles/${fileId}`);
};



