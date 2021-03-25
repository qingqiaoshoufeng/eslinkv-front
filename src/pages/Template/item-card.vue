<template lang="pug">
  e-card
    empty-image.avatar(:image="screenAvatar")
    template(slot="content")
      h2.ellipsis {{screenName}}
      .fn-flex.flex-row.list-item-card-time-box
        p {{beginTime}}
      div
        i-button(:type="isPublished?'success':'warning'" size="small") {{statusStr}}
      .pos-a.list-item-card-mask.fn-flex.flex-column
        i-button(icon="ios-create-outline" @click="handleEdit") 编辑
        i-button(v-if="isPublished" icon="ios-link" :style="{marginTop:'10px'}" @click="handleLink") 打开
        i-button(v-else icon="ios-jet-outline" :style="{marginTop:'10px'}" @click="handleUse") 使用
        i-button(icon="ios-trash-outline" :style="{marginTop:'10px'}" type="error" @click="handleRemove") 删除
</template>
<script lang="ts">
	import { Card, Button } from 'view-design'
	import EmptyImage from '../../components/empty-image/index.vue'
	import { Vue, Component, Prop } from 'vue-property-decorator'

	@Component({
		components: { 'i-card': Card, EmptyImage, 'i-button': Button }
	})
	export default class ItemCard extends Vue {
    @Prop(String) screenAvatar: string
    @Prop(String) screenId: string
    @Prop(String) screenPublish: string
    @Prop(String) screenName: string
    @Prop(String) beginTime: string

    get statusStr () {
      return this.screenPublish === 'COMPLETE' ? '已发布' : '未发布'
    }

    get isPublished () {
      return this.screenPublish === 'COMPLETE'
    }

		handleEdit () {
			this.$router.push(`/editor/manger/${this.screenId}`)
		}

		handleLink () {
			window.open(`${location.origin}/detail/${this.screenId}`)
		}

		handleRemove () {
			this.$Modal.confirm({
				title: '提示',
				content: '确认删除吗？',
				loading: true,
				onOk: () => {
					this.$api.screen.remove({ screenId: this.screenId }).then(() => {
						this.$Message.success('删除成功')
						this.$Modal.remove()
						this.$emit('init')
					})
				}
			})
		}

		handleUse () {
			this.$router.push('/new?templateId=' + this.screenId)
		}
	}
</script>
<style lang="scss" scoped>
	.list-item-card {
		/deep/ .ivu-icon {
			font-size: 16px;
		}

		&:hover {
			.list-item-card-mask {
				opacity: 1;
			}
		}

		.list-item-card-mask {
			top: 0;
			left: 0;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			opacity: 0;
			transition: 0.3s;
		}

		.list-item-card-time-box {
			margin-bottom: 10px;
		}

		.avatar {
			padding-bottom: 50%;
			background-size: cover;
		}

		h2 {
			margin: 10px 0 4px 0;
			font-size: 18px;
		}

		p {
			margin: 6px 0 0 0;
			font-size: 12px;
			color: #999;
		}
	}
</style>
