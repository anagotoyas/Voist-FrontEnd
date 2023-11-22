import axios from "./axios";

export const getContactList = async (userId) => {
  return axios.get(`/contacts/${userId}`);
};
export const getUsersWithStatus = async (userId) => {
  return axios.get(`/usersWithContactStatus/${userId}`);
};

export const addContact = async (data) => {
  return axios.post(`/add`, data);
};
export const editProfiles = async (data) => {
  return axios.put(`/edit-profile`, data);
};

export const deleteContact = async (contactId,ownerId) => {
  return axios.delete(`/contacts/${contactId}/${ownerId}`);
};
