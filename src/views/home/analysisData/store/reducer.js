import { combineReducers } from 'redux';
import { analysisTimeReducer } from '../time/store'
import { analysisAreaReducer } from '../area/store'
import {
  CHANGE_DATE,
  CLICK_PLATFORMS,
  CLICK_INDICATORS,
  SEARCH_PRODUCT,
  SELECT_PRODUCT,
  CHANGE_FETCH_STATUS,
  CLICK_TIME_LEVEL,
  INITPICKER,
  GET_TIME_TABLE,
  CHANGE_TABLE_LOADING,
} from './actionTypes';

const initState = {
  times: {
    startTime: '2021-01-01',
    endTime: '2021-01-02',
  },
  indicator: '销售总金额',
  platform: ['天猫', '京东', '微信'],
  fetching: false,
  searchValue: [],
  searchData: [],
  timeLevel: '月度',
  tableData: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
  loading: false,
};

const analysisReducer = (state = initState, action) => {
  switch (action.type) {
    case INITPICKER:
      return {
        times: action.times,
        indicator: action.indicator,
        platform: action.platform,
        timeLevel: action.timeLevel,
        fetching: action.fetching,
        searchValue: action.searchValue,
        searchData: action.searchData,
        tableData: action.tableData,
        pagination: action.pagination,
        loading: action.loading,
      };
    case CHANGE_TABLE_LOADING:
      return { ...state, loading: action.loading };
    case GET_TIME_TABLE:
      return {
        ...state,
        tableData: action.tableData,
        pagination: action.pagination,
        loading: action.loading,
      };
    case CLICK_TIME_LEVEL:
      return { ...state, timeLevel: action.level };
    case CHANGE_FETCH_STATUS:
      return { ...state, fetching: action.fetching };
    case SELECT_PRODUCT:
      return { ...state, searchValue: action.searchValue, searchData: [] };
    case SEARCH_PRODUCT:
      return { ...state, searchData: action.searchData };
    case CLICK_PLATFORMS:
      return { ...state, platform: action.platform };
    case CLICK_INDICATORS:
      return { ...state, indicator: action.indicator };
    case CHANGE_DATE:
      return { ...state, times: action.times };
    default:
      return { ...state };
  }
};

export default combineReducers({
  public: analysisReducer,
  analysisTime: analysisTimeReducer,
  analysisArea: analysisAreaReducer,
});
