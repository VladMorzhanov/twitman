import axios from 'axios'

export const API_URL = 'http://127.0.0.1:4000/api/v1/'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
export function parseJSON (response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
export function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function login () {
  return axios({
    method: 'GET',
    url: API_URL + '/health-check'
  })
}

export function getUser (token, secret) {
  return axios({
    headers: {
      'key': token,
      'secret': secret
    },
    method: 'GET',
    url: API_URL + '/twitter/user'
  })
}

export function getSettings (token, secret) {
  return axios({
    headers: {
      'key': token,
      'secret': secret
    },
    method: 'GET',
    url: API_URL + '/twitter/user/settings'
  })
}

export function getTweets (token, secret) {
  return axios({
    headers: {
      'key': token,
      'secret': secret
    },
    method: 'GET',
    url: API_URL + '/twitter/tweets'
  })
}

export function getSearch (token, secret, word) {
  return axios({
    headers: {
      'key': token,
      'secret': secret,
      'word': word
    },
    method: 'GET',
    url: API_URL + '/twitter/search'
  })
}

export function getStatuses (token, secret) {
  return axios({
    headers: {
      'key': token,
      'secret': secret
    },
    method: 'GET',
    url: API_URL + '/twitter/statuses'
  })
}

export function postTweet (token, secret, tweet) {
  return axios({
    headers: {
      'key': token,
      'secret': secret
    },
    data: {
      tweet: tweet
    },
    method: 'POST',
    url: API_URL + '/twitter/tweet'
  })
}
