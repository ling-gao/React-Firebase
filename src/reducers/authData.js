import * as types from '../constants/actionTypes'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {

    case types.AUTH_DATA:
      return action.authData

    case types.LOGOUT:
      return {}

    default:
      return state
  }
}
