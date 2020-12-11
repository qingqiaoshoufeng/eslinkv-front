<template>
  <div>
    <ul class="video-list">
      <li
          v-for="(k, i) in videoList"
          :key="i"
          :class="{active: currIndex === i}"
          @click="changeChannel(i)"
      >{{ k.name }}</li>
    </ul>
    <div class="video-wrap">
      <div class="mask">
        <img src="./img/carwifi.svg">
        <div class="enter" @click="changeChannel(currIndex)">进入直播</div>
      </div>
      <div id="windowbox"></div>
    </div>
    <!--    视频信息展示-->
    <div id="windowtitle" style="display: none"></div>

    <!--      console控制台-->
    <div id="msg_bar" style="display: block;background: #5E87C4;width: 300px;height: 300px;"></div>
  </div>
</template>

<script>

var _cf ={
  ver:'debug',
  // - 配置登录参数
  connParams : {
    // - 登录平台IP
    ip : "36.134.113.152",
    port : "9988",
    // - 登录平台用户名
    uid : "hzranqi",
    // - 登录平台密码
    pwd :"rq123456",
    // - 登录平台企业ID
    epId : "hzrq",
    // - 登录平台是否通过网闸模式
    bfix : 1
  }
}

var connectId = null;
var resOAIndex = 0;
var ResOAChannels = new P_Utils.Hash();
var ResGPS = new P_Utils.Hash();
var puListArray = new Array();
var pulist = new Array();

function AttachObjectEvent(obj, _name, _callback) {
  try {
    if (obj && _name) {
      if (typeof _callback != "function") {
        _callback = function () {
        };
      }
      var is_ie_11 = (navigator.userAgent.toLowerCase().search("msie") == -1 && navigator.userAgent.toLowerCase().search("trident") != -1 ? true : false);

      if (obj.attachEvent && typeof obj.attachEvent == "function") {
        obj.attachEvent("on" + _name, _callback);
      } else if (obj.addEventListener) {
        if (is_ie_11) {
          obj["on" + _name] = _callback;
        } else {
          obj.addEventListener(_name, _callback, false);
        }
      } else {
        obj["on" + _name] = _callback;
      }
    } else {
      return;
    }

    return;
  } catch (e) {
    return;
  }
}

var puGroups = new Array();
var puGroupsList = new Array();
var puGroupsResource = new Array();

function fetch_group() {
  var result = P_LY.GetPUGroups(connectId);

  if (result.rv == "0") {
    puGroups = result.response;
  }
  // 获取分组下资源
//	console.time('testForEach');
  fetch_pugroup_resource(connectId);
//	console.timeEnd('testForEach');
  // 获取分组下分组节点
  fetch_pugroup_nodes(connectId);

  $('#group_tree').tree({
    data: puGroupsList,
    onBeforeLoad: function () {
      var nodes = $("#group_tree").tree('getChecked');
      for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i];
        $("#group_tree").tree('uncheck', node.target);
      }
    },
    onDblClick: function (node) {
      // if ($('#group_tree').tree('isLeaf', node.target)) {
      //   console.log(node)
      //
      //   if (node.online != "1") {
      //     log(node.name + "不在线");
      //     return;
      //   }
      //   play(node, node.attributes);
      //   return true;
      // }
    }
  })
  console.log(puGroupsList)
}

function fetch_pugroup_nodes(connectId) {
  for (var i = 0; i < puGroups.length; i++) {
    var g = puGroups[i];
    var result = P_LY.GetPUGroupNodes(connectId, {puGroupIndex: g.index});
    if (result.rv == "0") {
      //获取全部数据，按照parendId进行排序
      sort(result.response);
    }
  }
}

function sort(data) {
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    // parentNode_Index等于0的节点是根节点
    if (d.parentNode_Index == 0) {
      var rv = fetch_data_by_parendId(d, data);
      puGroupsList = puGroupsList.concat(rv);
    }
  }
}

