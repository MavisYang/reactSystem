import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AboutScore from '../components/AboutScore'
import * as TodoActions from '../actions'

const About = ({actions}) => (
    <AboutScore  actions={actions}/>
)

About.propTypes = {
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
)(About)
