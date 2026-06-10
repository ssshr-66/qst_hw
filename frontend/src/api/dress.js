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

// 管理员：新增婚纱
export const addDress = data => {
    if (useMock) {
        const newDress = { id: mockDresses.length + 1, ...data }
        mockDresses.push(newDress)
        return Promise.resolve(newDress)
    }
    return request.post('/admin/dress', data)
}

// 管理员：修改婚纱
export const updateDress = data => {
    if (useMock) {
        const index = mockDresses.findIndex(d => d.id === data.id)
        if (index !== -1) {
            mockDresses[index] = { ...mockDresses[index], ...data }
            return Promise.resolve(mockDresses[index])
        }
        return Promise.reject('婚纱不存在')
    }
    return request.put('/admin/dress', data)
}

// 管理员：删除婚纱
export const deleteDress = id => {
    if (useMock) {
        const index = mockDresses.findIndex(d => d.id === id)
        if (index !== -1) {
            mockDresses.splice(index, 1)
            return Promise.resolve()
        }
        return Promise.reject('婚纱不存在')
    }
    return request.delete(`/admin/dress/${id}`)
}
