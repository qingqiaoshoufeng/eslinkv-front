# 开发
## 自定义业务组件

# 事件文档

## 监听事件示例
```javascript
document.addEventListener('SceneIndex', function (e) {
	console.log(e.detail)
}, false)
```
## 监听事件
|类型名|参数|作用|备注|
| --- | --- | --- | --- |
|SceneIndex|index：Number,String|切换场景ID监听||
|DestroyScene|index：Number,String|销毁场景ID监听||

## 场景 GoldChart.scene 
|方法名|参数|作用|
| --- | --- | --- |
|scene.setSceneIndex|index：Number,String|设置场景|
|scene.createScene|无|根据索引创建一个新场景|
|scene.destroyScene|index：Number,String|根据索引删除一个场景|
|scene.initScene|list：Array|初始化场景数量|

## 实例 GoldChart.instance 
|方法名|参数|作用|
| --- | --- | --- |
|instance.updateComponent|id：String,data:Any|更新组件|

## 其他 events.list 
|方法名|参数|作用|
| --- | --- | --- |
|widgetUnactived|无|小工具取消选择，面板关闭|