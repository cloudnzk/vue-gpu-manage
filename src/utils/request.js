/**
 * axios 二次封装
 */
import axios from "axios"
import config from "config"
import {ElMessage} from "element-plus"
import router from '../router'
const TOKEN_INVALID = 'Token 认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

// 创建 axios 实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 5000,
})

// 请求拦截
service.interceptors.request.use((req) => {
    const headers = req.headers
    if(!headers.Authorization)  headers.Authorization = 'Bear Jack'
    return req
})

// 响应拦截
service.interceptors.response.use((res) => {
    const {code,data,msg} = res.data
    if(code === 200){
        return data
    }
    else if(code === 40001){
        // 给用户展示错误信息
        ElMessage.error(TOKEN_INVALID)
        // 验证失败，跳转到登录页面
        setTimeout(() => {
            router.push('./login')
        },1500)
        // 返回一个 rejected 状态，包装了错误原因的 Promise
        return Promise.reject(TOKEN_INVALID)
    }
    else{
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

export function request(options){
    // 生产/开发/测试环境使用不同的 baseApi
    if(config.env === 'production'){
        // 创建实例后修改默认值
        service.defaults.baseURL = config.baseApi
    }
    else{
        service.defaults.baseURL = config.mock ? config.mockApi: config.baseApi
    }
    return service(options)
}