import {call, put, select, takeLatest} from 'redux-saga/effects'
import {
  FETCH_TWEETS_REQUEST_ACTION, TWEET_TYPE_STATUSES,
  TWEET_TYPE_TWEETS
} from './constants'
import {fetchTweetsDataFailure, fetchTweetsDataSuccess} from './actions'
import {
  makeSelectCurrentInstanceId,
  makeSelectInstances
} from '../Instances/selectors'
import {getSearch, getStatuses, getTweets} from '../../utils/api'

export function * fetchTweets (action) {
  try {
    const instances = yield select(makeSelectInstances())
    const currentInstanceId = yield select(makeSelectCurrentInstanceId())
    const instance = instances.find(function (item) {
      return item.get('id') === currentInstanceId
    })
    const token = instance.get('token')
    const secret = instance.get('secret')
    let res
    if (action.tweetType === TWEET_TYPE_STATUSES) {
      res = yield call(getStatuses, token, secret)
    } else if (action.tweetType === TWEET_TYPE_TWEETS) {
      res = yield call(getTweets, token, secret)
    } else {
      res = yield call(getSearch, token, secret, action.word)
    }
    yield put(fetchTweetsDataSuccess(currentInstanceId,
      res.data, action.tweetType))
  } catch (err) {
    yield put(fetchTweetsDataFailure(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function * settingsData () {
  yield takeLatest(FETCH_TWEETS_REQUEST_ACTION, fetchTweets)
}
