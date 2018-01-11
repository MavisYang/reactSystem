import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginScope from '../components/LoginScope'
import * as TodoActions from '../actions'


const Login = ({actions}) => (
    <div>
        <LoginScope  actions={actions}/>
        {/*<LoginScope />*/}
    </div>
)

Login.propTypes = {
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
)(Login)
