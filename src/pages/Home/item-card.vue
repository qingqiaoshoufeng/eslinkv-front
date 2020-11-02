<template>
	<Card class="list-item-card pos-r">
		<div class="avatar" :style="{backgroundImage:`url(${snapshot})`}" v-if="snapshot"/>
		<empty-image class="avatar" v-if="!snapshot"/>
		<h2 class="ellipsis">{{name}}</h2>
		<div class="fn-flex flex-row list-item-card-time-box">
			<p>{{createTime}}</p>
		</div>
		<div>
			<Button :type="status?'success':'warning'" size="small">{{statusStr}}</Button>
			<Button v-if="status"
					icon="ios-link"
					:style="{marginLeft:'10px'}"
					type="info"
					size="small"
			>分享链接
			</Button>
		</div>
		<div class="pos-a list-item-card-mask fn-flex flex-column">
			<Button
				icon="ios-create-outline"
				size="small"
				@click="handleEdit"
			>编辑
			</Button>
			<Button v-if="status"
					icon="ios-link"
					:style="{marginTop:'10px'}"
					size="small"
					@click="handleLink"
			>打开
			</Button>
			<Button v-else
					icon="ios-cloud-upload-outline"
					:style="{marginTop:'10px'}"
					size="small"
					@click="handlePublish"
			>发布
			</Button>
		</div>
	</Card>
</template>
<script lang="ts">
	import {Card, Tag, Button} from 'view-design'
	import EmptyImage from '../../components/empty-image/index.vue'
	import {Vue, Component, Prop} from 'vue-property-decorator'

	@Component({
		components: {Card, EmptyImage, Tag, Button},
	})
	class ItemCard extends Vue {
		@Prop(String) snapshot: string
		@Prop(Number) id: number
		@Prop(Number) status: number
		@Prop(String) statusStr: string
		@Prop(String) name: string
		@Prop(String) createTime: string
		@Prop(String) shareUrl: string

		handleEdit() {
			this.$router.push(`/edit/${this.id}`)
		}

		handleLink() {
			window.open(`${location.origin}${location.pathname}#/detail/${this.id}`)
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
						this.$emit('init')
					})
				}
			})
		}
	}

	export default ItemCard
</script>
<style lang="scss">
	.list-item-card {
		width: calc((100% - 90px) / 4);
		margin: 0 30px 25px 0;
		min-width: 195px;

		&:hover {
			.list-item-card-mask {
				opacity: 1;
			}
		}

		&:nth-child(4n) {
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
