<template lang="pug">
e-card
	empty-image.list-item-card-avatar.pos-r.pointer(
		:image="screenAvatar",
		@click="handleEdit")
		.list-item-card-mask.fn-flex.flex-row.pos-a
			i-icon.pointer(
				:style="{ marginLeft: 'auto', marginRight: '10px' }",
				type="ios-paper-plane-outline",
				color="#fff",
				:size="16",
				@click="handleShare",
				@click.stop,
				title="分享")
			i-icon.pointer(
				type="ios-trash-outline",
				color="#fff",
				:size="16",
				@click="handleRemove",
				@click.stop,
				title="删除")
	template(slot="content")
		h2.list-item-card-title.ellipsis {{ screenName }}
		.list-item-card-btn.fn-flex.flex-row
			span {{ $format(new Date(createTime), 'yyyy-MM-dd hh:mm:ss') }}
			.list-item-card-btn-link.pointer(@click="handleLink")
				i-icon(type="ios-link", :style="{ marginLeft: 'auto' }")
				span 预览
	dShareDialog(v-model="shareModal", :sid="screenId")
</template>
<script lang="ts">
import { Button, Icon, Modal, Input } from 'view-design'
import EmptyImage from '../../components/empty-image/index.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
import dShareDialog from '../../components/d-share-dialog/index.vue'

@Component({
	components: {
		'i-button': Button,
		'i-icon': Icon,
		dShareDialog,
		EmptyImage,
		'i-modal': Modal,
		'i-input': Input,
	},
})
export default class ItemCard extends Vue {
	@Prop(String) screenAvatar: string
	@Prop(String) screenId: string
	@Prop(String) screenPublish: string
	@Prop(String) screenName: string
	@Prop(String) createTime: string
	@Prop(Object) screenConfig: any

	shareModal = false

	handleShare() {
		this.shareModal = true
	}

	get statusStr() {
		return this.screenPublish === 'COMPLETE' ? '已发布' : '未发布'
	}

	handleEdit() {
		this.$router.push(`/editor/manger/${this.screenId}`)
	}

	handleLink() {
		const scene = this.screenConfig.panelConfig.mainScene
			? `&scene=${this.screenConfig.panelConfig.mainScene}`
			: ''
		window.open(
			`${location.origin}/detail/${this.screenId}?layoutMode=${this.screenConfig.panelConfig.size.layoutMode}${scene}`,
		)
	}

	handleRemove() {
		this.$Modal.confirm({
			title: '提示',
			content: '确认删除吗？',
			loading: true,
			onOk: () => {
				this.$api.screen
					.destroy({ screenId: this.screenId })
					.then(() => {
						this.$Message.success('删除成功')
						this.$Modal.remove()
						this.$emit('reload')
					})
			},
		})
	}
}
</script>
<style lang="scss" scoped>
@import '../../scss/conf';
.d-detail-share-button {
	line-height: 32px;
	border-radius: 0;
}
.list-item-card-btn-link {
	margin-left: auto;

	span {
		margin-left: 4px;
	}

	&:hover {
		color: $themeColor;
	}
}

.list-item-card-btn {
	align-items: center;
	margin-top: 10px;
}

.list-item-card-mask {
	top: -40px;
	left: 0;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 40px;
	padding: 0 8px;
	background-color: rgba(0, 0, 0, 0.8);
	transition: all 0.3s;
}

.list-item-card-avatar {
	padding-bottom: 50%;

	&:hover {
		.list-item-card-mask {
			top: 0;
		}
	}
}

.list-item-card-title {
	padding-bottom: 10px;
	font-size: 14px;
	font-weight: normal;
	color: rgb(51, 51, 51);
	border-bottom: 1px solid rgba(216, 216, 216, 0.37);
}
</style>
