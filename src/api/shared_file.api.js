import axios from "./axios";

export const infoFile = async (fileId) => {
  return axios.get(`/info/${fileId}`);
};
export const contactsStatus = async (fileId) => {
  return axios.get(`/listfile/${fileId}`);
};

export const shareContact = async (fileId,contactId) => {
  return axios.post(`/share/${fileId}/${contactId}`);
};

export const unshareContact = async (fileId, contactId) => {
  return axios.delete(`/unshare/${fileId}/${contactId}`);
};