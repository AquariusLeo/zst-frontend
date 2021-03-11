import { GET_PROVINCE_MAP, GET_PROVINCE_TOP } from './actionTypes'
import { postProvinceMap, postProvinceTop } from '@/api';

export const getProvinceMap = (
  startTime,
  endTime,
  indicator,
  platform,
  product,
) => {
  return async dispatch => {
    const res = await postProvinceMap(
      startTime,
      endTime,
      indicator,
      platform,
      product,
    );
    if (res) {
      dispatch({
        type: GET_PROVINCE_MAP,
        provinceMap: res.data.provinceMap
      })
    }
  }
}

export const getProvinceTop = (
  startTime,
  endTime,
  indicator,
  platform,
  product,
) => {
  return async dispatch => {
    const res = await postProvinceTop(
      startTime,
      endTime,
      indicator,
      platform,
      product,
    );
    if (res) {
      dispatch({
        type: GET_PROVINCE_TOP,
        provinceTop: res.data.provinceTop
      })
    }
  }
}