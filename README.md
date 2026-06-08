# 婚纱影楼管理系统

青软实训-移动开发大作业

## 技术栈

**后端**：Spring Boot 2.7.18 + MyBatis-Plus 3.5.5 + MySQL 8  
**前端**：Vue 3 + Vite + Vue Router + Axios + Element Plus

## 项目结构

```
qst_hw/
├── backend/          # 后端代码
│   ├── src/          # Java源码
│   └── sql/          # 数据库脚本
└── frontend/         # 前端代码
    └── src/          # Vue源码
```

## 快速开始

### 1. 数据库初始化

```bash
# 创建数据库并初始化表结构
mysql -uroot -p < backend/sql/schema.sql

# 导入初始数据
mysql -uroot -p wedding_studio < backend/sql/data.sql
```

### 2. 启动后端

```bash
cd backend
mvn spring-boot:run
```

后端默认运行在 `http://localhost:8080`

### 3. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`

## 默认账号

| 角色   | 用户名 | 密码     |
|--------|--------|----------|
| 管理员 | admin  | admin123 |
| 普通用户 | zhangsan | 123456 |

## 功能模块

### 用户端
- 用户注册登录
- 浏览婚纱列表/详情
- 购买婚纱
- 我的订单（申请退货）
- 浏览样片列表/详情
- 预约拍摄
- 我的预约（到店报道、取片支付）

### 管理员端
- 管理员登录
- 婚纱管理（增删改查）
- 样片管理（增删改查）
- 订单管理（查看所有订单）
- 预约管理（查看所有预约、确认拍摄完成）
