(function (window) { 
    //兼容  
    window.URL = window.URL || window.webkitURL;
    //请求麦克风
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var recorder = {};
    var dtcWs = {};
    var cb = {};

    var Recorder = function (stream, config, name) {  
        
        config = config || {};
		config.sampleBits = config.sampleBits || 16;      //输出采样数位 8, 16
        config.sampleRate = config.sampleRate || (8000);   //输出采样率(1/6 48000)
        
        // 音频上下文对象，可创建不同的AudioNode
	    var context = new AudioContext();
        
        //将声音输入这个对像  
        var audioInput = context.createMediaStreamSource(stream);  
        
        //设置音量节点  
        // var volume = context.createGain();
        // audioInput.connect(volume);

        var recorder = context.createScriptProcessor(4096, 1, 1);

        var audioData = {
            size: 0          //录音文件长度
            , buffer: []    //录音缓存
            , inputSampleRate: context.sampleRate   //输入采样率
            , inputSampleBits: 16      //输入采样数位 8, 16
            , outputSampleRate: config.sampleRate
            , oututSampleBits: config.sampleBits
            , clear: function() {
                this.buffer = [];
                this.size = 0;
            }
            /**
             * @param {!Float32Array} data
             */
            , input: function (data) {
                this.buffer.push(new Float32Array(data));
                this.size += data.length;
            }
            , compress: function () { //合并压缩
                //合并
                var data = new Float32Array(this.size);
                var offset = 0;
                for (var i = 0; i < this.buffer.length; i++) {
                    data.set(this.buffer[i], offset);
                    offset += this.buffer[i].length;
                }
                //压缩
                var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
                var length = data.length / compression;
                var result = new Float32Array(length);
                var index = 0, j = 0;
                while (index < length) {
                    result[index] = data[j];
                    j += compression;
                    index++;
                }
                return result;
            }, floatTo16BitPCM : function(input, output) {
                for(var i = 0; i < input.length; i++){
                    var s = Math.max(-1, Math.min(1, input[i]));
                    output[i] = (s < 0 ? s * 0x8000 : s * 0x7FFF);
                }
            }, convertBuffer :function() {
                var bytes = this.compress();
                //console.log(bytes);
                var data = new Float32Array(bytes);
                var out = new Int16Array(bytes.length);
                this.floatTo16BitPCM(data, out);
                return out;
            }, encodePCM:function() {
                // PCM
                var bytes = this.convertBuffer();
                var data = new DataView(bytes.buffer);
                return data;
            }, encodeG711A : function() {//转G711A
                // G711A
                var smaples = this.convertBuffer();
                var g7111aBuf = alawmulaw.alaw.encode(smaples);
                return g7111aBuf;
            }, encodeG711aBuffer:function() {
                // DataView
                var smaples = this.convertBuffer();
                var g7111aBuf = alawmulaw.alaw.encode(smaples);
                var data = new DataView(g7111aBuf.buffer);
                return data;
            }
        };

        //开始录音  
        this.start = function () {
            audioInput.connect(recorder);  
            recorder.connect(context.destination);
        };  

        //停止  
        this.stop = function () {
            audioInput.disconnect();  
            recorder.disconnect();
        };

        this.getData = function(){
            return audioData.encodeG711A();
        };

        //回放  
        this.play = function (audio) {  
            audio.src = window.URL.createObjectURL(this.getBlob());
        };  
        
        //获取音频文件
        this.getBuffer = function(){
            //return audioData.encodePCM();
            return audioData.encodeG711aBuffer();
        };
        //清空缓存
        this.clear = function() {
            audioData.clear();
        };

        //音频采集
        var that = this;
        recorder.onaudioprocess = function (e) {
            audioData.input(e.inputBuffer.getChannelData(0));
            var data = that.getData();
            // getG711A(data);
            if(dtcWs[name]){
                dtcWs[name].send(data);
            };
            that.clear();
        };
    };
    //抛出异常  
    Recorder.throwError = function (message) {  
        throw new function () { this.toString = function () { return message; };};  
    };  
    //是否支持录音  
    Recorder.canRecording = (navigator.getUserMedia != null);  
    //获取录音机  
    Recorder.get = function (callback, config, name) {  
        if (callback) {  
            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    { audio: true } //只启用音频
                    , function (stream) {
                        var rec = new Recorder(stream, config, name);
                        callback(rec);
                    }
                    , function (error) {
                        switch (error.code || error.name) {
                            case 'PERMISSION_DENIED':
                            case 'PermissionDeniedError':
                                STRecorder.throwErr('用户拒绝提供信息。');
                                break;
                            case 'NOT_SUPPORTED_ERROR':
                            case 'NotSupportedError':
                                STRecorder.throwErr('浏览器不支持硬件设备。');
                                break;
                            case 'MANDATORY_UNSATISFIED_ERROR':
                            case 'MandatoryUnsatisfiedError':
                                STRecorder.throwErr('无法发现指定的硬件设备。');
                                break;
                            default:
                                console.log('无法打开麦克风。异常信息:', error);
                                STRecorder.throwErr('无法打开麦克风。异常信息:' + (error.code || error.name));
                                break;
                        }
					}
                );
                return;
            }else if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
                navigator.mediaDevices.getUserMedia({
                    audio: true 
                })
                .then(function(stream) {
                    var rec = new Recorder(stream, config, name);
                    callback(rec); 
                }).catch(function(error) {
                    switch (error.code || error.name) {  
                        case 'PERMISSION_DENIED':  
                        case 'PermissionDeniedError':  
                            Recorder.throwError('用户拒绝提供信息。');  
                            break;  
                        case 'NOT_SUPPORTED_ERROR':  
                        case 'NotSupportedError':  
                            Recorder.throwError('浏览器不支持硬件设备。');  
                            break;  
                        case 'MANDATORY_UNSATISFIED_ERROR':  
                        case 'MandatoryUnsatisfiedError':  
                            Recorder.throwError('无法发现指定的硬件设备。');  
                            break;  
                        default:  
                            Recorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));  
                            break;  
                    }  
                });
                return;
            }else {  
                Recorder.throwError('当前浏览器不支持录音功能。'); return;  
            }  
        }  
    };

    function dtcWebsocket(IP,Port,Token,queryToken,name){ // 连接websocket
        var http = location.protocol.indexOf("https") == -1?'ws://':'wss://';
        var ws = new WebSocket(http + location.host + '?token=' + queryToken + '&IP=' + IP + '&Port=' + Port + '&Token=' + Token + '&dtc=true');
        ws.onopen = function (evt) {
            var message = {
                type: "websocket_success",
                msg: "dtc websocket连接成功"
            };
            if(cb[name]){
                cb[name](message)
            };
            Recorder.get(function (rec) { 
                recorder[name] = rec;
                recorder[name].start();
            },{},name);
        };

        ws.onclose = function(evt){
            var message = {
                type: "websocket_close",
                msg: "dtc websocket连接断开"
            };
            if(cb[name]){
                cb[name](message)
            };
            recorder[name].stop();  //关闭采集数据
            recorder[name].clear(); //清空采集数据缓存
            recorder[name] = null;
            dtcWs[name] = null;  //清空websocket
            cb[name] = null;
        };

        ws.onerror = function(evt){
            var message = {
                type: "websocket_error",
                msg: evt
            };
            if(cb[name]){
                cb[name](message)
            };
            recorder[name].stop();
            recorder[name].clear();
            recorder[name] = null;
            dtcWs[name] = null;  //清空websocket
            cb[name] = null;
        };
        return ws;
    }
    window.Recorder = Recorder; 

    window.startTalk = function(url,token,puid,idx,name,callback){ //开启对讲,每开启一个对讲就开启一个websocket,关闭对讲就要关闭websocket
        if(callback){
            cb[name] = callback;
        }
        axios.post(url+"audio/startTalk?token=" + token,{
            puid: puid,
            idx: idx
	        },{
    	  		headers: {'Content-Type': 'application/json'},
    	  	})
        .then(function (res) {
        	
            if(res.data.ErrorCode){
                var message = {
                    type: "startTalk_error",
                    msg: res.data.message
                };
                if(cb[name]){
                    cb[name](message)
                };
                return;
            }else{
            	
                dtcWs[name] = dtcWebsocket(res.data.IP,res.data.Port,res.data.Token,token,name);
                var message = {
                    type: "startTalk_success",
                    msg: "打开对讲成功"
                };
                if(cb[name]){
                    cb[name](message)
                };
                return;
            };
        })
        .catch(function (err) {
            console.log(err);
        });
    };

    window.stopTalk = function(name){
        if(recorder[name]){
            dtcWs[name].close(); //关闭websocket
            var message = {
                type: "stopTalk_success",
                msg: "关闭对讲成功"
            };
            if(cb[name]){
                cb[name](message)
            };
            return;
        }else{
            var message = {
                type: "stopTalk_error",
                msg: "未找到对讲无法停止对讲"
            };
            if(cb[name]){
                cb[name](message)
            };
            return;
        };
    };
})(window);