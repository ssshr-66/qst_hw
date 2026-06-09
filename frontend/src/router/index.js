import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/Login.vue') },
    { path: '/register', component: () => import('@/views/Register.vue') },
    { path: '/user/home', component: () => import('@/views/user/Home.vue') },
    { path: '/dress/list', component: () => import('@/views/dress/List.vue') },
    { path: '/dress/detail/:id', component: () => import('@/views/dress/Detail.vue') },
    { path: '/user/orders', component: () => import('@/views/user/Orders.vue') },
    { path: '/sample/list', component: () => import('@/views/sample/List.vue') },
    { path: '/sample/detail/:id', component: () => import('@/views/sample/Detail.vue') },
    { path: '/user/appointments', component: () => import('@/views/user/Appointments.vue') },
    { path: '/admin/home', component: () => import('@/views/admin/Home.vue') },
    { path: '/admin/dress', component: () => import('@/views/admin/Dress.vue') },
    { path: '/admin/sample', component: () => import('@/views/admin/Sample.vue') },
    { path: '/admin/orders', component: () => import('@/views/admin/Orders.vue') },
    { path: '/admin/appointments', component: () => import('@/views/admin/Appointments.vue') }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
