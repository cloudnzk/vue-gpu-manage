import storage  from "@/utils/storage";
import {SET_USERINFO,SET_USER_MENU,SET_USER_BTN} from "./mutations-types";

export default {
    [SET_USERINFO](state, userInfo){
        state.userInfo = userInfo
        // 因为 Vuex 的数据刷新就清空了，需要保存到 storage 中
        storage.setItem('userInfo', userInfo)
    },
    [SET_USER_MENU](state, menuList){
        state.menuList = menuList
        // 因为 Vuex 的数据刷新就清空了，需要保存到 storage 中
        storage.setItem('menuList', menuList)
    },
    [SET_USER_BTN](state, btnList){
        state.btnList = btnList
        // 因为 Vuex 的数据刷新就清空了，需要保存到 storage 中
        storage.setItem('btnList', btnList)
    }
}