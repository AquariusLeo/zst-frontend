import { INITINFOCARD, INITTREND } from './actionTypes'

const initState = {
  infoCardData: {
    "totalCustomers": 0,
    "customerIncrease": 0,
    "salesIncrease": 0,
    "totalSales": 0,
    "totalOrders": 0,
    "orderIncrease": 0
  },
  trendData: []
}

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case INITINFOCARD:
      return { ...state, infoCardData: action.infoCardData }
    case INITTREND:
      return { ...state, trendData: action.trendData }
    default:
      return state
  }
}

export default dashboardReducer