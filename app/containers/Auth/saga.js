/**
 * Gets the repositories of the user from Github
 */

import {call, put, takeLatest} from 'redux-saga/effects'
import {LOGIN_REQUEST_ACTION} from '../../containers/Instances/constants'
import {
  hideLoader,
  loginFailure,
  loginSuccess,
  showLoader
} from '../Instances/actions'
import {routerActions} from 'react-router-redux'
import {login} from '../../utils/api'

export function * signIn () {
  try {
    yield put(showLoader())
    const res = yield call(login)
    yield put(loginSuccess(res))
    yield put(hideLoader())
    yield put(routerActions.push('/'))
  } catch (err) {
    yield put(hideLoader())
    yield put(loginFailure(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function * loginData () {
  yield takeLatest(LOGIN_REQUEST_ACTION, signIn)
}
