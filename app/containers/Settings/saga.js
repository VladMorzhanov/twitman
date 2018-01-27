import {call, put, select, takeLatest} from 'redux-saga/effects'
import {FETCH_SETTINGS_REQUEST_ACTION} from './constants'
import {fetchSettingsDataFailure, fetchSettingsDataSuccess} from './actions'
import {
  makeSelectCurrentInstanceId,
  makeSelectInstances
} from '../Instances/selectors'
import {getSettings} from '../../utils/api'

export function * fetchSettings () {
  try {
    const instances = yield select(makeSelectInstances())
    const currentInstanceId = yield select(makeSelectCurrentInstanceId())
    const instance = instances.find(function (item) {
      return item.get('id') === currentInstanceId
    })
    const token = instance.get('token')
    const secret = instance.get('secret')
    const res = yield call(getSettings, token, secret)
    yield put(fetchSettingsDataSuccess(currentInstanceId, res.data))
  } catch (err) {
    yield put(fetchSettingsDataFailure(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function * settingsData () {
  yield takeLatest(FETCH_SETTINGS_REQUEST_ACTION, fetchSettings)
}
