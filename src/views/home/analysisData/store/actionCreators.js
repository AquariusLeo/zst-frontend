import {
  CHANGE_DATE,
  CLICK_INDICATORS,
  CLICK_PLATFORMS,
  SEARCH_PRODUCT,
  SELECT_PRODUCT,
  CHANGE_FETCH_STATUS,
  CLICK_TIME_LEVEL,
  INITPICKER,
  GET_TIME_LINE,
  GET_TIME_TABLE,
  CHANGE_TABLE_LOADING,
} from './actionTypes';
import { getProducts, postTimeLine, postTimeTable } from '@/api';

export const initPicker = times => ({
  type: INITPICKER,
  times,
  indicator: '销售总金额',
  platform: ['天猫', '京东', '微信'],
  timeLevel: '月度',
  fetching: false,
  searchValue: [],
  searchData: [],
  timeLine: [],
  tableData: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
  loading: false,
});

export const changeDate = times => ({
  type: CHANGE_DATE,
  times,
});

export const clickIndicators = indicator => ({
  type: CLICK_INDICATORS,
  indicator,
});

export const clickPlatforms = platform => ({
  type: CLICK_PLATFORMS,
  platform,
});

export const searchProduct = str => {
  return async dispatch => {
    const res = await getProducts(str);
    console.log(res);
    if (res) {
      dispatch({
        type: SEARCH_PRODUCT,
        searchData: res.data.products.map(value => ({
          value: value,
          key: value,
        })),
      });
      dispatch(changeFetchStatus(false));
    }
  };
};

export const selectProduct = list => ({
  type: SELECT_PRODUCT,
  searchValue: list.map(item => ({ key: item.key, value: item.value })),
});

export const changeFetchStatus = fetchStatus => ({
  type: CHANGE_FETCH_STATUS,
  fetching: fetchStatus,
});

export const clickTimeLevel = level => ({
  type: CLICK_TIME_LEVEL,
  level,
});

export const getTimeLine = (
  startTime,
  endTime,
  indicator,
  platform,
  timeLevel,
  product,
) => {
  return async dispatch => {
    // console.log(startTime, endTime, indicator, platform, timeLevel, product)
    const res = await postTimeLine(
      startTime,
      endTime,
      indicator,
      platform,
      timeLevel,
      product,
    );
    // console.log(res)
    if (res) {
      dispatch({
        type: GET_TIME_LINE,
        timeLine: res.data.timeLine,
      });
    }
  };
};

export const changeTableLoading = loadingStatus => ({
  type: CHANGE_TABLE_LOADING,
  loading: loadingStatus,
});

export const getTimeTable = (
  startTime,
  endTime,
  platform,
  timeLevel,
  product,
  pagination,
) => {
  return async dispatch => {
    console.log(startTime, endTime, platform, timeLevel, product, pagination);
    const res = await postTimeTable(
      startTime,
      endTime,
      platform,
      timeLevel,
      product,
      pagination.current,
      pagination.pageSize,
    );
    console.log(res);
    if (res) {
      dispatch({
        type: GET_TIME_TABLE,
        tableData: res.data.timeTable,
        pagination: {
          total: res.data.total,
          ...pagination,
        },
        loading: false,
      });
    }
  };
};
