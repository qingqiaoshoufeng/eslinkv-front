<template lang="pug">
e-card
	empty-image.avatar(:image="currentItem.componentAvatar")
	template(slot="content")
		h2.ellipsis {{ currentItem.componentTitle }}
		.fn-flex.flex-row.list-item-card-time-box
			p {{ $format(new Date(currentItem.createTime), 'yyyy-MM-dd hh:mm:ss') }}
		div
			i-button(type="success", size="small") {{ currentItem.componentVersion }}
			i-button(:style="{ marginLeft: '10px' }", type="info", size="small") {{ currentItem.componentEnTitle }}
	.pos-a.list-item-card-mask.fn-flex.flex-column
		i-button(icon="ios-create-outline", @click="handleEdit") 编辑组件
		i-button(
			icon="ios-link",
			:style="{ marginTop: '10px' }",
			@click="handleVersion") 切换版本
		i-button(
			icon="ios-trash-outline",
			:style="{ marginTop: '10px' }",
			type="error",
			@click="handleRemove") 删除组件
	i-modal.market-edit-modal(v-model="dialogEditShow", title="编辑")
		i-form(:label-width="100")
			i-form-item(label="组件名")
				i-input(v-model="currentItem.componentTitle")
			i-form-item(label="组件英文名")
				span {{ currentItem.componentEnTitle }}
			i-form-item(label="当前版本号")
				span {{ currentItem.componentVersion }}
			i-form-item(label="排序")
				i-input(v-model="currentItem.sort", number)
			i-form-item(label="类型")
				tree-select(
					v-model="currentItem.componentTypeId",
					:options="componentTypeList",
					:normalizer="normalizer",
					:load-options="loadOptions")
				label(slot="value-label", slot-scope="{ node }") {{ node.raw.componentTypeName || currentItem.componentTypeName }}
			i-form-item(label="缩略图")
				.img-wrap
					img(
						:src="currentItem.componentAvatar",
						v-if="currentItem.componentAvatar")
		div(slot="footer")
			i-button(type="primary", @click="submitEdit") 确定
	i-modal(v-model="dialogEditVersionShow", title="切换版本")
		i-select(v-model="currentItem.componentVersion")
			i-option(
				:value="k.componentVersion",
				v-for="(k, i) in versionList",
				:key="i") {{ k.componentVersion }}
		div(slot="footer")
			i-button(type="primary", @click="submitVersion") 确定
</template>
<script lang="ts">
import {
	Card,
	Button,
	Modal,
	Form,
	FormItem,
	Input,
	Select,
	Option,
} from 'view-design'
import EmptyImage from '../../components/empty-image/index.vue'
import { Vue, Component, PropSync } from 'vue-property-decorator'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

@Component({
	components: {
		'i-card': Card,
		'i-button': Button,
		'i-modal': Modal,
		'i-form': Form,
		'i-form-item': FormItem,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
		EmptyImage,
		TreeSelect,
	},
})
export default class ItemCard extends Vue {
	dialogEditShow: boolean = false
	dialogEditVersionShow: boolean = false
	componentTypeList: any[] = []
	versionList: any[] = []

	@PropSync('item', { type: Object }) currentItem!: any

	loadOptions({ action, parentNode, callback }) {
		if (action === LOAD_CHILDREN_OPTIONS) {
			this.$api.marketComponentType
				.levelList({
					componentTypeParentId: parentNode.componentTypeId,
				})
				.then(r => {
					parentNode.children = r
					callback()
				})
		}
	}

	normalizer(node) {
		return {
			id: node.componentTypeId,
			label: node.componentTypeName,
			children: node.children,
		}
	}

	submitVersion() {
		this.$api.marketComponent
			.update({
				componentEnTitle: this.currentItem.componentEnTitle,
				componentVersion: this.currentItem.componentVersion,
			})
			.then(() => {
				this.dialogEditVersionShow = false
				this.$Message.success('更新成功')
				this.$emit('reload')
			})
	}

	submitEdit() {
		this.$api.marketComponent
			.update({
				componentId: this.currentItem.componentId,
				sort: this.currentItem.sort,
				componentTitle: this.currentItem.componentTitle,
				componentTypeId: this.currentItem.componentTypeId,
			})
			.then(() => {
				this.dialogEditShow = false
				this.$Message.success('更新成功')
				this.$emit('reload')
			})
	}

	handleEdit() {
		this.dialogEditShow = true
		this.$api.marketComponentType.levelList().then(r => {
			r.forEach(v => {
				v.children = null
			})
			this.componentTypeList = r
		})
	}

	handleVersion() {
		this.dialogEditVersionShow = true
		this.$api.marketComponent
			.getVersionList({
				componentEnTitle: this.currentItem.componentEnTitle,
			})
			.then(r => {
				this.versionList = r
			})
	}

	handleRemove() {
		this.$Modal.confirm({
			title: '提示',
			content: '确认删除吗？',
			loading: true,
			onOk: async () => {
				await this.$api.marketComponent.destroy({
					componentId: this.currentItem.componentId,
				})
				this.$Message.success('删除成功')
				this.$Modal.remove()
				this.$emit('reload')
			},
		})
	}
}
</script>
<style lang="scss">
.market-edit-modal {
	.img-wrap {
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
}
</style>
<style lang="scss" scoped>
.list-item-card {
	&::v-deep .ivu-icon {
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
		border-radius: 4px;
		opacity: 0;
		transition: 0.3s;
	}

	.list-item-card-time-box {
		margin-bottom: 10px;
	}

	.avatar {
		padding-bottom: 50%;
		background-color: #000;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% auto;
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
