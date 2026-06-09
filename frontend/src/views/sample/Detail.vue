<template>
  <div class="sample-detail-container">
    <el-card v-if="sample">
      <el-button @click="$router.back()">返回</el-button>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="12">
          <img :src="sample.imageUrl" style="width: 100%" />
        </el-col>
        <el-col :span="12">
          <h2>{{ sample.title }}</h2>
          <p>{{ sample.description }}</p>
          <p style="color: red; font-size: 24px; font-weight: bold">¥{{ sample.price }}</p>
          <el-form :model="form" style="margin-top: 20px">
            <el-form-item label="预约拍摄时间">
              <el-date-picker v-model="form.appointmentTime" type="datetime" placeholder="选择日期时间" />
            </el-form-item>
            <el-button type="primary" @click="handleAppointment">预约拍摄</el-button>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSample } from '@/api/sample'
import { createAppointment } from '@/api/appointment'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const sample = ref(null)
const form = reactive({ appointmentTime: null })

onMounted(async () => {
  sample.value = await getSample(route.params.id)
})

const handleAppointment = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id) {
    ElMessage.warning('请先登录')
    return router.push('/login')
  }
  if (!form.appointmentTime) {
    return ElMessage.warning('请选择预约时间')
  }
  await createAppointment({ userId: user.id, sampleId: sample.value.id, appointmentTime: form.appointmentTime })
  ElMessage.success('预约成功')
  router.push('/user/appointments')
}
</script>

<style scoped>
.sample-detail-container {
  padding: 20px;
}
</style>