function fetch_data_by_parendId(result, data) {

  // 构建分组节点
  var obj = new Array();

  var id = "pugroup_" + result.index;
  var text = result.name;
  var type = "pugroup";
  var iconCls = 'icon-treegroup';
  var state = "closed";
  var children = [];
  var attributes = result;

  // 设备节点添加到相应的分组节点下
  for (var j = 0; j < puGroupsResource.length; j++) {
    var pur = puGroupsResource[j];
    if (pur.parentNode_Index == result.index) {
      children = children.concat(pur);
    }
  }

  // 通过递归，下级节点添加到相应的上级节点下
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    if (result.index == d.parentNode_Index) {
      var rv = fetch_data_by_parendId(d, data);
      children = children.concat(rv);
    }
  }
  obj.push({
    id: id,
    text: text,
    state: state,
    children: children,
    iconCls: iconCls,
    type: type,
    attributes: attributes
  });
  return obj;
}

function fetch_pugroup_resource(connectId) {
  for (var i = 0; i < puGroups.length; i++) {
    var g = puGroups[i];
    // 获取分组下资源
    var result = P_LY.GetPUGroupResource(connectId, {puGroupIndex: g.index});
    console.log(result)
    if (result.rv == "0") {
      var obj = new Array();
      for (var j = 0; j < result.response.length; j++) {
        var pur = result.response[j];
        // 过滤资源，只保留IV资源
        if (pur.type == "IV") {
          // 构建资源节点
          //查询设备是否在线

          var op = P_LY.NPPSDKCommon.PUIsOnline(connectId, pur.puid)
          var online = 1
          var iconCls = ""

          if (op.rv == 0) {
            iconCls = 'icon-camera-online';
          } else {
            online = 0
            iconCls = 'icon-camera-offline';
          }

          var iconCls = 'icon-camera-online';
          var id = "pur_" + pur.puid + "_" + pur.idx;
          var text = pur.name;
          var type = "pur";

          var description = pur.description;
          var enable = pur.enable;
          var idx = pur.idx;
          var puid = pur.puid;
          var parentNode_Index = pur.parentNode_Index;
          var attributes = pur;
          obj.push({
            id: id,
            text: text,
            puid: puid,
            idx: idx,
            name: text,
            parentNode_Index: parentNode_Index,
            description: description,
            enable: enable,
            iconCls: iconCls,
            type: type,
            online: online,
            attributes: attributes
          });

        }
      }
      puGroupsResource = puGroupsResource.concat(obj);

    }
  }
}

//查询GPS历史数据

function QueryHistoryGPSData(connectId, puid) {

  var xmlObjSets = '<OSets><Res OType="151" OID="' + puid + '" Type="GNNS" Idx="0" /></OSets>';
  var param = '<Param Offset="1" Count="200" Begin="1462337586" End="1462355586"/>';

  var rv = P_LY.Control.CommonGet(
      connectId,
      {
        puid: puid,
        resType: "ST",
        resIdx: 0,
        controlID: "C_GS_QueryHistoryGPSData",
        xmlObjSets: xmlObjSets,
        param: param
      }
  ).response;
  var gpsdata = new Array();
  if (rv.M.C.Res && rv.M.C.Res.Error == "0") {
    var gpsPage = rv.M.C.Res.Param.Res.GPS;
    gpsdata = gpsdata.concat(gpsPage);
  }
  console.log(gpsdata)
}

function stop() {
  if (!P_LY.WindowContainers.get('windowbox')) {
    return;
  }
  log("关闭视频" + P_LY.WindowContainers.get('windowbox').description.name);
  P_LY.StopVideo(P_LY.WindowContainers.get('windowbox').window);
  P_LY.ResizeWindowDimension(P_LY.WindowContainers.get('windowbox').window, 0, 0);
  $("#windowtitle").html("无视频");
  $('#playtoolbar').hide();
}

