<template>
	<div class="h-table-status widget-part" :style="styles" v-if="data">
		<ul class="h-table-status__title1">
			<li v-for="(k, i) in config.config.titles">{{ k }}</li>
		</ul>
		<div class="h-table-status__content1" @mouseenter="isStop = true" @mouseleave="isStop = false">
			<ul
				class="h-table-status__content1__row1"
				v-for="(item, index) in curr"
				:key="index"
			>
				<li>{{ item.time || '' }}</li>
				<li>{{ item.channel || '' }}</li>
				<li>{{ item.businessType || '' }}</li>
				<li>{{ item.statusDesc || '' }}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from 'eslinkv-npm/mixins'
	import { customConfig, value } from './index.component'

	const SIZE = 5
	export default {
		mixins: [mixins],
		data () {
			return {
				timer: null,
				loop: 0,
				isStop: false
			}
		},
		watch: {
			data: {
				handler (val) {
					clearInterval(this.timer)
					this.loop = 0
					this.timer = setInterval(() => {
						if (this.isStop) return
						if (this.loop === Math.ceil(val.length / SIZE) - 1) {
							this.loop = 0
						} else {
							this.loop++
						}
					}, 2000)
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			curr () {
				if (!this.data) return []
				return this.data.slice(this.loop * SIZE, (this.loop + 1) * SIZE)
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value, customConfig)
		},
		beforeDestroy () {
			clearInterval(this.timer)
			this.timer = null
		}
	}
</script>
<style lang="scss">
	.h-table-status {
		width: 100%;

		&__title1 {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			width: 100%;
			height: 32px;
			padding: 8px;
			background: rgba(23, 123, 255, 0.2);

			& > li {
				font-size: 16px;
				line-height: 16px;
				color: #00cbf4;
				text-align: left;

				&:nth-child(1) {
					width: 16%;
				}

				&:nth-child(2) {
					width: 21%;
				}

				&:nth-child(3) {
					width: 36.3%;
				}

				&:nth-child(4) {
					width: 25.2%;
				}
			}
		}

		&__content1 {
			height: 152px;
			margin-top: 9px;

			&__seamless-warp1 {
				height: 152px;
				overflow: hidden;
			}

			&__row1 {
				box-sizing: border-box;
				display: flex;
				align-items: center;
				width: 100%;
				height: 24px;
				padding: 4px 8px;
				margin-top: 8px;

				& > li {
					font-size: 16px;
					line-height: 16px;
					color: #fff;
					text-align: left;

					&:nth-child(1) {
						width: 16%;
						color: rgba(255, 255, 255, 0.6);
					}

					&:nth-child(2) {
						width: 21%;
					}

					&:nth-child(3) {
						width: 36.3%;
					}

					&:nth-child(4) {
						width: 25.2%;
						color: #ffdc45;
					}
				}
			}
		}
	}
</style>

