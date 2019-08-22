import React,{Component} from 'react'
import NewsCenterTitleBtn from '../robotComponent/NewsCenterTitleBtn'
import SystemKwsScore from './SystemKwsScore'
import TenantKwsScore from './TenantKwsScore'
export default class KwordsMainScope extends Component{
    constructor(props){
        super(props)
        this.state={
            view:'TENANT_KEYWORDS',
            // view:'SYSTEM_KEYWORDS',
            promptStatus:null
        }
        this.showPromptBox = this.showPromptBox.bind(this)
        this.hidePromptBox = this.hidePromptBox.bind(this)
    }
    showPromptBox(value){
        let self = this
        this.setState({
            promptStatus:value
        })
        setTimeout(function () {
            self.hidePromptBox()
        },1000)

    }
    hidePromptBox(){
        this.setState({
            promptStatus:null
        })

    }

    changeView(value){
        this.setState({
            view:value
        })
    }

    render(){
        const {actions} = this.props
        const {view,promptStatus} =this.state
        let viewScope;
        switch (view){
            case 'TENANT_KEYWORDS':
                viewScope = <TenantKwsScore
                    actions={actions}
                    promptStatus={promptStatus}
                    showPromptBox={this.showPromptBox}
                />
                break;
            case 'SYSTEM_KEYWORDS':
                viewScope = <SystemKwsScore
                    actions={actions}
                    promptStatus={promptStatus}
                    showPromptBox={this.showPromptBox}
                />
                break;
            default:
                break;
        }
        return(
            <div className='mt-container'>
                <NewsCenterTitleBtn
                    actions = {Object.assign({},this.props.actions,{showConfirmBox:this.showConfirmBox})}
                    messageCenter={this.props.messageCenter}
                />
                <div className='KWSBody FPBody' style={{height: 'calc(100% - 60px)',width:'calc(100% - 122px)'}}>
                    <div className="HeadNavTab">
                        <div className="navBox">
                            <span
                                className={view === 'TENANT_KEYWORDS' ?'tabActive':''}
                                onClick={()=>{this.changeView('TENANT_KEYWORDS')}}
                            >租户关键字</span>
                            <span
                                className={view === 'SYSTEM_KEYWORDS' ? 'tabActive':''}
                                onClick={()=>{this.changeView('SYSTEM_KEYWORDS')}}
                            >系统关键字</span>
                        </div>
                    </div>
                    {viewScope}
                </div>
            </div>
        )
    }

}