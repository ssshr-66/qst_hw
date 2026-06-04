# 婚纱影楼管理系统 PRD 文档

## 1. 项目名称

婚纱影楼管理系统

---

## 2. 项目背景

本项目为前后端分离课设项目，面向婚纱影楼业务场景，实现用户注册登录、婚纱浏览购买、婚纱退货、样片浏览、拍摄预约、到店报道、拍摄完成、取片支付等功能。

系统不接入真实支付平台，所有支付相关操作均采用模拟支付方式，即用户点击确认支付后，系统直接返回支付成功，并修改对应订单或预约状态。

---

## 3. 技术选型

### 前端

- Vue
- Vue Router
- Axios
- Element Plus / Ant Design Vue，可选

### 后端

- Spring Boot
- MyBatis-Plus
- MySQL
- Lombok

### 数据库

- MySQL

---

## 4. 系统角色

系统分为两类角色：

### 4.1 普通用户

普通用户主要完成浏览、购买、预约、报道、取片等操作。

功能包括：

1. 注册
2. 登录
3. 查看婚纱列表
4. 查看婚纱详情
5. 购买婚纱
6. 查看我的婚纱订单
7. 申请退货
8. 查看样片列表
9. 查看样片详情
10. 预约拍摄
11. 查看我的预约
12. 到店报道
13. 取片支付

---

### 4.2 管理员

管理员主要负责系统基础数据和业务流程管理。

功能包括：

1. 登录
2. 管理婚纱信息
3. 管理样片信息
4. 查看所有婚纱订单
5. 查看所有预约记录
6. 确认拍摄完成

---

## 5. 系统总体功能结构

```text
婚纱影楼管理系统
│
├── 用户模块
│   ├── 用户注册
│   ├── 用户登录
│   └── 用户信息获取
│
├── 婚纱模块
│   ├── 婚纱列表
│   ├── 婚纱详情
│   ├── 婚纱购买
│   ├── 我的婚纱订单
│   └── 婚纱退货
│
├── 影楼拍摄模块
│   ├── 样片列表
│   ├── 样片详情
│   ├── 拍摄预约
│   ├── 我的预约
│   ├── 到店报道
│   ├── 拍摄完成
│   └── 取片支付
│
└── 管理员模块
    ├── 婚纱管理
    ├── 样片管理
    ├── 婚纱订单管理
    └── 预约管理
```

---

# 6. 核心业务规则

## 6.1 不允许用户手动输入业务 ID

系统中不建议让用户手动输入婚纱 ID、用户 ID、套餐 ID 等关键业务 ID。

用户在页面中通过点击列表项进入详情页，前端自动携带对应数据 ID 调用后端接口。

例如：

```text
用户点击某件婚纱 -> 系统自动获取 dressId -> 点击购买 -> 后端生成订单
```

而不是：

```text
用户手动输入婚纱 ID -> 点击购买
```

---

## 6.2 婚纱购买规则

1. 用户必须登录后才能购买婚纱。
2. 用户在婚纱详情页点击购买。
3. 系统自动根据当前登录用户 ID 和当前婚纱 ID 创建订单。
4. 系统不接入真实支付，点击购买后直接生成购买成功订单。
5. 订单状态为“已购买”。

---

## 6.3 婚纱退货规则

1. 用户只能对自己的订单申请退货。
2. 用户需要进入“我的订单”页面，选择某一个已购买订单进行退货。
3. 用户需要填写退货原因。
4. 退货成功后，订单状态修改为“已退货”。
5. 已退货订单不能重复退货。

---

## 6.4 拍摄预约规则

1. 用户必须登录后才能预约拍摄。
2. 用户在样片详情页选择预约时间。
3. 系统根据当前登录用户 ID、样片 ID、预约时间创建预约记录。
4. 新建预约状态为“已预约”。
5. 同一个用户可以有多个预约记录。

---

## 6.5 到店报道规则

1. 用户只能对自己的预约记录进行报道。
2. 预约状态必须为“已预约”时才能报道。
3. 系统需要比较当前时间和预约时间。
4. 可简化为：当前时间大于等于预约时间时，允许报道。
5. 报道成功后，预约状态改为“已报道”。

说明：

为了课设简单，暂时不做复杂时间段判断。如果后续想优化，可以设置允许报道时间范围，例如预约前 30 分钟到预约后 2 小时内可报道。

