/**
 * Created by mavis on 2017/9/20.
 */
import React,{Component} from 'react'
import $ from 'jquery'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
export default class AutoComplete extends Component{
    constructor(props){
        super(props)
        this.state={
            autoState:false,
            autoList:[],
            paramas:{
                inputVal:'',
                code:''
            },
            keyDownIndex:-1
        }
        this.handleFocusData = this.handleFocusData.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.showAutoCompleteList = this.showAutoCompleteList.bind(this)
        this.hideAutoCompleteList = this.hideAutoCompleteList.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleKeyDownEvent = this.handleKeyDownEvent.bind(this)
        this.handleClickSelect = this.handleClickSelect.bind(this)
        this.autoCompleteDatas = this.autoCompleteDatas.bind(this)
    }

    handleInputChange(e){
        let key=this.props.autoAction.key
        let value = e.target.value;
        let name = e.target.name;
        let {paramas} = this.state;
        paramas.inputVal=value
        this.setState({
            paramas: paramas,
        })
        if (this.props.changeClear) {
            this.props.changeClear()
        }
        this.props.setParamasHandle(name,value)
        if(this.props.autoAction.autoComStatus){
            this.autoCompleteDatas(key,value)
        }
    }

    autoCompleteDatas(key,value){
        let self = this;
        let urlName;
        const {path} = this.props
        switch (path){
            case 'N_NOPOOL':
                urlName='phone'
                break;
            case 'G_GROUP':
                urlName='group'
                break;
            case 'U_ROBOT':
                urlName='robot'
                break;
            case 'NERS_CENTER':
                urlName='msg'
                break;
            default:
                break
        }

        const url = `${API_PATH}/phoneadmin/noauth/${urlName}/like/?_key=${key}&_val=${value}`
        promiseXHR(url,null,null,'GET')
            .then(res => {
                const resData = JSON.parse(res)
                const autoList = resData.resultContent
                // console.log(12,autoList)
                if(autoList!=''||autoList!=null){
                    if(key==='monitorAccount'||key==='MONITOR_ACCOUNT'){
                        let monActList = []
                        autoList.forEach((item)=> {
                            item.split(',').forEach((value) => {
                                monActList.push(value)
                            })
                        })
                        let list= [...new Set(monActList)]//去重
                        self.showAutoCompleteList(list)
                    }else{
                        self.showAutoCompleteList(autoList)
                    }
                }else{
                    self.setState({ autoList: []})
                    self.hideAutoCompleteList()
                }
            })
    }

    showAutoCompleteList(autoList){
        this.setState({
            autoState:true,
            autoList:autoList
        })
    }
    hideAutoCompleteList(){
        this.setState({
            autoState:false,
            keyDownIndex:-1
        })
    }

    handleFocusData(){
        let key=this.props.autoAction.key
        let value = this.state.inputVal
        const {autoList} = this.state
        if(autoList !=''||autoList!=null){
            this.autoCompleteDatas(key,value)
        }
    }

    handleOnBlur(){
        this.hideAutoCompleteList()
    }

    handleClickSelect(e){
        let liHtml = e.target.innerHTML
        let name = e.target.id
        let {paramas} = this.state;
        paramas.inputVal=liHtml
        this.setState({
            paramas: paramas,
        })
        if (this.props.changeClear) {
            this.props.changeClear()
        }
        this.hideAutoCompleteList()
        this.props.setParamasHandle(name,liHtml)
    }


    handleKeyDownEvent(event){
        let name = this.props.autoAction.name
        let {autoList,paramas,keyDownIndex} = this.state
        //光标键"↓"
        if(event.keyCode==40) {
            if (keyDownIndex == autoList.length - 1) {
                keyDownIndex = 0
            } else {
                keyDownIndex++
            }
            paramas.inputVal=autoList[keyDownIndex]
            this.setState({
                paramas:paramas,
                keyDownIndex:keyDownIndex
            })
            this.props.setParamasHandle(name,paramas.inputVal)

        }

        //光标键"↑"

        else if(event.keyCode==38){
            if(keyDownIndex==0){
                keyDownIndex=autoList.length-1
            }else {
                keyDownIndex--
            }
            paramas.inputVal=autoList[keyDownIndex]
            this.setState({
                paramas:paramas,
                keyDownIndex:keyDownIndex
            })
            this.props.setParamasHandle(name,paramas.inputVal)
        }

        //回车键

        else if(event.keyCode==13){
            this.hideAutoCompleteList()

        }
    }

    componentDidMount(){
        // console.log(this.props.autoAction.id)
        document.getElementById(this.props.autoAction.id).addEventListener('keydown',this.handleKeyDownEvent);
        window.addEventListener('click',this.hideAutoCompleteList)
    }
    componentWillUnmount(){
        document.getElementById(this.props.autoAction.id).removeEventListener('keydown',this.handleKeyDownEvent);
        window.removeEventListener('click',this.hideAutoCompleteList)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.clear){
            this.setState({
                autoState:false,
                autoList:[],
                paramas:{
                    inputVal:'',
                    code:''
                },
                keyDownIndex:-1
            })
        }
    }

    render(){
        const {lable,name,key,id} = this.props.autoAction
        const {autoState,autoList,paramas,keyDownIndex} =this.state
        let placeholder= '请输入'+lable
        // console.log(this.state.autoList);
        return(
            <div className="selectWrapper">
                <div className='selectLabel'>{lable}</div>
                <div className="selectAutoComplete">
                    <input className='titleInput' type='text' placeholder={placeholder} style = {{color:'#485767'}}
                           id={id} name={name} value={paramas.inputVal}
                           onChange={this.handleInputChange}
                    />
                    {
                        autoState? <div className="autoCompleteWrapper">
                            <ul className="optionUl">
                                {
                                    autoList!=null?autoList.map((value,index)=>{
                                    return <li
                                        className={keyDownIndex==index?'hoverChose':''}
                                        key={index} id={name} onClick={this.handleClickSelect}>{value}</li>
                                    }):''
                                }
                            </ul>
                        </div>
                            :''
                    }

                </div>
            </div>

        )
    }
}
