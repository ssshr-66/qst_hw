<template>
  <div class="admin-sample-container">
    <el-card>
      <h2>样片管理</h2>
      <el-button @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="showDialog()">添加样片</el-button>
      <el-table :data="list" style="margin-top: 20px">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="price" label="价格" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" @click="showDialog(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑样片' : '添加样片'">
      <el-form :model="form">
        <el-form-item label="标题"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" /></el-form-item>
        <el-form-item label="价格"><el-input-number v-model="form.price" /></el-form-item>
        <el-form-item label="图片URL"><el-input v-model="form.imageUrl" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { listAllSample, addSample, updateSample, deleteSample } from '@/api/admin'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const dialogVisible = ref(false)
const form = reactive({ id: null, title: '', description: '', price: 0, imageUrl: '' })

onMounted(async () => { list.value = await listAllSample() })

const showDialog = (row) => {
  if (row) Object.assign(form, row)
  else Object.assign(form, { id: null, title: '', description: '', price: 0, imageUrl: '' })
  dialogVisible.value = true
}

const handleSave = async () => {
  await (form.id ? updateSample(form) : addSample(form))
  ElMessage.success('操作成功')
  dialogVisible.value = false
  list.value = await listAllSample()
}

const handleDelete = async (id) => {
  await ElMessageBox.confirm('确定删除？', '提示')
  await deleteSample(id)
  ElMessage.success('删除成功')
  list.value = await listAllSample()
}
</script>

<style scoped>
.admin-sample-container { padding: 20px; }
</style>
