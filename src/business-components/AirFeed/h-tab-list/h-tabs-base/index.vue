<template>
	<div class="h-tabs">
		<div class="h-tabs__left-line"></div>
		<div class="h-tabs__right-line"></div>
		<div
			:class="[
				'h-tabs__item',
				{'h-tabs__item--actived': source && source.actived === index}
			]"
			v-for="(tab, index) in (source && source.list || [])"
			:key="tab && tab.name"
			@click="() => tabClickEvt(index)">
			{{tab.name}}
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			source: {
				type: Object,
				default: () => ({
					list: [],
					actived: 0
				})
			}
		},
		methods: {
			tabClickEvt(index){
				console.log(index);
				this.$emit('tabIndexUpdate', index)
			}
		}
	}
</script>
<style lang="scss">
	.tabs-boder-line {
		width: 3px;
		height: 24px;
		background: #1773C9;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.h-tabs {
		background: #051040;
		border: 1px solid #1773C9;
		position: relative;
		display: flex;
		height: 48px;
		justify-content: center;
		align-items: center;
		&__item {
			position: relative;
			flex: 1;
			height: 100%;
			font-size: 24px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgba(255, 255, 255, 0.6);
			cursor: pointer;
			&--actived {
				color: #FFFFFF;
				&::after{
					content: '';
					width: 0;
					height: 0;
					position: absolute;
					border: 8px solid transparent;
					border-bottom-width: 6px;
					border-bottom-color: #00DDFF;
					bottom: 0;
				}
			}
		}
		&__left-line {
			@extend .tabs-boder-line;
			left: -1px;
		}
		&__right-line {
			@extend .tabs-boder-line;
			right: -1px;
		}
	}
</style>

