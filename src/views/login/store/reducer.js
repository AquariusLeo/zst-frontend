import { LOGIN } from './actionTypes';

const initState = {
  isLogin: false,
  permissionIdList: [4],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
        permissionIdList: action.permissionIdList,
      };
    default:
      return { ...state };
  }
};

export default userReducer;
