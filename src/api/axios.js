import axios from 'axios'

const client = axios.create({
    // baseURL: 'https://fyn6neyc0i.execute-api.us-east-1.amazonaws.com/api',
    // baseURL: 'http://localhost:3000/api',
    // baseURL: 'https://voist-backend.onrender.com/api',
    baseURL: 'https://seal-app-tgr7c.ondigitalocean.app/api',

    withCredentials:true
})


export default client;