import React from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import ImPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import {
  makeSelectCurrentInstanceId,
  makeSelectInstances
} from '../../containers/Instances/selectors'
import {
  addInstance, removeInstance,
  selectInstance
} from '../../containers/Instances/actions'
import styled from 'styled-components'

const InstancesList = styled.div`
z-index: 1000;
  position: fixed;
  background-color:#fff;
  border-bottom: solid rgba(88,76,132,0.65) 1px;
  border-top: solid rgba(88,76,132,0.65) 1px;
  margin: 0;
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 14px;
  height: 30px;
  width: 100%;
`

const InstanceItem = styled.div`
  background-color:rgba(88,76,132,0.65);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 4px;
  cursor: pointer;
  border-right: 1px solid rgba(76,65,114,0.65);
  padding-right: 4px;
  color: #fff;
  font-size: 14px;
  height: 30px;
  width: 14%;
  &.active{
      background-color:rgba(88,76,132,0.65);
      color: #fff;
  }
`

const ButtonMinus = styled.button`
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  height: 30px;
  width: 30px;
  &:hover{
      color: #d5d5d5;
  }
`

const ButtonPlus = styled.button`
  color: rgba(88,76,132,0.65);
  font-size: 16px;
  cursor: pointer;
  height: 30px;
  width: 30px;
  &:hover{
    color: rgba(57,46,92,0.65);
  }
`

const InstanceTitle = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  letter-spacing: 1px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  align-items: center;
  span{
    margin: auto;
  }
`

class Header extends React.PureComponent {
  render () {
    const self = this
    return (
      <InstancesList>
        {this.props.instances.map(function (instance) {
          return <InstanceItem
            key={instance.get('id')}
            onClick={() => self.props.selectInstance(instance.get('id'))}
            className={self.props.current ===
            instance.get('id') ? 'active' : null}>
            <InstanceTitle>
              <span>{(!instance.get('user')) ?
                'Please auth' : instance.get('user').get('screen_name')}
              </span>
            </InstanceTitle>
            <ButtonMinus
              className="fa fa-close"
              onClick={() => {
                if (window.confirm('Close instance ?')) {
                  self.props.removeInstance(instance.get('id'))
                }
              }}>
            </ButtonMinus>
          </InstanceItem>
        })}
        <ButtonPlus className="fa fa-plus"
                    onClick={() => self.props.addInstance()}></ButtonPlus>
      </InstancesList>
    )
  }
}

Header.propTypes = {
  path: PropTypes.string,
  current: PropTypes.number,
  instances: ImPropTypes.list
}

const mapStateToProps = createStructuredSelector({
  instances: makeSelectInstances(),
  current: makeSelectCurrentInstanceId()
})

function mapDispatchToProps (dispatch) {
  return {
    selectInstance: (v) => dispatch(selectInstance(v)),
    removeInstance: (v) => dispatch(removeInstance(v)),
    addInstance: (v) => dispatch(addInstance()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
