/**
 *
 * Settings
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import makeSelectSettings from './selectors'
import reducer from './reducer'
import saga from './saga'
import styled from 'styled-components'
import {fetchSettingsDataRequest} from './actions'
import {makeSelectCurrentInstanceId} from '../Instances/selectors'
import makeSelectProfile from '../Profile/selectors'

const SettingsWrapper = styled.div`
  background-color: #e6ecf0;
  height: 100%;
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

const SettingsSidebar = styled.div`
  display: flex;
  align-items: flex-end;
  width: 290px;
  height: 160px;  
  margin-left: 16px;
  background-color: ${props => props.color || '#b1b1b1'};
`

const SidebarHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 65px;
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

const SettingsContent = styled.div`
  width: 590px;
  height: 510px;
  margin-left: 10px;
  background-color:#fff;
  .header{
    font-size: 22px;
    display: flex;
    justify-content: flex-start;
    align-items: center;  
    padding-left: 16px;
    height: 47px; 
    border-bottom: 1px solid rgba(0,0,0,0.25);
    p{
      font-family: Helvetica, sans-serif;
      font-weight: bold;
    }
  }
  .content{ 
  }
`

const SettingsDataRow = styled.p`
  display: flex;
  padding-left: 20px;
  align-items: center;  
  margin-top: 16px;
  margin-bottom: 16px;
  &.separate{
     border-bottom: 1px solid rgba(0,0,0,0.25);
     padding-bottom: 16px;
  }
`

const SettingsDataKey = styled.label`
    font-family: Helvetica, sans-serif;
    margin-right: 20px;
    font-size: 16px;  
    cursor: pointer;
`

const SettingsDataSelect = styled.select`
    font-family: Helvetica, sans-serif;
    font-size: 16px;  
    outline: 0;
    background-color: #fff;
    border: 1px solid #e6ecf0;
    border-radius: 3px;
    cursor: pointer;
    height: 30px; 
    width: 210px; 
`

const SettingsDataCheckbox = styled.div`
    display: flex;
    align-items: center;
    font-family: Helvetica, sans-serif;
    font-size: 14px;  
    cursor: pointer;
    height: 30px; 
    width: 210px; 
    input{
      margin-right: 8px;
      cursor: pointer;
    }
    p.title{
      font-family: Helvetica, sans-serif;
      font-size: 14px; 
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
    &:hover{
      text-decoration: underline;
    }
`
const Username = ProfileSidebarElement.extend`
    margin-bottom: ${props => props.mb || '4px'};
    color: ${props => props.color || '#657786'};
    &:hover{
      text-decoration: underline;
    }
`

export class Settings extends React.PureComponent {
  componentWillMount () {
    const settings = this.getSettingsData()
    if (settings === null) {
      this.props.dispatch(fetchSettingsDataRequest())
      return
    }

    if (!settings.get('always_use_https')) {
      this.props.dispatch(fetchSettingsDataRequest())
    }

    const user = this.getProfileData()
    if (user === null) {
      this.props.dispatch(fetchUserDataRequest())
    } else if (!user.get('id') || !user.get('name')) {
      this.props.dispatch(fetchUserDataRequest())
    }
  }

  // to avoid twitter rate limit
  getSettingsData () {
    const res = this.props.settings.filter(obj =>
      obj.get('instanceId') === this.props.currentInstanceId)
    if (res.size === 0 || res.length === 0) {
      return null
    }
    return res.get(0)
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
    const settings = this.getSettingsData()
    if (settings === null) {
      return null
    }

    const user = this.getProfileData()
    if (user === null) {
      return null
    }

    const highResAvatar = user.get('profile_image_url_https').replace('_normal.jpg', '.jpg')

    return (
      <SettingsWrapper>
        <div className='container'>
          <SettingsSidebar color={'#' + user.get('profile_link_color')}>
            <SidebarHeader>
              <img src={highResAvatar}/>
              <div>
                <Name mb={'-3px'} fz='18px'>{user.get('name')}</Name>
                <Username
                  color={'#' + user.get('profile_link_color')}
                  mb={'0px'}>{'@' + user.get('screen_name')}</Username>
              </div>
            </SidebarHeader>
          </SettingsSidebar>
          <SettingsContent>
            <div className='header'><p>Settings</p></div>
            <div className='content'>
              <SettingsDataRow>
                <SettingsDataKey>Language: </SettingsDataKey>
                <SettingsDataSelect
                  selected={settings.get('language')}>
                  <option>{settings.get('language')}</option>
                </SettingsDataSelect>
              </SettingsDataRow>
              <SettingsDataRow className='separate'>
                <SettingsDataKey>Time Zone: </SettingsDataKey>
                <SettingsDataSelect
                  selected={settings.get('time_zone').get('tzinfo_name')}>
                  <option>{settings.get('time_zone').get('tzinfo_name')}</option>
                </SettingsDataSelect>
              </SettingsDataRow>
              <SettingsDataRow>
                <SettingsDataKey>Allow direct messages from: </SettingsDataKey>
                <SettingsDataSelect
                  selected={settings.get('allow_dms_from')}>
                  <option>{settings.get('allow_dms_from')}</option>
                </SettingsDataSelect>
              </SettingsDataRow>
              <SettingsDataRow>
                <SettingsDataKey>Allow direct messages groups
                  from: </SettingsDataKey>
                <SettingsDataSelect
                  selected={settings.get('allow_dm_groups_from')}>
                  <option>{settings.get('allow_dm_groups_from')}</option>
                </SettingsDataSelect>
              </SettingsDataRow>
              <SettingsDataRow className='separate'>
                <SettingsDataKey>Allow contributor requests
                  from: </SettingsDataKey>
                <SettingsDataSelect
                  selected={settings.get('allow_contributor_request')}>
                  <option>{settings.get('allow_contributor_request')}</option>
                </SettingsDataSelect>
              </SettingsDataRow>
              <SettingsDataRow>
                <SettingsDataKey>Always use HTTPS: </SettingsDataKey>
                <SettingsDataCheckbox>
                  <input type='checkbox'
                         checked={settings.get('always_use_https')}/>
                  <p className='title'>enable always https</p>
                </SettingsDataCheckbox>
              </SettingsDataRow>
              <SettingsDataRow>
                <SettingsDataKey>Use cookie personalization: </SettingsDataKey>
                <SettingsDataCheckbox>
                  <input type='checkbox'
                         checked={settings.get('use_cookie_personalization')}/>
                  <p className='title'>enable cookie personalization</p>
                </SettingsDataCheckbox>
              </SettingsDataRow>
              <SettingsDataRow>
                <SettingsDataKey>Geolocation enabled: </SettingsDataKey>
                <SettingsDataCheckbox>
                  <input type='checkbox'
                         checked={settings.get('use_cookie_personalization')}/>
                  <p className='title'>enable geolocation</p>
                </SettingsDataCheckbox>
              </SettingsDataRow>
              <SettingsDataRow>
                <SettingsDataKey>Display sensitive media: </SettingsDataKey>
                <SettingsDataCheckbox>
                  <input type='checkbox'
                         checked={settings.get('display_sensitive_media')}/>
                  <p className='title'>enable display sens media</p>
                </SettingsDataCheckbox>
              </SettingsDataRow>
            </div>
          </SettingsContent>
        </div>
      </SettingsWrapper>
    )
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectProfile(),
  settings: makeSelectSettings(),
  currentInstanceId: makeSelectCurrentInstanceId()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'settings', reducer})
const withSaga = injectSaga({key: 'settings', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Settings)
