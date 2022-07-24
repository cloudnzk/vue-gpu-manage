/**
 * api 管理
 */
import { request } from "@/utils/request"
export default {
    // 用户登录
    login(data){
        return request({
            url: '/users/login',
            method: 'post',
            // post 请求不是传 params，而是 data
            data,
        })
    },
    // 获取菜单列表
    postMenuList(data){
        return request({
            url: '/menu/list',
            method: 'post',
            data,
        })
    },
    // 获取用户列表
    getUserList(params){
        return request({
            url: '/users/list',
            params,
        })
    },
    // 删除用户
    userDel(data){
        return request({
            url: '/users/delete',
            method: 'post',
            data,
        })
    },
    // 获取角色名称列表
    getRolesNameList(){
        return request({
            url: '/roles/list'
        })
    },
    // 获取部门列表
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
    },
    // 新建/修改/删除菜单
    postMenuC_U_D(data){
        return request({
            url: '/menu/operate',
            method: 'post',
            data
        })
    },
    // 根据用户获取对应的菜单权限列表
    getPermissonMenuList(){
        return request({
            url: '/menu/getPermissonMenuList',
        })
    },
}