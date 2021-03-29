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
            { label: '已回复', value: '3' }
        ]

        created () {
            this.id = 'messageList' + Math.ceil(Math.random() * 100)
            this.pageTransform = document.getElementById('kanban').style.cssText
            this.getData()
        }

        mounted () {
            this.ready = true
            this.timer = setInterval(() => {
                this.getData()
            }, 10000)
        }

        refresh (val) {
            if (val === false) return
            this.getData()
        }

        close () {
            this.ready = false
            const event = new CustomEvent('mapMessage')
            document.dispatchEvent(event)
            setTimeout(() => {
                this.$destroy()
            }, 300)
        }

        getData () {
            this.loading = true
            const { value } = this.selectedItem
            this.$api.message
                .getRecentMessageList({
                    messageStatus: value
                })
                .then((data) => {
                    this.data = data
                    this.loading = false
                })
        }

        beforeDestroy () {
            document.getElementById(this.id)?.remove()
            if (this.timer) {
                clearInterval(this.timer)
            }
        }

        handleChange (item) {
            this.showOptions = false
            this.selectedItem = item
            this.getData()
        }
    }

	export default MessageAlert
</script>
<style lang="scss">
	.ms-container {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: auto;
		inset: 0;

		> div {
			position: relative;
			right: 0;
			z-index: 99999;
			flex-grow: 0;
			flex-shrink: 0;
			overflow: hidden;

			.ms-bg {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
			}

			.ms-content {
				position: absolute;
				top: 0;
				right: -80%;
				bottom: 0;
				width: 544px;
				height: 100%;
				padding: 0 32px;
				color: #fff;
				background: rgba(11, 0, 90, 0.9);
				border-left: 1px solid #0df;
				transition: right 0.3s linear;

				&.ready {
					right: 0;
				}

				.ms-close-btn {
					position: absolute;
					top: calc(50% - 56px);
					left: 0;
					width: 24px;
					height: 112px;
					background-image: url('./img/back.svg');
				}

				.ms-title {
					position: relative;
					align-items: flex-end;
					justify-content: space-between;
					padding: 48px 0 16px 0;
					font-size: 32px;
					font-weight: 600;
					line-height: 32px;
					color: #0df;
					border-bottom: 2px solid rgba(255, 255, 255, 0.4);

					&::before,
					&::after {
						position: absolute;
						right: 0;
						bottom: -2px;
						display: inline-block;
						width: 48px;
						height: 2px;
						content: ' ';
						background: #0df;
					}

					&::after {
						left: 0;
					}

					.select-btn {
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						width: 96px;
						height: 32px;
						padding: 0 8px;
						font-size: 20px;
						line-height: 32px;
						color: #fff;
						background: #0057a9;
						border: 1px solid #0df;
						border-radius: 4px;

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
						z-index: 100;
						width: 96px;
						height: 0;
						overflow: hidden;
						background: #0057a9;
						border-radius: 4px;
						transition: all 0.3s;

						&.active {
							height: auto;
							max-height: 207px;
							padding: 8px 0;
							overflow-y: auto;
							border: 1px solid #0df;
						}

						li {
							height: 32px;
							padding-left: 8px;
							font-size: 16px;
							line-height: 32px;
							color: #fff;
							transition: all 0.3s;

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

				&::v-deep .spin-icon-load {
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%);
					animation: ani-demo-spin 1s linear infinite;
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
