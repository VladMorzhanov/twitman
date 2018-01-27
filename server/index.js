/* eslint consistent-return:0 */
const http = require('http')
const express = require('express')
const cors = require('cors')
const {json, urlencoded} = require('body-parser')
const db = require('./db')
const argv = require('./argv')
const async = require('async')
const {NODE_ENV, TWITTER_SECRET, TWITTER_KEY} = require('./constants')
const {api} = require('./routers')
const signals = ['SIGINT', 'SIGTERM']
const {API_URI} = require('./constants')
const port = require('./port')
const {printIP} = require('./services/app-service')
const debug = require('debug')('main-server:server')
const setup = require('./middlewares/frontendMiddleware')
const isDev = process.env.NODE_ENV !== 'production'
const resolve = require('path').resolve
const app = express()

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use(cors())
app.use(json())
app.use(urlencoded({extended: false}))
app.use(API_URI, api)

app.set('db', db)

const passport = require('passport'),
  TwitterTokenStrategy = require('passport-twitter-token'),
  User = require('mongoose').model('User')

passport.use(new TwitterTokenStrategy({
    consumerKey: TWITTER_KEY,
    consumerSecret: TWITTER_SECRET,
    includeEmail: true
  },
  function (token, tokenSecret, profile, done) {
    User.upsertTwitterUser(token, tokenSecret, profile, function (err, user) {
      if (err) return done(err)
      return done(null, user)
    })
  }))

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
})

// create https server
const server = http.createServer(app)

const io = require('socket.io').listen(server)

app.set('io', io)

// listen server
server.listen(port)

// set listeners and error handlers
server.on('error', onError)
server.on('listening', onListening)

signals.forEach(function (signal) {
  process.once(signal, () => {
    debug(signal, ' happened!')
    async.waterfall([
      closeServer,
      closeDbConnection
    ], closeApp)
  })
})

/**
 * Closes app and depends on err exit it with 0 or 1 status
 * @param  {Error} err - passed error
 */
function closeApp (err) {
  debug('Now application will be closed!', err || '')
  err ? process.exit(1) : process.exit(0)
}

/**
 * Closes application server
 * @param  {Function} next - next passed callback
 */
function closeServer (next) {
  debug('Now server will be closed!')
  server.close(next)
}

/**
 * Closes db connection
 * @param  {Function} next - next passed callback
 */
function closeDbConnection (next) {
  debug('Now db will be closed!')
  db.close(next)
}

/**
 * Logging server info on listening
 */
function onListening () {
  const addr = server.address()
  debug(`Listening on port ${addr.port}`)
  if (NODE_ENV === 'development') {
    debug(`This is testing instance.`)
    debug(`To run production provide NODE_ENV = production.`)
  }
  printIP()
}

/**
 * Event listener for HTTP server "error" event.
 * @param  {Error} err - passed error
 */
function onError (err) {
  if (err.syscall !== 'listen') {
    throw err
  }

  switch (err.code) {
    case 'EACCES':
      debug(`Port ${port} requires elevated privileges`)
      return process.exit(1)
    case 'EADDRINUSE':
      debug(`Port ${port} is already in use`)
      return process.exit(1)
    default:
      throw err
  }
}
