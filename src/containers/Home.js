import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HomeScore from '../components/HomeScore'
import * as TodoActions from '../actions'

const Home = ({actions}) => (
    <HomeScore  actions={actions}/>
)

Home.propTypes = {
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
)(Home)
