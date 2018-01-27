import {fromJS} from 'immutable'
import tweetsReducer from '../reducer'

describe('tweetsReducer', () => {
  it('returns the initial state', () => {
    expect(tweetsReducer(undefined, {})).toEqual(fromJS({}))
  })
})