function playaudio() {

  if (P_LY.WindowContainers.get('windowbox')) {
    var wnd = P_LY.WindowContainers.get('windowbox').window;
    if (wnd.containerId == "windowbox") {
      if (wnd.status.playvideoing) {
        var paStop = P_LY.PlayAudio(wnd);
        if (wnd.status.playaudioing) {
          P_LY.WindowAttachEvent.UpdateMenuCommand(wnd, [{key: "playaudio", text: "停止音频"}]);
          log("播放音频");
        } else {
          P_LY.WindowAttachEvent.UpdateMenuCommand(wnd, [{key: "playaudio", text: "播放音频"}]);
          log("停止音频")
        }
      }
    }
  }
}

function cloud_snapshot() {
  if (P_LY.WindowContainers.get('windowbox')) {
    var wnd = P_LY.WindowContainers.get('windowbox').window;
    if (wnd.containerId == "windowbox") {
      if (wnd.status.playvideoing) {
        var options = {
          S_Duration: 30, //云抓拍持续时间(分)
          ReserveDay: 30, //文件保存时间(天)
          S_Interval: 10//抓拍时间间隔(秒)
        }
        var rv = P_LY.CloudSnapshot(wnd, options);
        console.log(rv)
        if (wnd.status.cloudsnapshoting) {
          log("云抓拍成功！");
          P_LY.WindowAttachEvent.UpdateMenuCommand(wnd, [{key: "cloudsnapshot", text: "取消云抓拍"}]);
        } else {
          log("取消云抓拍成功！")
          P_LY.WindowAttachEvent.UpdateMenuCommand(wnd, [{key: "cloudsnapshot", text: "云抓拍"}]);
        }
      }
    }
  }
}

function cloud_record() {
  if (P_LY.WindowContainers.get('windowbox')) {
    var wnd = P_LY.WindowContainers.get('windowbox').window;
    if (wnd.containerId == "windowbox") {
      if (wnd.status.playvideoing) {
        var options = {
          Duration: 30,    //录像持续时间(分)
          ReserveDay: 30, //文件保存时间(天)
          FileLength: 15, //录像时文件时长(分钟)
        }
        var rv = P_LY.CloudRecord(wnd, options);
        if (wnd.status.cloudrecording) {
          log("云录像成功！");
          P_LY.WindowAttachEvent.UpdateMenuCommand(wnd, [{key: "cloudrecord", text: "取消云录像"}]);
        } else {
          log("取消云录像成功！")
          P_LY.WindowAttachEvent.UpdateMenuCommand(wnd, [{key: "cloudrecord", text: "云录像"}]);
        }
      }
    }
  }
}

