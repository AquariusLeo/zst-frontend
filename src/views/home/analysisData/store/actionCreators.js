import {
  CHANGE_DATE,
  CLICK_INDICATORS,
  CLICK_PLATFORMS,
  SEARCH_PRODUCT,
  SELECT_PRODUCT,
  CHANGE_FETCH_STATUS,
  CLICK_TIME_LEVEL,
  INITPICKER
} from './actionTypes'
import { getProducts, postTimeLine } from '@/api'

export const initPicker = (times) => ({
  type: INITPICKER,
  times,
  indicator: '销售总金额',
  platform: '全平台',
  timeLevel: '月度',
  fetching: false,
  searchValue: [],
  searchData: [],
})

export const changeDate = (times) => ({
  type: CHANGE_DATE,
  times
})

export const clickIndicators = (indicator) => ({
  type: CLICK_INDICATORS,
  indicator
})

export const clickPlatforms = (platform) => ({
  type: CLICK_PLATFORMS,
  platform
})

export const searchProduct = (str) => {
  return async (dispatch) => {
    const res = await getProducts(str)
    console.log(res)
    if (res) {
      dispatch({
        type: SEARCH_PRODUCT,
        searchData: res.data.products.map(value => ({ value: value, key: value }))
      })
      dispatch(changeFetchStatus(false))
    }
  }
}

export const selectProduct = (list) => ({
  type: SELECT_PRODUCT,
  searchValue: list.map(item => ({ key: item.key, value: item.value }))
})

export const changeFetchStatus = (fetchStatus) => ({
  type: CHANGE_FETCH_STATUS,
  fetching: fetchStatus
})

export const clickTimeLevel = (level) => ({
  type: CLICK_TIME_LEVEL,
  level
})

export const getTimeLine = (startTime, endTime, indicator, platform, timeLevel, searchValue) => {
  return async (dispatch) => {
    const res = await postTimeLine(startTime, endTime, indicator, platform, timeLevel, searchValue)
    console.log(res)
  }
}