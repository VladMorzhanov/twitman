import {createSelector} from 'reselect'

/**
 * Direct selector to the termsOfUse state domain
 */
const selectTermsOfUseDomain = (state) => state.get('termsOfUse')

/**
 * Other specific selectors
 */

/**
 * Default selector used by TermsOfUse
 */

const makeSelectTermsOfUse = () => createSelector(
  selectTermsOfUseDomain,
  (substate) => substate.toJS()
)

export default makeSelectTermsOfUse
export {
  selectTermsOfUseDomain
}
