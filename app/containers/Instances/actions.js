/*
 *
 * Instances actions
 *
 */

import {
  ADD_INSTANCE, ADD_MESSAGE, CHANGE_MENU_ITEM_ACTION, CHANGE_SEARCH_WORD,
  HIDE_COMPOSE_TWEET, HIDE_LOADER_ACTION, LOGIN_FAILURE_ACTION,
  LOGIN_REQUEST_ACTION, LOGIN_SUCCESS_ACTION, REMOVE_INSTANCE, REMOVE_MESSAGE,
  SELECT_INSTANCE, SET_SECRET_TO_INSTANCE, SET_TOKEN_TO_INSTANCE,
  SHOW_COMPOSE_TWEET, TWEET_FAILURE_ACTION, TWEET_REQUEST_ACTION,
  TWEET_SUCCESS_ACTION
} from './constants'

export function setTokenToInstance (token, id) {
  return {
    id: id,
    token: token,
    type: SET_TOKEN_TO_INSTANCE
  }
}

export function setSecretToInstance (secret, id) {
  return {
    id: id,
    secret: secret,
    type: SET_SECRET_TO_INSTANCE
  }
}

export function selectInstance (id) {
  return {
    id: id,
    type: SELECT_INSTANCE
  }
}

export function addInstance () {
  return {
    type: ADD_INSTANCE
  }
}

export function removeInstance (id) {
  return {
    id: id,
    type: REMOVE_INSTANCE
  }
}

export function changeMenuItem (menuItem) {
  return {
    type: CHANGE_MENU_ITEM_ACTION,
    menuItem: menuItem
  }
}

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

export function loginRequest () {
  return {
    type: LOGIN_REQUEST_ACTION
  }
}

export function loginSuccess (response) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    response
  }
}

export function loginFailure (error) {
  return {
    type: LOGIN_FAILURE_ACTION,
    error
  }
}

export function tweetRequest (text, multiple) {
  return {
    text: text,
    type: TWEET_REQUEST_ACTION,
    multiple: multiple
  }
}

export function tweetSuccess (response) {
  return {
    type: TWEET_SUCCESS_ACTION,
    response
  }
}

export function addMessage (message) {
  return {
    type: ADD_MESSAGE,
    message: message
  }
}

export function changeSearchWord (word) {
  return {
    type: CHANGE_SEARCH_WORD,
    word: word
  }
}

export function removeMessage (id) {
  return {
    type: REMOVE_MESSAGE,
    id: id
  }
}

export function tweetFailure (error) {
  return {
    type: TWEET_FAILURE_ACTION,
    error
  }
}

export function showComposeTweet () {
  return {
    type: SHOW_COMPOSE_TWEET
  }
}

export function hideComposeTweet () {
  return {
    type: HIDE_COMPOSE_TWEET
  }
}
