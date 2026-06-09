import request from './request'
import { mockDresses, mockSamples, mockOrders, mockAppointments } from './mock'

const useMock = true

export const listAllDress = () => useMock ? Promise.resolve(mockDresses) : request.get('/admin/dress/list')

export const addDress = data => {
    if (useMock) {
        const dress = { id: mockDresses.length + 1, ...data }
        mockDresses.push(dress)
        return Promise.resolve(dress)
    }
    return request.post('/admin/dress/add', data)
}

export const updateDress = data => {
    if (useMock) {
        const index = mockDresses.findIndex(d => d.id === data.id)
        if (index !== -1) mockDresses[index] = data
        return Promise.resolve(data)
    }
    return request.put('/admin/dress/update', data)
}

export const deleteDress = id => {
    if (useMock) {
        const index = mockDresses.findIndex(d => d.id == id)
        if (index !== -1) mockDresses.splice(index, 1)
        return Promise.resolve()
    }
    return request.delete(`/admin/dress/delete/${id}`)
}

export const listAllSample = () => useMock ? Promise.resolve(mockSamples) : request.get('/admin/sample/list')

export const addSample = data => {
    if (useMock) {
        const sample = { id: mockSamples.length + 1, ...data }
        mockSamples.push(sample)
        return Promise.resolve(sample)
    }
    return request.post('/admin/sample/add', data)
}

export const updateSample = data => {
    if (useMock) {
        const index = mockSamples.findIndex(s => s.id === data.id)
        if (index !== -1) mockSamples[index] = data
        return Promise.resolve(data)
    }
    return request.put('/admin/sample/update', data)
}

export const deleteSample = id => {
    if (useMock) {
        const index = mockSamples.findIndex(s => s.id == id)
        if (index !== -1) mockSamples.splice(index, 1)
        return Promise.resolve()
    }
    return request.delete(`/admin/sample/delete/${id}`)
}

export const listAllOrders = () => useMock ? Promise.resolve(mockOrders) : request.get('/admin/orders')

export const listAllAppointments = () => useMock ? Promise.resolve(mockAppointments) : request.get('/admin/appointments')
