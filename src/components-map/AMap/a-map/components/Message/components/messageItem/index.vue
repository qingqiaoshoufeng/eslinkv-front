<template lang="pug">
.message-item
	.title {{ data.name }}
	Icon.expend-btn.pointer(
		v-if="this.data.messageStatus == 0 && !this.alwaysExpend",
		:type="ependReply ? 'ios-arrow-up' : 'ios-arrow-down'",
		size="24",
		@click="ependReply = !ependReply")
	.content(ref="content")
		template(v-if="showTextExpend")
			span.content-text {{ data.interactionContent.slice(0, textExpend ? -1 : 41) }}
			span {{ textExpend ? '' : '...' }}
			span.text-expend-btn(@click="changeExpend") {{ textExpend ? '收起' : '展开' }}
		span(v-if="!showTextExpend") {{ data.interactionContent }}
	.time {{ data.createTime }}
	.to-reply(v-if="data.messageStatus == 1")
		Input(
			v-model="replyContent",
			type="textarea",
			:rows="3",
			placeholder="回复信息",
			style="width: 100%")
		.button.pointer(@click="handleReply", :class="replyContent ? 'valid' : ''")
			span 发送
	.replyed(
		v-if="(alwaysExpend && data.messageStatus == 0) || (ependReply && data.messageStatus == 0)")
		.reply-title 回复内容：
		.reply-content {{ data.interactionResult }}
		.time {{ data.createTime }}
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Input, Icon } from 'view-design'
import { toReplyMessage } from '@/components-map-api/message.api.js'

@Component({ components: { Input, Icon: Icon } })
export default class MessageItem extends Vue {
	replyContent = ''
	ependReply = false
	textExpend = false
	showTextExpend = false
	sending = false
	@Prop(Object) data: any
	@Prop(Boolean) alwaysExpend: any
	created() {
		this.showTextExpend = this.data.interactionContent.length > 41
	}

	@Emit('refresh')
	handleReply() {
		const { replyContent, data, sending } = this
		const { messageId } = data
		if (!replyContent || sending) {
			return false
		}
		this.sending = true
		return new Promise(resolve => {
			toReplyMessage({
				messageId: messageId,
				resultContent: replyContent,
			}).then(data => {
				if (data === 'OK') {
					resolve({
						...this.data,
						messageStatus: 0,
						interactionResult: replyContent,
					})
				}
				this.sending = false
			})
		})
	}

	@Emit('changeExpend')
	changeExpend() {
		this.textExpend = !this.textExpend
		return this.textExpend
	}
}
</script>
<style lang="scss" scoped>
.message-item {
	position: relative;
	padding: 24px;
	font-size: 20px;
	color: #fff;
	background: #012f87;

	.title {
		font-size: 24px;
		font-weight: 400;
		line-height: 24px;
		color: #ffdc45;
	}

	.expend-btn {
		position: absolute;
		top: 24px;
		right: 24px;
	}

	.content {
		margin-top: 24px;
		line-height: 32px;

		.content-text {
			word-break: break-all;
		}

		.text-expend-btn {
			margin-left: 8px;
			color: #0df;
			cursor: pointer;
		}
	}

	.time {
		margin: 2px 0 19px 0;
		opacity: 0.75;
	}

	.button {
		height: 40px;
		margin-top: 24px;
		line-height: 40px;
		text-align: center;
		background: rgba(0, 87, 169, 0.5);
		border-radius: 4px;

		> span {
			opacity: 0.4;
		}
	}

	.valid {
		> span {
			opacity: 1;
		}
	}

	&::v-deep textarea.ivu-input {
		font-size: 20px;
		color: #fff;
		background: #0057a9;
		border: 1px solid transparent;

		&:focus {
			border-color: #57a3f3;
		}
	}

	::-webkit-scrollbar {
		display: none;
	}

	.replyed {
		padding-top: 24px;
		line-height: 1;
		border-top: 1px solid #0057a9;

		.reply-title {
			color: #0df;
		}

		.reply-content {
			margin-top: 12px;
			line-height: 1.5em;
		}

		.time {
			margin: 0;
		}
	}
}
</style>
