import axios from 'axios'

const client = axios.create({
    baseURL: 'https://fyn6neyc0i.execute-api.us-east-1.amazonaws.com/api',
    // baseURL: 'http://localhost:3000/api',
    withCredentials:true
})


export default client;