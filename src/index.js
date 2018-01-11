import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router'
import {Router, Route,Switch,Redirect} from 'react-router-dom'
import {routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'

import Login from './containers/Login'
import NavbarScope from './components/NavbarScope'
import Header from './containers/Header'
import Home from './containers/Home'
import About from './containers/About'

const history = createHistory({basename:''})
const middleware = routerMiddleware(history)
export const store = createStore(
    reducers,
    applyMiddleware(middleware)
)

const MainScope=({location,history})=>{
    const judage = location.pathname == "/home" ||location.pathname == '/about'
    return(
        <div className='mm-containter'>
            {judage?<NavbarScope location={location.pathname}/>:''}
            <div className='contentWrapper' style={{width:'calc(100% - 122px)',height:'calc(100% - 60px)'}}>
                {location.pathname!='/login'? <Header history={history}/>:''}
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route path='/about' component={About}/>
                    <Route path='/login' component={Login}/>
                    <Redirect from = {"/"}  to ={"/login"}  />
                </Switch>
            </div>
        </div>

    )
}

const Html =()=>{
    return(
        <div>
            <Switch>
                <Route exact path='/home' component={Home}/>
            </Switch>
        </div>
    )
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path='/' component={MainScope}/>
                <Route path='/login' history={history} component={Login}/>
            </Switch>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
)