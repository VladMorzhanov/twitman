/*
 *
 * Profile reducer
 *
 */

import {fromJS, List} from 'immutable'
import {
  FETCH_USER_FAILURE_ACTION,
  FETCH_USER_REQUEST_ACTION,
  FETCH_USER_SUCCESS_ACTION
} from './constants'

const initialState = List([])

function profileReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST_ACTION:
      return state
    case FETCH_USER_SUCCESS_ACTION:
      action.user.instanceId = action.instanceId
      const res = state.filter(obj => {
        return obj.get('instanceId') === action.instanceId
      })
      if (res.size === 0) {
        return state.push(fromJS(action.user))
      }

      const idx = state.findIndex(function (item) {
        return item.get('instanceId') === action.instanceId
      })
      return state.setIn([idx], fromJS(action.user))
    case FETCH_USER_FAILURE_ACTION:
      return state
    default:
      return state
  }
}

export default profileReducer
