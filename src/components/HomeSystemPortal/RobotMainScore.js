import React,{Component,PropTypes} from 'react'
import {API_PATH} from "../../constants/OriginName";
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'

export default class RobotMainScore extends Component{
    constructor(props){
        super(props)
        this.state={
            userid:'dald'
        }
    }

    render(){
        return <div>
            <span>{this.state.userid}</span>
        </div>
    }
}

