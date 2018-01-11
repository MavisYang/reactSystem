import React,{Component} from 'react'
import {API_PATH} from "../../constants/OriginName";
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'

export default class GroupMainScore extends Component{
    constructor(props){
        super(props)
    }

    handleInputChange(){

    }
    render(){
        return  <div className='homeWrapper'>
            <div className='mm-filterWrapper'>
                <div className="selectWrapper">
                    <div className="selectWrapper">
                        <div className="selectLabel">名字</div>
                    </div>
                    <div className="selectAutoComplete">
                        <input className='titleInput' type='text' placeholder={'请输入名字'} style = {{color:'#485767'}}
                               onChange={this.handleInputChange}
                        />
                    </div>
                </div>
            </div>

        </div>
    }
}
