import {fromJS} from 'immutable'
import windowReducer from '../reducer'

describe('windowReducer', () => {
  it('returns the initial state', () => {
    expect(windowReducer(undefined, {})).toEqual(fromJS({}))
  })
})
