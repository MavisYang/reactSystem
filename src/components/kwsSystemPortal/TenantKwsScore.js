import React,{Component} from 'react'
import promiseXHR from '../../funStore/ServerFun'
import AuthProvider from '../../funStore/AuthProvider'
import {API_PATH} from '../../constants/OriginName'
import AutoComplete from '../robotComponent/AutoComplete'
import SelectBox from '../robotComponent/SelectBox'
import FuzzySearch from '../robotComponent/FuzzySearch'
import ListPreviewBox from './ListPreviewBox'
import PageFragRule from '../robotComponent/PageFragRule'
import PromptSureBox from '../robotComponent/PromptSureBox'
import CheckBox from '../robotComponent/CheckBox'
import {addUnreadMsg} from "../../actions/index";


const selectData=[
    [{
        label: '开启状态',
        options: ['开启','关闭'], //sentList
        paramaName: 'status',   //name
        paramaValue: [1,2]      //value
    }],
    [{
        label: '租户类型',
        options: ['供应商','企业','个人'], //sentList
        paramaName: 'tenantType',   //name
        paramaValue: [1,2,3]      //value
    }],
    [{
        label: '触发条件',
        options: ['@助手','随时触发'], //sentList
        paramaName: 'ruleMatchType',   //name
        paramaValue: [1,2]      //value
    }]
    ,
    [{
        label: '自动回复',
        options: ['有','无'], //sentList
        paramaName: 'response',   //name
        paramaValue: [true,false]      //value
    }],
    [{
        label: '踢出用户',
        options: ['有','无'], //sentList
        paramaName: 'remove',   //name
        paramaValue: [true,false]      //value
    }]
]

let pageUrl= API_PATH + '/groupadmin-api/authsec/groupadmin/tenant/keyword/summary'
export default class TenantKwsScore extends Component{
    constructor(props){
        super(props)
        this.state={
            pageSize:5,
            clear:false,
            confirmBox:false,
            searchParamas:{},
            editIndex:'',
            tenantName:{
                tenantId:''
            },
            allChecked:false, //全选
            checked:[],
            assignData:{
                // pageInfo: {
                //     currentPage: 0, totalPage: 1, pageSize: 1, totalRecords: 2
                // }
                // ,
                // resultContent: [
                //     {
                //         id:'11111111',
                //         keywordName: ['1212','keywordName2','keywordName3','keywordName4'],
                //         remove: false,
                //         response: false,
                //         ruleMatchType: 1,
                //         status: 0,
                //         tenantId: "string",
                //         tenantName: "tenantName1",
                //         tenantType: 1,
                //         app :12 ,//小程序数 ,
                //         groupCount:22 ,//群数量 ,
                //         imageTxt:23//图文数 ,
                //     },
                //     {
                //         id:'2222222',
                //         keywordName: ['keywordName3','keywordName4'],
                //         remove: true,
                //         response: true,
                //         ruleMatchType: 2,
                //         status: 1,
                //         tenantId: "string",
                //         tenantName: "tenantName2",
                //         tenantType: 2,
                //         app :10 ,//小程序数 ,
                //         groupCount:2 ,//群数量 ,
                //         imageTxt:3//图文数 ,
                //     }
                // ]
            }
        }
        this.getInitData = this.getInitData.bind(this)
        this.searchTaskList = this.searchTaskList.bind(this)
        this.changeInitData=this.changeInitData.bind(this)

        this.handleDelete = this.handleDelete.bind(this)
        this.handleClickStatus = this.handleClickStatus.bind(this)
        this.showConfirmBox = this.showConfirmBox.bind(this)
        this.hideConfirmBox = this.hideConfirmBox.bind(this)

    }

    componentDidMount(){
        this.getInitData(0,this.state.pageSize)
    }
    getInitData(currentPage,pageSize){
        const {searchParamas,checked} = this.state
        console.log(searchParamas,1)
        let url = API_PATH + '/groupadmin-api/authsec/groupadmin/tenant/keyword/summary?_page='+currentPage+'&_size='+pageSize
        AuthProvider.getAccessToken()
            .then((resolve, reject)=>{
                return promiseXHR(url,{type: 'Bearer', value: resolve},searchParamas,'POST')
            })
            .then((res)=>{
                const resData = JSON.parse(res);
                checked.length = 0;
                for(let i=0;i<resData.resultContent.length;i++){
                    checked.push(false)
                }
                this.setState({
                    assignData:resData,
                    checked:checked,
                    allChecked:false
                },function () {
                    console.log(1,this.state.assignData)
                })
            })
    }

    searchTaskList(){
        this.getInitData(0,this.state.pageSize)
    }

    //分页数据
    changeInitData(value){
        console.log(101,value)
        let {checked} = this.state;
        checked.length=value.resultContent.length
        for(let i=0;i<value.resultContent.length;i++){
            checked[i]=false
        }
        this.setState({
            assignData:value,
            checked:checked,
            allChecked:false
        },function () {
            console.log(this.state.assignData)
        })
    }
    // pageInitData(data){
    //     console.log(data)
    //     let {checked} = this.state
    //     checked.length=data.resultContent.length
    //     for(let i=0;i< data.resultContent.length;i++){
    //         checked[i]=false
    //     }
    //     this.setState({
    //         assignData:data,
    //         checked:checked,
    //         allChecked:false
    //     })
    // }

