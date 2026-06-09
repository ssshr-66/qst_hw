// HTTP请求封装
// 功能：
// 1. 创建axios实例，配置baseURL和超时时间
// 2. 响应拦截器：统一处理成功/失败响应
// 3. 错误提示：使用Element Plus的消息组件显示错误
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

request.interceptors.response.use(
    res => {
        const { code, message, data } = res.data
        if (code === 200) return data
        ElMessage.error(message || '操作失败')
        return Promise.reject(message)
    },
    err => {
        ElMessage.error(err.message || '网络错误')
        return Promise.reject(err)
    }
)

export default request
