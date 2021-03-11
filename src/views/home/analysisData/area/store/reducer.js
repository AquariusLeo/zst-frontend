import { GET_PROVINCE_MAP } from './actionTypes'
const initState = {
  provinceMap: [],
  provinceTop: [],
}

const analysisAreaReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROVINCE_MAP:
      return { ...state, provinceMap: action.provinceMap}
    default:
      return { ...state }
  }
}