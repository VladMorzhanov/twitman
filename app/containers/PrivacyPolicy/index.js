/**
 *
 * PrivacyPolicy
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import {FormattedMessage} from 'react-intl'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import makeSelectPrivacyPolicy from './selectors'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'
import styled from 'styled-components'

const PrivacyWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export class PrivacyPolicy extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <PrivacyWrapper>
        <Helmet>
          <title>PrivacyPolicy</title>
          <meta name='description' content='Description of PrivacyPolicy'/>
        </Helmet>
        <FormattedMessage {...messages.header} />
      </PrivacyWrapper>
    )
  }
}

PrivacyPolicy.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  privacypolicy: makeSelectPrivacyPolicy()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'privacyPolicy', reducer})
const withSaga = injectSaga({key: 'privacyPolicy', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(PrivacyPolicy)
