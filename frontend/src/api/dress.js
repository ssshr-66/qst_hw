// 导入封装好的 HTTP 请求实例
import request from './request'
// 导入模拟礼服数据和订单数据
import { mockDresses, mockOrders } from './mock'

// 是否使用模拟数据模式
const useMock = true

// 获取礼服列表
export const listDress = () => useMock ? Promise.resolve(mockDresses) : request.get('/dress/list')

// 根据ID获取单个礼服详情
export const getDress = id => useMock ? Promise.resolve(mockDresses.find(d => d.id == id)) : request.get(`/dress/${id}`)

// 创建订单接口
export const createOrder = data => {
    // 如果是模拟模式
    if (useMock) {
        // 根据礼服ID查找对应的礼服信息
        const dress = mockDresses.find(d => d.id === data.dressId)
        // 创建新订单，包含礼服名称、价格、状态为1（待处理）、退货原因为空
        const order = { id: mockOrders.length + 1, ...data, dressName: dress.name, price: dress.price, status: 1, returnReason: null }
        // 将新订单添加到模拟订单列表
        mockOrders.push(order)
        // 返回新创建的订单
        return Promise.resolve(order)
    }
    // 真实模式下，调用后端创建订单接口
    return request.post('/dress/order', data)
}

// 获取用户的订单列表，根据用户ID筛选
export const listMyOrders = userId => useMock ? Promise.resolve(mockOrders.filter(o => o.userId == userId)) : request.get(`/dress/orders/${userId}`)

// 退货接口
export const returnOrder = data => {
    // 如果是模拟模式
    if (useMock) {
        // 根据订单ID查找对应的订单
        const order = mockOrders.find(o => o.id === data.orderId)
        // 如果找到订单
        if (order) {
            // 将订单状态改为2（已退货）
            order.status = 2
            // 记录退货原因
            order.returnReason = data.returnReason
        }
        // 返回更新后的订单信息
        return Promise.resolve(order)
    }
    // 真实模式下，调用后端退货接口
    return request.post('/dress/return', data)
}

// 管理员接口：新增礼服
export const addDress = data => {
    // 如果是模拟模式
    if (useMock) {
        // 创建新礼服对象，ID 自增
        const newDress = { id: mockDresses.length + 1, ...data }
        // 添加到礼服列表
        mockDresses.push(newDress)
        // 返回新礼服信息
        return Promise.resolve(newDress)
    }
    // 真实模式下，调用后端新增接口
    return request.post('/admin/dress', data)
}

// 管理员接口：修改礼服信息
export const updateDress = data => {
    // 如果是模拟模式
    if (useMock) {
        // 查找要修改的礼服索引
        const index = mockDresses.findIndex(d => d.id === data.id)
        // 如果找到礼服
        if (index !== -1) {
            // 更新礼服信息，保留原有属性并覆盖新属性
            mockDresses[index] = { ...mockDresses[index], ...data }
            // 返回更新后的礼服信息
            return Promise.resolve(mockDresses[index])
        }
        // 如果没找到，返回失败信息
        return Promise.reject('婚纱不存在')
    }
    // 真实模式下，调用后端修改接口
    return request.put('/admin/dress', data)
}

// 管理员接口：删除礼服
export const deleteDress = id => {
    // 如果是模拟模式
    if (useMock) {
        // 查找要删除的礼服索引
        const index = mockDresses.findIndex(d => d.id === id)
        // 如果找到礼服
        if (index !== -1) {
            // 从列表中删除该礼服
            mockDresses.splice(index, 1)
            // 返回成功
            return Promise.resolve()
        }
        // 如果没找到，返回失败信息
        return Promise.reject('婚纱不存在')
    }
    // 真实模式下，调用后端删除接口
    return request.delete(`/admin/dress/${id}`)
}
