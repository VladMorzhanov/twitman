import {call, put, select, takeLatest} from 'redux-saga/effects'
import {TWEET_REQUEST_ACTION} from './constants'
import {tweetFailure, tweetSuccess} from './actions'
import {
  makeSelectCurrentInstanceId,
  makeSelectInstances
} from '../Instances/selectors'
import {postTweet} from '../../utils/api'

export function * sendStatus (action) {
  try {
    const instances = yield select(makeSelectInstances())
    const currentInstanceId = yield select(makeSelectCurrentInstanceId())

    if (action.multiple) {
      for (let i = 0; i < instances.size; ++i) {
        const token = instances.get(i).get('token')
        const secret = instances.get(i).get('secret')
        const res = yield call(postTweet, token, secret, action.text)
        yield put(tweetSuccess(currentInstanceId, res.data))
      }
    } else {
      const instance = instances.find(function (item) {
        return item.get('id') === currentInstanceId
      })
      const token = instance.get('token')
      const secret = instance.get('secret')
      const res = yield call(postTweet, token, secret, action.text)
      yield put(tweetSuccess(currentInstanceId, res.data))
    }
  } catch (err) {
    yield put(tweetFailure(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function * tweetData () {
  yield takeLatest(TWEET_REQUEST_ACTION, sendStatus)
}
