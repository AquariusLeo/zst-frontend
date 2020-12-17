import { BASE_URL, LOGIN } from "./urls";
import axios from "@/utils/http/axios";

export const getLogin = (data) => {
  return axios.request({
    url: BASE_URL + LOGIN,
    method: 'post',
    params: data
  })
}

export const getTest = (params) => {
  return axios.request({
    url: '/hub',
    method: 'get',
    params: params
  })
}