/*
 *
 * Profile actions
 *
 */

import {
  FETCH_USER_FAILURE_ACTION,
  FETCH_USER_REQUEST_ACTION,
  FETCH_USER_SUCCESS_ACTION
} from './constants'

export function fetchUserDataRequest () {
  return {
    type: FETCH_USER_REQUEST_ACTION
  }
}

export function fetchUserDataSuccess (instanceId, user) {
  return {
    type: FETCH_USER_SUCCESS_ACTION,
    user: user,
    instanceId: instanceId
  }
}

export function fetchUserDataFailure (err) {
  return {
    type: FETCH_USER_FAILURE_ACTION,
    err: err
  }
}
