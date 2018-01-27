/**
 *
 * Auth
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TwitterLogin from 'react-twitter-auth'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import makeSelectAuth from './selectors'
import reducer from './reducer'
import saga from './saga'
import styled from 'styled-components'
import {setSecretToInstance, setTokenToInstance} from '../Instances/actions'
import {
  makeSelectCurrentInstance, makeSelectCurrentInstanceId,
  makeSelectInstances
} from '../Instances/selectors'

const AuthSection = styled.div`
  font-family: Helvetica, serif;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const WelcomeMessage = styled.p`
    font-family: Helvetica, sans-serif;
    font-size: 28px;
    margin: 0;
    margin-top: -100px;
    margin-bottom: 20px;
    font-weight: bold;
   color: rgba(88, 76, 132, 0.65);
`

const WelcomeMessageDesc = styled.p`
    margin: 0;
    font-family: Helvetica, sans-serif;
    font-size: 18px;
    font-weight: bold;
   color: rgba(88, 76, 132, 0.65);
`

const ButtonWrapper = styled.div`
  margin-top: 50px;
`

// const Token = styled.p`
//   font-size: 18px;
//   color: #000000;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

export class Auth extends React.PureComponent {

  onSuccess = (response) => {
    const token = response.headers.get('key')
    const secret = response.headers.get('secret')
    this.props.setToken(token, this.props.currentInstanceId)
    this.props.setSecret(secret, this.props.currentInstanceId)
  }

  onFailed = (error) => {
    console.log(error)
  }

  render () {

    const self = this

    const instance = this.props.instances.find(function (item) {
      return item.get('id') === self.props.currentInstanceId
    })

    return (
      <AuthSection>
        <WelcomeMessage>Auth with Twitter</WelcomeMessage>
        <WelcomeMessageDesc>Press button below and login</WelcomeMessageDesc>
        <WelcomeMessageDesc>with your Twitter account.</WelcomeMessageDesc>
        <ButtonWrapper>
          <TwitterLogin loginUrl="http://127.0.0.1:4000/api/v1/auth/twitter"
                        onFailure={this.onFailed}
                        onSuccess={this.onSuccess}
                        showIcon={false}
                        className={'twitter-button'}
                        requestTokenUrl="http://127.0.0.1:4000/api/v1/auth/twitter/reverse"/>
        </ButtonWrapper>
      </AuthSection>
    )
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  instances: makeSelectInstances(),
  currentInstanceId: makeSelectCurrentInstanceId(),
})

function mapDispatchToProps (dispatch) {
  return {
    setToken: (t, i) => dispatch(setTokenToInstance(t, i)),
    setSecret: (t, i) => dispatch(setSecretToInstance(t, i)),
    dispatch,
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'auth', reducer})
const withSaga = injectSaga({key: 'auth', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Auth)
