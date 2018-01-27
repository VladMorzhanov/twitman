/*
 *
 * Auth reducer
 *
 */

import {fromJS} from 'immutable'
import {HIDE_LOADER_ACTION, SHOW_LOADER_ACTION} from './constants'

const initialState = fromJS({
  loaded: true
})

function appReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER_ACTION:
      return state.set('loaded', false)
    case HIDE_LOADER_ACTION:
      return state.set('loaded', true)
    default:
      return state
  }
}

export default appReducer
