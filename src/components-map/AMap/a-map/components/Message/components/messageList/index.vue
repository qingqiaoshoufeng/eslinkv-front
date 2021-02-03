<template lang="pug">
    .ms-container(:id="id")
        div(:style="pageTransform")
            .ms-bg(@click.stop="close")
            .ms-content(:class="ready?'ready':''")
                .ms-close-btn.pointer(@click="close")
                .ms-title.fn-flex
                    span  消息中心 
                    //- 下来选择
                    div.pos-r 
                        .select-btn.pointer(@click="showOptions=true")
                            span {{selectedItem.label}}
                            img(src="/static/icons/h-select-1.svg" :class="showOptions?'active':''")
                        ul.pos-a(:class="showOptions?'active':''")
                            li.pointer(:class="selectedItem.value==item.value?'active':''" v-for="item in options" @click="handleChange(item)") {{item.label}}
                //- 列表
                .ms-list(v-if="data.length")
                    ms-item.ms-item(@refresh="refresh" :key="msItem.messageId" v-for="msItem in data" :data="msItem") 
                no-data(:show="!loading && !data.length") 
                Icon(type="ios-loading" size="54" class="spin-icon-load" v-show="loading")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MsItem from '../messageItem/index.vue'
import NoData from '../../../NoData/index.vue'
import { Icon } from 'view-design'

@Component({ components: { 'ms-item': MsItem, 'no-data': NoData, Icon: Icon } })
class MessageAlert extends Vue {
	replyContent: string = ''
	id: string = ''
	visible: boolean = true
	ready: boolean = false
	loading: boolean = false
	data: any = []
	timer: any = []
	showOptions: boolean = false
	selectedItem: object = { label: '未回复', value: '2' }
	pageTransform: string = 'scale(1) translate3d(0px, 0px, 0px)'
	options: any = [
		{ label: '全部', value: '1' },
		{ label: '未回复', value: '2' },
		{ label: '已回复', value: '3' },
	]
	created() {
		this.id = 'messageList' + Math.ceil(Math.random() * 100)
		this.pageTransform = document.getElementById('kanban').style.cssText
		this.getData()
	}
	mounted() {
		this.ready = true
		this.timer = setInterval(() => {
			this.getData()
		}, 10000)
	}
	refresh(val) {
        if(val===false) return 
		this.getData()
	}
	close() {
		this.ready = false
		setTimeout(() => {
			this.$destroy()
		}, 300)
	}
	getData() {
		this.loading = true
		let { value } = this.selectedItem
		this.$sysApi.message
			.getRecentMessageList({
				messageStatus: value,
			})
			.then((data) => {
				this.data = data
				this.loading = false
			})
	}
	beforeDestroy() {
		document.getElementById(this.id)?.remove()
		if (this.timer) {
			clearInterval(this.timer)
		}
	}
	handleChange(item) {
		this.showOptions = false
		this.selectedItem = item
		this.getData()
	}
}

export default MessageAlert
</script>
<style lang="scss">
.ms-container {
	pointer-events: auto;
	position: fixed;
	inset: 0px;
	z-index: 99999;
	justify-content: center;
	align-items: center;
	display: flex;
	> div {
		position: relative;
		flex-shrink: 0;
		flex-grow: 0;
		overflow: hidden;
		z-index: 99999;
		right: 0px;
		.ms-bg {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
		}
		.ms-content {
			position: absolute;
			right: -80%;
			top: 0;
			bottom: 0;
			height: 100%;
			width: 544px;
			color: #fff;
			background: rgba(11, 0, 90, 0.9);
			border-left: 1px solid #00ddff;
			transition: right 0.3s linear;
			padding: 0 32px;

			&.ready {
				right: 0;
			}
			.ms-close-btn {
				position: absolute;
				top: calc(50% - 56px);
				left: 0;
				background-image: url('./img/back.svg');
				width: 24px;
				height: 112px;
			}
			.ms-title {
				position: relative;
				font-weight: 600;
				font-size: 32px;
				line-height: 32px;
				color: #00ddff;
				border-bottom: 2px solid rgba(255, 255, 255, 0.4);
				padding: 48px 0 16px 0;
				justify-content: space-between;
				align-items: flex-end;
				&::before,
				&::after {
					content: ' ';
					display: inline-block;
					width: 48px;
					height: 2px;
					background: #00ddff;
					position: absolute;
					bottom: -2px;
					right: 0px;
				}
				&::after {
					left: 0;
				}
				.select-btn {
					font-size: 20px;
					height: 32px;
					width: 96px;
					padding: 0 8px;
					line-height: 32px;
					background: #0057a9;
					border: 1px solid #00ddff;
					color: #fff;
					box-sizing: border-box;
					border-radius: 4px;
					display: flex;
					justify-content: space-between;
					> img {
						width: 10px;
						&.active {
							transform: rotate(180deg);
						}
					}
				}
				ul {
					top: 38px;
					right: 0;
					width: 96px;
					background: #0057a9;
					border-radius: 4px;
					transition: all 0.3s;
					height: 0;
					overflow: hidden;
					z-index: 100;

					&.active {
						padding: 8px 0;
						height: auto;
						max-height: 207px;
						border: 1px solid #00ddff;
						overflow-y: auto;
					}
					li {
						color: #fff;
						font-size: 16px;
						line-height: 32px;
						padding-left: 8px;
						transition: all 0.3s;
						height: 32px;

						&:hover {
							background: rgba(0, 221, 255, 0.5);
						}

						&.active {
							background: rgba(0, 221, 255, 0.5);
						}

						&:last-child {
							border-bottom: none;
						}
					}
				}
			}
			.ms-list {
				height: calc(100% - 100px);
				overflow: auto;
				.ms-item {
					margin: 24px 0;
				}
			}
			/deep/.spin-icon-load {
				animation: ani-demo-spin 1s linear infinite;
				position: absolute;
				top: 40%;
				left: 50%;
				transform: translate(-50%);
			}
			@keyframes ani-demo-spin {
				from {
					transform: rotate(0deg);
				}
				50% {
					transform: rotate(180deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
			::-webkit-scrollbar {
				display: none;
			}
		}
	}
}
</style>
