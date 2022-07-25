import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import('../views/Home')
const Welcome = () => import('../views/Welcome')
const Login = () => import('../views/Login')
const Users = () => import('../views/Users')
const Menu = () => import('../views/Menu.vue')
const Dept = () => import('../views/Dept.vue')
const Roles = () => import('../views/Roles.vue')
const Page404 = () => import('../views/404.vue')

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
            {
                path:'/system/roles',
                name:'Roles',
                component: Roles,
                meta:{
                    title:'角色管理'
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
    },
    {
        name: '404',
        path: '/404',
        meta: {
            title: '页面不存在'
        },
        component: Page404,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

// 判断当前地址是否有权访问，拦截的请求路径是否包含在动态路由里
function checkPermission(path){
    return router.getRoutes().filter((route) => route.path === path).length
}
// 导航守卫
// to: 即将要进入的目标，from: 当前导航正要离开的路由
router.beforeEach((to,from,next) => {
    if(checkPermission(to.path)){
        // 设置网页 title
        document.title = to.meta.title
        next()
    }else{
        next('/404')
    }
})
export default router