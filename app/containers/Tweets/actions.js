/*
 *
 * Tweets actions
 *
 */

import {
  FETCH_TWEETS_FAILURE_ACTION, FETCH_TWEETS_REQUEST_ACTION,
  FETCH_TWEETS_SUCCESS_ACTION
} from './constants'

export function fetchTweetsDataRequest (type, word) {
  return {
    type: FETCH_TWEETS_REQUEST_ACTION,
    tweetType: type,
    word: word
  }
}

export function fetchTweetsDataSuccess (instanceId, tweets, type) {
  return {
    type: FETCH_TWEETS_SUCCESS_ACTION,
    tweets: tweets,
    tweetType: type,
    instanceId: instanceId
  }
}

export function fetchTweetsDataFailure (err) {
  return {
    type: FETCH_TWEETS_FAILURE_ACTION,
    err: err
  }
}
