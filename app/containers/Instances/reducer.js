/*
 *
 * Instances reducer
 *
 */

import {fromJS, List} from 'immutable'
import {
  ADD_INSTANCE, ADD_MESSAGE, CHANGE_MENU_ITEM_ACTION, CHANGE_SEARCH_WORD,
  HIDE_COMPOSE_TWEET, LOGIN_FAILURE_ACTION, LOGIN_REQUEST_ACTION,
  LOGIN_SUCCESS_ACTION, REMOVE_INSTANCE, REMOVE_MESSAGE, SELECT_INSTANCE,
  SET_SECRET_TO_INSTANCE, SET_TOKEN_TO_INSTANCE, SHOW_COMPOSE_TWEET
} from './constants'
import {MENU_ITEM_FEED} from '../Instance/constants'
import {FETCH_USER_SUCCESS_ACTION} from '../Profile/constants'

let instances = fromJS(fetchInstances())

let id = Date.now()

if (instances && instances.size > 0) {
  id = instances.get(0).get('id')

  instances = instances.update(
    instances.findIndex(function (item) {
      return true
    }),
    function (item) {
      return item.set('showComposeTweet', false)
    }
  )

  // instances = instances.update(v => v.set('showComposeTweet', false))

  instances.map(v => {
    console.log(v.get('showComposeTweet'))
  })
}

const initialState = fromJS({
  instances: List(instances || fromJS([])),
  currentInstanceId: id,
  messages: List([])
})

function instancesReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST_ACTION:
      return state
    case LOGIN_SUCCESS_ACTION:
      return state
    case LOGIN_FAILURE_ACTION:
      return state
    case ADD_INSTANCE:
      const id = Date.now()
      let r = state.toJS()
      console.log(r)

      let res = state
        .set('instances', state.get('instances').push(fromJS({
          id: id,
          menuItem: MENU_ITEM_FEED,
          token: Date.now(),
          showComposeTweet: false,
          searchWord: ''
        })))
        .set('currentInstanceId', id)
      serializeInstances(res.get('instances').toJSON())
      return res
    case REMOVE_INSTANCE:
      if (state.get('instances').size > 0) {
        let res = state.set('instances', state.get('instances')
          .filter(obj => obj.get('id') !== action.id))
        if (action.id === state.get('currentInstanceId') &&
          state.get('instances').size !== 0) {
          const i = state.get('instances').get(0).get('id')
          res = res.set('currentInstanceId', i)
        }
        serializeInstances(res.get('instances').toJSON())
        return res
      }
      return state
    case SELECT_INSTANCE:
      res = state.get('instances').filter(obj => obj.get('id') === action.id)
      if (res.size === 0) {
        return state
      }
      return state.set('currentInstanceId', action.id)
    case SET_TOKEN_TO_INSTANCE:
      let newState = state.updateIn(['instances'], function (list) {
        const idx = list.findIndex(function (item) {
          return item.get('id') === state.get('currentInstanceId')
        })
        return list.setIn([idx, 'token'], action.token)
      })
      serializeInstances(newState.get('instances').toJSON())
      return newState
    case SET_SECRET_TO_INSTANCE:
      newState = state.updateIn(['instances'], function (list) {
        const idx = list.findIndex(function (item) {
          return item.get('id') === state.get('currentInstanceId')
        })
        return list.setIn([idx, 'secret'], action.secret)
      })
      serializeInstances(newState.get('instances').toJSON())
      return newState
    case CHANGE_MENU_ITEM_ACTION:
      newState = state.updateIn(['instances'], function (list) {
        const idx = list.findIndex(function (item) {
          return item.get('id') === state.get('currentInstanceId')
        })
        return list.setIn([idx, 'menuItem'], action.menuItem)
      })

      // idx = state.get('instances').findIndex(function (item) {
      //   return item.id === state.get('currentInstanceId')
      // })
      //
      // if (idx === -1) {
      //   return state
      // }
      // state.get('instances').update(idx, function (item) {
      //     return item.menuItem = action.menuItem
      //   }
      // )
      serializeInstances(newState.get('instances').toJSON())
      return newState
    case SHOW_COMPOSE_TWEET:
      newState = state.updateIn(['instances'], function (list) {
        const idx = list.findIndex(function (item) {
          return item.get('id') === state.get('currentInstanceId')
        })
        return list.setIn([idx, 'showComposeTweet'], true)
      })
      serializeInstances(newState.get('instances').toJSON())
      return newState
    case HIDE_COMPOSE_TWEET:
      newState = state.updateIn(['instances'], function (list) {
        const idx = list.findIndex(function (item) {
          return item.get('id') === state.get('currentInstanceId')
        })
        return list.setIn([idx, 'showComposeTweet'], false)
      })
      serializeInstances(newState.get('instances').toJSON())
      return newState
    case FETCH_USER_SUCCESS_ACTION:
      action.user.instanceId = action.instanceId

      newState = state.updateIn(['instances'], function (list) {
        const idx = list.findIndex(function (item) {
          return item.get('id') === state.get('currentInstanceId')
        })
        return list.setIn([idx, 'user'], fromJS(action.user))
      })
      serializeInstances(newState.get('instances').toJSON())
      return newState
    case CHANGE_SEARCH_WORD:
      newState = state.updateIn(['instances'], function (list) {
        const idx = list.findIndex(function (item) {
          return item.get('id') === state.get('currentInstanceId')
        })
        return list.setIn([idx, 'searchWord'], action.word)
      })
      serializeInstances(newState.get('instances').toJSON())
      return newState
    case ADD_MESSAGE:
      return state.set('messages', state.get('messages').push(action.message))
    case REMOVE_MESSAGE:
      if (state.get('messages').size > 0) {
        return state.set('messages', state.get('messages')
          .filter(obj => obj.id !== action.id))
      }
      return state
    default:
      return state
  }
}

function fetchInstances () {
  const instS = window.localStorage.getItem('instances')
  if (!instS) {
    return undefined
  }
  return JSON.parse(instS)
}

function serializeInstances (instances) {
  window.localStorage.setItem('instances', JSON.stringify(instances))
}

export default instancesReducer