function check_talkenable(connectId, puid) {
  var rv = P_LY.ForkResource(connectId, P_LY.Enum.ForkResourceLevel.nppForkPUResourceInfo, 0, 200, null, {PUID: puid});
  var re = rv.response;
  for (var i = 0; i < re.length; i++) {
    var childRes = re[i];
    if (childRes.type == P_LY.Enum.PuResourceType.AudioOut) {
      try {
        ResOAChannels.set(puid + "_" + childRes.idx, {
          puid: puid,
          index: childRes.idx,
          windowKey: "",
          flag: false
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  }
  var found = false, activeResOAIdx = 0, flag = -1;

  ResOAChannels.each
  (
      function (ee) {
        var e = ee.value;
        if (e.puid == puid) {
          flag = 0; // 存在OA资源
          if (found == false && e.flag != true) {
            activeResOAIdx = e.index;
            found = true;
          }
        }
      }
  );
  if (found == true) {
    flag = 1
  }
  resOAIndex = activeResOAIdx;
  return [flag, activeResOAIdx];
}

function play_talk() {
  var node = P_LY.WindowContainers.get('windowbox');
  console.log(node.window.customParams.talk)
  if (node) {
    if (node.window.customParams.talk == "start") {
      P_LY.WindowContainers.each(
          function (item) {
            if (item.value.window != null) {
              if (item.value.window.status.playvideoing && item.value.window.status.calling) {
                //关闭当前的喊话
                var rv = P_LY.CallTalkControl.Stop(connectId, item.value.window.params.puid, resOAIndex);
                console.log("1:" + rv.rv)
                if (rv.rv == P_Error.SUCCESS) {
                  item.value.window.status.calling = false;
                  item.value.window.customParams.upaudio = "start";
                  P_LY.WindowAttachEvent.UpdateMenuCommand(item.value.window, [{
                    key: "playupaudio",
                    text: "关闭喊话"
                  }]);
                  log("关闭喊话");
                }
              } else if (item.key != 'windowbox') {
                if (item.value.window.status.playvideoing && item.value.window.status.talking) {
                  //关闭非当前的对讲
                  var rv = P_LY.CallTalkControl.Stop(connectId, item.value.window.params.puid, resOAIndex);
                  console.log("2:" + rv.rv)
                  if (rv.rv == P_Error.SUCCESS) {
                    item.value.window.status.talking = false;
                    item.value.window.customParams.talk = "start";
                    P_LY.WindowAttachEvent.UpdateMenuCommand(item.value.window, [{
                      key: "playtalk",
                      text: "开始对讲"
                    }]);
                    log("关闭对讲");
                  }
                }
              }
            }
          }
      );
      var puid = node.window.params.puid;
      try {
        var rv_arr = check_talkenable(connectId, puid) || [-1, -1];
      } catch (e) {
      }

      switch (rv_arr[0]) {
        case -1:
          log("设备不支持对讲！");
          return false;
          break;
        case 0:
          log("资源已被占用，无法开启对讲！");
          return false;
          break;
        default:
          break;
      }
      var resOAIdx = rv_arr[1];
      console.log("3:" + resOAIdx)
      setTimeout(
          function () {
            var rv = P_LY.CallTalkControl.StartTalk(connectId, puid, resOAIdx); // 开始对讲
            console.log("4:" + rv.rv)
            if (rv.rv == P_Error.SUCCESS) {
              node.window.status.talking = true;
              node.window.customParams.talk = "end";
              P_LY.WindowAttachEvent.UpdateMenuCommand(node.window, [{key: "playtalk", text: "停止对讲"}]);
              log("开始对讲");
            }
          }, 200
      )
    } else {
      var rv = P_LY.CallTalkControl.Stop(connectId, node.window.params.puid, resOAIndex);
      if (rv.rv == P_Error.SUCCESS) {
        node.window.status.talking = false;
        node.window.customParams.talk = "start";
        P_LY.WindowAttachEvent.UpdateMenuCommand(node.window, [{key: "playtalk", text: "开始对讲"}]);
        log("停止对讲");
      }
    }
  }
}

function play_call() {
  var node = P_LY.WindowContainers.get('windowbox');

  if (node) {
    if (node.window.customParams.upaudio == "start") {
      P_LY.WindowContainers.each(
          function (item) {
            if (item.value.window != null) {
              if (item.value.window.status.playvideoing && item.value.window.status.talking) {
                var rv = P_LY.CallTalkControl.Stop(connectId, item.value.window.params.puid, resOAIndex);
                if (rv.rv == P_Error.SUCCESS) {
                  item.value.window.status.talking = false;
                  item.value.window.customParams.talk = "start";
                  P_LY.WindowAttachEvent.UpdateMenuCommand(item.value.window, [{
                    key: "playtalk",
                    text: "开始对讲"
                  }]);
                  log("停止对讲");
                }
              } else if (item.value.window.status.playvideoing && item.value.window.status.calling) {
                if (item.key != 'windowbox') {
                  // 关闭非当前喊话
                  var rv = P_LY.CallTalkControl.Stop(connectId, item.value.window.params.puid, resOAIndex);
                  if (rv.rv == P_Error.SUCCESS) {
                    item.value.window.status.calling = false;
                    item.value.window.customParams.upaudio = "start";
                    P_LY.WindowAttachEvent.UpdateMenuCommand(item.value.window, [{
                      key: "playupaudio",
                      text: "开始喊话"
                    }]);
                    log("停止喊话");
                  }
                }
              }
            }
          }
      );

      var puid = node.window.params.puid;

      var rv_arr = check_talkenable(connectId, puid) || [-1, -1];
      switch (rv_arr[0]) {
        case -1:
          log("设备不支持喊话！");
          return false;
          break;
        case 0:
          log("资源已被占用，无法开启喊话！");
          return false;
          break;
        default: // =>1
          break;
      }
      var resOAIdx = rv_arr[1];
      setTimeout(
          function () {
            var rv = P_LY.CallTalkControl.StartCall(connectId, puid, resOAIdx); // 开始喊话
            if (rv.rv == P_Error.SUCCESS) {
              node.window.status.calling = true;
              node.window.customParams.upaudio = "end";
              P_LY.WindowAttachEvent.UpdateMenuCommand(node.window, [{key: "playupaudio", text: "停止喊话"}]);
              log("开始喊话");
            }
          }, 200
      )
    } else {
      var rv = P_LY.CallTalkControl.Stop(connectId, node.window.params.puid, resOAIndex);
      if (rv.rv == P_Error.SUCCESS) {
        node.window.status.calling = false;
        node.window.customParams.upaudio = "start";
        P_LY.WindowAttachEvent.UpdateMenuCommand(node.window, [{key: "playupaudio", text: "开始喊话"}]);
        log("停止喊话");
      }
    }
  }
}

function reset() {
  $('#conn_form').form('reset');
}

function replay(obj) {
  console.log(obj)
  var puid = obj.window.params.puid;
  var idx = obj.window.params.idx;
  var cameraName = obj.description.name;
  var description = obj.description;
  console.log(puid, idx, cameraName, description)
  //先停止视频
  stop();
  log("正在重新播放视频" + cameraName);
  if (!P_LY.WindowContainers.get('windowbox')) {
    P_LY.WindowContainers.set('windowbox', new P_LY.Struct.WindowContainerStruct('windowbox', P_LY.Enum.WindowType.VIDEO));
  }
  if (P_LY.WindowContainers.get('windowbox')) {
    var menu_params = {
      menu_command: {
        status: true,
        menu: [
          {key: "stopvideo", text: "停止视频"},
          {key: "playaudio", text: "播放音频"},
          {key: "playtalk", text: "开始对讲"},
          {key: "playupaudio", text: "开始喊话"}
        ],
        callback: function (key) {
          switch (key) {
            case "stopvideo":
              stop();
              break;
            case "playaudio":
              playaudio();
              break;
            case "playtalk":
              play_talk();
              break;
            case "playupaudio":
              play_call();
              break;
          }
        }
      }
    }
    var wndEvent = new P_LY.Struct.WindowEventStruct();

    wndEvent.fsw_show.status = false;
    wndEvent.fsw_hide.status = false;
    wndEvent.redraw_window.status = false;

    wndEvent.menu_command.status = menu_params.menu_command.status;
    wndEvent.menu_command.menu = menu_params.menu_command.menu;
    wndEvent.menu_command.callback = menu_params.menu_command.callback;


    var rv = P_LY.CreateWindow(connectId, 'windowbox', P_LY.Enum.WindowType.VIDEO, wndEvent);

    if (rv.rv != P_Error.SUCCESS) {
      log("创建窗口失败,rv" + rv.response);
      return false;
    }
    var window = rv.response;
    P_LY.WindowContainers.get('windowbox').description.name = cameraName;
    P_LY.WindowContainers.get('windowbox').window = window;
    P_LY.WindowContainers.get('windowbox').description = description;
    P_LY.WindowContainers.get('windowbox').window.customParams.upaudio = "start";
    P_LY.WindowContainers.get('windowbox').window.customParams.talk = "start";
    P_LY.WindowContainers.get('windowbox').window.customParams.gpsstatus = "start";
    ;
    var operator = P_LY.PlayVideo(connectId, window, puid, idx);

    P_LY.ResizeWindowDimension(window, "100%", "100%");
    if (operator.rv != P_Error.SUCCESS) {
      P_LY.ResizeWindowDimension(window, 0, 0);
      log("重新播放视频失败,rv =" + operator.rv + ",response=" + operator.response);
      return false;
    }
    $('#playtoolbar').show();

  }
}

function notify(notify) {
//	console.log(notify)
  var container = P_LY.WindowContainers.get('windowbox');
  if (container) {
    if (container.window.status.playvideoing) {
      //console.log(container.window,notify);
      if (notify.eventName == "stream_status_notify" && notify._HANDLE == container.window.params.ivStreamHandle) {
        var ivName = container.description.name;
        var status = "";

        switch (Number(notify.status)) {//-1表示流已断开，0表示正在缓冲，1表示正在播放,2表示正在下载，3表示下载完成
          case -1:
            status = "流已断开"
            //重新播放
            replay(container)
            break;
          case 0:
            status = "正在缓冲"
            break;
          case 1:
            status = "正在播放"
            break;
        }
        var _bite = function (bite) {
          return (bite / 1000).toFixed(0) + "KB/s";
        }
        var bitrate = notify.keyData.bit_rate;
        var bite = _bite(bitrate)
        var framerate = notify.keyData.frame_rate || 0;
        var frame = framerate || 0;
        var recStr = "";
        if (container.window.status.recording) {
          status += ",正在录像"
        }

        var audStr = "";
        if (container.window.status.playaudioing) {
          status += ",正在播放声音"
        }

        var upaudStr = "";
        if (container.window.status.calling) {
          status += ",正在喊话"
        }

        var talkStr = "";
        if (container.window.status.talking) {
          status += ",正在对讲"
        }

        var fb = "帧率：" + frame + "，码率：" + bite;
        $("#windowtitle").html(ivName + "," + fb + "," + status);

      }
    }
  }
}

function log(str) {
  var html = $("#msg_bar").html() + "<li><nobr>" + str + "</nobr></li>";
  $("#msg_bar").html(html);
}

export default {
  data() {
    return {
      videoList: [],
      pu: null,
      currIndex: 0
    }
  },
  methods: {
    connect() {
      console.warn('------开始连接------')

      //创建连接,并记录在P_LY.Connections中
      var ip = _cf.connParams.ip;
      var port = _cf.connParams.port;
      var epId = _cf.connParams.epId;
      var uid = _cf.connParams.uid;
      var pwd = _cf.connParams.pwd;
      var bfix = _cf.connParams.bfix;

      // 构造连接对象
      var param = new P_IF.Struct.ConnParamStruct(ip, port, uid, epId, pwd, bfix || 0);
      log("登录参数:" + JSON.stringify(param));

      // 连接平台
      var conn = P_LY.Connect(param);

      if (conn.rv == P_Error.SUCCESS) {
        connectId = conn.response;// 连接成功，返回connectId，此参数很重要，后面很多操作都需要
        log("连接成功:connectId=" + connectId);
        console.warn('------连接成功------')
        $('#connect_btn').hide();
        $('#disconnect_btn').show();


        var d = new Array(), presetData = new Array();
        for (var i = 1; i <= 255; i++) {
          d.push({id: i.toString(), name: "预置位" + i});
        }
        presetData = $.extend(true, [], d);
        $('#pre_position_combobox').combobox({
          valueField: 'id',
          textField: 'name',
        });
        $('#pre_position_combobox').combobox('loadData', presetData);

        //获取设备树
        this.fetch_resource();

        //获取分组树
        fetch_group();
        // 开接收流状态事件
        P_LY.NCNotifyManager.Add(P_LY.Enum.NCObjectNotify.stream_status_notify, notify);

        //开启GPS接受事件
        //	P_LY.NCNotifyManager.Add(P_LY.Enum.NCObjectNotify.gps_data_notify,gps_notify);
        P_LY.NCNotifyManager.Add(P_LY.Enum.NCObjectNotify.event_notify, function (notify) {
          var events = $(notify.keyData).find("E");
          for (var i = 0; i < events.length; i++) {
            var e = events[i];
            var e_id = $(e).attr("ID");
            var e_src = $(e).find("Src");
            var e_src_type = $(e_src).attr("Type");
            var e_src_id = $(e_src).attr("ID");
            switch (e_id) {
              case "E_PU_Online":
                break;
              case "E_PU_Offline":
                break;
              case "E_CUSTOM_ConnectionBreakOff":
                break;
            }

          }
        });

      } else {
        log(P_Error.Detail(conn.rv));
      }
    },
    disconnect() {
      stop();
      var rv = P_LY.DisConnection(connectId);
      if (rv.rv == P_Error.SUCCESS) {
        log("断开成功");
        connectId = null;
        $('#connect_btn').show();
        $('#disconnect_btn').hide();
        $('#res_tree').tree('loadData', []);
      } else {
        log(P_Error.Detail(rv.rv));
      }
    },
    stop() {
      stop()
    },
    fetch_resource() {

      puListArray = new Array();
      pulist = new Array();
      var offset = 0;
      var cnt = 2000;// 这里demo只查询100个资源，实际应用，可以根据需求，如果返回的节点数等于要查询的数，说明可能还有资源，可以继续获取

      var rv = P_LY.ForkResource(connectId, P_LY.Enum.ForkResourceLevel.nppForkPUInfo, offset, cnt, "");
      if (rv.rv == P_Error.SUCCESS) {
        var pu = rv.response;
        if (pu && typeof pu == "object") {
          pulist = pulist.concat(pu);
        }
      }


      var domainRoads = P_LY.Connections.get(connectId).domainRoad;
      if (domainRoads && $.isArray(domainRoads)) {
        for (var j = 0; j < domainRoads.length; j++) {
          var dr = domainRoads[j].domain_road;
          var operator = P_LY.ForkResource(connectId, P_LY.Enum.ForkResourceLevel.nppForkPUInfo, 0, 200, dr);
          if (operator.rv == P_Error.SUCCESS) {
            pulist = pulist.concat(operator.response);
          }
        }
      }
      if (pulist.length > 0) {
        var onlineCameras = new Array(), offlineCameras = new Array(), onlineNum = 0
        for (var i = 0; i < pulist.length; i++) {
          var p = pulist[i];
          if (p.online == 1) {
            onlineNum++;
            onlineCameras.push(p)
          } else {
            offlineCameras.push(p)
          }
        }
        pulist = onlineCameras.concat(offlineCameras);

        // this.pu = pulist.find(v => v.name === '5G应急车' && v.online == '1')
        this.pu = pulist[0]

        var rv = P_LY.ForkResource(connectId, P_LY.Enum.ForkResourceLevel.nppForkOnePUInfo, 0, 0, null, {PUID: this.pu.puid});
        this.videoList = rv.response.childResource.filter(v => v.type == P_LY.Enum.PuResourceType.VideoIn)
        console.warn('----获取到以下设备----')
        console.log(pulist)
        console.log(this.videoList)



      } else {
        log("没有获取资源,rv=" + rv.rv);
      }
    },
    play(pu, pures) {
      const that = this
      // 窗口对象一定放到WindowContainers，这个请开发人员注意
      if (!P_LY.WindowContainers.get('windowbox')) {
        P_LY.WindowContainers.set('windowbox', new P_LY.Struct.WindowContainerStruct('windowbox', P_LY.Enum.WindowType.VIDEO));
      }

      if (P_LY.WindowContainers.get('windowbox')) {
        var window = P_LY.WindowContainers.get('windowbox').window;
        if (window != null) {
          if (window.status.playvideoing) {
            stop('windowbox');
          }
        }


        var menu_params = {
          menu_command: {
            status: true,
            menu: [
              {key: "stopvideo", text: "停止视频"},
              {key: "playaudio", text: "播放音频"},
              {key: "playtalk", text: "开始对讲"},
              {key: "playupaudio", text: "开始喊话"},
              {key: "cloudrecord", text: "云录像"},
              {key: "cloudsnapshot", text: "云抓拍"}
            ],
            callback: function (key) {
              switch (key) {
                case "stopvideo":
                  stop();
                  break;
                case "playaudio":
                  playaudio();
                  break;
                case "playtalk":
                  play_talk();
                  break;
                case "playupaudio":
                  play_call();
                  break;
                case "cloudsnapshot":
                  cloud_snapshot();
                  break;
                case "cloudrecord":
                  cloud_record();
                  break;
              }
            }
          }
        }
        var wndEvent = new P_LY.Struct.WindowEventStruct();
        wndEvent.lbtn_click.status = true;
        wndEvent.lbtn_click.callback = function () {
          console.log("单击")
          //单击事件回调
        }
        //wndEvent.fsw_show.status = false;
        //wndEvent.fsw_hide.status = false;
        //wndEvent.redraw_window.status = false;

        wndEvent.menu_command.status = menu_params.menu_command.status;
        wndEvent.menu_command.menu = menu_params.menu_command.menu;
        wndEvent.menu_command.callback = menu_params.menu_command.callback;


        var rv = P_LY.CreateWindow(connectId, 'windowbox', P_LY.Enum.WindowType.VIDEO, wndEvent);

        if (rv.rv != P_Error.SUCCESS) {
          log("创建窗口失败,rv" + rv.response);
          return false;
        }
        window = rv.response;

        window.customParams.cameraName = pures.name;
        P_LY.WindowContainers.get('windowbox').window = window;
        P_LY.WindowContainers.get('windowbox').description = pures;
        P_LY.WindowContainers.get('windowbox').window.customParams.upaudio = "start";
        P_LY.WindowContainers.get('windowbox').window.customParams.talk = "start";
        P_LY.WindowContainers.get('windowbox').window.customParams.gpsstatus = "start";
        ;
        var operator = P_LY.PlayVideo(connectId, window, pu.puid, pures.idx);

        //查询GPS数据
        //	QueryHistoryGPSData(connectId,pu.puid);

        P_LY.ResizeWindowDimension(window, "100%", "100%");
        if (operator.rv != P_Error.SUCCESS) {
          P_LY.ResizeWindowDimension(window, 0, 0);
          log("播放视频失败,rv =" + operator.rv + ",response=" + operator.response);
          return false;
        }
        $('#playtoolbar').show();
        log("正在播放视频" + pu.name);
        playaudio()


      }
    },
    changeChannel (n) {
      this.currIndex = n
      this.play(this.pu, this.videoList[this.currIndex])
    },
    // 初始化插件对象，必须初始化成功后才可以调用所有接口
    load() {
      P_LY.UnLoad();
      //初始化插件,插件初始化失败给出提示
      try {
        var rv = P_LY.Init(new P_LY.Struct.InitParamStruct(true, function (msg) {
              log(JSON.stringify(msg));
            }
        ));
        if (rv.rv != 0) {
          if (rv.rv == "777") {
            //插件没有安装，或者安装后没有加载成功
            log("没有检测到插件，可能插件没有安装，或者安装失败")
          }
          if (rv.rv == "782") {
            log("插件版本过低，请安装最新版本的插件")
          }
          return false;
        }
        this.connect()
        // 加载默认的连接参数
        return true;
      } catch (e) {
        $("#msg_bar").html(e.name + "," + e.message);
        return false;
      }
    },
    // 释放插件对象，网页退出必须释放插件，否则会出现浏览器异常的错误
    unload() {
  P_LY.UnLoad();
}
  },
  mounted() {
    window.addEventListener("load", this.load);
    window.addEventListener("unload", this.unload, false);
  },
  beforeDestroy() {
    window.removeEventListener("load", this.load);
    window.removeEventListener("unload", this.unload, false);
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
  #windowbox {
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
  display: flex;
  height: 32px;
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
