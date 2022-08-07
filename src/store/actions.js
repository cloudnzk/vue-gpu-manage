import API from '../api'
import publicFn from "@/utils/publicFn";

export default {
    loadAsyncRoutes({ commit }){
        return new Promise((resolve) => {
            API.getPermissonMenuList().then(res => {
                const routes = publicFn.gennerateRoutes(res.menuList)
                routes.push({
                    path: '/:pathMatch(.*)*',
                    redirect: '/404',
                    hidden: true
                })
                commit("setRouteList", routes)
                resolve()
            })
        })
    },

    
    
    logout({commit}){
        commit("saveUserInfo", "");
        commit("saveUserMenu", "");
        commit("saveUserBtn", "");
        commit("saveNoticeCount","");
        commit("setRouteList","")
    }
}