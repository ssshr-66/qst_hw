<template>
  <div class="appointments-container">
    <el-card>
      <h2>我的预约</h2>
      <el-button @click="$router.back()">返回</el-button>
      <el-table :data="appointments" style="margin-top: 20px">
        <el-table-column prop="sampleTitle" label="样片标题" />
        <el-table-column prop="appointmentTime" label="预约时间" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button v-if="row.status === 0" type="primary" size="small" @click="handleCheckin(row)">
              到店报道
            </el-button>
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
import { ref, onMounted } from 'vue'
import { listMyAppointments, checkin, pay } from '@/api/appointment'
import { ElMessage } from 'element-plus'

const appointments = ref([])
const user = JSON.parse(localStorage.getItem('user') || '{}')

const statusMap = { 0: '已预约', 1: '已报道', 2: '已拍摄完成', 3: '已支付待取片' }
const getStatusText = status => statusMap[status]
const getStatusType = status => ['', 'warning', 'success', 'info'][status]

onMounted(async () => {
  appointments.value = await listMyAppointments(user.id)
})

const handleCheckin = async (row) => {
  await checkin({ appointmentId: row.id, userId: user.id })
  ElMessage.success('报道成功')
  appointments.value = await listMyAppointments(user.id)
}

const handlePay = async (row) => {
  await pay({ appointmentId: row.id, userId: user.id })
  ElMessage.success('支付成功，等待取片')
  appointments.value = await listMyAppointments(user.id)
}
</script>

<style scoped>
.appointments-container {
  padding: 20px;
}
</style>
