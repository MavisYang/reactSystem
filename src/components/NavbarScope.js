import React,{PropTypes,Component} from 'react'
import {Link,NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions'

const navItems = [
    {
        code: 'Home',
        name: '首页',
        target: '/home',
        secondNav:[
            {
                parentCode:'About',
                code: 'JMScope',
                name: '入群模板',
                target: '/about/JMScope',

            },
            {
                parentCode:'About',
                code: 'JRScope',
                name: '入群规则',
                target: '/about/JRScope'
            }
        ]
    },
    {
        code: 'About',
        name: '相关',
        target: '/about'
    },

]

class NavbarScope extends Component{
    // static propTypes = {
    //     actions: PropTypes.object.isRequired
    // }
    constructor(props){
        super(props)
        this.state={
            isExtend: false,
        }
    }

    signOutClick(){
        this.props.actions.goTo('/login')
    }

    handleExtendChange(){
        console.log(12)
        const {isExtend}=this.state
        console.log(isExtend)
        this.setState({
            isExtend:!isExtend
        })
    }
    render(){
        const {isExtend} =this.state
        let currentPath = this.props.location
        // navBarWrapper-extend
        // navBarWrapper
        return <div className={isExtend?'navBarWrapper-extend navBarWrapper':'navBarWrapper'}>
            <div className='nav-avtarBox'>
                <div className='logo' onClick={this.signOutClick.bind(this)}></div>
            </div>
            <div className="consumerName" onClick={this.handleExtendChange.bind(this)}>
                班长，你好
            </div>
            <ul>
                {
                    navItems.map((navItem,index)=>{
                        return <li key={index}
                        className={navItem.code}>
                            <Link to={navItem.target}>
                                <div className={ navItem.target == currentPath ? 'nav-item nav-item-active' : 'nav-item nav-item-unactive'}>
                                    <div className='nav-icon icon-background'></div>
                                    <div className='nav-textBox'>
                                        {navItem.name}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}

const mapStateToProps = state => ({
    // userInfo:  state.userInfo,
    // extendState: state.extendState,
    // naviMetaData: state.naviMetaData
})
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarScope)