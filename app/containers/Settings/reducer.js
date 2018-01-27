/*
 *
 * Settings reducer
 *
 */

import {fromJS, List} from 'immutable'
import {
  FETCH_SETTINGS_FAILURE_ACTION,
  FETCH_SETTINGS_REQUEST_ACTION,
  FETCH_SETTINGS_SUCCESS_ACTION
} from './constants'

const initialState = List([])

function settingsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_SETTINGS_REQUEST_ACTION:
      return state
    case FETCH_SETTINGS_SUCCESS_ACTION:
      action.settings.instanceId = action.instanceId
      const res = state.filter(obj => obj.get('instanceId') === action.instanceId)
      if (res.size === 0) {
        return state.push(fromJS(action.settings))
      }

      const idx = state.findIndex(function (item) {
        return item.get('instanceId') === action.instanceId
      })
      return state.setIn([idx], fromJS(action.settings))
    case FETCH_SETTINGS_FAILURE_ACTION:
      return state
    default:
      return state
  }
}

export default settingsReducer
