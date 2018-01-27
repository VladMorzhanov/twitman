import {fromJS} from 'immutable'
import instanceReducer from '../reducer'

describe('instanceReducer', () => {
  it('returns the initial state', () => {
    expect(instanceReducer(undefined, {})).toEqual(fromJS({}))
  })
})
