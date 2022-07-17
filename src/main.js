import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import api from './api'
// import config from './config'
// console.log(config);

const app = createApp(App)

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