    setParamasHandle(id,sentList,name,value) {
        let paramas = this.state.searchParamas
        paramas[name] = value
        this.setState({
            searchParamas: paramas
        })
    }
    changeClear() {
        this.setState({
            clear: false,
        })
    }

    clearSearchTerm(){
        console.log('clear')
        const {searchParamas,tenantName} =this.state
        for (let name in searchParamas) {
            delete searchParamas[name]
        }
        for(let key in tenantName){
            tenantName[key] = ''
        }
        this.setState({
            clear: true,
            tenantName:tenantName,
        })
        this.searchTaskList()
    }

    handleAlgentName(value,paramasValue){
        // console.log(value,paramasValue)
        let {tenantName} =this.state
        tenantName[paramasValue]=value;
        this.setState({
            tenantName:tenantName
        })
    }

    hangleAlgentId(id,paramasValue){
        // console.log(id,paramasValue)
        let {searchParamas} =this.state
        searchParamas[paramasValue]=id;
        this.setState({
            searchParamas:searchParamas
        })
    }

    //全选
    checkAllHandle(){
        let {checked,allChecked} =this.state
        allChecked=!allChecked
        checked.forEach((item,index)=>{
            checked[index]=allChecked
        })
        this.setState({
            allChecked:allChecked
        })
    }

    checkHandle(index){
        let {checked,allChecked} =this.state
        checked[index]=!checked[index]
        allChecked = true
        checked.forEach((item)=>{
            if(!item)
                allChecked = false
        })
        this.setState({
            checked:checked,
            allChecked:allChecked
        })

    }



    showConfirmBox(index){
        this.setState({
            confirmBox:true,
            editIndex:index
        })
    }
    hideConfirmBox(){
        this.setState({
            confirmBox:false,
            editIndex:''
        })
    }

    handleDelete(){
        const {assignData,editIndex} = this.state
        assignData.resultContent.forEach((val,i)=>{
            if(i == editIndex){
                delete assignData.resultContent[i]
            }
        })
        this.setState({
            assignData:assignData
        })
        this.hideConfirmBox()
        this.props.showPromptBox('已删除')
    }

    handleClickStatus(status,index){
        const {assignData} = this.state
        if(status == 1){
            assignData.resultContent[index].status = 2
        }else if(status == 2){
            assignData.resultContent[index].status = 1
        }
        this.setState({
            assignData:assignData
        })
    }

