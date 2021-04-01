<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ETable :list="data.list" :size="4" :titles="data.titles"></ETable>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import ETable from './ETable'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		components: { ETable },
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		.title {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			width: 100%;
			height: 32px;
			background: rgba(23, 123, 255, 0.2);

			& > li {
				padding-left: 8px;
				font-size: 18px;
				line-height: 24px;
				color: #00cbf4;
				text-align: left;

				&:nth-child(1) {
					width: 24px;
					height: 24px;
					margin-right: 8px;
				}

				&:nth-child(2) {
					width: 240px;
				}

				&:nth-child(3) {
					width: 90px;
				}

				&:nth-child(4) {
					width: 65px;
				}

				&:nth-child(5) {
					flex: 1;
				}
			}
		}

		.content {
			height: 170px;

			&__seamless-warp1 {
				height: 170px;
				overflow: hidden;
			}

			&__row1 {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				height: 32px;
				padding-left: 8px;

				&:first-child > li.first {
					background: #ff7217;
				}

				& > li {
					font-size: 18px;
					line-height: 24px;
					color: #fff;
					text-align: left;

					&:nth-child(1) {
						width: 24px;
						height: 24px;
						margin-right: 8px;
						font-weight: bold;
						text-align: center;
						background: #0057a9;
					}

					&:nth-child(2) {
						width: 240px;
					}

					&:nth-child(3) {
						width: 90px;
					}

					&:nth-child(4) {
						width: 65px;
					}

					&:nth-child(5) {
						flex: 1;
					}
				}
			}
		}
	}
</style>

