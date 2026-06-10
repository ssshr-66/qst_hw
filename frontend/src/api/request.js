// 导入 axios HTTP 请求库
import axios from 'axios'
// 导入 Element Plus 的消息提示组件，用于显示错误信息
import { ElMessage } from 'element-plus'

// 创建 axios 实例，配置基础请求参数
const request = axios.create({
    // 设置请求的基础 URL，所有请求都会以 /api 为前缀
    baseURL: '/api',
    // 设置请求超时时间为 5 秒
    timeout: 5000
})

// 添加响应拦截器，统一处理响应数据和错误
request.interceptors.response.use(
    // 响应成功的处理函数
    res => {
        // 解构响应数据中的状态码、消息和数据
        const { code, message, data } = res.data
        // 如果状态码为 200，表示请求成功，直接返回数据部分
        if (code === 200) return data
        // 否则显示错误消息提示
        ElMessage.error(message || '操作失败')
        // 返回一个被拒绝的 Promise，阻止后续处理
        return Promise.reject(message)
    },
    // 响应失败（网络错误、超时等）的处理函数
    err => {
        // 显示错误消息
        ElMessage.error(err.message || '网络错误')
        // 返回被拒绝的 Promise
        return Promise.reject(err)
    }
)

// 导出配置好的 axios 实例
export default request
