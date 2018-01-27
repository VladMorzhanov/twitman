/**
 *
 * Profile
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import injectSaga from 'utils/injectSaga'
import Tweets from '../Tweets/Loadable'
import moment from 'moment'
import injectReducer from 'utils/injectReducer'
import makeSelectProfile from './selectors'
import reducer from './reducer'
import saga from './saga'
import styled from 'styled-components'
import {fetchUserDataRequest} from './actions'
import {makeSelectCurrentInstanceId} from '../Instances/selectors'
import {TWEET_TYPE_TWEETS} from '../Tweets/constants'

const ProfileWrapper = styled.div`
  background-color: #e6ecf0;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  .profile-content{
    margin: auto;
    width: 890px;
    display: flex;
    justify-content: space-between;
    padding-top: 120px;
  }
`

const ProfileCanopy = styled.div`
   z-index: 900;
   position: ${props => props.scrolled ? 'fixed' : 'absolute'};
   top: ${props => props.scrolled ? '-75px' : '76px'};
   left: 0;
   width: 100%;
   height: 175px;
   background-color: ${props => props.color};
`

const ProfileNav = styled.div`
  z-index: 900;
  position: ${props => props.scrolled ? 'fixed' : 'absolute'};
  top: ${props => props.scrolled ? '100px' : '250px'};
  height: 60px;
  display: flex;
  justify-content: center;
  left: 0;
  width: 100%;
  background-color:#fff;
  border-top: 1px solid rgba(0,0,0,0.5);
  border-bottom: 1px solid rgba(0,0,0,0.25);
  .container{
    margin-left: 24px;
    width: 860px;
    display: flex;
    justify-content: space-between;
  }
`

const ProfileNavLeft = styled.div`
    .content{
          display: flex;
    width: 260px;
    align-items: center;
    justify-content: flex-start;
    img{
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .name{
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      p{
         margin: 0;
      }
    }
    }
    display: flex;
    width: 260px;
`

const ProfileNavRight = styled.div`
    display: flex;
    justify-content: space-between;
    width: 600px;
    p{
      margin: 0;
    }
`

const ProfileNavList = styled.div`
    display: flex;
    justify-content: space-between;
    p{
      margin: 0;
    }
`

const ProfileNavListItem = styled.div`
  color: ${props => props.active ? '#450084' : '#92a19c'};
  cursor: pointer;
  font-weight: 600;
  flex-direction: column;
  height: 100%;
  text-align: center;
  margin-right: 16px;
  width: 80px;
  padding-left: 4px;
  padding-right: 4px;
  display: flex;
  border-bottom: 2px solid ${props => props.active ? '#450084' : 'transparent'};
  justify-content: center;
  align-items: center;
  p{
    font-size: 18px;
    margin: 0;
    display: inline;
    font-family: Helvetica, sans-serif;
    &.title{
      color: #92a19c;
      font-size: 12px;
    }
  }
  &:hover{
    border-bottom-color: #450084;
    color:#450084;
  }
`

const TweetsCount = ProfileNavListItem.extend`
  
`
const FollowersCount = ProfileNavListItem.extend`
  
`
const FollowingCount = ProfileNavListItem.extend`
  
`
const LikesCount = ProfileNavListItem.extend`
  
`

const ButtonEditProfile = styled.div`
  cursor: pointer;
  margin: auto;
  margin-right: 0;
width: 100px;  
line-height: 35px;
text-align: center;
height: 35px;
    border-radius: 100px;
    border: 1px solid #66757f;
  color: #66757f;
  font-size: 14px;
  font-weight: 600;
  font-family: Helvetica, sans-serif;
  background-color: #fff;
      transition: all .2s ease-in-out;
  &:hover{
      background-color: #eff2f4;
  }
`

const ProfileSidebar = styled.div`
  margin-left: 30px;
  z-index: 800;
  position: absolute;
  top: 360px;
`
const Avatar = styled.div`
  margin-left: 30px;
  z-index: 999;
  position:absolute;
  top: 150px;
  width: 200px;
  height: 200px;
  img{
    cursor: pointer;
    border: 4px solid #fff;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`

const ProfileSidebarElement = styled.div`
    display: flex;
    margin-top: 0;
    align-items: center;
    margin-bottom: 4px;
    color:#657786;
    font-size: 14px;
    cursor: pointer;
    i{
      margin-right: 8px;
    }
    p{
      padding-top: 3px;
      margin: 0;
      font-family: Helvetica, sans-serif;
      &:hover{
       text-decoration:underline;
      }
    }
`
const Name = ProfileSidebarElement.extend`
    font-family: Helvetica, sans-serif;
    color:#000;
    font-weight: bold;
    font-size: ${props => props.fz || '21px'};
    margin-top: 0;
    margin-bottom: ${props => props.mb || '4px'};
`
const Username = ProfileSidebarElement.extend`
    margin-bottom: ${props => props.mb || '4px'};
    color: ${props => props.color || '#657786'};
`
const Location = ProfileSidebarElement.extend`
`
const Site = ProfileSidebarElement.extend`
`
const Joined = ProfileSidebarElement.extend`
`
const Borned = ProfileSidebarElement.extend`
`

const TweetsWrapper = styled.div`
  margin-left: auto;
  height: 100% - 100px;
  padding-top: 100px;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export class Profile extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      currentNavItem: 0,
      scrolled: false
    }
  }

  componentWillMount () {
    const user = this.getProfileData()
    if (user === null) {
      this.props.dispatch(fetchUserDataRequest())
    } else if (!user.get('id') || !user.get('name')) {
      this.props.dispatch(fetchUserDataRequest())
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  handleScroll (event) {
    const y = window.scrollY
    if (y >= 155 && y <= 700) {
      this.setState({scrolled: true})
    }
    if (y < 155) {
      this.setState({scrolled: false})
    }
  }

  // to avoid twitter rate limit
  getProfileData () {
    const res = this.props.users.filter(obj =>
      obj.get('instanceId') === this.props.currentInstanceId)
    if (res.size === 0 || res.length === 0) {
      return null
    }
    return res.get(0)
  }

  render () {
    const user = this.getProfileData()
    if (user === null) {
      return null
    }
    let site = null
    let temp = user.get('entities')
    if (temp) {
      temp = temp.get('url')
      if (temp) {
        temp = temp.get('urls')
        if (temp) {
          if (temp.size > 0) {
            temp = temp.get(0)
            if (temp) {
              if (temp.get('display_url')) {
                site = temp.get('display_url')
              }
            }
          }
        }
      }
    }

    const highResAvatar = user.get('profile_image_url_https').replace('_normal.jpg', '.jpg')

    let joinedDate = moment(user.get('created_at'), 'dd MMM DD HH:mm:ss ZZ YYYY', 'en')
    joinedDate = 'Joined ' + joinedDate.format('MMMM YYYY').toString()

    return (
      <ProfileWrapper>
        <ProfileNav scrolled={this.state.scrolled}>
          <div className='container'>
            <ProfileNavLeft>
              {this.state.scrolled ? <div className='content'>
                <img src={user.get('profile_image_url_https')}/>
                <div className='name'>
                  <Name mb={'-3px'} fz='18px'>{user.get('name')}</Name>
                  <Username
                    color={'#' + user.get('profile_link_color')}
                    mb={'0px'}>{'@' + user.get('screen_name')}</Username>
                </div>
              </div> : null}
            </ProfileNavLeft>
            <ProfileNavRight scrolled={this.state.scrolled}>
              <ProfileNavList>
                <TweetsCount active={this.state.currentNavItem === 0}
                             onClick={(e) => this.setState({currentNavItem: 0})}>
                  <p className='title'>Tweets</p>
                  <p className='value'>{user.get('statuses_count')}</p>
                </TweetsCount>
                <FollowersCount active={this.state.currentNavItem === 1}
                                onClick={(e) => this.setState({currentNavItem: 1})}>
                  <p className='title'>Followers</p>
                  <p className='value'>{user.get('followers_count')}</p>
                </FollowersCount>
                <FollowingCount active={this.state.currentNavItem === 2}
                                onClick={(e) => this.setState({currentNavItem: 2})}>
                  <p className='title'>Following</p>
                  <p className='value'>{user.get('friends_count')}</p>
                </FollowingCount>
                <LikesCount active={this.state.currentNavItem === 3}
                            onClick={(e) => this.setState({currentNavItem: 3})}>
                  <p className='title'>Favourites</p>
                  <p className='value'>{user.get('favourites_count')}</p>
                </LikesCount>
              </ProfileNavList>
              <ButtonEditProfile>Edit Profile</ButtonEditProfile>
            </ProfileNavRight>
          </div>
        </ProfileNav>
        <div className='profile-content'>
          <ProfileCanopy scrolled={this.state.scrolled}
                         color={'#' + user.get('profile_link_color')}/>
          {this.state.scrolled ? null : <Avatar>
            <img src={highResAvatar}/>
          </Avatar>}
          <ProfileSidebar>
            <Name>{user.get('name')}</Name>
            <Username>{'@' + user.get('screen_name')}</Username>
            <Location>
              <i className='fa fa-location-arrow'/>
              <p>{user.get('location')}</p>
            </Location>
            {site !== null
              ? <Site>
                <i className='fa fa-link'/>
                <p>{site}</p>
              </Site> : null}
            <Joined>
              <i className='fa fa-calendar'/>
              <p>{joinedDate}</p>
            </Joined>
          </ProfileSidebar>

          <TweetsWrapper>
            <Tweets type={TWEET_TYPE_TWEETS} width={600}/>
          </TweetsWrapper>
        </div>
      </ProfileWrapper>
    )
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectProfile(),
  currentInstanceId: makeSelectCurrentInstanceId()
})

function mapDispatchToProps (dispatch) {
  return {
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
)(Profile)
