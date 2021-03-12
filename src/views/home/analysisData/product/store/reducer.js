import { GET_PRODUCT_LINE } from './actionTypes'
const initState = {
  productLine: []
}

const reducer = (state = initState, action) => {
  switch(action.type) {
    case GET_PRODUCT_LINE:
      return { ...state, productLine: action.productLine }
    default:
      return { ...state }
  }
}

export default reducer