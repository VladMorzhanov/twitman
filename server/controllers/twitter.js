const {SC, TWITTER_SECRET, TWITTER_KEY} = require('../constants')
const Twit = require('twit')

module.exports = {

  getUser: async ({headers}, res, next) => {
    const twitter = initTwitter(headers)

    //  get user
    let result
    try {
      result = await twitter.get('account/verify_credentials')
    } catch (e) {
      console.log(e)
    }

    res.status(200).json(result.data)
  },

  getSettings: async ({headers}, res, next) => {
    const twitter = initTwitter(headers)

    //  get user settings
    let result
    try {
      result = await twitter.get('account/settings')
    } catch (e) {
      console.log(e)
    }

    res.status(200).json(result.data)
  },

  putUser: async ({headers, body}, res, next) => {
    const twitter = initTwitter(headers)

    //  get user
    let result
    try {
      result = await twitter.get('account/update_profile', {body})
    } catch (e) {
      console.log(e)
    }

    res.status(200).json({result})
  },

  putSettings: async ({headers, body}, res, next) => {
    const twitter = initTwitter(headers)

    //  get user settings
    let result
    try {
      result = await twitter.post('account/settings', {body})
    } catch (e) {
      console.log(e)
    }

    res.status(200).json({result})
  },

  getTweets: async ({headers}, res, next) => {
    const twitter = initTwitter(headers)

    //  get user tweets
    let result
    try {
      result = await twitter.get('statuses/user_timeline', {
        'include_entities': true,
        'tweet_mode': 'extended',
        'extended_tweet': true
      })
    } catch (e) {
      console.log(e)
    }

    res.status(200).json(result.data)
  },

  postTweet: async ({headers, body}, res, next) => {
    const twitter = initTwitter(headers)

    //  post tweet
    let result
    try {
      result = await twitter.post('statuses/update',
        {
          status: body.tweet
        })
    } catch (e) {
      console.log(e)
    }

    res.status(200).json(result.data)
  },

  getStatuses: async ({headers}, res, next) => {
    const twitter = initTwitter(headers)

    //  get tweets
    let result
    try {
      result = await twitter.get('statuses/home_timeline', {
        'include_entities': true,
        'tweet_mode': 'extended',
        'extended_tweet': true
      })
    } catch (e) {
      console.log(e)
    }

    res.status(200).json(result.data)
  },

  getSearch: async ({headers}, res, next) => {
    const twitter = initTwitter(headers)

    //  search tweets
    let result
    try {
      result = await twitter.get('search/tweets', {
        'q': headers['word'],
        count: 20,
        'include_entities': true,
        'tweet_mode': 'extended',
        'extended_tweet': true
      })
    } catch (e) {
      console.log(e)
    }

    res.status(200).json(result.data)
  }
}

function initTwitter (headers) {
  const key = headers['key']
  const secret = headers['secret']

  return new Twit({
    consumer_key: TWITTER_KEY,
    consumer_secret: TWITTER_SECRET,
    access_token: key,
    access_token_secret: secret,
    timeout_ms: 60 * 1000
  })
}
