import { INITINFOCARD } from './actionTypes'

const initState = {
	infoCardData: {
		"totalCustomers": 0,
		"customerIncrease": 0,
		"salesIncrease": 0,
		"totalSales": 0,
		"totalOrders": 0,
		"orderIncrease": 0
	}
}

const dashboardReducer = (state = initState, action) => {
	switch (action.type) {
		case INITINFOCARD:
			const newState = JSON.parse(JSON.stringify(state))
			newState.infoCardData = action.infoCardData
			return newState
		default:
			return state
	}
}

export default dashboardReducer