import { GET_TIME_LINE } from './actionTypes';

const initState = {
  timeLine: [],
};

const analysisTimeReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TIME_LINE:
      return { ...state, timeLine: action.timeLine };
    default:
      return { ...state };
  }
};

export default analysisTimeReducer;
