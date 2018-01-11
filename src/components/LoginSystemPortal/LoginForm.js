import React,{Component} from 'react'

export default class LoginForm extends Component{
    constructor(props){
        super(props)
        this.state={
            isCheckPsw:'password',
            verifyCodeStatus:true,
            code:parseInt(Math.random()*10000),
            rememberMe:false,
            fileTip:{
                userName:{
                    verify:true,
                    tips:'请输入用户名'
                },
                password:{
                    verify:true,
                    tips:'密码长度为6-16个字符'
                },
                verifyCode:{
                    verify:true,
                    tips:'请输入验证码'
                }
            }
        }
        this.handelClickRemember=this.handelClickRemember.bind(this)
        this.loginTo=this.loginTo.bind(this)
    }



    handelClickRemember(){
        const {rememberMe} =this.state
        this.setState({
            rememberMe:!rememberMe
        })
    }

    handleIsCheckPsw(){
        this.setState({
            isCheckPsw:'text'
        })
    }

    loginTo(){
        this.props.goToMain()
    }

    changeCode(){
        this.setState({
            code:parseInt(Math.random()*10000)
        })
    }

    render(){
        const {fileTip,isCheckPsw,verifyCodeStatus,code,rememberMe} =this.state
        return(
            <div className='loginForm'>
                <div className="loginName">
                    {
                        fileTip.userName?'': <p>
                            <em className='icon-background3 errorIcon'/>
                            {fileTip.userName.tips}
                        </p>
                    }
                    <input type="text" placeholder='请输入用户名'/>
                </div>
                <div className="passWord">
                    {
                        fileTip.password?'': <p>
                            <em className='icon-background3 errorIcon'/>
                            {fileTip.password.tips}
                        </p>
                    }
                    <input type={isCheckPsw} placeholder='请输入密码'/>
                    <span
                        className={isCheckPsw==='password'?'icon-background':'icon-background plainText'}
                        onClick={this.handleIsCheckPsw.bind(this)}
                    />
                </div>
                {
                    verifyCodeStatus?
                    <div className='verificaionCode'>
                        {
                            fileTip.verifyCode?'':<p>
                                <em className='icon-background3 errorIcon'/>
                                {fileTip.verifyCode.tips}
                            </p>
                        }
                        <input type="text" placeholder='验证码'/>
                        <span className='verifyCode' onClick={this.changeCode.bind(this)}>{code}</span>
                    </div>
                :''}
                <div className='rememberMe'>
                    <em className={rememberMe?'icon-background3 rememberPassword':'icon-background3'}
                    onClick={this.handelClickRemember}/>
                    <span>记住我</span>
                    <span className="forgetPassword">忘记密码？</span>
                </div>
                <button className='loginButton' onClick={this.loginTo}>登录</button>
            </div>
        )
    }
}