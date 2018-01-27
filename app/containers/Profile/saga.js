import {call, put, select, takeLatest} from 'redux-saga/effects'
import {FETCH_USER_REQUEST_ACTION} from './constants'
import {fetchUserDataFailure, fetchUserDataSuccess} from './actions'
import {
  makeSelectCurrentInstanceId,
  makeSelectInstances
} from '../Instances/selectors'
import {getUser} from '../../utils/api'

export function * fetchUser () {
  try {
    const instances = yield select(makeSelectInstances())
    const currentInstanceId = yield select(makeSelectCurrentInstanceId())
    const instance = instances.find(function (item) {
      return item.get('id') === currentInstanceId
    })
    const token = instance.get('token')
    const secret = instance.get('secret')
    const res = yield call(getUser, token, secret)
    yield put(fetchUserDataSuccess(currentInstanceId, res.data))
  } catch (err) {
    yield put(fetchUserDataFailure(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function * userData () {
  yield takeLatest(FETCH_USER_REQUEST_ACTION, fetchUser)
}
