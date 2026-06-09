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
