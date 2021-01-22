<template lang="pug">
	.d-manage-box.pos-a
		.d-manage.pos-a.pointer
			Icon(type="ios-construct" title="组件配置" @click="handleClick" size="28" :class="[{active:manageModal}]")
		.d-manage-modal.pos-a(:class="[{active:manageModal}]")
			//div {{store.kanboard.widgetAdded[store.kanboard.chooseId]}}
			input(v-model="store.kanboard.widgetAdded[store.kanboard.chooseId]&&store.kanboard.widgetAdded[store.kanboard.chooseId].config.api.data")
</template>
<script lang="ts">
	import {Icon} from 'view-design'
	import {Component, Vue} from 'vue-property-decorator'

	@Component({
		components: {
			Icon
		},
	})
	export default class extends Vue {
		manageModal: boolean = false
		store:any= window.GoldChart.store

		handleClick() {
			this.manageModal = !this.manageModal
			this.$emit('show')
		}
	}
</script>
<style lang="scss" scoped>
	.d-manage-box {
		width: 24px;
		height: 24px;
		right: 15px;
		top: 253px;
	}

	.d-manage {
		right: 0;
		top: 0;
		z-index: 2;
		width: 24px;
		height: 24px;

		.ivu-icon {
			opacity: .6;

			&:hover, &.active {
				opacity: 1;
			}
		}
	}

	.d-manage-modal {
		right: -380px;
		top: -218px;
		width: 360px;
		background-color: white;
		border-radius: 5px;
		overflow: hidden;
		z-index: 3;
		letter-spacing: 0;
		height: calc(100vh - 140px);
		transition: all .3s;
		visibility: hidden;
		opacity: 0;
		overflow-y: auto;

		&.active {
			visibility: inherit;
			right: 40px;
			opacity: 1;
		}
	}
</style>
