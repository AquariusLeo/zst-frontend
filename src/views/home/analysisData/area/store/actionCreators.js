import { GET_PROVINCE_MAP } from './actionTypes'
import { postProvinceMap } from '@/api';

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