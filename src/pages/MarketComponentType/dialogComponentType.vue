<template lang="pug">
i-modal.check-modal(v-model="modalShow", title="新增")
	i-form(:label-width="100")
		i-form-item(label="分类名")
			i-input(v-model="detail.componentTypeName")
		i-form-item(label="分类英文名")
			i-input(
				v-model="detail.componentTypeEnName",
				:disabled="detail.componentTypeId")
		i-form-item(label="父类", v-if="common.user && common.user.userAdmin")
			tree-select(
				v-model="detail.componentTypeParentId",
				:options="componentTypeList",
				:normalizer="normalizer",
				:load-options="loadOptions")
	div(slot="footer")
		i-button(type="primary", @click="submit") 提交
		i-button(type="error", @click="modalShow = false") 取消
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {
	Modal,
	Button,
	Form,
	FormItem,
	Input,
	Select,
	Option,
} from 'view-design'
import TreeSelect, { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import common from '../../store/common.store.js'

@Component({
	components: {
		'i-button': Button,
		'i-modal': Modal,
		'i-form': Form,
		'i-form-item': FormItem,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
		TreeSelect,
	},
})
export default class DialogComponentType extends Vue {
	@Prop(Boolean) value: boolean
	@Prop(Object) detail: ComponentTypeCreate
	modalShow = false
	componentTypeList = []
	common = common.state
	@Watch('value')
	onValueChange(val) {
		this.modalShow = val
	}

	@Watch('modalShow')
	onModalShow(val) {
		this.$emit('input', val)
	}

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

	async submit() {
		if (this.detail.componentTypeId) {
			await this.$api.marketComponentType.update({ ...this.detail })
		} else {
			await this.$api.marketComponentType.create({ ...this.detail })
		}
		this.modalShow = false
		this.$emit('reload')
	}

	created() {
		this.$api.marketComponentType.levelList().then(r => {
			r.forEach(v => {
				v.children = null
			})
			this.componentTypeList = r
		})
	}
}
</script>
<style lang="scss" scoped>
.check-modal {
	&::v-deep {
		.ivu-modal-body {
			max-width: 500px;
			max-height: 500px;
			overflow-x: auto;
			overflow-y: auto;
		}
	}
}
</style>
