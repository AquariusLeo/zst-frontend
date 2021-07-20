import { GET_PROVINCE_MAP, GET_PROVINCE_TOP } from './actionTypes'
import { postProvinceMap, postProvinceTop } from '@/api';
import { message, Modal } from 'antd';

export const getProvinceMap = (
  startTime,
  endTime,
  indicator,
  platform,
  product,
  shop,
) => {
  return async dispatch => {
    const res = await postProvinceMap(
      startTime,
      endTime,
      indicator,
      platform,
      product,
      shop,
    );
    if (res) {
      dispatch({
        type: GET_PROVINCE_MAP,
        provinceMap: res.data.mapList
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
  shop,
) => {
  return async dispatch => {
    const res = await postProvinceTop(
      startTime,
      endTime,
      indicator,
      platform,
      product,
      shop,
    );
    if (res) {
      // console.log(res)
      dispatch({
        type: GET_PROVINCE_TOP,
        provinceTop: res.data.topTenProvince,
      });
      Modal.destroyAll();
      message.success('数据加载成功！');
    }
  }
}