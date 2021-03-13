import { GET_PRODUCT_LINE, GET_TOP_TEN_PRODUCT_NUMBERS, GET_TOP_TEN_PRODUCT_SALES } from './actionTypes'
const initState = {
  productLine: [],
  topTenProductSales: [],
  topTenProductNumbers: [],
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case GET_PRODUCT_LINE:
      return { ...state, productLine: action.productLine }
    case GET_TOP_TEN_PRODUCT_SALES:
      return { ...state, topTenProductSales: action.topTenProductSales };
    case GET_TOP_TEN_PRODUCT_NUMBERS:
      return { ...state, topTenProductNumbers: action.topTenProductNumbers}
    default:
      return { ...state }
  }
}

export default reducer