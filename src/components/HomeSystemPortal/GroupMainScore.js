import React,{Component,PropTypes} from 'react'
import {API_PATH} from "../../constants/OriginName";
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'

export default class GroupMainScore extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
            listData:[
                {
                    name:'mavis',
                    code:'dkahdkad'
                }
            ]

        }

    }

    componentDidMount(){

    }

    componentWillMount(){
        let listData = AuthProvider.getLocalStorageObj('data')
        if(listData){
            console.log(1)
            this.setState({
                listData:listData
            })
        }else{
            console.log(2)
        }
    }

    handleInputChange(){

    }
    render(){
        console.log(this.props,'props')
        console.log(this.context,'context')
        const {listData} =this.state
        const thead = [
            '名字',
            '记录'
        ]
        // console.log(thead)
        return  <div className='homeWrapper'>
            <div className='mm-filterWrapper'>
                <div className="selectWrapper">
                    <div className="selectLabel">名字</div>
                    <div className="selectAutoComplete">
                        <input className='titleInput' type='text' placeholder={'请输入名字'} style = {{color:'#485767'}}
                               onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div className="selectWrapper">
                    <div className="selectLabel">记录</div>
                    <div className="selectAutoComplete">
                        <input className='titleInput' type='text' placeholder={'请输入记录'} style = {{color:'#485767'}}
                               onChange={this.handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className='home-content'>
                <div className='content-title'>
                    <button className='btnCss addBtn'>新增</button>
                </div>
                <div className='content-table tableArea'>
                   <table>
                       <thead>
                       <tr>
                           <td>
                               <input type="checkbox"/>
                           </td>
                           {
                               thead.map((item,index)=>{
                                   return <td key={index}>{item}</td>
                               })
                           }
                       </tr>
                       </thead>
                       <tbody>
                           {
                               listData!=''?listData.map((item,index)=>{
                                   return <tr key={index}>
                                       <td><input type="checkbox"/>{index+1}</td>
                                       <td>{item.name}</td>
                                       <td>{item.code}</td>
                                   </tr>
                               }):''
                           }

                       </tbody>
                   </table>


                </div>

            </div>

        </div>
    }
}
