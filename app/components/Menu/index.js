/**
 *
 * Menu
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import {createStructuredSelector} from 'reselect'
import styled from 'styled-components'
import reducer from '../../containers/Profile/reducer'
import saga from '../../containers/Profile/saga'
import {
  MENU_ITEM_FEED, MENU_ITEM_PROFILE, MENU_ITEM_SEARCH, MENU_ITEM_SETTINGS,
  MENU_ITEM_TWEETS
} from '../../containers/Instance/constants'
import {
  makeSelectCurrentInstanceId,
  makeSelectInstances
} from '../../containers/Instances/selectors'
import {
  changeMenuItem, changeSearchWord,
  showComposeTweet
} from '../../containers/Instances/actions'
import makeSelectProfile from '../../containers/Profile/selectors'
import {fetchUserDataRequest} from '../../containers/Profile/actions'
import {TWEET_TYPE_SEARCH} from '../../containers/Tweets/constants'
import {fetchTweetsDataRequest} from '../../containers/Tweets/actions'

const MenuListWrapper = styled.div`
z-index: 1000;
  position: fixed;
  width: 100%;
  height: 46px;
  margin-top: 30px;
  background-color:#fff;
  border-top: 1px solid rgba(0,0,0,0.5);
  border-bottom: 1px solid rgba(0,0,0,0.25);
`

const LeftActions = styled.div`
  width: 180px;
  display: flex;
  padding-bottom: 2px;
`

const Search = styled.div`
  width: 221px;
  height: 32px;
  margin-right: 15px;
  input{
      margin-bottom: 4px;
      height: 32px;
      background-color: #f5f8fa;
      color: #14171a;
      font-size: 12px;
      border-radius: 20px;
       margin-right: 12px;
        border: 1px solid #e6ecf0;
    width: 85%;
    height: 100%;
    padding-left: 16px;
    padding-right: 30px;
    transition: all .2s ease-in-out;
    &:focus{
       background-color: #fff;
       border: 2px solid #450084;
    }
  }
  i{
    margin-left: -40px;
    font-size: 16px;
    font-weight: 400;
  }
`

const MenuList = styled.div`
  margin: auto;
  width: auto;
  max-width: 890px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  height: 46px;
`
const HomeButton = styled.div`
  color: ${props => props.active ? '#450084' : '#92a19c'};
  cursor: pointer;
  font-weight: 600;
  height: 100%;
  text-align: center;
  width: 100px;
  display: flex;
  border-bottom: 4px solid ${props => props.active ? '#450084' : 'transparent'};
  justify-content: center;
  align-items: center;
  i{
    font-size: 26px;
    display: inline;
    margin-top: 4px;
  }
  p{
    font-size: 14px;
    margin: 6px 0 0 8px;
    display: inline;
    font-family: Helvetica, sans-serif;
  }
  &:hover{
    border-bottom-color: #450084;
    color:#450084;
  }
`
const TwitterIcon = styled.i`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: #450084;
`

const RightActions = styled.div`
  width: 330px;
  display: flex;
  padding-top: 6px;
  justify-content: center;
`

const ProfileMenu = styled.div`
  width: 0; 
  display: flex;
      flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
`

const DropDownMenu = styled.div`
    z-index: 900;
        display: ${props => props.show ? 'block' : 'none'};
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    background-clip: padding-box;
      ul{
    width: 150px;
    padding: 0;
    margin: 0;
      background-color:#fff;
      li{
        padding: 10px 20px 10px;
        color: #424b46;
        cursor:pointer;
        &:not:last-of-type{
           margin-bottom: 10px;
        }
        width: 100%;
        list-style: none;
        transition: all .2s ease-in-out;
        i{
          margin-right: 8px;
          &:hover{
          color: #fff;
        }
        }
        &:hover{
          background-color:#450084;
          color: #fff;
        }
      }
    }
`

const DropDownCaret = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    z-index: 1000;
   width: 0;
   height: 0; 
   margin-right: 8px;
   border-style: solid;
   border-width: 0 9px 12px 9px;
   border-color: transparent transparent #fff transparent;

`

const ProfileIcon = styled.img`
  display: block;
  cursor: pointer;
  height: 32px;
  width: 32px;
  border-radius: 50%;
`

const TweetButton = styled.p`
cursor: pointer;
width: 70px;  
margin: -2px 0 0 16px;
line-height: 35px;
text-align: center;
height: 35px;
    border-radius: 100px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  font-family: Helvetica, sans-serif;
  background-color: #71527E;
  &:hover{
      background-color: #573c5d;
  }
`

class Menu extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      menuToggle: false
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.props.changeSearchWord(e.target.value)
      this.props.dispatch(fetchTweetsDataRequest(TWEET_TYPE_SEARCH,
        e.target.value))
      this.props.changeMenuItem(MENU_ITEM_SEARCH)
      e.target.value = ''
    }
  }

  showComposeT () {
    this.props.dispatch(showComposeTweet())
  }

  toggleMenu () {
    this.setState({menuToggle: !this.state.menuToggle})
  }

  render () {
    const self = this

    const instance = this.props.instances.find(function (item) {
      return item.get('id') === self.props.currentInstanceId
    })

    let profilePhoto = ''
    if (this.props.profiles) {
      if (this.props.profiles.size < 1) {
        this.props.dispatch(fetchUserDataRequest())
      } else {
        const profile = this.props.profiles.find(function (item) {
          return item.get('instanceId') === self.props.currentInstanceId
        })
        if (!profile) {
          this.props.dispatch(fetchUserDataRequest())
        } else {
          profilePhoto = profile.get('profile_image_url_https')
        }
      }
    } else {
      this.props.dispatch(fetchUserDataRequest())
    }

    const menuItem = instance.get('menuItem')

    return (
      <MenuListWrapper>
        <MenuList>
          <LeftActions>
            <HomeButton
              active={menuItem === MENU_ITEM_FEED}
              onClick={(e) => this.props.changeMenuItem(MENU_ITEM_FEED)}>
              <i className='fa fa-home'/>
              <p>Home</p>
            </HomeButton>
          </LeftActions>
          <TwitterIcon
            className='fa fa-twitter'
            active={menuItem === MENU_ITEM_TWEETS}/>
          <RightActions>
            <Search>
              <input
                onKeyPress={(e) => this.handleKeyPress(e)}
                placeholder='Search twitter'
                type='text'/>
              <i className='fa fa-search'/>
            </Search>
            <ProfileMenu>
              <ProfileIcon
                onClick={(e) => this.toggleMenu(e)}
                src={profilePhoto}/>
              <DropDownCaret show={this.state.menuToggle}/>
              <DropDownMenu show={this.state.menuToggle}>
                <ul>
                  <li
                    onClick={(e) => {
                      this.toggleMenu(e)
                      this.props.changeMenuItem(MENU_ITEM_PROFILE)
                    }}>
                    <i className='fa fa-user'/>Profile
                  </li>
                  <li
                    onClick={(e) => {
                      this.toggleMenu(e)
                      this.props.changeMenuItem(MENU_ITEM_SETTINGS)
                    }}>
                    <i className='fa fa-gear'/>Settings
                  </li>
                </ul>
              </DropDownMenu>
            </ProfileMenu>
            <TweetButton
              onClick={(e) => this.showComposeT()}>Tweet</TweetButton>
          </RightActions>
        </MenuList>
      </MenuListWrapper>
    )
  }
}

Menu.propTypes = {
  current: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
  currentInstanceId: makeSelectCurrentInstanceId(),
  profiles: makeSelectProfile(),
  instances: makeSelectInstances()
})

function mapDispatchToProps (dispatch) {
  return {
    changeMenuItem: (v) => dispatch(changeMenuItem(v)),
    changeSearchWord: (v) => dispatch(changeSearchWord(v)),
    showComposeTweet: (v) => dispatch(showComposeTweet(v)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'profile', reducer})
const withSaga = injectSaga({key: 'profile', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Menu)
