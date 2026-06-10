// 从 vue-router 导入创建路由器和 HTML5 历史模式的方法
import { createRouter, createWebHistory } from 'vue-router'

// 定义应用的所有路由配置
const routes = [
    // 根路径重定向到登录页面
    { path: '/', redirect: '/login' },
    // 登录页面路由，使用懒加载方式导入组件
    { path: '/login', component: () => import('@/views/Login.vue') },
    // 注册页面路由
    { path: '/register', component: () => import('@/views/Register.vue') },
    // 用户主页路由
    { path: '/user/home', component: () => import('@/views/user/Home.vue') },
    // 礼服列表页面路由
    { path: '/dress/list', component: () => import('@/views/dress/List.vue') },
    // 礼服详情页面路由，:id 为动态参数，用于获取具体礼服的 ID
    { path: '/dress/detail/:id', component: () => import('@/views/dress/Detail.vue') },
    // 用户订单列表页面路由
    { path: '/user/orders', component: () => import('@/views/user/Orders.vue') },
    // 样衣列表页面路由
    { path: '/sample/list', component: () => import('@/views/sample/List.vue') },
    // 样衣详情页面路由，:id 为动态参数
    { path: '/sample/detail/:id', component: () => import('@/views/sample/Detail.vue') },
    // 用户预约列表页面路由
    { path: '/user/appointments', component: () => import('@/views/user/Appointments.vue') },
    // 管理员主页路由
    { path: '/admin/home', component: () => import('@/views/admin/Home.vue') },
    // 管理员礼服管理页面路由
    { path: '/admin/dress', component: () => import('@/views/admin/Dress.vue') },
    // 管理员样衣管理页面路由
    { path: '/admin/sample', component: () => import('@/views/admin/Sample.vue') },
    // 管理员订单管理页面路由
    { path: '/admin/orders', component: () => import('@/views/admin/Orders.vue') },
    // 管理员预约管理页面路由
    { path: '/admin/appointments', component: () => import('@/views/admin/Appointments.vue') }
]

// 创建并导出路由器实例
export default createRouter({
    // 使用 HTML5 的 history 模式，URL 不会包含 # 符号
    history: createWebHistory(),
    // 传入路由配置
    routes
})
