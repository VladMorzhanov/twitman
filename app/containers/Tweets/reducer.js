/*
 *
 * Tweets reducer
 *
 */

import {fromJS, List} from 'immutable'
import {
  FETCH_TWEETS_FAILURE_ACTION, FETCH_TWEETS_REQUEST_ACTION,
  FETCH_TWEETS_SUCCESS_ACTION, TWEET_TYPE_SEARCH, TWEET_TYPE_STATUSES,
  TWEET_TYPE_TWEETS
} from './constants'

const initialState = fromJS({
  tweets: List([]),
  search: List([]),
  statuses: List([])
})

function tweetsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TWEETS_REQUEST_ACTION:
      if (action.tweetType === TWEET_TYPE_SEARCH) {
        return state.set('search')
      }
      return state
    case FETCH_TWEETS_SUCCESS_ACTION:
      if (action.tweetType === TWEET_TYPE_TWEETS) {
        action.tweets[0].instanceId = action.instanceId
        const tweets = List(action.tweets)
        const res = state.get('tweets').filter(obj =>
          obj.get('instanceId') === action.instanceId)
        if (res.size === 0) {
          return state.set('tweets', state.get('tweets').push(tweets))
        }

        const idx = state.get('tweets').findIndex(function (item) {
          return item.get('instanceId') === action.instanceId
        })
        return state.get('tweets').setIn([idx], tweets)
      } else if (action.tweetType === TWEET_TYPE_STATUSES) {
        action.tweets[0].instanceId = action.instanceId
        const tweets = List(action.tweets)
        const res = state.get('statuses').filter(obj => {
          return obj.get('instanceId') === action.instanceId
        })
        if (res.size === 0) {
          return state.set('statuses',
            state.get('statuses').push(tweets))
        }

        const idx = state.get('statuses').findIndex(function (item) {
          return item.get('instanceId') === action.instanceId
        })
        return state.get('statuses').setIn([idx], tweets)
      } else {
        action.tweets.statuses[0].instanceId = action.instanceId
        const tweets = List(action.tweets.statuses)
        const s = state.get('search')
        if (!s) {
          const ns = state.set('search', List([]))
          return ns.set('search', ns.get('search').push(tweets))
        }
        const res = s.filter(obj => {
          return obj.get('instanceId') === action.instanceId
        })
        if (res.size === 0) {
          return state.set('search',
            state.get('search').push(tweets))
        }

        const idx = state.get('search').findIndex(function (item) {
          return item.get('instanceId') === action.instanceId
        })
        return state.get('search').setIn([idx], tweets)
      }
    case FETCH_TWEETS_FAILURE_ACTION:
      return state
    default:
      return state
  }
}

export default tweetsReducer
