import axios from "axios";
import qs from "querystring";
import { message } from "antd";
import { checkStatus } from "./checkStatus";

const instance = axios.create({ timeout: 1000 })

instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.common['Authorization'] = localStorage.getItem("zst-token");

instance.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.params = qs.stringify(config.params)
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (res) => {
    if ((res.status >= 200 && res.status < 300) || res.status === 304) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  (error) => {
    const { response } = error
    if (response) {
      const info = checkStatus(response)
      message.error(info.msg)
    } else {
      message.error("请求失败")
    }
  }
)

export default instance