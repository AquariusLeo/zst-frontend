import { BASE_URL, LOGIN, GETTEST } from "./urls";
import axios from "@/utils/http/axios";

export const getLogin = (params) => {
  return axios.post(BASE_URL + LOGIN, params)
}

export const getTest = (params) => {
  return axios.get(BASE_URL + GETTEST)
}