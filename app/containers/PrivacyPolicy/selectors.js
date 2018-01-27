import {createSelector} from 'reselect'

/**
 * Direct selector to the privacyPolicy state domain
 */
const selectPrivacyPolicyDomain = (state) => state.get('privacyPolicy')

/**
 * Other specific selectors
 */

/**
 * Default selector used by PrivacyPolicy
 */

const makeSelectPrivacyPolicy = () => createSelector(
  selectPrivacyPolicyDomain,
  (substate) => substate.toJS()
)

export default makeSelectPrivacyPolicy
export {
  selectPrivacyPolicyDomain
}
