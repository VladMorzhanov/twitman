/**
 *
 * Tweets
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import Tweet from './Tweet'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import makeSelectTweets, {
  makeSelectSearch,
  makeSelectStatuses
} from './selectors'
import reducer from './reducer'
import saga from './saga'
import {fetchTweetsDataRequest} from './actions'
import {makeSelectCurrentInstanceId} from '../Instances/selectors'
import {
  TWEET_TYPE_SEARCH, TWEET_TYPE_STATUSES,
  TWEET_TYPE_TWEETS
} from './constants'

export class Tweets extends React.PureComponent {
  constructor () {
    super()
    this.getTweetsData = this.getTweetsData.bind(this)
  }

  componentWillMount () {
    // if (this.props.type === TWEET_TYPE_SEARCH) {
    //   this.props.dispatch(fetchTweetsDataRequest(this.props.type,
    //     this.props.word))
    //   return
    // }

    const tweets = this.getTweetsData()
    if (tweets === null) {
      this.props.dispatch(fetchTweetsDataRequest(this.props.type,
        this.props.word))
      return
    }

    if (tweets.size < 0) {
      this.props.dispatch(fetchTweetsDataRequest(this.props.type,
        this.props.word))
    }
  }

  // to avoid twitter rate limit
  getTweetsData () {
    let data
    if (this.props.type === TWEET_TYPE_TWEETS) {
      data = this.props.tweets
    } else if (this.props.type === TWEET_TYPE_STATUSES) {
      data = this.props.statuses
    } else {
      data = this.props.search
    }

    if (!data) {
      return null
    }

    const res = data.filter(obj =>
      obj.get(0).instanceId === this.props.currentInstanceId)
    if (res.size === 0 || res.length === 0) {
      return null
    }
    return res.get(0)
  }

  render () {
    const self = this
    const tweets = this.getTweetsData()
    if (!tweets) {
      return null
    }
    return (
      <div>
        {tweets.map(function (tweet) {
          return <Tweet
            width={self.props.width}
            retweeted={(tweet.retweeted_status !== undefined) &&
            self.props.type === TWEET_TYPE_TWEETS}
            tweet={tweet.retweeted_status ? tweet.retweeted_status : tweet}
            key={tweet.id}/>
        })}
      </div>
    )
  }
}

Tweets.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  tweets: makeSelectTweets(),
  statuses: makeSelectStatuses(),
  search: makeSelectSearch(),
  currentInstanceId: makeSelectCurrentInstanceId()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'tweets', reducer})
const withSaga = injectSaga({key: 'tweets', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Tweets)
