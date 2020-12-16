import { BASE_URL, LOGIN, GETTEST } from "./urls";
import axios from "@/utils/http/axios";

export const getLogin = (data) => {
  return axios.request({
    url: BASE_URL + LOGIN,
    method: 'post',
    data: data
  })
}

export const getTest = (params) => {
  return axios.get(BASE_URL + GETTEST)
}