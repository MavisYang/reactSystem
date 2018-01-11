import React,{Component} from 'react'
import {API_PATH} from "../../constants/OriginName";
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'
import {DatePicker} from 'react-datepicker-component'
export default class AloneAssignScore extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div className='mm-filterWrapper'>
            阿萨说
        </div>
    }
}
