import { GET_TIME_LINE } from './actionTypes';
import { postTimeLine } from '@/api';

export const getTimeLine = (
  startTime,
  endTime,
  indicator,
  platform,
  timeLevel,
  product,
  shop
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
      shop
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


