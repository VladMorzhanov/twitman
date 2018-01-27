/*
 *
 * Settings actions
 *
 */

import {
  FETCH_SETTINGS_FAILURE_ACTION,
  FETCH_SETTINGS_REQUEST_ACTION,
  FETCH_SETTINGS_SUCCESS_ACTION
} from './constants'

export function fetchSettingsDataRequest () {
  return {
    type: FETCH_SETTINGS_REQUEST_ACTION
  }
}

export function fetchSettingsDataSuccess (instanceId, settings) {
  return {
    type: FETCH_SETTINGS_SUCCESS_ACTION,
    settings: settings,
    instanceId: instanceId
  }
}

export function fetchSettingsDataFailure (err) {
  return {
    type: FETCH_SETTINGS_FAILURE_ACTION,
    err: err
  }
}
