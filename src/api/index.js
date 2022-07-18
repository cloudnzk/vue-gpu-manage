/**
 * api 管理
 */
import { request } from "@/utils/request"
export default {
    login(data){
        return request({
            url: '/users/login',
            method: 'post',
            // post 请求不是传 params，而是 data
            data,
        })
    }
}