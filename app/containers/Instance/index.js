/**
 *
 * Instance
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../../components/Menu/Loadable'
import ComposeTweet from '../../components/ComposeTweet/Loadable'
import styled from 'styled-components'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import Feed from '../Dashboard/Loadable'
import Profile from '../Profile/Loadable'
import Settings from '../Settings/Loadable'
import injectSaga from 'utils/injectSaga'
import saga from '../Profile/saga'
import {
  MENU_ITEM_FEED, MENU_ITEM_PROFILE, MENU_ITEM_SEARCH,
  MENU_ITEM_SETTINGS
} from './constants'
import {
  addMessage, hideComposeTweet, removeMessage, showComposeTweet,
  tweetRequest
} from '../Instances/actions'
import {fetchUserDataRequest} from '../Profile/actions'
import {connect} from 'react-redux'
import SearchResults from '../SearchResults/Loadable'

const InstanceWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: block;
`

const TweetsWrapper = styled.div`
  width: 100%;
  background-color: #e6ecf0;
  height: 100% - 100px;
  padding-top: 100px;
  padding-bottom: 50px;
  display: flex;
  overflow-y: scroll;
  align-items: center;
  flex-direction: column;
`

export class Instance extends React.PureComponent {
  constructor () {
    super()
    this.state = {}
    this.sendTweet = this.sendTweet.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }

  componentWillMount () {
    if (!this.props.instance.user) {
      this.props.dispatch(fetchUserDataRequest())
    }
  }

  sendTweet (text, multiple) {
    this.props.postTweet(text, multiple)

    const liveTime = 7000
    const id = (new Date()).getTime().toString()
    let message = 'Tweet successfully posted!'
    if (multiple) {
      message = 'Tweet successfully posted to all instances!'
    }
    this.props.dispatch(addMessage({
      message: message,
      id: id
    }))

    const self = this
    setTimeout(function () {
      self.props.dispatch(removeMessage(id))
    }, liveTime)
  }

  clearSearch () {
    this.forceUpdate()
  }

  render () {
    const menuItem = this.props.instance.get('menuItem')
    const showComposeTweet = this.props.instance.get('showComposeTweet')
    const user = this.props.instance.get('user')
    const searchWord = this.props.instance.get('searchWord')

    return (
      <InstanceWrapper>
        <Menu clearSearch={this.clearSearch}/>
        {menuItem === MENU_ITEM_FEED ? (
          <Feed user={user}/>
        ) : menuItem === MENU_ITEM_PROFILE ? (
          <Profile/>
        ) : menuItem === MENU_ITEM_SEARCH ? (
          <SearchResults user={user} word={searchWord}/>
        ) : menuItem === MENU_ITEM_SETTINGS ? (
          <Settings/>
        ) : null}
        {showComposeTweet && <ComposeTweet
          hideComposeTweet={this.props.hideComposeTweet}
          user={user}
          sendTweet={(text, multiple) => this.sendTweet(text, multiple)}/>}
      </InstanceWrapper>
    )
  }
}

Instance.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({})

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    hideComposeTweet: (v) => dispatch(hideComposeTweet(v)),
    postTweet: (text, multiple) => dispatch(tweetRequest(text, multiple))
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withSaga = injectSaga({key: 'profile', saga})

export default compose(
  withSaga,
  withConnect
)(Instance)
