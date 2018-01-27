import {createSelector} from 'reselect'

/**
 * Direct selector to the instances state domain
 */
const selectInstancesDomain = (state) => state.get('instances')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Instances
 */

const makeSelectInstancesReducer = () => createSelector(
  selectInstancesDomain,
  (substate) => substate.toJS()
)

const makeSelectInstances = () => createSelector(
  selectInstancesDomain,
  (substate) => substate.get('instances')
)

const makeSelectCurrentInstanceId = () => createSelector(
  selectInstancesDomain,
  (substate) => substate.get('currentInstanceId')
)

const makeSelectMessages = () => createSelector(
  selectInstancesDomain,
  (substate) => substate.get('messages')
)

export default makeSelectInstancesReducer
export {
  selectInstancesDomain,
  makeSelectInstances,
  makeSelectMessages,
  makeSelectCurrentInstanceId
}
