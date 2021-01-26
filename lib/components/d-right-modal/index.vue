<template lang="pug">
	.d-right-modal-box.pos-a(:style="{top:`${top}px`}")
		.d-right.pos-a.pointer
			Icon(:type="icon" title="组件配置" @click="handleClick" size="28" :class="[{active:rightModal}]")
		.d-right-modal.pos-a(:class="[{active:rightModal}]" :style="{width:`${width}px`,top:`-${top-35}px`}")
			slot
</template>
<script lang="ts">
	import {Icon} from 'view-design'
	import {Component, Vue, Prop} from 'vue-property-decorator'

	@Component({
		components: {
			Icon
		},
	})
	export default class DRightModal extends Vue {
		rightModal: boolean = false
		@Prop({default: 396}) width: number
		@Prop({default: 'ios-construct'}) icon: string
		@Prop({default: '标题'}) title: string
		@Prop({default: 253}) top: number


		handleClick() {
			this.rightModal = !this.rightModal
			this.$emit('show')
		}
	}
</script>
<style lang="scss" scoped>

	.d-right-modal-box {
		width: 24px;
		height: 24px;
		right: 15px;
	}

	.d-right {
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

	.d-right-modal {
		right: -380px;
		background-color: white;
		border-radius: 5px;
		z-index: 3;
		letter-spacing: 0;
		height: calc(100vh - 140px);
		transition: all .3s;
		visibility: hidden;
		opacity: 0;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 10px;

		&.active {
			visibility: inherit;
			right: 40px;
			opacity: 1;
		}
	}
</style>