---

## 6.6 拍摄完成规则

1. 拍摄完成由管理员确认。
2. 管理员进入预约管理页面，选择某一条预约记录，点击“拍摄完成”。
3. 只有状态为“已报道”的预约才可以设置为“已拍摄完成”。
4. 拍摄完成后，系统记录拍摄完成时间。
5. 预约状态修改为“已拍摄完成”。

---

## 6.7 取片支付规则

1. 用户只能对自己的预约进行取片支付。
2. 只有状态为“已拍摄完成”的预约才可以取片支付。
3. 用户点击“取片支付”后，系统展示该样片套餐价格。
4. 用户点击“确认支付”。
5. 系统不调用真实支付接口，直接返回支付成功。
6. 支付成功后，预约状态修改为“已支付待取片”。

---

# 7. 状态设计

## 7.1 用户角色

| 值 | 含义 |
|---|---|
| USER | 普通用户 |
| ADMIN | 管理员 |

---

## 7.2 婚纱订单状态

| 状态值 | 状态名称 | 说明 |
|---|---|---|
| 1 | 已购买 | 用户购买成功 |
| 2 | 已退货 | 用户已申请退货成功 |

---

## 7.3 拍摄预约状态

| 状态值 | 状态名称 | 说明 |
|---|---|---|
| 0 | 已预约 | 用户已提交预约 |
| 1 | 已报道 | 用户已到店报道 |
| 2 | 已拍摄完成 | 管理员确认拍摄完成 |
| 3 | 已支付待取片 | 用户已模拟支付成功，等待取片 |

---

# 8. 页面设计

## 8.1 登录页面 Login.vue

### 页面功能

用户和管理员登录系统。

### 页面元素

- 用户名输入框
- 密码输入框
- 登录按钮
- 跳转注册按钮

### 操作流程

```text
输入用户名和密码
-> 点击登录
-> 后端校验用户信息
-> 登录成功
-> 根据角色跳转不同页面
```

### 跳转规则

| 用户角色 | 登录成功后跳转 |
|---|---|
| 普通用户 | 用户首页 |
| 管理员 | 管理员首页 |

---

## 8.2 注册页面 Register.vue

### 页面功能

普通用户注册账号。

### 页面元素

- 用户名
- 密码
- 确认密码
- 手机号
- 注册按钮

### 业务规则

1. 用户名不能为空。
2. 密码不能为空。
3. 两次密码必须一致。
4. 用户名不能重复。
5. 注册成功后跳转登录页。

---

## 8.3 用户首页 Home.vue

### 页面功能

展示系统主要入口。

### 页面元素

- 婚纱按钮
- 影楼按钮
- 我的订单按钮
- 我的预约按钮
- 退出登录按钮

### 页面跳转

```text
点击婚纱 -> 婚纱列表页
点击影楼 -> 样片列表页
点击我的订单 -> 我的婚纱订单页
点击我的预约 -> 我的预约页
```

---

## 8.4 婚纱列表页 DressList.vue

### 页面功能

展示所有可购买婚纱。

### 展示字段

- 婚纱图片
- 婚纱名称
- 婚纱风格
- 婚纱尺寸
- 婚纱价格
- 库存
- 查看详情按钮

### 操作流程

```text
进入婚纱列表页
-> 查看婚纱列表
-> 点击查看详情
-> 跳转婚纱详情页
```

---

## 8.5 婚纱详情页 DressDetail.vue

### 页面功能

展示婚纱详细信息，并支持购买。

### 展示字段

- 婚纱图片
- 婚纱名称
- 风格
- 尺寸
- 价格
- 库存
- 描述
- 购买按钮

### 购买流程

```text
点击购买
-> 弹出确认框
-> 点击确认
-> 调用购买接口
-> 返回购买成功
-> 跳转我的订单页或留在当前页
```

---

## 8.6 我的婚纱订单页 DressOrder.vue

### 页面功能

用户查看自己的婚纱购买订单，并可以申请退货。

### 展示字段

- 订单编号
- 婚纱名称
- 婚纱图片
- 订单金额
- 订单状态
- 下单时间
- 退货原因
- 操作按钮

### 操作规则

| 订单状态 | 可执行操作 |
|---|---|
| 已购买 | 申请退货 |
| 已退货 | 不可操作 |

### 退货流程

