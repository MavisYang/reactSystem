import React, {Component, PropTypes} from "react";
import $ from "jquery";
import LoginForm from './LoginSystemPortal/LoginForm'
import RegisterForm from './LoginSystemPortal/RegisterForm'
import ForgetPswd from './LoginSystemPortal/ForgetPswd'
export default class LoginScope extends Component {
    // static propTypes = {
    //     actions: PropTypes.object.isRequired
    // }

    constructor(props) {
        super(props)
        this.state={
            screenWidth: document.documentElement.clientWidth,
            screenHeight: document.documentElement.clientHeight,
            viewContainter:'LOGIN'

        }
        this.resizeEvent = this.resizeEvent.bind(this)
        this.handleClickLogin = this.handleClickLogin.bind(this)
    }

    resizeEvent() {
        {
            this.setState({
                screenWidth: document.documentElement.clientWidth,
                screenHeight: document.documentElement.clientHeight
            })
        }
    }

    componentDidMount() {
        $(window).get(0).addEventListener('resize', this.resizeEvent)
    }
    componentWillUnmount() {
        $(window).get(0).removeEventListener('resize', this.resizeEvent)

    }
    goLogin(){
        this.setState({
            viewContainter:'LOGIN'
        })
    }

    goRegister(){
        this.setState({
            viewContainter:'REGISTER'
        })
    }

    handleClickLogin(){
        this.props.actions.goTo('/home')
    }

    render() {
        const {viewContainter,screenWidth,screenHeight} =this.state
        let viewScope
        switch (viewContainter){
            case 'LOGIN':
                viewScope = <LoginForm actions={this.props.actions}
                                       goToMain={this.handleClickLogin}/>
                break;
            case 'REGISTER':
                viewScope = <RegisterForm actions={this.props.actions}
                                          goToMain={this.handleClickLogin}/>
                break;
            case 'FORGET_PASSWORD':
                viewScope = <ForgetPswd actions={this.props.actions}/>

        }
        return (
            <div className='loginWrapper' style={{width:screenWidth,height:screenHeight}}>
                <div className='loginBox'>
                    <p className='login-title-logo'>喵喵注册登陆界面</p>
                    <div className="login-register clearfix">
                        <span
                              className={viewContainter=='LOGIN'?'loginActive':''}
                              onClick={this.goLogin.bind(this)}>登陆</span>
                        <span
                        className={viewContainter=='REGISTER'?'loginActive':''}
                            onClick={this.goRegister.bind(this)}>注册</span>
                    </div>
                    <div className='login-register-form'>
                        {viewScope}
                        {/*<button className='loginButton' onClick={this.handleClickLogin.bind(this)}>login</button>*/}
                    </div>
                </div>
            </div>
        )
    }
}
