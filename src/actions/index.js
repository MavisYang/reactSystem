import * as types from '../constants/ActionTypes'
import {push} from 'react-router-redux'

export const goTo = (name) => (push(name))

export const initAdminTask = (searchParamas, pageInfo, taskList) => ({
    type: types.ADMIN_MICROTASK_INIT,
    searchParamas,
    pageInfo,
    taskList
})
export const pullAdminTask = (pageInfo, taskList) => ({type: types.ADMIN_MICROTASK_PULL, pageInfo, taskList})
export const checkAdminTask = (id, checkAll) => ({type: types.ADMIN_MICROTASK_CHECK, id, checkAll})
export const checkAllAdminTask = () => ({type: types.ADMIN_MICROTASK_CHECKALL})
export const delAdminTask = (pageInfo, taskList) => ({type: types.ADMIN_MICROTASK_DELETE, pageInfo, taskList})
export const batchDelAdminTask = (pageInfo, taskList) => ({type: types.ADMIN_MICROTASK_BATCHDELETE, pageInfo, taskList})