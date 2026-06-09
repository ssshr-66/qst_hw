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
