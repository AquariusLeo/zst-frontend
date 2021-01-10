import * as URL from "./urls";
import instance from "@/utils/http/axios";

export const getLogin = (data) => {
  return instance.request({
    url: URL.BASE_URL + URL.LOGIN,
    method: 'post',
    data: data
  })
}

// dashboard
export const getDashboardInfoCard = (year, month) => {
  return instance.request({
    url: URL.BASE_URL + URL.DASHBOARD_INFO_CARD,
    method: 'get',
    params: {
      year,
      month
    }
  })
}

export const getDashboardTrend = (year) => {
  return instance.request({
    url: URL.BASE_URL + URL.DASHBOARD_TREND,
    method: 'get',
    params: {
      year
    }
  })
}
