import { combineReducers } from 'redux';
import { dashboardReducer } from '@/views/home/dashboard/store';
import { analysisReducer } from '@/views/home/analysisData/store';
import { userReducer } from '@/views/login/store';

export default combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  analysis: analysisReducer,
});
