import request from './request'
import { mockAppointments, mockSamples } from './mock'

const useMock = true

export const createAppointment = data => {
    if (useMock) {
        const sample = mockSamples.find(s => s.id === data.sampleId)
        const apt = { id: mockAppointments.length + 1, ...data, sampleTitle: sample.title, status: 0 }
        mockAppointments.push(apt)
        return Promise.resolve(apt)
    }
    return request.post('/appointment/create', data)
}

export const listMyAppointments = userId => useMock ? Promise.resolve(mockAppointments.filter(a => a.userId == userId)) : request.get(`/appointment/list/${userId}`)

export const checkin = data => {
    if (useMock) {
        const apt = mockAppointments.find(a => a.id === data.appointmentId)
        if (apt) apt.status = 1
        return Promise.resolve(apt)
    }
    return request.post('/appointment/checkin', data)
}

export const pay = data => {
    if (useMock) {
        const apt = mockAppointments.find(a => a.id === data.appointmentId)
        if (apt) apt.status = 3
        return Promise.resolve(apt)
    }
    return request.post('/appointment/pay', data)
}

export const finish = data => {
    if (useMock) {
        const apt = mockAppointments.find(a => a.id === data.appointmentId)
        if (apt) apt.status = 2
        return Promise.resolve(apt)
    }
    return request.post('/appointment/finish', data)
}
