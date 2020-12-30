## dvdp-expand 系统

### url参数

#### needMainScene
主场景是否渲染

#### full/detail
默认一个缩放比例

#### scale
自适应全屏拉伸缩放比例，只在full情况下生效

#### scene
进入页面后默认场景

### openApi
#### 自定义业务组件

#### 监听事件示例
```javascript
document.addEventListener('SceneIndex', function (e) {
	console.log(e.detail)
}, false)
```
#### 监听事件
|类型名|参数|作用|备注|
| --- | --- | --- | --- |
|SceneIndex|index：Number,String|切换场景ID监听||
|DestroyScene|index：Number,String|销毁场景ID监听||

#### 场景 scene 
|方法名|参数|作用|
| --- | --- | --- |
|scene.setSceneIndex|index：Number,String|设置场景|
|scene.createScene|无|根据索引创建一个新场景|
|scene.destroyScene|index：Number,String|根据索引删除一个场景|
|scene.initScene|list：Array|初始化场景数量|

#### 实例 instance 
|方法名|参数|作用|
| --- | --- | --- |
|instance.updateComponent|id：String,data:Any|更新组件|

#### store
#### mutations
#### liveVideo
#### components
#### mixins
#### methods


## dvdp-expand-node 
前期后端没介入时的mock服务/静态资源服务

存放视频，相当于杭燃的静态资源服务器

## 三方

### 后端服务

### 大数据数仓服务

### 方大科技公司（直播服务）
