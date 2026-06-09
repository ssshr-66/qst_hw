<template>
  <div class="sample-list-container">
    <el-card>
      <h2>样片列表</h2>
      <el-button @click="$router.back()">返回</el-button>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="6" v-for="sample in list" :key="sample.id">
          <el-card @click="$router.push(`/sample/detail/${sample.id}`)" class="sample-card">
            <img :src="sample.imageUrl" style="width: 100%" />
            <h3>{{ sample.title }}</h3>
            <p>{{ sample.description }}</p>
            <p style="color: red; font-weight: bold">¥{{ sample.price }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listSample } from '@/api/sample'

const list = ref([])

onMounted(async () => {
  list.value = await listSample()
})
</script>

<style scoped>
.sample-list-container {
  padding: 20px;
}
.sample-card {
  cursor: pointer;
  margin-bottom: 20px;
}
.sample-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
</style>
