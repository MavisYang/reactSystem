export const ORIGIN_NAME = window.location.origin.includes('test.')? 'test.gemii.cc:58080':window.location.origin.includes('https')?'cloud.gemii.cc':'dev.gemii.cc:58080'
export const SUB_API_PATH = '/lizcloud/api'
export const SUB_WS_PATH = '/lizcloud/ws'
export const WS_NAME = (window.location.origin.includes('https')?'wss://':'ws://')+ORIGIN_NAME+SUB_WS_PATH
export const API_PATH = (window.location.origin.includes('https')?'https://':'http://')+ORIGIN_NAME + SUB_API_PATH