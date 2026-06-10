// 样片套餐相关接口
// 功能：
// 1. listSample() - 获取样片套餐列表
// 2. getSample(id) - 获取样片套餐详情
// Mock模式：从mockSamples中查询
// 真实模式：调用后端 /sample/* 接口
import request from './request'
import { mockSamples } from './mock'

const useMock = true

export const listSample = () => useMock ? Promise.resolve(mockSamples) : request.get('/sample/list')

export const getSample = id => useMock ? Promise.resolve(mockSamples.find(s => s.id == id)) : request.get(`/sample/${id}`)

// 管理员：新增样片
export const addSample = data => {
    if (useMock) {
        const newSample = { id: mockSamples.length + 1, ...data }
        mockSamples.push(newSample)
        return Promise.resolve(newSample)
    }
    return request.post('/admin/sample', data)
}

// 管理员：修改样片
export const updateSample = data => {
    if (useMock) {
        const index = mockSamples.findIndex(s => s.id === data.id)
        if (index !== -1) {
            mockSamples[index] = { ...mockSamples[index], ...data }
            return Promise.resolve(mockSamples[index])
        }
        return Promise.reject('样片不存在')
    }
    return request.put('/admin/sample', data)
}

// 管理员：删除样片
export const deleteSample = id => {
    if (useMock) {
        const index = mockSamples.findIndex(s => s.id === id)
        if (index !== -1) {
            mockSamples.splice(index, 1)
            return Promise.resolve()
        }
        return Promise.reject('样片不存在')
    }
    return request.delete(`/admin/sample/${id}`)
}
