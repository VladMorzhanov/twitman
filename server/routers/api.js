const {Router} = require('express')

const Generic = require('../controllers/generic')
const User = require('../controllers/user')
const Twitter = require('../controllers/twitter')

const JwtCheck = require('../middleware/jwt-check')
const ErrorHandler = require('../middleware/error-handler')
const NotFound = require('../middleware/not-found')

/**
 * Express router
 * @type {*|Router}
 */
const router = new Router()
const passport = require('passport')

router
  .get('/health-check', Generic.healthCheck)
  .get('/generic', Generic.genericGET)
  .post('/generic', Generic.genericPOST)
  .put('/generic', Generic.genericPUT)
  .delete('/generic', Generic.genericDELETE)
  .get('/user', JwtCheck, User.retrieve)
  .put('/user', JwtCheck, User.update)
  .delete('/user', JwtCheck, User.delete)
  .post('/auth/twitter/reverse', User.twitterToken)
  .post('/auth/twitter', User.verifyTwitterOAuth,
    passport.authenticate('twitter-token', {session: false}), User.sendTwitterAuthToken)
  .get('/twitter/user/settings', Twitter.getSettings)
  .get('/twitter/user', Twitter.getUser)
  .put('/twitter/user/settings', Twitter.putSettings)
  .put('/twitter/user', Twitter.putUser)
  .get('/twitter/tweets', Twitter.getTweets)
  .post('/twitter/tweet', Twitter.postTweet)
  .get('/twitter/statuses', Twitter.getStatuses)
  .get('/twitter/search', Twitter.getSearch)
  .use(ErrorHandler())
  .use(NotFound('Not Found'))

module.exports = router
