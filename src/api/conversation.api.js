import axios from "./axios";
import axios_flask from './axios_flask'

export const getConversation = async (file_id) => {
  return axios.get(`/conversation/${file_id}`);
};


export const createConversation = async (file_id, question, answer) => {
  
    return axios.post(`/conversation`, { file_id, question, answer});
  
  
};

export const askQuestion = async (url_pdf,question) => {
  return axios_flask.post(`/chat`, { url_pdf,question});
}
