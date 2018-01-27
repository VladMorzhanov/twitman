import {fromJS} from 'immutable'
import termsOfUseReducer from '../reducer'

describe('termsOfUseReducer', () => {
  it('returns the initial state', () => {
    expect(termsOfUseReducer(undefined, {})).toEqual(fromJS({}))
  })
})
