<template>
  <!-- 样片详情页面容器 -->
  <div class="sample-detail-container">
    <!-- 只有当样片数据加载完成后才显示卡片 -->
    <el-card v-if="sample">
      <!-- 返回按钮 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 栅格布局，列间距20px -->
      <el-row :gutter="20" style="margin-top: 20px">
        <!-- 左侧列，占12列，显示样片图片 -->
        <el-col :span="12">
          <img :src="sample.imageUrl" style="width: 100%" />
        </el-col>
        <!-- 右侧列，占12列，显示样片详细信息和预约表单 -->
        <el-col :span="12">
          <!-- 样片标题 -->
          <h2>{{ sample.title }}</h2>
          <!-- 样片描述 -->
          <p>{{ sample.description }}</p>
          <!-- 样片价格，红色大号加粗显示 -->
          <p style="color: red; font-size: 24px; font-weight: bold">¥{{ sample.price }}</p>
          <!-- 预约表单，绑定表单数据 -->
          <el-form :model="form" style="margin-top: 20px">
            <!-- 预约时间选择器 -->
            <el-form-item label="预约拍摄时间">
              <el-date-picker v-model="form.appointmentTime" type="datetime" placeholder="选择日期时间" />
            </el-form-item>
            <!-- 预约拍摄按钮 -->
            <el-button type="primary" @click="handleAppointment">预约拍摄</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式、reactive 和生命周期钩子
import { ref, reactive, onMounted } from 'vue'
// 导入路由相关函数
import { useRoute, useRouter } from 'vue-router'
// 导入样片相关的 API 接口
import { getSample } from '@/api/sample'
// 导入预约相关的 API 接口
import { createAppointment } from '@/api/appointment'
// 导入消息提示组件
import { ElMessage } from 'element-plus'

// 获取当前路由信息，用于获取样片ID
const route = useRoute()
// 获取路由器实例，用于页面跳转
const router = useRouter()
// 创建样片详情的响应式引用
const sample = ref(null)
// 创建预约表单的响应式对象
const form = reactive({ appointmentTime: null })

// 组件挂载时根据路由参数加载样片详情
onMounted(async () => {
  sample.value = await getSample(route.params.id)
})

// 处理预约操作
const handleAppointment = async () => {
  // 从本地存储获取当前登录用户信息
  const user = JSON.parse(localStorage.getItem('user') || '')
  // 如果用户未登录，提示并跳转到登录页
  if (!user.id) {
    ElMessage.warning('请先登录')
    return router.push('/login')
  }
  // 验证是否选择了预约时间
  if (!form.appointmentTime) {
    return ElMessage.warning('请选择预约时间')
  }
  // 调用创建预约接口
  await createAppointment({ userId: user.id, sampleId: sample.value.id, appointmentTime: form.appointmentTime })
  // 显示预约成功提示
  ElMessage.success('预约成功')
  // 跳转到预约列表页面
  router.push('/user/appointments')
}
</script>

<style scoped>
/* 详情容器内边距 */
.sample-detail-container {
  padding: 20px;
}
</style>
