import {createSelector} from 'reselect'

/**
 * Direct selector to the window state domain
 */
const selectWindowDomain = (state) => state.get('window')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Window
 */

const makeSelectWindow = () => createSelector(
  selectWindowDomain,
  (substate) => substate.toJS()
)

export default makeSelectWindow
export {
  selectWindowDomain
}
