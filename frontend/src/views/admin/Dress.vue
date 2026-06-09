<template>
  <div class="admin-dress-container">
    <el-card>
      <h2>婚纱管理</h2>
      <el-button @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="showDialog()">添加婚纱</el-button>
      <el-table :data="list" style="margin-top: 20px">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="stock" label="库存" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" @click="showDialog(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑婚纱' : '添加婚纱'">
      <el-form :model="form">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" /></el-form-item>
        <el-form-item label="价格"><el-input-number v-model="form.price" /></el-form-item>
        <el-form-item label="库存"><el-input-number v-model="form.stock" /></el-form-item>
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
import { listAllDress, addDress, updateDress, deleteDress } from '@/api/admin'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const dialogVisible = ref(false)
const form = reactive({ id: null, name: '', description: '', price: 0, stock: 0, imageUrl: '' })

onMounted(async () => { list.value = await listAllDress() })

const showDialog = (row) => {
  if (row) Object.assign(form, row)
  else Object.assign(form, { id: null, name: '', description: '', price: 0, stock: 0, imageUrl: '' })
  dialogVisible.value = true
}

const handleSave = async () => {
  await (form.id ? updateDress(form) : addDress(form))
  ElMessage.success('操作成功')
  dialogVisible.value = false
  list.value = await listAllDress()
}

const handleDelete = async (id) => {
  await ElMessageBox.confirm('确定删除？', '提示')
  await deleteDress(id)
  ElMessage.success('删除成功')
  list.value = await listAllDress()
}
</script>

<style scoped>
.admin-dress-container { padding: 20px; }
</style>
