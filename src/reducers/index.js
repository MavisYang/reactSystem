import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import adminTaskList from './adminTaskList'
const initState = false

const extendState = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE':
            return !state

        default:
            return state

    }

}
const rootReducer =combineReducers({
    // extendState,adminTaskList,
    routing: routerReducer
})
export default rootReducer