```text
点击申请退货
-> 弹出退货原因输入框
-> 输入退货原因
-> 点击确认
-> 调用退货接口
-> 返回退货成功
-> 刷新订单列表
```

---

## 8.7 样片列表页 SampleList.vue

### 页面功能

展示不同风格的影楼样片。

### 展示字段

- 样片图片
- 样片名称
- 样片风格
- 拍摄价格
- 查看详情按钮

### 操作流程

```text
进入样片列表页
-> 查看样片列表
-> 点击查看详情
-> 跳转样片详情页
```

---

## 8.8 样片详情页 SampleDetail.vue

### 页面功能

展示样片套餐详情，并支持预约拍摄。

### 展示字段

- 样片图片
- 样片名称
- 样片风格
- 拍摄价格
- 描述
- 预约时间选择框
- 预约按钮

### 预约流程

```text
选择预约时间
-> 点击预约
-> 后端创建预约记录
-> 返回预约成功
-> 跳转我的预约页
```

---

## 8.9 我的预约页 AppointmentList.vue

### 页面功能

普通用户查看自己的预约记录，并进行报道和取片支付。

### 展示字段

- 预约编号
- 样片名称
- 样片图片
- 预约时间
- 报道时间
- 拍摄完成时间
- 支付时间
- 预约状态
- 操作按钮

### 操作规则

| 预约状态 | 用户可执行操作 |
|---|---|
| 已预约 | 到店报道 |
| 已报道 | 等待拍摄完成 |
| 已拍摄完成 | 取片支付 |
| 已支付待取片 | 等待取片 |

### 报道流程

```text
点击报道
-> 后端判断当前时间是否大于等于预约时间
-> 判断成功
-> 状态改为已报道
-> 返回报道成功
```

### 取片支付流程

```text
点击取片支付
-> 显示样片套餐价格
-> 点击确认支付
-> 后端模拟支付成功
-> 状态改为已支付待取片
-> 返回支付成功，等待取片
```

---

# 9. 管理员页面设计

## 9.1 管理员首页 AdminHome.vue

### 页面功能

管理员功能入口。

### 页面入口

- 婚纱管理
- 样片管理
- 婚纱订单管理
- 预约管理
- 退出登录

---

## 9.2 婚纱管理页 DressManage.vue

### 页面功能

管理员维护婚纱数据。

### 功能

1. 查询婚纱列表
2. 新增婚纱
3. 修改婚纱
4. 删除婚纱

### 婚纱字段

- 婚纱名称
- 风格
- 尺寸
- 价格
- 图片地址
- 库存
- 描述

---

## 9.3 样片管理页 SampleManage.vue

### 页面功能

管理员维护样片数据。

### 功能

1. 查询样片列表
2. 新增样片
3. 修改样片
4. 删除样片

### 样片字段

- 样片名称
- 风格
- 拍摄价格
- 图片地址
- 描述

---

## 9.4 婚纱订单管理页 DressOrderManage.vue

### 页面功能

管理员查看所有婚纱购买和退货订单。

### 展示字段

- 订单编号
- 用户名
- 婚纱名称
- 订单金额
- 订单状态
- 退货原因
- 下单时间

### 功能

- 查询全部订单
- 根据用户名查询
- 根据订单状态查询

---

## 9.5 预约管理页 AppointmentManage.vue

### 页面功能

管理员查看所有拍摄预约，并确认拍摄完成。

### 展示字段

- 预约编号
- 用户名
- 样片名称
- 预约时间
- 报道时间
- 拍摄完成时间
- 支付时间
- 预约状态
- 操作按钮

### 操作规则

| 预约状态 | 管理员可执行操作 |
|---|---|
| 已预约 | 查看 |
| 已报道 | 确认拍摄完成 |
| 已拍摄完成 | 查看 |
| 已支付待取片 | 查看 |

### 确认拍摄完成流程

```text
管理员点击确认拍摄完成
-> 后端校验当前预约状态是否为已报道
-> 修改预约状态为已拍摄完成
-> 记录拍摄完成时间
-> 返回操作成功
```

---

# 10. 后端接口设计

## 10.1 用户接口

### 用户注册

```http
POST /api/user/register
```

请求参数：

```json
{
  "username": "zhangsan",
  "password": "123456",
  "phone": "13800000000"
}
```

返回示例：

