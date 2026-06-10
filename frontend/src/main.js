// 从 Vue 3 中导入 createApp 方法，用于创建 Vue 应用实例
import { createApp } from 'vue'
// 导入 Element Plus UI 组件库
import ElementPlus from 'element-plus'
// 导入 Element Plus 的样式文件
import 'element-plus/dist/index.css'
// 导入根组件 App.vue
import App from './App.vue'
// 导入路由配置
import router from './router'

// 创建 Vue 应用实例
createApp(App)
  // 注册路由插件，启用应用的路由功能
  .use(router)
  // 注册 Element Plus 插件，使所有组件可用
  .use(ElementPlus)
  // 将应用挂载到 id 为 app 的 DOM 元素上
  .mount('#app')
