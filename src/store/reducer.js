import { combineReducers } from "redux";
import { dashboardReducer } from '@/views/home/dashboard/store'

export default combineReducers({
  dashboard: dashboardReducer
})