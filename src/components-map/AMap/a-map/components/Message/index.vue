<template lang="pug">
.message.pointer.pos-a(
	v-if="JSON.stringify(message) !== '{}'",
	:class="{ 'un-read': unReadStatus, active }")
	.pos-a.icon-box
		svg-icon.icon(iconName="iconmessage", @click="showFullTagger")
		.un-read.pos-a(v-if="unReadStatus")
	span.content(@click="handleClick")
		marquee {{ message.interactionContent }}
	span.time {{ message.createTime }}
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import MessageAlert from './components/alert/index.js'
import MessageList from './components/messageList/index.js'
import SvgIcon from '../SvgIcon/index.vue'
import format from 'date-fns/format'
import {
	getUnReadMessage,
	getRecentMessageList,
} from '@/components-map-api/message.api.js'

@Component({
	components: { 'svg-icon': SvgIcon },
})
export default class AlertContent extends Vue {
	message: any = {}
	unReadStatus = true
	timer: any = null
	// alertInstance: any = null
	active = false

	showFullTagger() {
		this.active = !this.active
	}

	created() {
		this.getUnReadMessage()
		this.timer = setInterval(() => {
			this.getUnReadMessage()
		}, 10000)
	}

	beforeDestroy() {
		this.$off('message', this.showFullTagger)
		if (this.timer) {
			clearInterval(this.timer)
		}
	}

	getUnReadMessage() {
		getUnReadMessage().then(data => {
			if (data) {
				this.unReadStatus = true
				// if (this.alertInstance) {
				// 	this.alertInstance.close()
				// }
				// setTimeout(() => {
				// 	this.alertInstance = MessageAlert({
				// 		data: data,
				// 	})
				// }, 1000)
				this.formatTime(data)
			} else {
				this.getData()
				this.unReadStatus = false
			}
		})
	}

	formatTime(message) {
		let { createTime } = message
		if (createTime) {
			createTime = format(new Date(createTime), 'MM.dd HH:mm')
		}
		this.message = {
			...message,
			createTime,
		}
	}

	async getData(messageStatus = '1') {
		getRecentMessageList({
			messageStatus,
		}).then(data => {
			if (data && data.length > 0) {
				this.formatTime(data[0])
			}
		})
	}

	handleClick() {
		MessageList()
		document.removeEventListener('mapMessage', this.showFullTagger)
		document.addEventListener('mapMessage', this.showFullTagger, false)
	}
}
</script>
<style lang="scss">
.message {
	top: 108px;
	right: 32px;
	z-index: 10;
	box-sizing: border-box;
	align-items: center;
	width: 480px;
	height: 32px;
	font-size: 18px;
	color: #fff;
	border-radius: 20px;
	.un-read {
		width: 8px;
		height: 8px;
		background-color: red;
		border-radius: 8px;
		top: 2px;
		right: 0;
	}
	&.un-read::after {
		position: absolute;
		top: 4px;
		left: 24px;
		display: inline-block;
		content: ' ';
		border: 5px solid red;
		border-radius: 50%;
	}
	.icon-box {
		top: 4px;
		right: 8px;
	}
	.icon {
		font-size: 24px;
		vertical-align: middle;
	}

	&.active {
		background: #001a77;
		border: 1px solid #0df;
		.icon-box {
			right: auto;
			left: 8px;
		}
		.content,
		.time {
			display: block;
		}
	}

	.content {
		position: absolute;
		top: 0;
		right: 120px;
		bottom: 0;
		left: 40px;
		display: none;
		overflow: hidden;
		white-space: nowrap;
	}

	.time {
		position: absolute;
		right: 8px;
		display: none;
		opacity: 0.75;
	}
}
</style>
