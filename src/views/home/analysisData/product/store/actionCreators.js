import { GET_PRODUCT_LINE } from './actionTypes'
import { postProductLine } from '@/api';

export const getProductLine = (startTime, endTime, indicator, platform) => {
  return async dispatch => {
    const res = await postProductLine(startTime, endTime, indicator, platform);
    console.log(startTime, endTime, indicator, platform, res);
    if (res) {
      dispatch({
        type: GET_PRODUCT_LINE,
        productLine: res.data.list
      })
    }
  }
};