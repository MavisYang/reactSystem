import React,{Component} from 'react'
import {API_PATH} from "../../constants/OriginName";
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'

export default class RobotMainScore extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div>
            RobotMainScore
        </div>
    }
}
