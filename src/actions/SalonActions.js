import * as types from '../constants/actionTypes'
import * as _ from 'lodash'
import { message } from 'antd'
import { ref } from '../constants/firebase'

export function addSalon () {
  return {
    type: types.ADD_SALONs
  }
}