```json
{
  "code": 200,
  "message": "注册成功",
  "data": null
}
```

---

### 用户登录

```http
POST /api/user/login
```

请求参数：

```json
{
  "username": "zhangsan",
  "password": "123456"
}
```

返回示例：

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "id": 1,
    "username": "zhangsan",
    "role": "USER"
  }
}
```

说明：

为了课设简单，可以前端将登录成功后的用户信息保存到 `localStorage` 中。

---

## 10.2 婚纱接口

### 查询婚纱列表

```http
GET /api/dress/list
```

返回示例：

```json
{
  "code": 200,
  "message": "查询成功",
  "data": [
    {
      "id": 1,
      "name": "白色公主婚纱",
      "style": "公主风",
      "size": "M",
      "price": 999.00,
      "imageUrl": "/images/dress1.jpg",
      "stock": 10,
      "description": "经典白色公主风婚纱"
    }
  ]
}
```

---

### 查询婚纱详情

```http
GET /api/dress/{id}
```

---

### 购买婚纱

```http
POST /api/dress/order/create
```

请求参数：

```json
{
  "userId": 1,
  "dressId": 1
}
```

返回示例：

```json
{
  "code": 200,
  "message": "购买成功",
  "data": {
    "orderId": 1001,
    "price": 999.00,
    "status": 1
  }
}
```

说明：

前端不要让用户手动输入 `dressId`，而是在婚纱详情页自动携带。

---

### 查询我的婚纱订单

```http
GET /api/dress/order/my?userId=1
```

---

### 申请退货

```http
POST /api/dress/order/return
```

请求参数：

```json
{
  "orderId": 1001,
  "userId": 1,
  "returnReason": "尺寸不合适"
}
```

返回示例：

```json
{
  "code": 200,
  "message": "退货成功",
  "data": null
}
```

---

## 10.3 样片接口

### 查询样片列表

```http
GET /api/sample/list
```

---

### 查询样片详情

```http
GET /api/sample/{id}
```

---

## 10.4 预约接口

### 创建拍摄预约

```http
POST /api/appointment/create
```

请求参数：

```json
{
  "userId": 1,
  "sampleId": 1,
  "appointmentTime": "2026-06-10 10:00:00"
}
```

返回示例：

```json
{
  "code": 200,
  "message": "预约成功",
  "data": {
    "appointmentId": 2001,
    "status": 0
  }
}
```

---

### 查询我的预约

```http
GET /api/appointment/my?userId=1
```

---

### 用户报道

```http
POST /api/appointment/report
```

请求参数：

```json
{
  "appointmentId": 2001,
  "userId": 1
}
```

返回示例：

```json
{
  "code": 200,
  "message": "报道成功",
  "data": null
}
```

可能失败返回：

```json
{
  "code": 500,
  "message": "未到预约时间，暂不能报道",
  "data": null
}
```

---

### 管理员确认拍摄完成

```http
POST /api/appointment/finish
```

请求参数：

```json
{
  "appointmentId": 2001,
  "adminId": 2
}
```

返回示例：

```json
{
  "code": 200,
  "message": "拍摄完成确认成功",
  "data": null
}
```

---

### 取片支付

```http
POST /api/appointment/pay
```

请求参数：

```json
{
  "appointmentId": 2001,
  "userId": 1
}
```

返回示例：

```json
{
  "code": 200,
  "message": "支付成功，等待取片",
  "data": {
    "price": 1299.00,
    "status": 3
  }
}
```

---

## 10.5 管理员接口

### 新增婚纱

```http
POST /api/admin/dress/add
```

### 修改婚纱

```http
PUT /api/admin/dress/update
```

### 删除婚纱

```http
DELETE /api/admin/dress/delete/{id}
```

### 查询全部订单

```http
GET /api/admin/dress/order/list
```

### 新增样片

```http
POST /api/admin/sample/add
```

### 修改样片

```http
PUT /api/admin/sample/update
```

### 删除样片

```http
DELETE /api/admin/sample/delete/{id}
```

### 查询全部预约

```http
GET /api/admin/appointment/list
```

---

# 11. 数据库设计

## 11.1 用户表 user

```sql
CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    phone VARCHAR(20) COMMENT '手机号',
    role VARCHAR(20) NOT NULL DEFAULT 'USER' COMMENT '角色 USER/ADMIN',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
);
```

---

## 11.2 婚纱表 dress

```sql
CREATE TABLE dress (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '婚纱ID',
    name VARCHAR(100) NOT NULL COMMENT '婚纱名称',
    style VARCHAR(50) COMMENT '婚纱风格',
    size VARCHAR(20) COMMENT '婚纱尺寸',
    price DECIMAL(10,2) NOT NULL COMMENT '价格',
    image_url VARCHAR(255) COMMENT '图片地址',
    stock INT DEFAULT 0 COMMENT '库存',
    description VARCHAR(500) COMMENT '描述',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
);
```

---

## 11.3 婚纱订单表 dress_order

```sql
CREATE TABLE dress_order (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    dress_id BIGINT NOT NULL COMMENT '婚纱ID',
    price DECIMAL(10,2) NOT NULL COMMENT '订单金额',
    status INT NOT NULL DEFAULT 1 COMMENT '订单状态 1已购买 2已退货',
    return_reason VARCHAR(500) COMMENT '退货原因',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
);
```

---

## 11.4 样片表 sample

```sql
CREATE TABLE sample (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '样片ID',
    name VARCHAR(100) NOT NULL COMMENT '样片名称',
    style VARCHAR(50) COMMENT '样片风格',
    price DECIMAL(10,2) NOT NULL COMMENT '拍摄价格',
    image_url VARCHAR(255) COMMENT '图片地址',
    description VARCHAR(500) COMMENT '描述',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
);
```

---

## 11.5 拍摄预约表 appointment

```sql
CREATE TABLE appointment (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '预约ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    sample_id BIGINT NOT NULL COMMENT '样片ID',
    appointment_time DATETIME NOT NULL COMMENT '预约时间',
    report_time DATETIME COMMENT '报道时间',
    finish_time DATETIME COMMENT '拍摄完成时间',
    pay_time DATETIME COMMENT '支付时间',
    status INT NOT NULL DEFAULT 0 COMMENT '状态 0已预约 1已报道 2已拍摄完成 3已支付待取片',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
);
```

---

# 12. 主要业务流程

## 12.1 用户登录流程

```text
用户进入登录页
-> 输入用户名和密码
-> 点击登录
-> 后端校验
-> 返回用户信息
-> 前端保存用户信息
-> 根据角色跳转首页
```

---

## 12.2 婚纱购买流程

```text
用户登录
-> 进入婚纱列表
-> 点击婚纱详情
-> 点击购买
-> 系统确认购买
-> 后端生成订单
-> 返回购买成功
-> 用户可在我的订单中查看
```

---

## 12.3 婚纱退货流程

```text
用户登录
-> 进入我的订单
-> 选择已购买订单
-> 点击申请退货
-> 输入退货原因
-> 后端校验订单归属和状态
-> 修改订单状态为已退货
-> 返回退货成功
```

---

## 12.4 拍摄预约流程

```text
用户登录
-> 进入样片列表
-> 点击样片详情
-> 选择预约时间
-> 点击预约
-> 后端创建预约记录
-> 状态为已预约
-> 返回预约成功
```

---

## 12.5 到店报道流程

```text
用户登录
-> 进入我的预约
-> 选择已预约记录
-> 点击报道
-> 后端判断当前时间是否大于等于预约时间
-> 如果符合，状态改为已报道
-> 记录报道时间
-> 返回报道成功
```

---

## 12.6 拍摄完成流程

```text
管理员登录
-> 进入预约管理
-> 找到已报道预约
-> 点击确认拍摄完成
-> 后端修改状态为已拍摄完成
-> 记录拍摄完成时间
-> 返回操作成功
```

---

## 12.7 取片支付流程

```text
用户登录
-> 进入我的预约
-> 找到已拍摄完成预约
-> 点击取片支付
-> 系统展示需要支付的套餐价格
-> 用户点击确认支付
-> 后端模拟支付成功
-> 状态改为已支付待取片
-> 返回支付成功，等待取片
```

---

# 13. 权限控制

## 13.1 普通用户权限

普通用户只能操作自己的数据。

包括：

1. 只能查看自己的婚纱订单。
2. 只能退自己的婚纱订单。
3. 只能查看自己的预约。
4. 只能对自己的预约进行报道。
5. 只能对自己的预约进行取片支付。

---

## 13.2 管理员权限

管理员可以查看和管理全部业务数据。

包括：

1. 管理婚纱信息。
2. 管理样片信息。
3. 查看全部婚纱订单。
4. 查看全部预约。
5. 确认拍摄完成。

---

# 14. 返回结果统一格式

后端接口统一返回格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

字段说明：

| 字段 | 说明 |
|---|---|
| code | 状态码，200 表示成功，500 表示失败 |
| message | 返回提示信息 |
| data | 返回数据 |

---

# 15. 异常提示设计

常见异常提示：

| 场景 | 提示 |
|---|---|
| 用户名已存在 | 用户名已存在 |
| 用户名或密码错误 | 用户名或密码错误 |
| 婚纱不存在 | 婚纱信息不存在 |
| 库存不足 | 当前婚纱库存不足 |
| 订单不存在 | 订单不存在 |
| 不能退货 | 当前订单不能退货 |
| 预约不存在 | 预约不存在 |
| 未到预约时间 | 未到预约时间，暂不能报道 |
| 当前预约状态不允许报道 | 当前预约状态不允许报道 |
| 当前预约状态不允许确认拍摄完成 | 当前预约状态不允许确认拍摄完成 |
| 当前预约状态不允许支付 | 当前预约状态不允许支付 |
| 无权限操作 | 无权限操作该数据 |

---

# 16. 项目范围说明

## 16.1 本期实现

本课设版本实现以下内容：

1. 用户注册登录
2. 用户角色区分
3. 婚纱列表、详情
4. 婚纱购买
5. 我的婚纱订单
6. 婚纱退货
7. 样片列表、详情
8. 拍摄预约
9. 我的预约
10. 到店报道
11. 管理员确认拍摄完成
12. 取片模拟支付
13. 管理员婚纱管理
14. 管理员样片管理
15. 管理员订单和预约查看

---

## 16.2 暂不实现

为了控制课设复杂度，以下内容暂不实现：

1. 真实支付系统
2. 短信验证码
3. 图片真实上传，可先使用图片 URL
4. 复杂权限框架，可以先用简单角色判断
5. 复杂排班系统
6. 复杂库存锁定
7. 真实物流和取片配送
8. 退款到账流程

---

# 17. 项目验收标准

系统完成后，至少满足以下标准：

1. 用户可以正常注册和登录。
2. 登录后可以区分普通用户和管理员。
3. 普通用户可以查看婚纱列表和详情。
4. 普通用户可以购买婚纱并生成订单。
5. 普通用户可以从“我的订单”中申请退货。
6. 普通用户可以查看样片列表和详情。
7. 普通用户可以选择时间预约拍摄。
8. 普通用户可以在预约时间到达后报道。
9. 管理员可以确认某个已报道预约拍摄完成。
10. 普通用户可以对已拍摄完成的预约进行取片模拟支付。
11. 管理员可以维护婚纱和样片数据。
12. 管理员可以查看订单和预约数据。
13. 系统前后端能够正常联调。
14. 数据能够正确保存到 MySQL 中。

---

# 18. 简化版页面路径建议

```text
/login                         登录
/register                      注册
/home                          用户首页

/dress/list                    婚纱列表
/dress/detail/:id              婚纱详情
/dress/orders                  我的婚纱订单

/sample/list                   样片列表
/sample/detail/:id             样片详情
/appointment/my                我的预约

/admin/home                    管理员首页
/admin/dress                   婚纱管理
/admin/sample                  样片管理
/admin/orders                  婚纱订单管理
/admin/appointments            预约管理
```

---

# 19. 总结

本系统采用前后端分离架构，围绕婚纱影楼的基础业务流程进行设计。

整体流程为：

```text
用户注册登录
-> 浏览婚纱或样片
-> 购买婚纱 / 预约拍摄
-> 订单退货 / 到店报道
-> 管理员确认拍摄完成
-> 用户取片支付
```

该 PRD 已经应用以下设计原则：

1. 用户不手动输入婚纱 ID、用户 ID、套餐 ID，而是通过页面点击自动传参。
2. 婚纱退货从“我的订单”中操作。
3. 拍摄流程使用明确状态流：已预约、已报道、已拍摄完成、已支付待取片。
4. 拍摄完成由管理员确认，增强系统管理属性。
5. 系统增加管理员端，实现婚纱、样片、订单、预约管理。

这个版本的功能量适合作为课设项目，业务完整度也比较高。