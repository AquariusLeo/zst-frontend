import { LOGIN, LOGOUT, CHANGE_PASSWORD } from './actionTypes';

const initState = {
  username: '',
  isLogin: false,
  // TODO
  permissionIdList: [1, 2, 3],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.username,
        isLogin: action.isLogin,
        permissionIdList: action.permissionIdList,
      };
    case LOGOUT:
      return {
        ...state,
        username: action.username,
        isLogin: action.isLogin,
        permissionIdList: action.permissionIdList,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        username: action.username,
        isLogin: action.isLogin,
        permissionIdList: action.permissionIdList,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
