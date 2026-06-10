// 导入封装好的 HTTP 请求实例
import request from './request'
// 导入所有模拟数据
import { mockDresses, mockSamples, mockOrders, mockAppointments } from './mock'

// 是否使用模拟数据模式
const useMock = true

// 获取所有礼服列表（管理员）
export const listAllDress = () => useMock ? Promise.resolve(mockDresses) : request.get('/admin/dress/list')

// 新增礼服
export const addDress = data => {
    // 如果是模拟模式
    if (useMock) {
        // 创建新礼服对象，ID 为当前列表长度加1
        const dress = { id: mockDresses.length + 1, ...data }
        // 添加到礼服列表
        mockDresses.push(dress)
        // 返回新礼服信息
        return Promise.resolve(dress)
    }
    // 真实模式下，调用后端新增接口
    return request.post('/admin/dress/add', data)
}

// 修改礼服信息
export const updateDress = data => {
    // 如果是模拟模式
    if (useMock) {
        // 根据ID查找礼服索引
        const index = mockDresses.findIndex(d => d.id === data.id)
        // 如果找到，直接替换该礼服信息
        if (index !== -1) mockDresses[index] = data
        // 返回更新后的礼服数据
        return Promise.resolve(data)
    }
    // 真实模式下，调用后端修改接口
    return request.put('/admin/dress/update', data)
}

// 删除礼服
export const deleteDress = id => {
    // 如果是模拟模式
    if (useMock) {
        // 根据ID查找礼服索引
        const index = mockDresses.findIndex(d => d.id == id)
        // 如果找到，从列表中删除
        if (index !== -1) mockDresses.splice(index, 1)
        // 返回成功
        return Promise.resolve()
    }
    // 真实模式下，调用后端删除接口
    return request.delete(`/admin/dress/delete/${id}`)
}

// 获取所有样衣列表（管理员）
export const listAllSample = () => useMock ? Promise.resolve(mockSamples) : request.get('/admin/sample/list')

// 新增样衣
export const addSample = data => {
    // 如果是模拟模式
    if (useMock) {
        // 创建新样衣对象，ID 自增
        const sample = { id: mockSamples.length + 1, ...data }
        // 添加到样衣列表
        mockSamples.push(sample)
        // 返回新样衣信息
        return Promise.resolve(sample)
    }
    // 真实模式下，调用后端新增接口
    return request.post('/admin/sample/add', data)
}

// 修改样衣信息
export const updateSample = data => {
    // 如果是模拟模式
    if (useMock) {
        // 根据ID查找样衣索引
        const index = mockSamples.findIndex(s => s.id === data.id)
        // 如果找到，直接替换该样衣信息
        if (index !== -1) mockSamples[index] = data
        // 返回更新后的样衣数据
        return Promise.resolve(data)
    }
    // 真实模式下，调用后端修改接口
    return request.put('/admin/sample/update', data)
}

// 删除样衣
export const deleteSample = id => {
    // 如果是模拟模式
    if (useMock) {
        // 根据ID查找样衣索引
        const index = mockSamples.findIndex(s => s.id == id)
        // 如果找到，从列表中删除
        if (index !== -1) mockSamples.splice(index, 1)
        // 返回成功
        return Promise.resolve()
    }
    // 真实模式下，调用后端删除接口
    return request.delete(`/admin/sample/delete/${id}`)
}

// 获取所有订单列表（管理员）
export const listAllOrders = () => useMock ? Promise.resolve(mockOrders) : request.get('/admin/orders')

// 获取所有预约列表（管理员）
export const listAllAppointments = () => useMock ? Promise.resolve(mockAppointments) : request.get('/admin/appointments')
