## 2020-10-28
## 新增
* 业务组件标题
### 修改
* 修复编辑模式预览
* 左侧工具栏每次滑入都会执行init事件

## 2020-10-27
## 新增
* 引入highcharts
### 修改
* 新增api打通
* 编辑api打通
* 编辑页面
* item-card改为ts
* 动态数据
## 发现异常
* [ ] 预览链接，是否需要时间有效期
* [ ] 目前已有的线上预览链接失效
* [ ] 小图片，过多的svg图片
* [ ] 布局格子异常
* [ ] 数字翻牌器，起初无动画
* [ ] 之前已有问题，组件切换过快，会出现跳动，看板会来不及显示

## 2020-10-26
### 新增
* 公共init方法
### 修改
* 添加typescript eslint
* 修复左上角，点击D字母，还原画布的功能
* widget-operation改为ts
* parseConfigSource方法支持空参数
* 初始化组件参数定义
* 修复table报错i-button
* 自定义组件优化自动加载
* 使用vue observable API 优化注入自定义组件的函数
### 删除
* 删除没有作用的requestAnimationFrame
* 删除空init方法
## 发现异常
* [ ] 过多的svg图片
* [ ] 布局格子异常
* [ ] 数字翻牌器，起初无动画
* [ ] 之前已有问题，组件切换过快，会出现跳动，看板会来不及显示

## 2020-10-23
### 删除
* esvcp-pc-ui
* esvcp-pc
### 修改
* 修复比例尺和跑马灯，directives注入异常
* 按需引入DataV
* 图表组件模块render改为html
* 图表组件模块改为按需引入
* id改为uuid随机数
## 发现异常
* [ ] 过多的svg图片
* [ ] 布局格子异常
* [ ] 数字翻牌器，起初无动画
* [ ] table报错i-button

## 2020-10-22

### 修改
* widget-layers分离
* 注释关闭了导入小工具入口，右侧图层管理
* 注释关闭了筛选，右侧图层管理
* 注释了`正在初始化配置`的组件loading，因为这块如果关闭了动态，会比较丑
* 修复 animation 支持不填，将取消动画
* 修改 load-mask 模块，加入transition ，外部不用重复嵌套transition
* updateConfig 函数每次组件初始化都会执行，且有setTimeout，组件销毁时容易内存泄漏，不需要执行setTimeout，执行的setTimeout页及时销毁

### 删除
* 自定义组件&比例尺组件 mounted延时700ms执行$forceUpdate函数
* html2canvas 强制加的2000ms延迟，为了显示loading动画
* 小工具初始化需要时间，此处进行延时逐个回填，强制加的20ms延迟去除
* 小工具导入成功，强制加的500ms延迟去除

### 新增
* pug 应用 几个简单页面
* ts 应用 几个简单页面

## 发现异常
* [ ] 布局格子异常
* [ ] 比例尺和跑马灯，directives注入异常
* [ ] 数字翻牌器，起初无动画
* [ ] console错，strokeColor

## 2020-10-21

### 新增
* 列表页面
* dvdp放入lib文件夹
* 新增部分注释
* 新增ts支持

### 修改
* 业务组件按文件目录自动引入，形成分类模块
* api新建文件，request.js
* api按文件目录自动引入
* hot-keys分离
* right-menu分离
* 自己写的日期format修改成date-fns/format

### 删除
* 移除 npm dvdp
