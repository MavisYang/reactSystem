import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

export default class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputType:'password',
            rememberMe:false,
            verifyButton:'获取验证码',
            verifyDisabled:false,
            searchParamas:{},
            fileTip:{
                userName:{
                    verify:true,
                    tips:'请输入用户名'
                },
                password:{
                    verify:true,
                    tips:'密码长度为6-16个字符'
                },
                repeatPassword:{
                    verify:true,
                    tips:'两次输入的密码不一致'
                },
                phoneNum:{
                    verify:true,
                    tips:'请输入正确的手机号'
                },
                verifyCode:{
                    verify:true,
                    tips:'请获取验证码'
                }
            }
        }
        this.registerTo=this.registerTo.bind(this)
        this.isPhone=this.isPhone.bind(this)
        this.isUserName=this.isUserName.bind(this)
        this.getVerify=this.getVerify.bind(this)
        this.countDown=this.countDown.bind(this)
        this.sendVerify=this.sendVerify.bind(this)
        this.setVerifyResult=this.setVerifyResult.bind(this)
    }
    componentWillMount(){
        // this.props.actions.goTo('/HomeScope')
    }
    componentDidMount(){

    }
    isPhone(str){
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return myreg.test(str)
    }
    isUserName(str){
        let nameReg = /^([\u4e00-\u9fa5]{1,15})$|^([^\s][a-zA-Z\s]{1,50}[^\s])$/
        return nameReg.test(str)
    }
    registerTo() {
        this.props.goToMain()
        // let {searchParamas, fileTip} = this.state;
        // searchParamas.loginName = this.refs.userName.value
        // searchParamas.password = this.refs.password.value
        // searchParamas.phone = this.refs.phoneNum.value
        // searchParamas.code = this.refs.verify.value
        // const repeatPassword = this.refs.passwordAgin.value
        // console.log(searchParamas)
        // if (searchParamas.password == repeatPassword && this.isPhone(searchParamas.phone)
        //     && searchParamas.password.length >= 6 && searchParamas.password.length <= 16
        //     && searchParamas.loginName != '' && this.isUserName(searchParamas.loginName)
        //     && searchParamas.code != '') {
        //     const url = API_PATH + '/basis-api/noauth/usermgmt/supplierRegist';
        //     return promiseXHR(url, null, searchParamas, 'POST')
        //         .then((res) => {
        //             console.log(JSON.parse(res))
        //             let resultCode = JSON.parse(res).resultCode
        //             switch (resultCode) {
        //                 case '100':
        //                     this.props.goLogin()
        //                     break;
        //                 case '02504017':
        //                     this.setVerifyResult('userName', false, '用户名已存在')
        //                     break;
        //                 case '02504024':
        //                     this.setVerifyResult('phoneNum', false, '手机号已被使用')
        //                     break;
        //                 case '02504021':
        //                     this.setVerifyResult('verifyCode', false, '短信验证码已过期')
        //                     break;
        //                 case '02504022':
        //                     this.setVerifyResult('verifyCode', false, '短信验证码错误')
        //                     break;
        //                 case '02504028':
        //                     alert('注册失败!')
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         })
        // } else {
        //     if (searchParamas.password != repeatPassword) {
        //         fileTip.repeatPassword.verify = false
        //     }
        //     if (!this.isPhone(searchParamas.phone)) {
        //         fileTip.phoneNum.verify = false
        //     }
        //     if (searchParamas.password.length < 6 || searchParamas.password.length > 16) {
        //         fileTip.password.verify = false
        //     }
        //     if (searchParamas.loginName == ''||!this.isUserName(searchParamas.loginName)) {
        //         fileTip.userName.verify = false
        //     }
        //     if(searchParamas.loginName != ''&&!this.isUserName(searchParamas.loginName)){
        //         fileTip.userName.tips='用户名不能有空格'
        //     }
        //     if (searchParamas.code == '') {
        //         fileTip.verifyCode.verify = false
        //     }
        //     this.setState({
        //         fileTip: fileTip
        //     })
        // }

    }
    countDown(num){
        let timer=setInterval(()=>{
            num--;
            if(num==0){
                clearInterval(timer)
                this.setState({
                    verifyDisabled:false,
                    verifyButton:'获取验证码'
                })
            }else {
                this.setState({
                    verifyButton:'等待'+num+'秒'
                })
            }
        },1000)
    }
    sendVerify(phoneNum){
        // const url=API_PATH + '/basis-api/noauth/usermgmt/sendPhoneCode?_templateCode=SUPPLIER_REGISTER_VCODE_MSG&_phone='+phoneNum;
        // return promiseXHR(url,null,null,'GET')

    }
    getVerify() {
        // let {fileTip} = this.state;
        // const phoneNum = this.refs.phoneNum.value;
        // if (this.isPhone(phoneNum)) {
        //     let num = 60;
        //     fileTip.phoneNum.verify = true
        //     this.setState({
        //         verifyButton: '等待' + num + '秒',
        //         verifyDisabled: true,
        //         fileTip: fileTip
        //     });
        //     this.countDown(num);
        //     this.sendVerify(phoneNum)
        //         .then((res) => {
        //             console.log(JSON.parse(res));
        //             let resultCode = JSON.parse(res).resultCode
        //             switch (resultCode) {
        //                 case '100':
        //                     // let num = 60;
        //                     // fileTip.phoneNum.verify = true
        //                     // this.setState({
        //                     //     verifyButton: '等待' + num + '秒',
        //                     //     verifyDisabled: true,
        //                     //     fileTip: fileTip
        //                     // });
        //                     // this.countDown(num);
        //                     break;
        //                 case '02504023':
        //                     this.setVerifyResult('verifyCode', false, '手机号格式错误')
        //                     break;
        //                 case '02504019':
        //                     this.setVerifyResult('verifyCode', false, '手机号发送频繁')
        //                     break;
        //                 case '02504020':
        //                     this.setVerifyResult('verifyCode', false, '发送失败')
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         })
        // } else {
        //     fileTip.phoneNum.verify = false
        //     this.setState({
        //         fileTip: fileTip
        //     })
        //
        // }
    }

    handleFileTip(param){
        let {fileTip} =this.state
        fileTip[param].verify=true
        this.setState({
            fileTip:fileTip
        })
    }

    setVerifyResult(verifyName,verifyStatus,tipText){
        const {fileTip} = this.state
        fileTip[verifyName].verify=verifyStatus
        fileTip[verifyName].tips=tipText
        this.setState({
            fileTip:fileTip
        })

    }

    render(){
        const {verifyButton,verifyDisabled,fileTip} =this.state
        return(
            <div className="registerForm">
                <div>
                    {
                        fileTip.userName.verify?""
                            :
                            <p>
                                <em className="icon-background3 errorIcon"/>
                                {fileTip.userName.tips}
                            </p>
                    }
                    <input placeholder="用户名" ref='userName' onChange={this.handleFileTip.bind(this,'userName')}/>
                </div>
                <div>
                    {
                        fileTip.password.verify?""
                            :
                            <p>
                                <em className="icon-background3 errorIcon"/>
                                {fileTip.password.tips}
                            </p>
                    }
                    <input placeholder="密码" type="password" ref='password' onChange={this.handleFileTip.bind(this,'password')}/>
                </div>
                <div >
                    {
                        fileTip.repeatPassword.verify?""
                            :
                            <p>
                                <em className="icon-background3 errorIcon"/>
                                {fileTip.repeatPassword.tips}
                            </p>
                    }
                    <input placeholder="再次输入密码" type="password" ref='passwordAgin' onChange={this.handleFileTip.bind(this,'repeatPassword')}/>
                </div>
                <div >
                    {
                        fileTip.phoneNum.verify?""
                                :
                            <p>
                                <em className="icon-background3 errorIcon"/>
                                {fileTip.phoneNum.tips}
                            </p>
                    }
                    <input placeholder="请输入手机号" ref="phoneNum" maxLength='11' onChange={this.handleFileTip.bind(this,'phoneNum')}/>
                </div>
                <div className='verificaionCode'>
                    {
                        fileTip.verifyCode.verify?""
                            :
                            <p >
                                <em className="icon-background3 errorIcon"/>
                                {fileTip.verifyCode.tips}
                            </p>
                    }
                    <input
                        placeholder="验证码"
                        ref='verify' onChange={this.handleFileTip.bind(this,'verifyCode')}
                    />
                    <button
                        onClick={this.getVerify}
                        disabled={verifyDisabled}
                        className={verifyDisabled?'verifyDisabled':'unDisabled'}
                    >{verifyButton}</button>
                </div>
                <button onClick={this.registerTo} className="loginButton">注册</button>
            </div>
        )
    }
}
