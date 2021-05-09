import { LOGIN, LOGOUT } from '../actionTypes';
import userReducer from '../reducer'

test('LOGIN', () => {
  expect(userReducer({
    isLogin: false,
    permissionIdList: []
  }, {
    type: LOGIN,
    isLogin: true,
    permissionIdList: [1, 2, 3]
  })).toMatchObject({
    isLogin: true,
    permissionIdList: [1, 2, 3]
  })
})

test('LOGOUT', () => {
  expect(userReducer({
    isLogin: true,
    permissionIdList: [1, 2]
  }, {
    type: LOGOUT,
    isLogin: false,
    permissionIdList: []
  })).toMatchObject({
    isLogin: false,
    permissionIdList: []
  })
})