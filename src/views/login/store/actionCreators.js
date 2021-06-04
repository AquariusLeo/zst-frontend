import { LOGIN, CHANGE_PASSWORD } from './actionTypes';
import { getLogin, changePassword } from '@/api';

export const login = (username, password) => {
  return async dispatch => {
    const res = await getLogin(username, password);
    if (res && res.data && res.data.token) {
      localStorage.setItem('zst-token', res.data.token);
      dispatch({
        type: LOGIN,
        username: res.data.username || 'unknown',
        isLogin: true,
        permissionIdList: res.data.permissionIdList,
      });
    }
  };
};

export const change = (username, oldPassword, newPassword) => {
  return async dispatch => {
    const res = await changePassword(username, oldPassword, newPassword);
    if (res && res.status === 200) {
      localStorage.removeItem('zst-token');
      dispatch({
        type: CHANGE_PASSWORD,
        username: '',
        isLogin: false,
        permissionIdList: [],
      });
      console.log('success');
      return true;
    } else if (res && res.status === 400) {
      console.log('fail');

      return false;
    }
  };
};
