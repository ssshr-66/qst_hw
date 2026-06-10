// 导入封装好的 HTTP 请求实例
import request from './request'
// 导入模拟预约数据和样衣数据
import { mockAppointments, mockSamples } from './mock'

// 是否使用模拟数据模式
const useMock = true

// 创建预约接口
export const createAppointment = data => {
    // 如果是模拟模式
    if (useMock) {
        // 根据样衣ID查找对应的样衣信息
        const sample = mockSamples.find(s => s.id === data.sampleId)
        // 创建新预约对象，ID 自增，状态初始为 0（待签到）
        const apt = { id: mockAppointments.length + 1, ...data, sampleTitle: sample.title, status: 0 }
        // 将新预约添加到模拟预约列表
        mockAppointments.push(apt)
        // 返回成功的 Promise
        return Promise.resolve(apt)
    }
    // 真实模式下，调用后端创建预约接口
    return request.post('/appointment/create', data)
}

// 获取用户的预约列表，根据用户ID筛选
export const listMyAppointments = userId => useMock ? Promise.resolve(mockAppointments.filter(a => a.userId == userId)) : request.get(`/appointment/list/${userId}`)

// 管理员接口：查看所有预约
export const listAllAppointments = () => useMock ? Promise.resolve(mockAppointments) : request.get('/admin/appointment/list')

// 用户签到接口
export const checkin = data => {
    // 如果是模拟模式
    if (useMock) {
        // 根据预约ID查找对应的预约
        const apt = mockAppointments.find(a => a.id === data.appointmentId)
        // 如果找到预约，将状态改为 1（已签到）
        if (apt) apt.status = 1
        // 返回更新后的预约信息
        return Promise.resolve(apt)
    }
    // 真实模式下，调用后端签到接口
    return request.post('/appointment/checkin', data)
}

// 用户支付接口
export const pay = data => {
    // 如果是模拟模式
    if (useMock) {
        // 查找对应的预约
        const apt = mockAppointments.find(a => a.id === data.appointmentId)
        // 将状态改为 3（已支付）
        if (apt) apt.status = 3
        // 返回更新后的预约信息
        return Promise.resolve(apt)
    }
    // 真实模式下，调用后端支付接口
    return request.post('/appointment/pay', data)
}

// 管理员接口：完成试穿
export const finish = data => {
    // 如果是模拟模式
    if (useMock) {
        // 查找对应的预约
        const apt = mockAppointments.find(a => a.id === data.appointmentId)
        // 将状态改为 2（已完成）
        if (apt) apt.status = 2
        // 返回更新后的预约信息
        return Promise.resolve(apt)
    }
    // 真实模式下，调用后端完成接口
    return request.post('/appointment/finish', data)
}
