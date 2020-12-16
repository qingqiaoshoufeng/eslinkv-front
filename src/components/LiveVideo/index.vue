<template>
  <div>
    <ul class="video-list fn-flex pos-a">
      <li
          v-for="(k, i) in videoList"
          :key="i"
          :class="{active: currIndex === i}"
          @click="changeChannel(i)"
      >{{ k.Name }}</li>
    </ul>
    <div class="video-wrap">
      <div class="mask" v-if="!isPlaying">
        <img src="./img/carwifi.svg">
        <div class="enter" @click="changeChannel(currIndex)">进入直播</div>
      </div>
      <div class="windowbox" @dblclick="videofullscreen">
        <video id="liveVideoShow" ref="live" class="video-js" style="width:100%;height:100%;background-color:black;object-fit:fill" @timeupdate="progress($event)"></video>
      </div>
    </div>
  </div>
</template>

<script>

var _cf = {
  ver: 'debug',
  q2httpServer: {
    host: "36.134.113.152",
    port: 9585,
    sslPort: 443,
    secure: false
  },
  // - 配置登录参数
  connParams: {
    // - 登录平台IP
    address: "36.134.113.152",
    port: "9988",
    // - 登录平台用户名
    user: "hzranqi",
    // - 登录平台密码
    password: "rq123456",
    // - 登录平台企业ID
    epid: "hzrq",
    // - 登录平台是否通过网闸模式
    bfix: 1
  }
}

var url = "";
var ws = null;
var token = "";
var device_list = [];
var myPlayer = "";
var presetPos = new Array();
var pictureId = "";
var storageId = "";
var videoelem = "";
var flvPlayer = "";
var flvPlayerList = [];
var replay = 0;
var chooseplaysite = 0; //选中的第几窗口,默认为0代表没有选择

var host = 'http://' + _cf.q2httpServer.host + ':' + _cf.q2httpServer.port + '/icvs2/';

//post请求
function requestPost(router, params, callback) {
  var self = this;
  $.ajax({
    type: 'post',
    url: host + router,
    data: params,
    traditional: true,
    dataType: 'json',
    async: true,
    complete: function (rv) {
      if (typeof callback == 'function') callback(rv)
    }
  })
}
//get请求
function requestGet(router, callback) {
  var self = this;
  var url = host + router;
  $.ajax({
    type: 'get',
    url: url,
    dataType: 'json',
    async: true,
    complete: function (rv) {
      if (typeof callback == 'function') callback(rv)
    }
  })
}

function createPlayer() {

  var videoElement = document.getElementById('liveVideoShow');
  if (videoelem) {
    videoElement = videoelem;
  }
  myPlayer = new videojs('videoElement', {
    "techOrder": ["html5", "flash"],
    preload: 'auto',
    posterImage: false,
    controls: true,
    autoplay: true,
    bigPlayButton: false,
    videoWidth: 704,
    videoHeight: 598,
    controlBar: {
      playToggle: false,
      volumePanel: {
        inline: false
      },
      remainingTimeDisplay: false,
      progressControl: false,
      LiveDisplay: true
    }
  });
}

function pausevideo() {
  if (!flvPlayer) return
  if (flvjs.isSupported()) {
    flvPlayer.unload();
    flvPlayer.detachMediaElement();
    flvPlayer.destroy();
  } else {
    myPlayer.reset();
  }
}

//开始对讲
function starttalk() {
  var camera = get_select_node();
  if (!camera) return;
  var puid = camera.puid;
  var idx = camera.idx;
  startTalk(host,token,puid,idx,"token1",function(message){
    console.log(message)
  })
}
function stoptalk() {
  var camera = get_select_node();
  if (!camera) return;
  var puid = camera.puid;
  var idx = camera.idx;
  stopTalk(puid);
}

