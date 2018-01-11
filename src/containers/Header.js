import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HeaderScope from '../components/HeaderScope'
import * as TodoActions from '../actions'


const Header = ({actions}) => (
    <HeaderScope  actions={actions}/>
)

Header.propTypes = {
  // actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  // userInfo: state.userInfo
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
