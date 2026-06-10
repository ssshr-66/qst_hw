<template>
  <!-- 预约列表页面容器 -->
  <div class="appointments-container">
    <el-card>
      <!-- 页面标题 -->
      <h2>摄影预约</h2>
      <!-- 返回按钮 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 预约表格，绑定预约数据 -->
      <el-table :data="appointments" style="margin-top: 20px">
        <!-- 样片标题列 -->
        <el-table-column prop="sampleTitle" label="样片标题" />
        <!-- 预约时间列 -->
        <el-table-column prop="appointmentTime" label="预约时间" />
        <!-- 状态列，使用自定义模板 -->
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <!-- 根据状态值显示不同颜色和文本的标签 -->
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <!-- 状态为0（已预约）时显示到店报道按钮 -->
            <el-button v-if="row.status === 0" type="primary" size="small" @click="handleCheckin(row)">
              到店报道
            </el-button>
            <!-- 状态为2（已拍摄完成）时显示取片支付按钮 -->
            <el-button v-if="row.status === 2" type="success" size="small" @click="handlePay(row)">
              取片支付
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式和生命周期钩子
import { ref, onMounted } from 'vue'
// 导入预约相关的 API 接口
import { listMyAppointments, checkin, pay } from '@/api/appointment'
// 导入消息提示组件
import { ElMessage } from 'element-plus'

// 创建预约列表的响应式引用
const appointments = ref([])
// 从本地存储获取当前登录用户信息
const user = JSON.parse(localStorage.getItem('user') || '{}')

// 状态映射表：0-已预约，1-已报道，2-已拍摄完成，3-已支付待取片
const statusMap = { 0: '已预约', 1: '已报道', 2: '已拍摄完成', 3: '已支付待取片' }
// 根据状态码获取状态文本
const getStatusText = status => statusMap[status]
// 根据状态码获取标签颜色类型：默认、警告、成功、信息
const getStatusType = status => ['', 'warning', 'success', 'info'][status]

// 组件挂载时加载用户的预约列表
onMounted(async () => {
  appointments.value = await listMyAppointments(user.id)
})

// 处理到店报道操作
const handleCheckin = async (row) => {
  // 调用签到接口，传入预约ID和用户ID
  await checkin({ appointmentId: row.id, userId: user.id })
  // 显示成功提示
  ElMessage.success('报道成功')
  // 重新加载预约列表以显示最新状态
  appointments.value = await listMyAppointments(user.id)
}

// 处理取片支付操作
const handlePay = async (row) => {
  // 调用支付接口，传入预约ID和用户ID
  await pay({ appointmentId: row.id, userId: user.id })
  // 显示成功提示
  ElMessage.success('支付成功，等待取片')
  // 重新加载预约列表以显示最新状态
  appointments.value = await listMyAppointments(user.id)
}
</script>

<style scoped>
/* 预约容器内边距 */
.appointments-container {
  padding: 20px;
}
</style>
