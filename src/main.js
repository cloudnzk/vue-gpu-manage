import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import api from './api'
import storage from './utils/storage'
// import config from './config'
// console.log(config);

const app = createApp(App)

// 自定义指令
// 第一个参数是指令的名称，Vue 会自动在前面加上 'v-'，所以使用时也要带上 'v-' 前缀
// 第二个参数是一个钩子函数，例如 beforeMount，指令绑定到元素后调用。只调用一次。
app.directive('permisson',{
    // el 是使用自定义指令的那个 DOM 对象
    // binding 是指令属性的名称
    beforeMount(el, binding, vnode) {
      // 获取按钮权限
      const btnList = storage.getItem("btnList")
      const value = binding.value
      // 判断列表中是否有对应按钮权限标识
      const hasPermisson = btnList.includes(value)
      if(!hasPermisson){
        // 先隐藏掉再销毁
        el.style = "display:none"
        // 这里不能直接删除，因为 beforeMount 钩子函数，虚拟 DOM 未挂载到真实 DOM上
        // 解决方法：变成一个宏任务，可以在下一次 DOM 更新后执行
        setTimeout(() => {
            el.parentNode.removeChild(el)
        }, 0)
      }
    }
})

// 挂载路由，全局引入 ElementPlus
app.use(router).use(store).use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 全局挂载 api 模块
// globalProperties 定义全局属性值
app.config.globalProperties.$api = api

// 挂载根实例
app.mount('#app')
