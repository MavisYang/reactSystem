import React,{Component} from 'react'
import {API_PATH} from "../../constants/OriginName";
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'

export default class RobotAssignScore extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div>
            RobotAssignScore
        </div>
    }
}
