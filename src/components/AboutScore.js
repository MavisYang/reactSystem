import React,{Component} from 'react'
import AloneAssignScore from './AboutSystemPortal/AloneAssignScore'
import MixingAssignScore from './AboutSystemPortal/MixingAssignScore'
import ApplyRecordScore from './AboutSystemPortal/ApplyRecordScore'
export default class About extends Component{
    constructor(props){
        super(props)
        this.state={
            viewContainter:'ALONE_ASSIGN',
            // viewContainter:'MIX_ASSIGN',
            // viewContainter:'APPLICATION_RECORD'
        }
    }
    changeNavTab(value){
        this.setState({
            viewContainter:value
        })
    }
    render(){
        const {viewContainter} = this.state
        const {actions} =this.props
        let viewScope
        switch (viewContainter) {
            case 'ALONE_ASSIGN':
                viewScope = <AloneAssignScore actions={actions}/>
                break;
            case 'MIX_ASSIGN':
                viewScope = <MixingAssignScore actions={actions}/>
                break;
            case 'APPLICATION_RECORD':
                viewScope = <ApplyRecordScore actions={actions}/>
                break;
            default:
                break;

        }
        return <div className='mm-content-wraper'>
            <div className='HeadNavTab'>
                <div className='navBox'>
                    <span className={viewContainter === 'ALONE_ASSIGN' ? 'tabActive' : ''}
                          onClick={() => this.changeNavTab('ALONE_ASSIGN')}>独立分配</span>
                    <span className={viewContainter === 'MIX_ASSIGN' ? 'tabActive' : ''}
                          onClick={() => this.changeNavTab('MIX_ASSIGN')}>混合分配</span>
                    <span className={viewContainter === 'APPLICATION_RECORD' ? 'tabActive' : ''}
                          onClick={() => this.changeNavTab('APPLICATION_RECORD')}>申请记录</span>
                </div>
            </div>
            {viewScope}
        </div>
    }
}