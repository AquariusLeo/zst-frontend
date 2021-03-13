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

export const postProvinceTop = (
  startTime,
  endTime,
  indicator,
  platform,
  product,
) => {
  return instance.request({
    url: URL.BASE_URL + URL.TOP_PROVINCE,
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

export const postProvinceTable = (
  startTime,
  endTime,
  platform,
  product,
  pageNum,
  pageSize,
) => {
  return instance.request({
    url: URL.BASE_URL + URL.PROVINCE_TABLE,
    method: 'post',
    data: {
      startTime,
      endTime,
      platform,
      product,
      pageNum,
      pageSize,
    },
  });
}

// analysis platform
export const postPlatformLine = (startTime, endTime, indicator, product) => {
  return instance.request({
    url: URL.BASE_URL + URL.PLATFORM_LINE,
    method: 'post',
    data: {
      startTime,
      endTime,
      index: indicator,
      product,
    },
  });
};

export const postPlatformTable = (
  startTime,
  endTime,
  product,
  pageNum,
  pageSize,
) => {
  return instance.request({
    url: URL.BASE_URL + URL.PLATFORM_TABLE,
    method: 'post',
    data: {
      startTime,
      endTime,
      product,
      pageNum,
      pageSize,
    },
  });
};

// analysis product
export const postProductLine = (startTime, endTime, indicator, platform) => {
  return instance.request({
    url: URL.BASE_URL + URL.PRODUCT_LINE,
    method: 'post',
    data: {
      startTime,
      endTime,
      index: indicator,
      platform,
    },
  });
};

export const postProductTable = (
  startTime,
  endTime,
  platform,
  pageNum,
  pageSize,
) => {
  return instance.request({
    url: URL.BASE_URL + URL.PRODUCT_TABLE,
    method: 'post',
    data: {
      startTime,
      endTime,
      platform,
      pageNum,
      pageSize,
    },
  });
};

export const postTopTenProductSales = (startTime, endTime, platform) => {
  return instance.request({
    url: URL.BASE_URL + URL.TOP_TEN_PRODUCT_SALES,
    method: 'post',
    data: {
      startTime,
      endTime,
      platform,
    },
  });
};

export const postTopTenProductNumbers = (startTime, endTime, platform) => {
  return instance.request({
    url: URL.BASE_URL + URL.TOP_TEN_PRODUCT_NUMBERS,
    method: 'post',
    data: {
      startTime,
      endTime,
      platform,
    },
  });
};
