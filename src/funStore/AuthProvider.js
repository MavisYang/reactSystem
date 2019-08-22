import $ from 'jquery'
import promiseXHR from './ServerFun'
import {ORIGIN_NAME,API_PATH} from '../constants/OriginName'
import Base64 from 'base64js'
class AuthProvider {
    constructor() {

    }
    onLogin({username,password,imageCode,sessionKey}){
        const self = this
        const url = API_PATH+'/uaa/oauth/token'
        return promiseXHR(url,{type:'Basic',value:null},'grant_type=password&username='+username+'&password='+password+'&imageCode='+imageCode+'&sessionKey='+sessionKey,'POST')
            .then((res) => {
                const data = eval("("+ res +")")
                self.saveTokens(data.access_token,data.refresh_token,data.expires_in)
                return data
            }).catch((reject) => {
                return 'error'
            })
    }

    saveTokens(access_token,refresh_token,expires_in){
        let exp = new Date();
        exp.setTime(exp.getTime() + expires_in*1000)
        document.cookie = 'access_token' + "="+ escape (access_token) + ";expires=" + exp.toGMTString();
        document.cookie = 'refresh_token' + "="+ escape (refresh_token)
        document.cookie = 'fucking' + "="+ escape (access_token) + ";expires=" + exp.toGMTString();
    }

    encodeClientId(){
        if(this.getCookie('webclient_id')==null){
            // var webclient_id = Base64.encode('lizClient'+Math.random().toString())
            // var webclient_id = encode('lizClient'+Math.random().toString())
            // this.saveWebClienId(webclient_id)
            // console.log(document.cookie);
        }
    }

    saveWebClienId(webclient_id){
        let exp = new Date();
        exp.setTime(exp.getTime() + 1000*60*60*24*365)
        document.cookie = 'webclient_id' + "="+ escape (webclient_id) + ";expires=" + exp.toGMTString();
    }

    onRefreshToken() {
        const refreshToken = this.getCookie('refresh_token')
        const accessToken = this.getCookie('access_token')
        const url = API_PATH+'/uaa/oauth/token'
        return  promiseXHR(url,{type:'Basic',value:null},'grant_type=refresh_token&refresh_token='+refreshToken,'POST')
            .then(res => {
                const data = eval("("+ res +")")
                //  console.log(data)
                this.saveTokens(data.access_token,data.refresh_token,data.expires_in)
                return data.access_token
            })
    }


    getAccessToken(){
        if(!this.getCookie('access_token')){
            return  this.onRefreshToken()
        }else {
            return new Promise((resolve,reject) => {
                resolve(this.getCookie('access_token'))
            })
        }
    }

    setLocalStorage(key,value){
        if(window.localStorage){
            localStorage.setItem(key,value)
        }
    }


    getLocalStorage(key){
        if(window.localStorage){
            for(let name in window.localStorage){
                if(key === name){
                    return localStorage.getItem(key)
                }
            }
            return null
        }
    }

    setLocalStorageObj(key,obj){
        if(window.localStorage){
            localStorage.setItem(key,JSON.stringify(obj)) //将JSON对象转化成字符串
        }
    }

    getLocalStorageObj(key){
        if(window.localStorage){
            JSON.parse(localStorage.getItem(key))//把字符串转换成JSON对象
        }
    }

    removeLocalStorage(key){
        if(window.localStorage)
            localStorage.removeItem(key)
    }

    setCookie(userName,password){
        let exp = new Date()
        // exp.setTime(exp.getTime()+1000*60*60*24*365)
        exp.setTime(exp.getTime()+1)
        document.cookie = 'userName' +'=' + escape(userName) +';expires='+exp.toGMTString()
        document.cookie = 'password' +'=' + escape(password) +';expires='+exp.toGMTString()

        console.log(document.cookie)
    }

    getCookie(key) {
        var aCookie = document.cookie.split("; ");
        // console.log(aCookie);
        for (var i=0; i < aCookie.length; i++)
        {
            var aCrumb = aCookie[i].split("=");
            if (key == aCrumb[0])
                return unescape(aCrumb[1]);
        }
        return null;
    }

    removeCookie(key){
        let exp = new Date()
        exp.setTime(exp.getTime() - 1);
        var cval=this.getCookie(key);
        if(cval!=null)
            document.cookie= key + "="+cval+";expires="+exp.toGMTString();
    }
}

export default new AuthProvider()
