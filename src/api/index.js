import * as URL from './urls';
import instance from '@/utils/http/axios';

export const getLogin = data => {
  return instance.request({
    url: URL.BASE_URL + URL.LOGIN,
    method: 'post',
    data: data,
  });
};

// dashboard
export const getDashboardInfoCard = (year, month) => {
  return instance.request({
    url: URL.BASE_URL + URL.DASHBOARD_INFO_CARD,
    method: 'get',
    params: {
      year,
      month,
    },
  });
};

export const getDashboardTrend = year => {
  return instance.request({
    url: URL.BASE_URL + URL.DASHBOARD_TREND,
    method: 'get',
    params: {
      year,
    },
  });
};

export const getDashboardPie = (year, month) => {
  return instance.request({
    url: URL.BASE_URL + URL.DASHBOARD_PIE,
    method: 'get',
    params: {
      year,
      month,
    },
  });
};

// analysis
export const getProducts = product => {
  return instance.request({
    url: URL.BASE_URL + URL.PRODUCT_SEARCH,
    method: 'get',
    params: {
      product,
    },
  });
};

// analysis time
export const postTimeLine = (
  startTime,
  endTime,
  indicator,
  platform,
  timeLevel,
  product,
) => {
  return instance.request({
    url: URL.BASE_URL + URL.TIMELINE,
    method: 'post',
    data: {
      startTime,
      endTime,
      index: indicator,
      platform,
      timeLevel,
      product,
    },
  });
};

export const postTimeTable = (
  startTime,
  endTime,
  platform,
  timeLevel,
  product,
  pageNum,
  pageSize,
) => {
  return instance.request({
    url: URL.BASE_URL + URL.TIMETABLE,
    method: 'post',
    data: {
      startTime,
      endTime,
      pageNum,
      pageSize,
      platform,
      timeLevel,
      product,
    },
  });
};

// analysis area
export const postProvinceMap = (
  startTime,
  endTime,
  indicator,
  platform,
  product,
) => {
  return instance.request({
    url: URL.BASE_URL + URL.PROVINCE_MAP,
    method: 'post',
    data: {
      startTime,
      endTime,
      index: indicator,
      platform,
      product,
    },
  });
};
