<template lang="pug">
	i-card.list-item-card.pos-r
		.avatar(:style="{backgroundImage:`url(${snapshot})`}" v-if="snapshot")
		empty-image.avatar(v-if="!snapshot")
		h2.ellipsis {{name}}
		.fn-flex.flex-row.list-item-card-time-box
			p {{createTime}}
		div
			i-button(:type="status?'success':'warning'" size="small") {{statusStr}}
			i-button(v-if="status" icon="ios-link" :style="{marginLeft:'10px'}" type="info" size="small") 分享链接
		.pos-a.list-item-card-mask.fn-flex.flex-column
			i-button(icon="ios-create-outline" @click="handleEdit") 编辑
			i-button(v-if="status" icon="ios-link" :style="{marginTop:'10px'}" @click="handleLink") 打开
			i-button(v-else icon="ios-cloud-upload-outline" :style="{marginTop:'10px'}" @click="handlePublish") 发布
			i-button(icon="ios-trash-outline" :style="{marginTop:'10px'}" type="error" @click="handleRemove") 删除
</template>
<script lang="ts">
	import {Card, Button} from 'view-design'
	import EmptyImage from '../../components/empty-image/index.vue'
	import {Vue, Component, Prop} from 'vue-property-decorator'

	@Component({
		components: {'i-card': Card, 'i-button': Button, EmptyImage},
	})
	export default class ItemCard extends Vue {
		@Prop(String) snapshot: string
		@Prop(Number) id: number
		@Prop(Number) status: number
		@Prop(String) statusStr: string
		@Prop(String) name: string
		@Prop(String) createTime: string
		@Prop(String) shareUrl: string

		handleEdit() {
			this.$router.push(`/editor/manger/${this.id}`)
		}

		handleLink() {
			window.open(`${location.origin}/detail/${this.id}`)
		}

		handleRemove() {
			this.$Modal.confirm({
				title: '提示',
				content: '确认删除吗？',
				loading: true,
				onOk: () => {
					this.$api.board.remove({dataBoardId: this.id}).then(() => {
						this.$Message.success('删除成功')
						this.$Modal.remove()
						this.$emit('reload')
					})
				}
			})
		}

		handlePublish() {
			this.$Modal.confirm({
				title: '提示',
				content: '确认发布此看板吗？',
				loading: true,
				onOk: () => {
					this.$api.panel.publish({id: this.id}).then(() => {
						this.$Message.success('发布成功')
						this.$Modal.remove()
						this.$emit('reload')
					})
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
	.list-item-card {
		width: calc((100% - 120px) / 5);
		margin: 0 30px 25px 0;
		min-width: 190px;

		/deep/ .ivu-icon {
			font-size: 16px;
		}

		&:hover {
			.list-item-card-mask {
				opacity: 1;
			}
		}

		&:nth-child(5n) {
			margin-right: 0;
		}

		.list-item-card-mask {
			width: 100%;
			height: 100%;
			opacity: 0;
			transition: .3s;
			top: 0;
			left: 0;
			align-items: center;
			justify-content: center;
			background-color: rgba(0, 0, 0, .5);
			border-radius: 4px;
		}

		.list-item-card-time-box {
			margin-bottom: 10px;
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