export default {
  data() {
    return {
      videoList: [],
      pu: null,
      currIndex: 0,
      isPlaying: false
    }
  },
  methods: {
    connect() {
      console.warn('------开始连接------')
      var params = {
        "address": _cf.connParams.address,
        "port": _cf.connParams.port,
        "user": _cf.connParams.user,
        "password": _cf.connParams.password,
        "epid": _cf.connParams.epid,
        "fixaddr": _cf.connParams.bfix
      }
      requestPost('login', params, rv => {
        let self = this;
        var result = {
          errcode: -1,
          token: ''
        }
        var respJSON = rv.responseJSON;
        if (respJSON.hasOwnProperty('errcode')) {
          result.errcode = respJSON.errcode;
        }
        if (respJSON.hasOwnProperty('token')) {
          result.token = respJSON.token;
          result.errcode = 0;
          token = result.token;
          this.fetch_device(0, 200);
        }
        if (_cf.q2httpServer.secure === true) {
          url = "wss://" + _cf.q2httpServer.host + ":" + _cf.q2httpServer.sslPort + "?token=" + token;
        } else {
          url = "ws://" + _cf.q2httpServer.host + ":" + _cf.q2httpServer.port + "?token=" + token;
        }
        console.log(url)
        if ("WebSocket" in window) {
          ws = new WebSocket(url);
          ws.onopen = function () {}
          ws.onmessage = function (evt) {
            if (typeof evt == "object" && evt.data) {
              var msg = $.xml2json(evt.data);

              var event = msg.E || null;

              if (event) {
                if (event.ID == "E_CU_Online") {
                  $.messager.show({
                    title: '消息',
                    msg: '用户上线(' + (event.Desc.UserID + '@' + event.Desc.EPID) + ')',
                    timeout: 3000,
                    showType: 'slide'
                  });
                } else if (event.ID == "E_CU_Offline") {
                  $.messager.show({
                    title: '消息',
                    msg: '用户下线(' + (event.Desc.UserID + '@' + event.Desc.EPID) + ')',
                    timeout: 3000,
                    showType: 'slide'
                  });
                } else if (event.ID == "E_PU_Online") {
                  $.messager.show({
                    title: '消息',
                    msg: '设备上线.',
                    timeout: 3000,
                    showType: 'slide'
                  });
                } else if (event.ID == "E_PU_Offline") {
                  $.messager.show({
                    title: '消息',
                    msg: '设备下线.',
                    timeout: 3000,
                    showType: 'slide'
                  });
                } else {
                  console.log(" no treatment event id " + (event["ID"] ? event["ID"] : ""));
                }
              }
            }

          };
          ws.onclose = function () {

          }
          ws.onerror = function () {

          }
        } else {
          console.log("not support web socket.");
        }
      })
    },
    fetch_device() {
      var self = this;

      //获取设备列表的接口
      var router = 'CAS/C_CAS_QueryPUIDSets?offset=' + 0 + '&count=' + 2000 + '&token=' + token;
      requestGet(router, rv => {
        var respJSON = rv.responseJSON;
        if (respJSON.constructor != Array) {
          respJSON = [respJSON];
        }
        device_list = respJSON;

        console.warn('------获取到以下设备---------')
        console.log(device_list)
        // this.pu = device_list[0] // todo
        this.pu = device_list.find(v => v.OnlineFlag==='1')

        requestPost('C_CAS_QueryPUIDRes?token=' + token, { puid: [this.pu.$] }, rv => {
          // 过滤直播资源
          this.videoList = rv.responseJSON.Res.filter(v => v.Type === 'IV')
          console.warn('------获取到以下子设备---------')
          console.log(this.videoList)
        })
      })

    },
    progress(e) {
      var bf = e.srcElement.buffered;
      var currentTime = e.srcElement.currentTime;
      if (bf.length > 0) {
        let end = bf.end(0);
        if (end - currentTime > 1.5) {
          e.srcElement.currentTime = end - 0.1;
        }
      }
    },
    videofullscreen() {
      var p = this.$refs.live
      $(p).fullScreen(true);
      // $(p).toggleFullScreen();
      $(p).fullScreen(false);
    },
    playvideo(puid, idx) {
      pausevideo()
      //播视频接口
      let url = host + "stream.flv?puid=" + puid + "&idx=" + idx + "&stream=0&token=" + token;
      this.isPlaying = true

      if (flvjs.isSupported()) {
        var videoElement = "";
        videoElement = this.$refs.live

        videoElement.controls = false;
        flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: url,
          isLive: true,
          hasAudio: false
        }, {
          enableWorker: false,
          autoCleanupSourceBuffer: true, //清理缓冲区
          enableStashBuffer: false,
          stashInitialSize: 128, // 减少首桢显示等待时长
          statisticsInfoReportInterval: 600
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();

        setTimeout(function () {
          flvPlayer.play();
        }, 100);

      } else {
        createPlayer();
        myPlayer.src(url);
        myPlayer.on("error", e => {
          setTimeout(e => {
            myPlayer.src(url);
            myPlayer.load(url);
            myPlayer.play();
          }, 1000);
        });
        myPlayer.on("ended", e => {
          setTimeout((e) => {
            myPlayer.src(url);
            myPlayer.load(url);
            myPlayer.play();
          }, 1000);
        })
      }
    },
    changeChannel (n) {
      this.currIndex = n
      this.playvideo(this.pu.$, this.videoList[this.currIndex].Idx)
    },
    handleSceneChange () {
      pausevideo()
    }
  },
  created() {
    this.connect()
  },
  mounted() {
    document.addEventListener('SceneIndex', this.handleSceneChange)
  },
  beforeDestroy() {
    document.removeEventListener('SceneIndex', this.handleSceneChange)
  }
}

</script>

<style lang="scss" scoped>
.video-wrap{
  position: relative;
  width: 640px;
  height: 400px;
  background: url("./img/shipk.svg") no-repeat;
  padding: 4px;
  .windowbox {
    width: 100%;
    height: 100%;
    background: #000;
  }
  .mask {
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    padding-top: 130px;
    text-align: center;
    z-index: 1;
    .enter {
      cursor: pointer;
      width: 112px;
      height: 40px;
      background: #0057A9;
      border-radius: 4px;
      font-size: 24px;
      line-height: 40px;
      color: #FFFFFF;
      margin: 24px auto 0;
    }
  }
}
.video-list {
  margin-bottom: 12px;
  height: 32px;
	top: -42px;
  li {
    width: 165px;
    height: 32px;
    font-size: 18px;
    border-radius: 4px;
    margin-right: 16px;
    background: rgba(0, 87, 169, 0.5);
    color: rgba(255, 255, 255, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.active {
      background: #0057A9;
      border: 1px solid #00DDFF;
    }
  }
}

</style>
