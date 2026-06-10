<template>
  <!-- 路由视图容器，根据当前路由动态渲染对应的组件 -->
  <router-view />
</template>

<script setup>
// 使用 Vue 3 的 Composition API setup 语法
// 当前组件没有额外的逻辑代码
</script>

<style>
/* 全局样式重置 */
* {
  /* 清除默认外边距 */
  margin: 0;
  /* 清除默认内边距 */
  padding: 0;
  /* 设置盒模型为边框盒，padding 和 border 不会增加元素宽度 */
  box-sizing: border-box;
}

/* 应用根容器样式 */
#app {
  /* 设置最小高度为视口高度，确保页面始终填满屏幕 */
  min-height: 100vh;
  /* 设置浅灰色背景 */
  background: #f5f5f5;
}
</style>
