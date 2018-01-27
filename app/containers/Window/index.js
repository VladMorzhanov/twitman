/**
 *
 * Window
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import Auth from '../Auth/Loadable'
import Instance from '../Instance/Loadable'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import reducer from './reducer'
import saga from './saga'
import {
  makeSelectCurrentInstanceId,
  makeSelectInstances
} from '../Instances/selectors'
import {addInstance} from '../Instances/actions'

const WindowWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;  
`

const AddInstance = styled.div`
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

const ButtonPlus = styled.button`
  margin-top: 50px;
  background-color: rgba(88, 76, 132, 0.65);
  font-size: 18px;
  width: 250px;
  height: 40px;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: rgba(59, 48, 93, 0.65);
  }
`

export class Window extends React.PureComponent {
  render () {
    const self = this

    const instance = this.props.instances.find(function (item) {
      return item.get('id') === self.props.currentInstanceId
    })

    return (
      <WindowWrapper>
        {instance !== undefined && instance !== null ?
          instance.get('token').length > 20
            ? <Instance instance={instance}/>
            : <Auth/>
          : <AddInstance>
            <WelcomeMessage>Welcome to Twitter Multiple Instances
              App!</WelcomeMessage>
            <WelcomeMessageDesc>Please create new instance</WelcomeMessageDesc>
            <WelcomeMessageDesc>and login into your Twitter
              account.</WelcomeMessageDesc>
            <ButtonPlus onClick={() => this.props.addInstance()}>Add
              Instance</ButtonPlus>
          </AddInstance>}
      </WindowWrapper>
    )
  }
}

Window.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  currentInstanceId: makeSelectCurrentInstanceId(),
  instances: makeSelectInstances()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    addInstance: (v) => dispatch(addInstance())
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'window', reducer})
const withSaga = injectSaga({key: 'window', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Window)
