/**
 * User mongoose schema
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// user schema
const UserSchema = new Schema(
  {
    twitterProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  })

UserSchema.statics.upsertTwitterUser = function (token, tokenSecret, profile, cb) {
  let that = this
  return this.findOne({
    'twitterProvider.id': profile.id
  }, function (err, user) {
    // no user was found, lets create a new one
    if (!user) {
      let newUser = new that({
        twitterProvider: {
          id: profile.id,
          token: token,
          tokenSecret: tokenSecret
        }
      })

      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error)
        }
        return cb(error, savedUser)
      })
    } else {
      return cb(err, user)
    }
  })
}

// return the model
module.exports = mongoose.model('User', UserSchema)
