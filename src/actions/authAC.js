import * as types from '../constants/actionTypes'

export function logoutAction () {
  return {
    type: types.LOGOUT
  }
}

export function authDataAction (authData) {
  return {
    type: types.AUTH_DATA,
    authData
  }
}
