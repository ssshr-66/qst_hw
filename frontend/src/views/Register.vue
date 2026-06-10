<template>
  <!-- 注册页面容器，使用 flex 布局居中 -->
  <div class="register-container">
    <!-- Element Plus 卡片组件 -->
    <el-card class="register-card">
      <!-- 页面标题 -->
      <h2>用户注册</h2>
      <!-- 注册表单，绑定表单数据 -->
      <el-form :model="form">
        <!-- 用户名输入框 -->
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <!-- 密码输入框，类型为 password 隐藏输入内容 -->
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" />
        </el-form-item>
        <!-- 手机号输入框 -->
        <el-form-item>
          <el-input v-model="form.phone" placeholder="手机号" />
        </el-form-item>
        <!-- 注册按钮，点击触发注册处理函数 -->
        <el-button type="primary" @click="handleRegister" style="width: 100%">注册</el-button>
        <!-- 登录链接区域 -->
        <div style="margin-top: 10px; text-align: center">
          <router-link to="/login">已有账号？立即登录</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式数据函数
import { reactive } from 'vue'
// 导入路由器，用于页面跳转
import { useRouter } from 'vue-router'
// 导入注册接口
import { register } from '@/api/user'
// 导入消息提示组件
import { ElMessage } from 'element-plus'

// 获取路由器实例
const router = useRouter()
// 创建响应式表单数据对象，包含用户名、密码和手机号
const form = reactive({ username: '', password: '', phone: '' })

// 处理注册逻辑的异步函数
const handleRegister = async () => {
  // 验证表单字段是否完整
  if (!form.username || !form.password || !form.phone) {
    // 如果有空字段，显示警告消息并返回
    return ElMessage.warning('请填写完整信息')
  }
  // 调用注册接口，等待注册完成
  await register(form)
  // 显示注册成功提示
  ElMessage.success('注册成功，请登录')
  // 跳转到登录页面
  router.push('/login')
}
</script>

<style scoped>
/* 注册容器样式，使用 flex 布局垂直水平居中 */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
/* 注册卡片宽度 */
.register-card {
  width: 400px;
}
/* 标题样式，居中显示，底部留白 */
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
