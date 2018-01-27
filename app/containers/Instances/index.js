/**
 *
 * Instances
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import styled from 'styled-components'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import makeSelectInstances, {makeSelectMessages} from './selectors'
import reducer from './reducer'
import saga from './saga'
import Header from '../../components/Header/Loadable'
import Window from '../Window/Loadable'
import Messages from '../../components/Messages/Loadable'
import {removeMessage} from './actions'

const InstancesWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`

export class Instances extends React.PureComponent {
  render () {
    return (
      <InstancesWrapper>
        <Header/>
        <Window/>
        <Messages
          messages={this.props.messages}
          removeMessage={this.props.removeMessage}/>
      </InstancesWrapper>
    )
  }
}

Instances.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  instances: makeSelectInstances(),
  messages: makeSelectMessages()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
    removeMessage: (v) => dispatch(removeMessage(v))
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'instances', reducer})
const withSaga = injectSaga({key: 'instances', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Instances)
