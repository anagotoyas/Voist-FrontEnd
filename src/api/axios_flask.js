import axios from 'axios'

const client_flask = axios.create({
    
    baseURL: 'http://137.184.45.104',
    withCredentials:false
})


export default client_flask;