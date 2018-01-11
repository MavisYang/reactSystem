import React from 'react'
import $ from 'jquery'

const promiseFile=(url,token)=>{
    return new Promise((resolve, reject)=>{
        $.ajax({
            url:url,
            type:'POST',
            cache:false,            //设置为 false 将不缓存此页面。
            processData:false,      //默认值: true,都会处理转化成一个查询字符串.如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
            contentType:false,
            beforeSend(request){    //发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。
                request.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success(res){
                resolve(res) /* 异步操作成功 */
            },
            fail(res){
                reject(res) /* 异步操作失败 */
            }


        })
    })
}
export default promiseFile