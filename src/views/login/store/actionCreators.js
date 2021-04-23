import { LOGIN } from './actionTypes';
import { getLogin } from '@/api'

export const login = (username, password) => {
  return async dispatch => {
    const res = getLogin(username, password)
    if (res && res.data && res.data.token) {
      localStorage.setItem('zst-token', res.data.token);
      dispatch({
        type: LOGIN,
        isLogin: true,
        permissionIdList: res.data.permissionIdList,
      })
    }
  }
};
