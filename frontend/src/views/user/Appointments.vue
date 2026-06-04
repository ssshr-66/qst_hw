<template>
  <!-- 我的预约页（用户端） -->
  <!-- 功能：
       1. 页面加载时调用listMyAppointments(userId)获取当前用户的预约列表
       2. 用表格展示预约信息（样片标题、预约时间、状态）
       3. 预约状态：已预约(0)、已报道(1)、已拍摄完成(2)、已支付待取片(3)
       4. 操作按钮：
          - 状态为"已预约"时显示"到店报道"按钮 → 调用checkin()
          - 状态为"已拍摄完成"时显示"取片支付"按钮 → 调用pay()
       5. 操作成功后刷新列表
       6. 提供返回按钮
  -->
</template>

<script setup>
// 导入Vue、预约列表和操作接口、消息提示
// 从localStorage获取用户信息
// 定义响应式数据appointments存储预约列表
// 定义状态文本和颜色映射
// onMounted钩子中加载预约列表
// 实现handleCheckin方法：到店报道、刷新列表
// 实现handlePay方法：取片支付、刷新列表
</script>

<style scoped>
/* 预约页布局样式 */
</style>