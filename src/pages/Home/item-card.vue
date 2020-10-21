<template>
	<Card class="list-item-card">
		<div class="avatar" :style="{backgroundImage:`url(${snapshot})`}" v-if="snapshot"/>
		<empty-image class="avatar" v-if="!snapshot"/>
		<h2 class="ellipsis">{{name}}</h2>
		<div>
			<Button @click="handlePublish" :type="status?'success':'warning'" size="small">{{statusStr}}</Button>
			<!--需要考虑，公开链接有木有时效性-->
			<Button v-if="status"
					icon="ios-link"
					:style="{marginLeft:'10px'}"
					type="info"
					size="small"
					@click="handleLink"
			>打开链接
			</Button>
		</div>
		<p>{{createTime}}</p>
	</Card>
</template>
<script>
	import {Card, Tag, Modal, Message, Button} from 'view-design'
	import EmptyImage from '../../components/empty-image'

	export default {
		props: {
			snapshot: {
				type: String
			},
			id: {
				type: Number
			},
			status: {
				type: Number
			},
			statusStr: {
				type: String
			},
			name: {
				type: String
			},
			createTime: {
				type: String
			},
			shareUrl: {
				type: String
			}
		},
		components: {
			Card, EmptyImage, Tag, Button
		},
		methods: {
			handleLink() {
				window.open(this.shareUrl)
			},
			handlePublish() {
				if (this.status) return
				Modal.confirm({
					title: '提示',
					content: '确认发布此看板吗？',
					loading: true,
					onOk: () => {
						this.$api.panel.publish({id: this.id}).then(() => {
							Message.success('发布成功')
							Modal.remove()
							this.$emit('init')
						})
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.list-item-card {
		width: calc((100% - 90px) / 4);
		margin: 0 30px 25px 0;

		&:nth-child(4n) {
			margin-right: 0;
		}

		.avatar {
			padding-bottom: 50%;
			background-size: cover;
		}

		h2 {
			font-size: 18px;
			margin: 10px 0 4px 0;
		}

		p {
			margin: 6px 0 0 0;
			font-size: 12px;
			color: #999;
		}
	}
</style>
