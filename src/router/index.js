import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import('../views/Home')
const Welcome = () => import('../views/Welcome')
const Login = () => import('../views/Login')
const Users = () => import('../views/Users')

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
                name: 'user',
                path: '/user',
                meta: {
                    title: '用户管理'
                },
                component: Users,
            },
        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: Login,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router