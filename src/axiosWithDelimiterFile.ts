import axios from './axiosConfig';
// create new axios instance
const api = axios.create()

api.interceptors.request.use((request )=> {

    request.headers['Authorization'] = localStorage.getItem('token') || null
    return request;
})
export default api
