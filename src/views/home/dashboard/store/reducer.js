import { INITINFOCARD, INITTREND, INITPIE } from './actionTypes'

const initState = {
  infoCardData: {
    "totalCustomers": 0,
    "customerIncrease": 0,
    "salesIncrease": 0,
    "totalSales": 0,
    "totalOrders": 0,
    "orderIncrease": 0
  },
  trendData: [],
  pieData: []
}

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case INITINFOCARD:
      return { ...state, infoCardData: action.infoCardData }
    case INITTREND:
      return { ...state, trendData: action.trendData }
    case INITPIE:
      return { ...state, pieData: action.pieData}
    default:
      return state
  }
}

export default dashboardReducer