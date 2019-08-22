import React,{Component} from 'react'
import UploadXHR from '../funStore/UploadXHR'
import AuthProvider from '../funStore/AuthProvider'
import {API_PATH} from '../constants/OriginName'
import GroupMainScore from './HomeSystemPortal/GroupMainScore'
import RobotMainScore from './HomeSystemPortal/RobotMainScore'
import PoolMainScore from './HomeSystemPortal/PoolMainScore'
import Media from "react-media";
export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            viewContainter:'GROUP'
        }
        this.uploadFile=this.uploadFile.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.changeNavTab=this.changeNavTab.bind(this)
    }
    componentDidMount(){
        // console.log(location.origin)
    }
    uploadFile(){
        let file=''
        let formData = new FormData()
        formData.append('file', file)
        let url ='http://dev.gemii.cc:58080/lizcloud/api/phoneadmin/noauth/group/batch_import/'
        UploadXHR(url,null,formData)
            .then(res=>{
                console.log(1)
            })
    }
    handleClick(userName,password){
        let url = API_PATH
        AuthProvider.onLogin({userName,password})
            // .then(res=>{
            //     console.log(12)
            // })
    }
    changeNavTab(value){
        this.setState({
            viewContainter:value
        })
    }
    render() {
        const {viewContainter} = this.state
        let viewScope
        switch (viewContainter) {
            case 'GROUP':
                viewScope = <GroupMainScore props={'props'} context={'context'}/>
                break;
            case 'ROBOT':
                viewScope = <RobotMainScore/>
                break;
            case 'POOL':
                viewScope = <PoolMainScore/>
                break;
            default:
                break;

        }
        console.log(this.props.actions,'actions')
        console.log(this.props.children,'children')
        return <div className='mm-content-wraper'>
            <div className='HeadNavTab'>
                <div className='navBox'>
                    <span className={viewContainter === 'GROUP' ? 'tabActive' : ''}
                          onClick={() => this.changeNavTab('GROUP')}>群管理</span>
                    <span className={viewContainter === 'ROBOT' ? 'tabActive' : ''}
                          onClick={() => this.changeNavTab('ROBOT')}>机器人管理</span>
                    <span className={viewContainter === 'POOL' ? 'tabActive' : ''}
                          onClick={() => this.changeNavTab('POOL')}>号池管理</span>
                </div>
            </div>
            {viewScope}
        </div>
    }
}