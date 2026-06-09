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
