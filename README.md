## dvdp-expand 系统

### url参数

#### full/detail
默认一个缩放比例

#### scale
自适应全屏拉伸缩放比例，只在full情况下生效

#### scene
进入页面后默认场景

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
|scene.createScene|无|根据索引创建一个新场景|

#### 实例 instance 
|方法名|参数|作用|
| --- | --- | --- |
|instance.updateComponent|id：String,data:Any|更新组件|
