// 婚纱相关接口
// 功能：
// 1. listDress() - 获取婚纱列表
// 2. getDress(id) - 获取婚纱详情
// 3. createOrder(data) - 购买婚纱，创建订单
// 4. listMyOrders(userId) - 查询用户的订单列表
// 5. returnOrder(data) - 申请退货（修改订单状态和退货原因）
// Mock模式：操作mockDresses和mockOrders数组
// 真实模式：调用后端 /dress/* 接口
import request from './request'
import { mockDresses, mockOrders } from './mock'

const useMock = true

export const listDress = () => useMock ? Promise.resolve(mockDresses) : request.get('/dress/list')

export const getDress = id => useMock ? Promise.resolve(mockDresses.find(d => d.id == id)) : request.get(`/dress/${id}`)

export const createOrder = data => {
    if (useMock) {
        const dress = mockDresses.find(d => d.id === data.dressId)
        const order = { id: mockOrders.length + 1, ...data, dressName: dress.name, price: dress.price, status: 1, returnReason: null }
        mockOrders.push(order)
        return Promise.resolve(order)
    }
    return request.post('/dress/order', data)
}

export const listMyOrders = userId => useMock ? Promise.resolve(mockOrders.filter(o => o.userId == userId)) : request.get(`/dress/orders/${userId}`)

export const returnOrder = data => {
    if (useMock) {
        const order = mockOrders.find(o => o.id === data.orderId)
        if (order) {
            order.status = 2
            order.returnReason = data.returnReason
        }
        return Promise.resolve(order)
    }
    return request.post('/dress/return', data)
}
