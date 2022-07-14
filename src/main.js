import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App)

// 安装路由
app.use(router).use(ElementPlus)

// 挂载根实例
app.mount('#app')
