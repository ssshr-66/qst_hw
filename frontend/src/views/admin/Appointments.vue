<template>
  <div class="admin-appointments-container">
    <el-card>
      <h2>预约管理</h2>
      <el-button @click="$router.back()">返回</el-button>
      <el-table :data="appointments" style="margin-top: 20px">
        <el-table-column prop="userName" label="用户" />
        <el-table-column prop="sampleTitle" label="样片标题" />
        <el-table-column prop="appointmentTime" label="预约时间" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="['', 'warning', 'success', 'info'][row.status]">
              {{ ['已预约', '已报道', '已拍摄完成', '已支付待取片'][row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
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
import { ref, onMounted } from 'vue'
import { listAllAppointments } from '@/api/admin'
import { finish } from '@/api/appointment'
import { ElMessage } from 'element-plus'

const appointments = ref([])

onMounted(async () => {
  appointments.value = await listAllAppointments()
})

const handleFinish = async (row) => {
  await finish({ appointmentId: row.id })
  ElMessage.success('拍摄完成确认成功')
  appointments.value = await listAllAppointments()
}
</script>

<style scoped>
.admin-appointments-container {
  padding: 20px;
}
</style>
