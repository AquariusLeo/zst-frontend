import { GET_PRODUCT_LINE, GET_TOP_TEN_PRODUCT_NUMBERS, GET_TOP_TEN_PRODUCT_SALES } from './actionTypes';
import { postProductLine, postTopTenProductNumbers, postTopTenProductSales } from '@/api';

export const getProductLine = (startTime, endTime, indicator, platform) => {
  return async dispatch => {
    const res = await postProductLine(startTime, endTime, indicator, platform);
    // console.log(startTime, endTime, indicator, platform, res);
    if (res) {
      dispatch({
        type: GET_PRODUCT_LINE,
        productLine: res.data.list,
      });
    }
  };
};

export const getTopTenProductNumbers = (startTime, endTime, platform) => {
  return async dispatch => {
    const res = await postTopTenProductNumbers(startTime, endTime, platform);
    if (res) {
      dispatch({
        type: GET_TOP_TEN_PRODUCT_NUMBERS,
        topTenProductNumbers: res.data.list
      })
    }
  }
}

export const getTopTenProductSales = (startTime, endTime, platform) => {
  return async dispatch => {
    const res = await postTopTenProductSales(startTime, endTime, platform);
    if (res) {
      dispatch({
        type: GET_TOP_TEN_PRODUCT_SALES,
        topTenProductSales: res.data.list,
      });
    }
  };
};