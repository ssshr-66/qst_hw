<template>
  <!-- 预约管理页面容器 -->
  <div class="admin-appointments-container">
    <el-card>
      <!-- 页面标题 -->
      <h2>预约管理</h2>
      <!-- 返回按钮 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 预约列表表格 -->
      <el-table :data="appointments" style="margin-top: 20px">
        <!-- 用户列 -->
        <el-table-column prop="userName" label="用户" />
        <!-- 样片标题列 -->
        <el-table-column prop="sampleTitle" label="样片标题" />
        <!-- 预约时间列 -->
        <el-table-column prop="appointmentTime" label="预约时间" />
        <!-- 状态列，使用自定义模板 -->
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <!-- 根据状态值显示不同颜色和文本的标签，使用数组索引获取对应的值 -->
            <el-tag :type="['', 'warning', 'success', 'info'][row.status]">
              {{ ['已预约', '已报道', '已拍摄完成', '已支付待取片'][row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <!-- 状态为1（已报道）时显示确认拍摄完成按钮 -->
            <el-button v-if="row.status === 1" type="success" size="small" @click="handleFinish(row)">
              确认拍摄完成
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
// 导入获取所有预约的 API 接口
import { listAllAppointments } from '@/api/admin'
// 导入完成拍摄的 API 接口
import { finish } from '@/api/appointment'
// 导入消息提示组件
import { ElMessage } from 'element-plus'

// 创建预约列表的响应式引用
const appointments = ref([])

// 组件挂载时加载所有预约数据
onMounted(async () => {
  appointments.value = await listAllAppointments()
})

// 处理确认拍摄完成操作
const handleFinish = async (row) => {
  // 调用完成接口，传入预约ID
  await finish({ appointmentId: row.id })
  // 显示成功提示
  ElMessage.success('拍摄完成确认成功')
  // 重新加载预约列表以显示最新状态
  appointments.value = await listAllAppointments()
}
</script>

<style scoped>
/* 预约管理容器内边距 */
.admin-appointments-container {
  padding: 20px;
}
</style>
