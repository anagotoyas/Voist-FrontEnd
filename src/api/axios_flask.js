import axios from 'axios'

const client_flask = axios.create({
    
    baseURL: 'https://jellyfish-app-xwb5l.ondigitalocean.app/flask-api2',
    withCredentials:false
})


export default client_flask;