// 导入封装好的 HTTP 请求实例
import request from './request'
// 导入模拟用户数据
import { mockUsers } from './mock'

// 是否使用模拟数据模式，true 表示使用本地模拟数据，false 表示调用真实后端接口
const useMock = true

// 用户注册接口
export const register = data => {
  // 如果是模拟模式
  if (useMock) {
    // 创建新用户对象，ID 为当前用户列表长度加1，默认角色为普通用户
    const newUser = { id: mockUsers.length + 1, ...data, role: 'USER' }
    // 将新用户添加到模拟用户列表中
    mockUsers.push(newUser)
    // 返回成功的 Promise，包含新用户信息
    return Promise.resolve(newUser)
  }
  // 真实模式下，调用后端注册接口
  return request.post('/user/register', data)
}

// 用户登录接口
export const login = data => {
  // 如果是模拟模式
  if (useMock) {
    // 在模拟用户列表中查找匹配用户名和密码的用户
    const user = mockUsers.find(u => u.username === data.username && u.password === data.password)
    // 如果找到匹配的用户，返回该用户信息
    if (user) return Promise.resolve(user)
    // 否则返回失败的 Promise，提示错误信息
    return Promise.reject('用户名或密码错误')
  }
  // 真实模式下，调用后端登录接口
  return request.post('/user/login', data)
}
