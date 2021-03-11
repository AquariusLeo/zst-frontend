import { GET_PROVINCE_MAP, GET_PROVINCE_TOP } from './actionTypes';
const initState = {
  provinceMap: [],
  provinceTop: [],
};

const analysisAreaReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROVINCE_MAP:
      return { ...state, provinceMap: action.provinceMap };
    case GET_PROVINCE_TOP:
      return { ...state, provinceTop: action.provinceTop };
    default:
      return { ...state };
  }
};

export default analysisAreaReducer;
