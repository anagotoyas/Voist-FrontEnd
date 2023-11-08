import axios from 'axios'

const client_flask = axios.create({
    
    baseURL: 'https://flask-api-chat-e946f8beffac.herokuapp.com',
    withCredentials:false
})


export default client_flask;