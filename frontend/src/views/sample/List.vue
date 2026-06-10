<template>
  <!-- 样片列表页面容器 -->
  <div class="sample-list-container">
    <el-card>
      <!-- 页面标题 -->
      <h2>样片列表</h2>
      <!-- 返回按钮 -->
      <el-button @click="$router.back()">返回</el-button>
      <!-- 栅格布局，列间距20px -->
      <el-row :gutter="20" style="margin-top: 20px">
        <!-- 遍历样片列表，每个样片占6列 -->
        <el-col :span="6" v-for="sample in list" :key="sample.id">
          <!-- 样片卡片，点击跳转到详情页 -->
          <el-card @click="$router.push(`/sample/detail/${sample.id}`)" class="sample-card">
            <!-- 样片图片，宽度100% -->
            <img :src="sample.imageUrl" style="width: 100%" />
            <!-- 样片标题 -->
            <h3>{{ sample.title }}</h3>
            <!-- 样片描述 -->
            <p>{{ sample.description }}</p>
            <!-- 样片价格，红色加粗显示 -->
            <p style="color: red; font-weight: bold">¥{{ sample.price }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式和生命周期钩子
import { ref, onMounted } from 'vue'
// 导入获取样片列表的 API 接口
import { listSample } from '@/api/sample'

// 创建样片列表的响应式引用
const list = ref([])

// 组件挂载时加载样片列表数据
onMounted(async () => {
  list.value = await listSample()
})
</script>

<style scoped>
/* 列表容器内边距 */
.sample-list-container {
  padding: 20px;
}
/* 样片卡片样式，鼠标指针变为手型，底部留白 */
.sample-card {
  cursor: pointer;
  margin-bottom: 20px;
}
/* 样片卡片悬停效果，增强阴影 */
.sample-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}
</style>
