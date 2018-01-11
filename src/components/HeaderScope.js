import React,{Component} from 'react'

export default class HeaderScope extends Component{
    constructor(props){
        super(props)
    }

    signOutClick(){
        this.props.actions.goTo('/login')
        // this.props.history.push('/login')
    }

    render(){
        return (<div className='headerWrapper'>
            <div className='headerBox'>
                Header
                <button className='signOutButton'
                        onClick={this.signOutClick.bind(this)}>退出</button>
            </div>
        </div>)
    }
}