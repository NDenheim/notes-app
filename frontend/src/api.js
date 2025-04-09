import axios from 'axios'
import { ACCESS_TOKEN} from './constants'

const apiUrl = "/choreo-apis/notes-app/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL :  apiUrl,
})

api.interceptors.request.use(
    // Look in local host to see if we have an access token
    // If we do then add that as an authorisation header to our request
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api