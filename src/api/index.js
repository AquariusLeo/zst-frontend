import { BASE_URL, LOGIN, TEST } from "./urls";
import instance from "@/utils/http/axios";

export const getLogin = (data) => {
  return instance.request({
    url: BASE_URL + LOGIN,
    method: 'post',
    data: data
  })
}

export const getTest = () => {
  return instance.request({
    url: BASE_URL + TEST,
    method: 'get',
  })
}
