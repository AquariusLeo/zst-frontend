import { GET_PLATFORM_LINE } from './actionTypes';
import { postPlatformLine } from '@/api';

export const getPlatformLine = (startTime, endTime, indicator, product) => {
  return async dispatch => {
    const res = await postPlatformLine(startTime, endTime, indicator, product);
    if (res) {
      dispatch({
        type: GET_PLATFORM_LINE,
        platformLine: res.data.platformLine,
      });
    }
  };
};
