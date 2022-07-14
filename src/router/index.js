import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import('../components/Home')
const Welcome = () => import('../components/Welcome')
const Login = () => import('../components/Login')
const routes = [
    {
        name: 'home',
        path: '/',
        redirect: '/welcome',
        meta: {
            title: '首页'
        },
        component: Home,
        // 子路由，仍然是在首页展示的
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                meta: {
                    title: '欢迎页'
                },
                component: Welcome,
            },
            {
                name: 'login',
                path: '/login',
                meta: {
                    title: '登录页'
                },
                component: Login,
            },
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router