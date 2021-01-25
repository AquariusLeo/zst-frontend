import { CHANGE_DATE, CLICK_PLATFORMS, CLICK_INDICATORS, SEARCH_PRODUCT, SELECT_PRODUCT, CHANGE_FETCH_STATUS, CLICK_TIME_LEVEL } from './actionTypes'

const initState = {
  times: {},
  indicator: '销售总金额',
  platform: '全平台',
  fetching: false,
  searchValue: [],
  searchData: [],
  timeLevel: '月度'
}

const analysisReducer = (state = initState, action) => {
  switch (action.type) {
    case CLICK_TIME_LEVEL:
      return { ...state, timeLevel: action.level}
    case CHANGE_FETCH_STATUS:
      return { ...state, fetching: action.fetching }
    case SELECT_PRODUCT:
      return { ...state, searchValue: action.searchValue, searchData: [] }
    case SEARCH_PRODUCT:
      return { ...state, searchData: action.searchData }
    case CLICK_PLATFORMS:
      return { ...state, platform: action.platform }
    case CLICK_INDICATORS:
      return { ...state, indicator: action.indicator }
    case CHANGE_DATE:
      return { ...state, times: action.times }
    default:
      return { ...state }
  }
}

export default analysisReducer