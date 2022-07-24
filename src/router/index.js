import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import('../views/Home')
const Welcome = () => import('../views/Welcome')
const Login = () => import('../views/Login')
const Users = () => import('../views/Users')
const Menu = () => import('../views/Menu.vue')
const Dept = () => import('../views/Dept.vue')

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
                path: '/system/users',
                meta: {
                    title: '用户管理'
                },
                component: Users,
            },
            {
                path:'/system/menu',
                name:'Menu',
                component: Menu,
                meta:{
                    title:'菜单管理'
                }
            },
            {
                path:'/system/dept',
                name:'Dept',
                component: Dept,
                meta:{
                    title:'部门管理'
                }
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