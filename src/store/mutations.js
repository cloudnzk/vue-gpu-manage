import storage  from "@/utils/storage";
import {SET_USERINFO} from "./mutations-types";

export default {
    [SET_USERINFO](state, userInfo){
        state.userInfo = userInfo
        // 因为 Vuex 的数据刷新就清空了，需要保存到 storage 中
        storage.setItem('userInfo', userInfo)
    }
}