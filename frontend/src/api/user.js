// 用户相关接口
// 功能：
// 1. register(data) - 用户注册
// 2. login(data) - 用户登录（验证用户名密码）
// Mock模式：从mockUsers中查找匹配的用户
// 真实模式：调用后端 /user/register 和 /user/login 接口import request from './request'
import { mockUsers } from './mock'

// Mock 模式
const useMock = true

export const register = data => {
  if (useMock) {
    const newUser = { id: mockUsers.length + 1, ...data, role: 'USER' }
    mockUsers.push(newUser)
    return Promise.resolve(newUser)
  }
  return request.post('/user/register', data)
}

export const login = data => {
  if (useMock) {
    const user = mockUsers.find(u => u.username === data.username && u.password === data.password)
    if (user) return Promise.resolve(user)
    return Promise.reject('用户名或密码错误')
  }
  return request.post('/user/login', data)
}
