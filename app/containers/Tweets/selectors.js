import {createSelector} from 'reselect'

/**
 * Direct selector to the tweets state domain
 */
const selectTweetsDomain = (state) => state.get('tweets')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tweets
 */

const makeSelectTweets = () => createSelector(
  selectTweetsDomain,
  (substate) => substate.get('tweets')
)

const makeSelectStatuses = () => createSelector(
  selectTweetsDomain,
  (substate) => substate.get('statuses')
)

const makeSelectSearch = () => createSelector(
  selectTweetsDomain,
  (substate) => substate.get('search')
)

export default makeSelectTweets
export {
  selectTweetsDomain,
  makeSelectStatuses,
  makeSelectSearch
}