    render(){
        const {assignData,allChecked,checked} =this.state
        console.log(assignData,102)
        return(
            <div className='tenantKws mm-containerBox' style={{height:'call(100% - 90px)'}}>
                <div className='filterWrapper' style={{height:'120px'}}>
                    {
                        selectData[0].map((data,index)=>{
                            return <SelectBox
                                key={index}
                                selectLabel={data.label}
                                selectOption={data.options}
                                paramaName={data.paramaName}
                                paramaValue={data.paramaValue}
                                clear={this.state.clear}
                                setParamasHandle={this.setParamasHandle.bind(this)}
                                changeClear={this.changeClear.bind(this)}
                                all={false}
                            />
                        })
                    }
                    <FuzzySearch
                        label='所属租户' id='algentCode'
                        keyName="name" paramasValue="tenantId"
                        name={this.state.tenantName.tenantId}
                        searchParamas={{name:''}}  uploadId={true}
                        url='/tenantadmin-api/authsec/tenantbase/tenants?_size=5&_page=0'
                        changeName={this.handleAlgentName.bind(this)}
                        changeId={this.hangleAlgentId.bind(this)}
                    />
                    {
                        selectData[1].map((data,index)=>{
                            return <SelectBox
                                key={index}
                                selectLabel={data.label}
                                selectOption={data.options}
                                paramaName={data.paramaName}
                                paramaValue={data.paramaValue}
                                clear={this.state.clear}
                                setParamasHandle={this.setParamasHandle.bind(this)}
                                changeClear={this.changeClear.bind(this)}
                                all={false}
                            />
                        })
                    }
                    <AutoComplete
                        autoAction={{id: 'keywordName', name: 'keywordName', key: 'keywordName', lable: "关键字名称", autoComStatus: false}}
                        setParamasHandle={this.setParamasHandle.bind(this)}
                        changeClear={this.changeClear.bind(this)}
                        clear={this.state.clear}
                        url={''}
                    />
                    <div className='selectWrapper searchBtnWrapper' style={{float:'right'}}>
                        <div className='searchBtn selectLabel' onClick={this.searchTaskList.bind(this)}>搜索</div>
                        <div className='clearBtn selectLabel' onClick={this.clearSearchTerm.bind(this)}>清空</div>
                    </div>
                    {
                        selectData[2].map((data,index)=>{
                            return <SelectBox
                                key={index}
                                selectLabel={data.label}
                                selectOption={data.options}
                                paramaName={data.paramaName}
                                paramaValue={data.paramaValue}
                                clear={this.state.clear}
                                setParamasHandle={this.setParamasHandle.bind(this)}
                                changeClear={this.changeClear.bind(this)}
                                all={false}
                            />
                        })
                    }
                    {
                        selectData[3].map((data,index)=>{
                            return <SelectBox
                                key={index}
                                selectLabel={data.label}
                                selectOption={data.options}
                                paramaName={data.paramaName}
                                paramaValue={data.paramaValue}
                                clear={this.state.clear}
                                setParamasHandle={this.setParamasHandle.bind(this)}
                                changeClear={this.changeClear.bind(this)}
                                all={false}
                            />
                        })
                    }
                    {
                        selectData[4].map((data,index)=>{
                            return <SelectBox
                                key={index}
                                selectLabel={data.label}
                                selectOption={data.options}
                                paramaName={data.paramaName}
                                paramaValue={data.paramaValue}
                                clear={this.state.clear}
                                setParamasHandle={this.setParamasHandle.bind(this)}
                                changeClear={this.changeClear.bind(this)}
                                all={false}
                            />
                        })
                    }
                </div>
                <div className="contentWrapper">
                    <div className="contentTitle">
                        <div className="funTitle-left"></div>
                        {this.props.promptStatus!=null?<PromptSureBox sureState={this.props.promptStatus}/>:''}
                        <div className="funTitle-right"></div>
                    </div>
                    <div className="contentTable">
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <div className="number">
                                        <span className={allChecked?'icon-background checkBox checked':'icon-background checkBox'}
                                              onClick={this.checkAllHandle.bind(this)}/>
                                            <span>序号</span>
                                        </div>
                                    </td>
                                    <td>开启状态</td>
                                    <td>所属租户</td>
                                    <td>租户类型</td>
                                    <td>关键字名称</td>
                                    <td>触发条件</td>
                                    <td>群数量</td>
                                    <td>回复图文条数</td>
                                    <td>回复小程序条数</td>
                                    <td>踢出用户</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                {assignData.resultContent ?
                                        assignData.resultContent.map((item, index) => {
                                            return (
                                                <tr key={index} id={item.ruleId}>
                                                    <td>
                                                        <div className="number">
                                                        <span
                                                            className={checked[index] ? 'icon-background checkBox checked' : 'icon-background checkBox'}
                                                            onClick={() => this.checkHandle(index)}/>
                                                            <span>{index + 1}</span>
                                                        </div>
                                                    </td>
                                                    <td>{item.status != undefined && item.status != null ? item.status == 1 ? '开启' : item.status == 2 ? '关闭' : '--' : '--'}</td>
                                                    <td>{item.tenantName != undefined && item.tenantName != null ? item.tenantName : '--'}</td>
                                                    <td>{item.tenantType != undefined && item.tenantType != null ? item.tenantType == 1 ? '供应商' : item.tenantType == 2 ? '企业' : item.tenantType == 3 ? '个人' : '--' : '--'}</td>
                                                    <td>
                                                        <ListPreviewBox listData={item.keywordName}/>
                                                    </td>
                                                    <td>{item.ruleMatchType != undefined && item.ruleMatchType != null ? item.ruleMatchType == 1 ? '@助手' : item.ruleMatchType == 2 ? '随时触发' : '--' : '--'}</td>
                                                    <td>{item.groupCount != undefined && item.groupCount != null ? item.groupCount : '--'}</td>
                                                    <td>{item.imageTxt != undefined && item.imageTxt != null ? item.imageTxt : '--'}</td>
                                                    <td>{item.app != undefined && item.app != null ? item.app : '--'}</td>
                                                    <td>{item.remove != undefined && item.remove != null ? item.remove == true ? '有' : item.remove == false ? '无' : '--' : '--'}</td>
                                                    <td className='operateBox'>
                                                        <span className='operateBtn itemEdit'>编辑</span>
                                                        <span className='operateBtn itemDel' onClick={()=>this.showConfirmBox(index)}>删除</span>
                                                        <span className='operateBtn itemStatus' onClick={()=>this.handleClickStatus(item.status,index)}>
                                                            {item.status == 1 ? '开启' : item.status == 2 ? '关闭' : '--'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )

                                        })
                                        : ''
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="pageFooter">
                        {
                            assignData.pageInfo?<PageFragRule
                                url={pageUrl}
                                pageSize={this.state.pageSize}
                                pageInfo={assignData.pageInfo}
                                searchParamas={this.state.searchParamas}
                                pullData={this.changeInitData}
                            />:''
                        }
                    </div>
                </div>
                {
                    this.state.confirmBox?
                        <CheckBox checkState='确定删除吗？'
                                  onCancel={this.hideConfirmBox}
                                  onSubmit={this.handleDelete}
                        />:''
                }
            </div>
        )
    }

}