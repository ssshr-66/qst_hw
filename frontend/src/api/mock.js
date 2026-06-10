// Mock 数据定义
// 用于前端独立演示，无需后端支持

// 用户数据（管理员 + 普通用户）
export const mockUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'ADMIN', phone: '13800000001' },
  { id: 2, username: 'zhangsan', password: '123456', role: 'USER', phone: '13800000002' }
]

// 婚纱数据
export const mockDresses = [
  { id: 1, name: '白色公主婚纱', style: '公主风', size: 'M', price: 999, imageUrl: 'https://picsum.photos/300/400?random=1', stock: 10, description: '经典白色公主风婚纱' },
  { id: 2, name: '粉色梦幻婚纱', style: '甜美风', size: 'S', price: 1299, imageUrl: 'https://picsum.photos/300/400?random=2', stock: 5, description: '粉色梦幻甜美风格' },
  { id: 3, name: '红色中式婚纱', style: '中式风', size: 'L', price: 1599, imageUrl: 'https://picsum.photos/300/400?random=3', stock: 8, description: '传统中式红色婚纱' },
  { id: 4, name: '香槟色简约婚纱', style: '简约风', size: 'M', price: 1199, imageUrl: 'https://picsum.photos/300/400?random=4', stock: 12, description: '简约优雅香槟色' }
]

// 样片数据
export const mockSamples = [
  { id: 1, title: '海边浪漫套餐', style: '浪漫风', price: 2999, imageUrl: 'https://picsum.photos/400/300?random=5', description: '海边拍摄，浪漫唯美' },
  { id: 2, title: '森林清新套餐', style: '清新风', price: 3599, imageUrl: 'https://picsum.photos/400/300?random=6', description: '森林系清新风格' },
  { id: 3, title: '古风国风套餐', style: '古风', price: 3999, imageUrl: 'https://picsum.photos/400/300?random=7', description: '中式古风拍摄' },
  { id: 4, title: '都市时尚套餐', style: '时尚风', price: 3299, imageUrl: 'https://picsum.photos/400/300?random=8', description: '都市街拍时尚风格' }
]

// 婚纱订单数据
export const mockOrders = []

// 预约数据
export const mockAppointments = []
