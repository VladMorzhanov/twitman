/**
 *
 * Search
 *
 */

import React from 'react'
import {compose} from 'redux'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import Tweets from '../Tweets/Loadable'
import styled from 'styled-components'
import {TWEET_TYPE_SEARCH} from '../Tweets/constants'

const SearchWrapper = styled.div`
  background-color: #e6ecf0;
  padding-top: 85px;
  display: flex;
  flex-direction: column;
  .container{
    height: 100%;
    margin: auto;
    width: 890px;
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
  }
`

const SearchSidebar = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: flex-end;
  width: 290px;
  height: 215px;  
  margin-left: 16px;
  background-color: ${props => props.color || '#b1b1b1'};
`

const SidebarHeader = styled.div`
  background-color: #fff;
  width: 100%;
    height: 120px;
    padding-bottom: 65px;
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

const ProfileSidebarContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  img{
    cursor: pointer;
    margin-top: -40px;
    margin-left: 10px;  
    margin-right: 10px;
    border-radius: 50%;
    border: solid 2px #fff;
    width: 72px;
    height: 72px;
    }
`

const Name = ProfileSidebarElement.extend`
    font-family: Helvetica, sans-serif;
    color:#000;
    font-weight: bold;
    font-size: ${props => props.fz || '21px'};
    margin-top: 0;
    margin-bottom: ${props => props.mb || '4px'};
    &:hover{
      text-decoration: underline;
    }
`
const Username = ProfileSidebarElement.extend`
    margin-bottom: ${props => props.mb || '4px'};
    color: #657786;
    &:hover{
      text-decoration: underline;
    }
`

const TweetsWrapper = styled.div`
  margin-left: auto;
  height: 100% - 100px;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ProfileNavList = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding-left: 14px;
    padding-right: 10px;
    p{
      margin: 0;
    }
`

const ProfileNavListItem = styled.div`
  color: #450084;
  cursor: pointer;
  font-weight: 600;
  flex-direction: column;
  height: 100%;
  text-align: center;
  width: 80px;
  padding-left: 4px;
  padding-right: 4px;
  display: flex;
  justify-content: center;
  align-items: left;
  p{
    font-size: 18px;
    margin: 0;
    display: inline;
    font-family: Helvetica, sans-serif;
    &.title{
      color: #92a19c;
      font-size: 12px;
      &:hover{
        color: #450084;
      }
    }
  }
`

const TweetsCount = ProfileNavListItem.extend`
  
`
const FollowersCount = ProfileNavListItem.extend`
  
`
const FollowingCount = ProfileNavListItem.extend`
  
`

export class SearchResults extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentNavItem: 0
    }
  }

  render () {
    const user = this.props.user
    const clear = this.props.clear
    if (!user) {
      return null
    }

    const avatar = user.get('profile_image_url_https')
    const highResAvatar = avatar.replace('_normal.jpg', '.jpg')

    return (
      <SearchWrapper>
        <div className='container'>
          <SearchSidebar color={'#' + user.get('profile_link_color')}>
            <SidebarHeader>
              <ProfileSidebarContent>
                <img src={highResAvatar}/>
                <div>
                  <Name mb={'-3px'} fz='18px'>{user.get('name')}</Name>
                  <Username
                    color={'#' + user.get('profile_link_color')}
                    mb={'0px'}>{'@' + user.get('screen_name')}</Username>
                </div>
              </ProfileSidebarContent>
              <ProfileNavList>
                <TweetsCount>
                  <p className='title'>Tweets</p>
                  <p className='value'>{user.get('statuses_count')}</p>
                </TweetsCount>
                <FollowersCount>
                  <p className='title'>Followers</p>
                  <p className='value'>{user.get('followers_count')}</p>
                </FollowersCount>
                <FollowingCount>
                  <p className='title'>Following</p>
                  <p className='value'>{user.get('friends_count')}</p>
                </FollowingCount>
              </ProfileNavList>
            </SidebarHeader>
          </SearchSidebar>
          <TweetsWrapper>
            <Tweets type={TWEET_TYPE_SEARCH}
                    word={this.props.word}
                    width={600}/>
          </TweetsWrapper>
        </div>
      </SearchWrapper>
    )
  }
}

SearchResults.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect
)(SearchResults)
