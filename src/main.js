import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

// import config from './config'
// console.log(config);

const app = createApp(App)

// 挂载路由，全局引入 ElementPlus
app.use(router).use(ElementPlus)

// 挂载根实例
app.mount('#app')
