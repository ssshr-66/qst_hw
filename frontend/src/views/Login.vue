<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>婚纱影楼管理系统</h2>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" />
        </el-form-item>
        <el-button type="primary" @click="handleLogin" style="width: 100%">登录</el-button>
        <div style="margin-top: 10px; text-align: center">
          <router-link to="/register">还没有账号？立即注册</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const form = reactive({ username: '', password: '' })

const handleLogin = async () => {
  if (!form.username || !form.password) {
    return ElMessage.warning('请输入用户名和密码')
  }
  const user = await login(form)
  localStorage.setItem('user', JSON.stringify(user))
  ElMessage.success('登录成功')
  router.push(user.role === 'ADMIN' ? '/admin/home' : '/user/home')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.login-card {
  width: 400px;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
