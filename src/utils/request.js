/**
 * axios 二次封装
 */
import axios from "axios"
import config from "config"
import {ElMessage} from "element-plus"
import router from '../router'
import storage from "./storage"
import NProgress from "nprogress"
import 'nprogress/nprogress.css'

const TOKEN_INVALID = 'Token 认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

// 创建 axios 实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 5000,
})

// 请求拦截
service.interceptors.request.use((config) => {
    // 在 request 拦截器中，展示进度条 NProgress
    NProgress.start();
    // 发送请求前，检查是否有 token 值，如果有就带上发送
    const userInfo = storage.getItem('userInfo');
    if(userInfo && userInfo.token){
        config.headers.Authorization = 'Bearer ' + userInfo.token;
    }
    return config;
})

// 响应拦截
service.interceptors.response.use((res) => {
    // 在 request 拦截器中，隐藏进度条 NProgress
    NProgress.done();
    const {code,data,msg} = res.data
    if(code === 200){
        return data
    }
    else if(code === 40001){
        // 给用户展示错误信息
        ElMessage.error(TOKEN_INVALID)
        // token 失效了清空一下
        const userInfo = storage.getItem('userInfo');
        if (userInfo && userInfo.token) {
            storage.setItem('userInfo', null)
            router.push('/login')
        }
        // 验证失败，跳转到登录页面
        // setTimeout(() => {
        //     router.push('/login')
        // },1500)
        // 返回一个 rejected 状态，包装了错误原因的 Promise
        return Promise.reject(TOKEN_INVALID)
    }
    else{
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
});

export function request(options){
    // 生产/开发/测试环境使用不同的 baseApi
    if(config.env === 'production'){
        // 创建实例后修改默认值
        service.defaults.baseURL = config.baseApi
    }
    else{
        // 开发环境使用 mock 与否
        service.defaults.baseURL = config.mock ? config.mockApi: config.baseApi
    }
    return service(options)
}