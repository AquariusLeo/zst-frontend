import axios from "axios";
import checkStatus from "./checkStatus";
const instance = axios.create()

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("zst-token");
    return config
  },
  (error) => Promise.reject(error.message)
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      checkStatus(error.response.status)
    }
  }
)

export default instance