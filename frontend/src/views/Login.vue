<template>
  <!-- 登录页面容器，使用 flex 布局居中 -->
  <div class="login-container">
    <!-- Element Plus 卡片组件 -->
    <el-card class="login-card">
      <!-- 页面标题 -->
      <h2>婚纱影楼管理系统</h2>
      <!-- 登录表单，绑定表单数据，阻止默认提交行为 -->
      <el-form :model="form" @submit.prevent="handleLogin">
        <!-- 用户名输入框 -->
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <!-- 密码输入框，类型为 password 隐藏输入内容 -->
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" />
        </el-form-item>
        <!-- 登录按钮，点击触发登录处理函数 -->
        <el-button type="primary" @click="handleLogin" style="width: 100%">登录</el-button>
        <!-- 注册链接区域 -->
        <div style="margin-top: 10px; text-align: center">
          <router-link to="/register">还没有账号？立即注册</router-link>
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
// 导入登录接口
import { login } from '@/api/user'
// 导入消息提示组件
import { ElMessage } from 'element-plus'

// 获取路由器实例
const router = useRouter()
// 创建响应式表单数据对象
const form = reactive({ username: '', password: '' })

// 处理登录逻辑的异步函数
const handleLogin = async () => {
  // 验证表单字段是否为空
  if (!form.username || !form.password) {
    // 如果为空，显示警告消息并返回
    return ElMessage.warning('请输入用户名和密码')
  }
  // 调用登录接口，等待返回用户信息
  const user = await login(form)
  // 将用户信息存储到浏览器本地存储中
  localStorage.setItem('user', JSON.stringify(user))
  // 显示登录成功提示
  ElMessage.success('登录成功')
  // 根据用户角色跳转到不同页面：管理员跳转到管理后台，普通用户跳转到用户首页
  router.push(user.role === 'ADMIN' ? '/admin/home' : '/user/home')
}
</script>

<style scoped>
/* 登录容器样式，使用 flex 布局垂直水平居中 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
/* 登录卡片宽度 */
.login-card {
  width: 400px;
}
/* 标题样式，居中显示，底部留白 */
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
