/**
 * Vuex 状态管理
 */

import { createStore } from "vuex";
import mutations from './mutations'
import storage  from "@/utils/storage";

const state = {
    // 获取用户信息，如果 storage 中找不到再取空对象
    userInfo: storage.getItem("userInfo")  || {},
    // 保存用户可访问的菜单列表和按钮列表
    menuList: storage.getItem("menuList") || [],
    btnList: storage.getItem("btnList") || [],
    // 待审批条数
    noticeCount: 0
}

export default createStore({
    state,
    mutations,
})