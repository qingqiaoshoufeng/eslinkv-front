## 发送指令
```javascript
this.$socket.emit('eslinkVTerminalInteraction', '111111111111')
```

## 接受指令
下载
```
npm install --save vue-socket.io
```
连接服务器，以及接收服务端消息
```javascript
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://127.0.0.1:7001/');

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  sockets: {
    connect: function () {
      console.log('socket connected');
    },
    res: function (val) {
      console.log('接收到服务端消息', val);
    }
  }
});
```
