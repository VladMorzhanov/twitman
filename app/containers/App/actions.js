/*
 *
 * Auth actions
 *
 */

import {HIDE_LOADER_ACTION, SHOW_LOADER_ACTION} from './constants'

export function showLoader () {
  return {
    type: SHOW_LOADER_ACTION
  }
}

export function hideLoader () {
  return {
    type: HIDE_LOADER_ACTION
  }
}
