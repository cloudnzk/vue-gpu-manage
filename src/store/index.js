/**
 * Vuex 状态管理
 */

import { createStore } from "vuex";
import mutations from './mutations'
import storage  from "@/utils/storage";

const state = {
    // 获取用户信息，如果 storage 中找不到再取空对象
    userInfo: storage.getItem("userInfo")  || {}
}

export default createStore({
    state,
    mutations,
})