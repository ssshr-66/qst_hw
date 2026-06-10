<template>
  <div class="home-container">
    <el-card>
      <h2>欢迎，{{ user.username }}</h2>
      <el-button @click="logout" type="danger" style="float: right">退出登录</el-button>
      <div style="clear: both; margin-top: 20px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card @click="$router.push('/dress/list')" class="menu-card">
              <h3>浏览婚纱</h3>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card @click="$router.push('/user/orders')" class="menu-card">
              <h3>婚纱订单</h3>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card @click="$router.push('/sample/list')" class="menu-card">
              <h3>浏览样片</h3>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card @click="$router.push('/user/appointments')" class="menu-card">
              <h3>摄影预约</h3>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.home-container {
  padding: 20px;
}
.menu-card {
  cursor: pointer;
  text-align: center;
}
.menu-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
</style>
