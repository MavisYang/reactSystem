import React,{Component} from 'react'

export default class ListPreviewBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monitorAct: false,
            lookList:''
        }
        this.showMonitorAccount = this.showMonitorAccount.bind(this)
        this.hideMonitorAccount = this.hideMonitorAccount.bind(this)
    }

    componentWillMount(){
        const {listData} = this.props
        // console.log(listData)
        if (listData != '' && listData != undefined && listData != null){

            this.setState({
                lookList:listData
            })
        }

    }

    showMonitorAccount() {
        if (this.state.lookList.length > 1) {
            this.setState({
                monitorAct: true
            })
        }
    }

    hideMonitorAccount() {
        this.setState({
            monitorAct: false
        })
    }

    render() {
        const {monitorAct,lookList} = this.state
        // const {monitorActList, interimProme} = this.props
        // console.log(monitorActList)
        // console.log(interimProme)
        return (
            <div onMouseLeave={this.hideMonitorAccount} style={{position: 'relative'}}>
                <div className='groupNumBox'>
                    {
                        lookList != '' ?
                            <div onMouseEnter={this.showMonitorAccount}>
                                {
                                    lookList.length > 1?lookList[0]+'['+lookList.length+']':lookList[0]
                                }
                            </div>
                            : '--'
                    }
                    {
                        monitorAct ? <div className="groupNumDetails" style={{bottom: '35px', left:'76px',top: 'inherit',width:'160px'}}>
                            <ul>
                                {
                                    lookList != '' ?
                                        lookList.map((item, id) => {
                                            return <li key={id} style={{width:'148px'}}>{item}</li>
                                        }) : ''
                                }
                            </ul>
                        </div> : ''
                    }
                </div>
            </div>

        )
    }
}