## 加载 socket 插件

```
npm install vue-socket.io
```

如果使用外部 js，在大屏内组件需要加载 js，推荐使用[外部插件指南方式](/help/ExternalPlug)

## 连接 socket

你的工作主要在于接收到信息后，进行你想要的操作

```javascript
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

Vue.use(
	new VueSocketio({
		connection: `http://127.0.0.1:7001`,
	}),
)
this.$socket.on('connect', () => {
	console.log('connect')
})
```

发送指令

```javascript
handleClick() {
	this.$socket.emit('chat', '111111111111')
}
```

接受指令

```javascript
this.$socket.onevent = val => {
	console.log(val.data)
}
```