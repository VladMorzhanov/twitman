/**
 *
 * TermsOfUse
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
import makeSelectTermsOfUse from './selectors'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'
import styled from 'styled-components'

const TermsWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export class TermsOfUse extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <TermsWrapper>
        <Helmet>
          <title>TermsOfUse</title>
          <meta name='description' content='Description of TermsOfUse'/>
        </Helmet>
        <FormattedMessage {...messages.header} />
      </TermsWrapper>
    )
  }
}

TermsOfUse.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  termsofuse: makeSelectTermsOfUse()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({key: 'termsOfUse', reducer})
const withSaga = injectSaga({key: 'termsOfUse', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(TermsOfUse)
