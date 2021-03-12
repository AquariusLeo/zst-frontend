import { GET_PLATFORM_LINE } from './actionTypes'

const initState = {
  platformLine: [],
}

const analysisPlatformReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PLATFORM_LINE:
      return { ...state, platformLine: action.platformLine };
    default:
      return { ...state };
  }
};

export default analysisPlatformReducer;