import { combineReducers } from 'redux';
import { dashboardReducer } from '@/views/home/dashboard/store';
import { analysisReducer } from '@/views/home/analysisData/store';

export default combineReducers({
  dashboard: dashboardReducer,
  analysis: analysisReducer,
});
