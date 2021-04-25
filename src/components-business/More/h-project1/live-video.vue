<template>
	<div>
		<ul class="video-list fn-flex pos-a">
			<li
				v-for="(k, i) in videoList"
				:key="i"
				:class="{ active: currIndex === i }"
				@click="changeChannel(i)"
			>
				{{ k.Name }}
			</li>
		</ul>
		<div class="video-wrap">
			<div class="mask" v-if="!isPlaying">
				<img src="./img/carwifi.svg" />
				<div class="enter" @click="changeChannel(currIndex)">
					进入直播
				</div>
			</div>
			<div class="windowbox" @dblclick="videofullscreen">
				<video
					id="liveVideoShow"
					ref="live"
					class="video-js"
					style="
						width: 100%;
						height: 100%;
						background-color: black;
						object-fit: fill;
					"
					@timeupdate="progress($event)"
				></video>
			</div>
		</div>
	</div>
</template>
<script>
const { event } = eslinkV
// todo 改造
const _cf = {
	ver: 'debug',
	q2httpServer: {
		host: '36.134.113.152',
		port: 9585,
		sslPort: 443,
		secure: false,
	},
	// - 配置登录参数
	connParams: {
		// - 登录平台IP
		address: '36.134.113.152',
		port: '9988',
		// - 登录平台用户名
		user: 'hzranqi',
		// - 登录平台密码
		password: 'rq123456',
		// - 登录平台企业ID
		epid: 'hzrq',
		// - 登录平台是否通过网闸模式
		bfix: 1,
	},
}
const liveVideo = {
	flvPlayer: null,
	myPlayer: null,
	pauseVideo: () => {
		if (!liveVideo.flvPlayer?._emitter) return
		if (window.flvjs.isSupported()) {
			liveVideo.flvPlayer.unload()
			liveVideo.flvPlayer.detachMediaElement()
			liveVideo.flvPlayer.destroy()
		} else {
			liveVideo.myPlayer.reset()
		}
	},
}
let url = ''
let ws = null
let token = ''
let device_list = []
const ponBusyPos = new Array()
const pictureId = ''
const storageId = ''
const videoelem = ''
const flvPlayerList = []
const replay = 0
const chooseplaysite = 0 // 选中的第几窗口,默认为0代表没有选择

const host =
	'http://' + _cf.q2httpServer.host + ':' + _cf.q2httpServer.port + '/icvs2/'

// post请求
function requestPost(router, params, callback) {
	$.ajax({
		type: 'post',
		url: host + router,
		data: params,
		traditional: true,
		dataType: 'json',
		async: true,
		complete: function (rv) {
			if (typeof callback === 'function') callback(rv)
		},
	})
}

// get请求
function requestGet(router, callback) {
	const url = host + router
	$.ajax({
		type: 'get',
		url: url,
		dataType: 'json',
		async: true,
		complete: function (rv) {
			if (typeof callback === 'function') callback(rv)
		},
	})
}

function createPlayer() {
	let videoElement = document.getElementById('liveVideoShow')
	if (videoelem) {
		videoElement = videoelem
	}
	liveVideo.myPlayer = new videojs('videoElement', {
		techOrder: ['html5', 'flash'],
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
				inline: false,
			},
			remainingTimeDisplay: false,
			progressControl: false,
			LiveDisplay: true,
		},
	})
}

// 开始对讲
function starttalk() {
	const camera = get_select_node()
	if (!camera) return
	const puid = camera.puid
	const idx = camera.idx
	startTalk(host, token, puid, idx, 'token1', function (message) {
		console.log(message)
	})
}

function stoptalk() {
	const camera = get_select_node()
	if (!camera) return
	const puid = camera.puid
	const idx = camera.idx
	stopTalk(puid)
}

