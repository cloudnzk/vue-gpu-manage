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
    },
    getUserList(params){
        return request({
            url: '/users/list',
            params,
        })
    },
    userDel(data){
        return request({
            url: '/users/delete',
            method: 'post',
            data,
        })
    },
    getRolesNameList(){
        return request({
            url: '/roles/list'
        })
    },
    getDeptList(){
        return request({
            url: '/dept/list'
        })
    },
    // 新增，编辑用户
    postUserC_U(data){
        return request({
            url: '/users/operate',
            method: 'post',
            data
        })
    }
}