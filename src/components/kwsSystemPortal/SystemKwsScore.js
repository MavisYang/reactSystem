import React,{Component} from 'react'
import SelectBox from '../robotComponent/SelectBox'
import AutoComplete from '../robotComponent/AutoComplete'
import CheckBox from '../robotComponent/CheckBox'
import PromptSureBox from '../robotComponent/PromptSureBox'
import PageFragRule from '../robotComponent/PageFragRule'
const selectData=[
    {
        label: '开启状态',
        options: ['开启','关闭'], //sentList
        paramaName: 'status',   //name
        paramaValue: [1,0]      //value
    }
]
let pageUrl = ''
export default class SystemKwsScore extends Component{
    constructor(props){
        super(props)
        this.state={
            pageSize:1,
            clear:false,
            searchParamas:{

            },
            isEdit:false,
            editIndex:'',
            editKwsValue:'',
            confirmBox:false,
            assignData:{
                pageInfo: {
                    currentPage: 0, totalPage: 1, pageSize: 1, totalRecords: 2
                },
                resultContent: [
                    {
                        id:'11111111',
                        keywordName: 'keywordName4',
                        remove: false,
                        response: false,
                        ruleMatchType: 1,
                        status: 0,
                        tenantId: "string",
                        tenantName: "tenantName1",
                        tenantType: 1,
                        app :12 ,//小程序数 ,
                        groupCount:22 ,//群数量 ,
                        imageTxt:23//图文数 ,
                    },
                    {
                        id:'2222222',
                        keywordName: 'keywordName3',
                        remove: true,
                        response: true,
                        ruleMatchType: 2,
                        status: 1,
                        tenantId: "string",
                        tenantName: "tenantName2",
                        tenantType: 2,
                        app :10 ,//小程序数 ,
                        groupCount:2 ,//群数量 ,
                        imageTxt:3//图文数 ,
                    }
                ]
            }
        }
        this.handleEditKeyWords = this.handleEditKeyWords.bind(this)
        this.okToEditKeywords = this.okToEditKeywords.bind(this)
        this.cancelToEditKeywords = this.cancelToEditKeywords.bind(this)

        this.handleDelete = this.handleDelete.bind(this)
        this.handleClickStatus = this.handleClickStatus.bind(this)
        this.showConfirmBox = this.showConfirmBox.bind(this)
        this.hideConfirmBox = this.hideConfirmBox.bind(this)
    }
    componentDidMount(){

    }

    searchTaskList(){
        const {searchParamas} = this.state
        console.log(searchParamas,1)

    }

    //分页数据
    pageInitData(data){
        let {checked} = this.state
        checked.length=data.resultContent.length
        for(let i=0;i< data.resultContent.length;i++){
            checked[i]=false
        }
        this.setState({
            assignData:data,
            checked:checked,
            allChecked:false
        })
    }

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

    handleEditKeyWords(editIndex,keywordsName){
        this.setState({
            isEdit:true,
            editIndex:editIndex,
            editKwsValue:keywordsName
        })
    }

    handleChangeKeywords(e){
        this.setState({
            editKwsValue:e.target.value
        })
    }

    okToEditKeywords(index){
        const {assignData,editKwsValue} = this.state
        assignData.resultContent[index].keywordName = editKwsValue
        this.setState({
            assignData:assignData
        })
        this.cancelToEditKeywords()
    }

    cancelToEditKeywords(){
        this.setState({
            isEdit:false,
            editIndex:''
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
        if(status == 0){
            assignData.resultContent[index].status = 1
        }else if(status == 1){
            assignData.resultContent[index].status = 0
        }
        this.setState({
            assignData:assignData
        })
    }

    render(){
        const {assignData,isEdit,editIndex,editKwsValue} =this.state
        return(
            <div className='mm-containerBox' style={{height:'call(100% - 90px)'}}>
                <div className='filterWrapper'>
                    {
                        selectData.map((data,index)=>{
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
                </div>
                <div className="contentWrapper">
                    <div className="contentTitle">
                        <div className="funTitle-left">
                            <button className='btnCss addKwsBtn'>添加关键字</button>
                        </div>
                        {this.props.promptStatus!=null?<PromptSureBox sureState={this.props.promptStatus}/>:''}
                        <div className="funTitle-right"></div>
                    </div>
                    <div className="contentTable">
                        <table>
                            <thead>
                            <tr>
                                <td>
                                    <div className="number">
                                        <span>序号</span>
                                    </div>
                                </td>
                                <td>开启状态</td>
                                <td>关键字名称</td>
                                <td>操作</td>
                            </tr>
                            </thead>
                            <tbody>
                            {assignData.resultContent ?
                                assignData.resultContent.map((item, index) => {
                                    return (
                                        <tr key={index} id={item.id}>
                                            <td>
                                                <div className="number">
                                                    <span>{index + 1}</span>
                                                </div>
                                            </td>
                                            <td>{item.status != undefined && item.status != null ? item.status == 0 ? '关闭' : item.status == 1 ? '开启' : '--' : '--'}</td>
                                            <td>
                                                {
                                                    isEdit&&editIndex==index?
                                                        <div className='editKeywords'>
                                                            <input type="text" className='kwsInput' value={editKwsValue} autoFocus='autoFocus' onChange={this.handleChangeKeywords.bind(this)}/>
                                                            <span className='confirmBtn' onClick={()=>this.okToEditKeywords(index)}>确定</span>
                                                            <span className='cancelBtn' onClick={this.cancelToEditKeywords}>取消</span>
                                                        </div>
                                                        :
                                                        <div>
                                                            {item.keywordName != undefined && item.keywordName != null ? item.keywordName : '--'}
                                                        </div>
                                                }
                                            </td>
                                            <td>
                                               <div className='operateBox'>
                                                   <span className='operateBtn itemEdit' onClick={()=>this.handleEditKeyWords(index,item.keywordName)}>编辑</span>
                                                   <span className='operateBtn itemDel' onClick={()=>this.showConfirmBox(index)}>删除</span>
                                                   <span className='operateBtn itemStatus' onClick={()=>this.handleClickStatus(item.status,index)}>
                                                    {item.status == 0 ? '开启' : item.status == 1 ? '关闭' : '--'}
                                                </span>
                                               </div>
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
                                pullData={this.pageInitData.bind(this)}
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