export default {
	data() {
		return {
			videoList: [],
			puList: [],
			pu: null,
			currIndex: 0,
			isPlaying: false,
		}
	},
	methods: {
		connect() {
			console.warn('------开始连接------')
			const params = {
				address: _cf.connParams.address,
				port: _cf.connParams.port,
				user: _cf.connParams.user,
				password: _cf.connParams.password,
				epid: _cf.connParams.epid,
				fixaddr: _cf.connParams.bfix,
			}
			requestPost('login', params, rv => {
				const result = {
					errcode: -1,
					token: '',
				}
				const respJSON = rv.responseJSON
				if (respJSON.hasOwnProperty('errcode')) {
					result.errcode = respJSON.errcode
				}
				if (respJSON.hasOwnProperty('token')) {
					result.token = respJSON.token
					result.errcode = 0
					token = result.token
					this.fetch_device(0, 200)
				}
				if (_cf.q2httpServer.secure === true) {
					url =
						'wss://' +
						_cf.q2httpServer.host +
						':' +
						_cf.q2httpServer.sslPort +
						'?token=' +
						token
				} else {
					url =
						'ws://' +
						_cf.q2httpServer.host +
						':' +
						_cf.q2httpServer.port +
						'?token=' +
						token
				}
				console.log(url)
				if ('WebSocket' in window) {
					ws = new WebSocket(url)
					ws.onopen = function () {}
					ws.onmessage = function (evt) {
						if (typeof evt === 'object' && evt.data) {
							const msg = $.xml2json(evt.data)

							const event = msg.E || null

							if (event) {
								if (event.ID == 'E_CU_Online') {
									$.messager.show({
										title: '消息',
										msg:
											'用户上线(' +
											(event.Desc.UserID +
												'@' +
												event.Desc.EPID) +
											')',
										timeout: 3000,
										showType: 'slide',
									})
								} else if (event.ID == 'E_CU_Offline') {
									$.messager.show({
										title: '消息',
										msg:
											'用户下线(' +
											(event.Desc.UserID +
												'@' +
												event.Desc.EPID) +
											')',
										timeout: 3000,
										showType: 'slide',
									})
								} else if (event.ID == 'E_PU_Online') {
									$.messager.show({
										title: '消息',
										msg: '设备上线.',
										timeout: 3000,
										showType: 'slide',
									})
								} else if (event.ID == 'E_PU_Offline') {
									$.messager.show({
										title: '消息',
										msg: '设备下线.',
										timeout: 3000,
										showType: 'slide',
									})
								} else {
									console.log(
										' no treatment event id ' +
											(event.ID ? event.ID : ''),
									)
								}
							}
						}
					}
					ws.onclose = function () {}
					ws.onerror = function () {}
				} else {
					console.log('not support web socket.')
				}
			})
		},
		updateDevice(index) {
			this.pu = this.puList[index]

			requestPost(
				'C_CAS_QueryPUIDRes?token=' + token,
				{ puid: [this.pu.$] },
				rv => {
					// 过滤直播资源
					this.videoList = rv.responseJSON.Res.filter(
						v => v.Type === 'IV' || v.Type === 'ST',
					)
					console.warn('------获取到以下子设备---------')
					console.log(this.videoList)
				},
			)
		},
		fetch_device() {
			// 获取设备列表的接口
			const router =
				'CAS/C_CAS_QueryPUIDSets?offset=' +
				0 +
				'&count=' +
				2000 +
				'&token=' +
				token
			requestGet(router, rv => {
				let respJSON = rv.responseJSON
				if (respJSON.constructor != Array) {
					respJSON = [respJSON]
				}
				device_list = respJSON

				console.warn('------获取到以下设备---------')
				console.log(device_list)
				// this.pu = device_list[0]
				this.puList = device_list.filter(v => v.OnlineFlag === '1')
				this.$emit('getPuList', this.puList)
				this.pu = this.puList[0]

				requestPost(
					'C_CAS_QueryPUIDRes?token=' + token,
					{ puid: [this.pu.$] },
					rv => {
						// 过滤直播资源
						console.log(rv)
						this.videoList = rv.responseJSON.Res.filter(
							v => v.Type === 'IV' || v.Type === 'ST',
						)
						console.warn('------获取到以下子设备---------')
						console.log(this.videoList)
					},
				)
			})
		},
		progress(e) {
			const bf = e.srcElement.buffered
			const currentTime = e.srcElement.currentTime
			if (bf.length > 0) {
				const end = bf.end(0)
				if (end - currentTime > 1.5) {
					e.srcElement.currentTime = end - 0.1
				}
			}
		},
		videofullscreen() {
			const p = this.$refs.live
			$(p).fullScreen(true)
			// $(p).toggleFullScreen();
			$(p).fullScreen(false)
		},
		playvideo(puid, idx) {
			liveVideo.pauseVideo()
			// 播视频接口
			const url =
				host +
				'stream.flv?puid=' +
				puid +
				'&idx=' +
				idx +
				'&stream=0&token=' +
				token
			this.isPlaying = true
			if (flvjs.isSupported()) {
				let videoElement = ''
				videoElement = this.$refs.live

				videoElement.controls = false
				liveVideo.flvPlayer = flvjs.createPlayer(
					{
						type: 'flv',
						url: url,
						isLive: true,
					},
					{
						enableWorker: false,
						autoCleanupSourceBuffer: true, // 清理缓冲区
						enableStashBuffer: false,
						stashInitialSize: 128, // 减少首桢显示等待时长
						statisticsInfoReportInterval: 600,
					},
				)
				liveVideo.flvPlayer.attachMediaElement(videoElement)
				liveVideo.flvPlayer.load()
				event.actions.setEvent('pauseVideo', liveVideo.pauseVideo)
				setTimeout(function () {
					liveVideo.flvPlayer.play()
				}, 100)
			} else {
				createPlayer()
				liveVideo.myPlayer.src(url)
				liveVideo.myPlayer.on('error', e => {
					setTimeout(e => {
						liveVideo.myPlayer.src(url)
						liveVideo.myPlayer.load(url)
						liveVideo.myPlayer.play()
					}, 1000)
				})
				event.actions.setEvent('pauseVideo', liveVideo.pauseVideo)
				liveVideo.myPlayer.on('ended', e => {
					setTimeout(e => {
						liveVideo.myPlayer.src(url)
						liveVideo.myPlayer.load(url)
						liveVideo.myPlayer.play()
					}, 1000)
				})
			}
		},
		changeChannel(n) {
			this.currIndex = n
			this.playvideo(this.pu.$, this.videoList[this.currIndex].Idx)
		},
		handleSceneChange() {
			liveVideo.pauseVideo()
		},
	},
	created() {
		this.connect()
	},
	mounted() {
		document.addEventListener('SceneIndex', this.handleSceneChange)
	},
	beforeDestroy() {
		document.removeEventListener('SceneIndex', this.handleSceneChange)
	},
}
</script>
<style lang="scss" scoped>
.video-wrap {
	position: relative;
	width: 640px;
	height: 400px;
	padding: 4px;
	background: url('./img/shipk.svg') no-repeat;

	.windowbox {
		width: 100%;
		height: 100%;
		background: #000;
	}

	.mask {
		position: absolute;
		top: 4px;
		right: 4px;
		bottom: 4px;
		left: 4px;
		z-index: 1;
		padding-top: 130px;
		text-align: center;

		.enter {
			width: 112px;
			height: 40px;
			margin: 24px auto 0;
			font-size: 24px;
			line-height: 40px;
			color: #fff;
			cursor: pointer;
			background: #0057a9;
			border-radius: 4px;
		}
	}
}

.video-list {
	top: -42px;
	height: 32px;
	margin-bottom: 12px;

	li {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px 8px;
		margin-right: 8px;
		font-size: 18px;
		color: rgba(255, 255, 255, 0.75);
		cursor: pointer;
		background: rgba(0, 87, 169, 0.5);
		border-radius: 4px;

		&.active {
			color: #fff;
			background: #0057a9;
			border: 1px solid #0df;
		}
	}
}
</style>
