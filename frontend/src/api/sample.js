// 导入封装好的 HTTP 请求实例
import request from './request'
// 导入模拟样片数据
import { mockSamples } from './mock'

// 是否使用模拟数据模式
const useMock = true

// 获取样片套餐列表
export const listSample = () => useMock ? Promise.resolve(mockSamples) : request.get('/sample/list')

// 根据ID获取样片套餐详情
export const getSample = id => useMock ? Promise.resolve(mockSamples.find(s => s.id == id)) : request.get(`/sample/${id}`)

// 管理员接口：新增样片套餐
export const addSample = data => {
    // 如果是模拟模式
    if (useMock) {
        // 创建新样片对象，ID 自增
        const newSample = { id: mockSamples.length + 1, ...data }
        // 添加到样片列表
        mockSamples.push(newSample)
        // 返回新样片信息
        return Promise.resolve(newSample)
    }
    // 真实模式下，调用后端新增接口
    return request.post('/admin/sample', data)
}

// 管理员接口：修改样片套餐信息
export const updateSample = data => {
    // 如果是模拟模式
    if (useMock) {
        // 查找要修改的样片索引
        const index = mockSamples.findIndex(s => s.id === data.id)
        // 如果找到样片
        if (index !== -1) {
            // 更新样片信息，保留原有属性并覆盖新属性
            mockSamples[index] = { ...mockSamples[index], ...data }
            // 返回更新后的样片信息
            return Promise.resolve(mockSamples[index])
        }
        // 如果没找到，返回失败信息
        return Promise.reject('样片不存在')
    }
    // 真实模式下，调用后端修改接口
    return request.put('/admin/sample', data)
}

// 管理员接口：删除样片套餐
export const deleteSample = id => {
    // 如果是模拟模式
    if (useMock) {
        // 查找要删除的样片索引
        const index = mockSamples.findIndex(s => s.id === id)
        // 如果找到样片
        if (index !== -1) {
            // 从列表中删除该样片
            mockSamples.splice(index, 1)
            // 返回成功
            return Promise.resolve()
        }
        // 如果没找到，返回失败信息
        return Promise.reject('样片不存在')
    }
    // 真实模式下，调用后端删除接口
    return request.delete(`/admin/sample/${id}`)
}
