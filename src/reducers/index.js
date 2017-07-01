import { combineReducers } from 'redux'
import authData from './authData'
import salon from './reducer_salon'

const rootReducer = combineReducers({
  authData,
  salon
})

export default rootReducer
