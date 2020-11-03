<template>
	<div class="h-tabs" :style="styles">
		<div class="h-tabs__left-line"></div>
		<div class="h-tabs__right-line"></div>
		<div
			:class="[
				'h-tabs__item',
				{'h-tabs__item--actived': data && data.actived === index}
			]"
			v-for="(tab, index) in (data && data.list || [])"
			:key="tab && tab.name"
			@click="() => tabClickEvt(index, tab)">
			{{tab.name}}
		</div>
	</div>
</template>
<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	const config = {}
	const value = {
		api: {
			data: JSONStringify({
				list: [
					{ name: '告警信息' },
					{ name: '点位列表' },
				],
				actived: 0
			})
		}
	}
	export default {
		mixins: [mixins],
		props: {
			source: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			tabClickEvt(index, tab = {}){
				this.data && (this.data.actived = index);
				this.$emit('tabClickEvt', { index, tab })
			}
		},
		data(){
			return {

			}
		},
		created() {
			this.configSource = this.parseConfigSource(config);
			this.configValue = this.parseConfigValue(config, value);
		},
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

