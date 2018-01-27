import {fromJS} from 'immutable'
import instancesReducer from '../reducer'

describe('instancesReducer', () => {
  it('returns the initial state', () => {
    expect(instancesReducer(undefined, {})).toEqual(fromJS({}))
  })
})
