import React from 'react'
import $ from 'jquery'
import Base64 from 'base64-js'

const promiseXHR = (url,token,data,type)=>{
    return new Promise((resolve,reject)=>{
        //第一步：创建XMLHttpRuquest对象：
        let xhr = new XMLHttpRequest()
        //第二步：用户发出请求
        xhr.open(type,url,true);     //指定和服务器端交互的HTTP方法，URL地址，即发出请求信息；// Method:表示http请求方法，一般使用"GET","POST";url：表示请求的服务器的地址；asynch：表示是否采用异步方法，true为异步，false为同步
        //设置和服务器交互的相应参数:添加自定义 HTTP 头('Content-Type'和'Authorization')
        if(typeof data === 'object'){
            xhr.setRequestHeader('Content-Type','application/json') //发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。
        }else{
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')//发送信息至服务器时内容编码类型。默认值: "application/x-www-form-urlencoded"。
        }
        // token={
        //     'type': "Bearer",
        //     'value': "9d6b25ea-506a-45ab-b729-1f0d471aefe7"
        // }
        // Base64.encode("liz-service-admin:secret")   //bGl6LXNlcnZpY2UtYWRtaW46c2VjcmV0
        if(token!=null){
            token.value = token.type =='Basic'?Base64.encode("liz-service-admin:secret"):token.value
            xhr.setRequestHeader('Authorization',token.type+' '+token.value)  // Authorization:Bearer 9d6b25ea-506a-45ab-b729-1f0d471aefe7
        }

        // 第三步：注册回调方法
        xhr.onreadystatechange=()=>{
        // 第四步：判断和服务器端的交互是否完成，还要判断服务器端是否返回正确的数据
            if(xhr.readyState==4){
                //表示服务器的相应代码是200；正确返回了数据
                if(xhr.readyState>=200&&xhr.readyState<300||xhr.readyState==304){
                    resolve(xhr.responseText)
                }else{
                    reject(xhr.responseText)
                }
            }

        }
        //第五步：设置向服务器端发送的数据，启动和服务器端的交互
        xhr.send(data)

    })
}
export default promiseXHR