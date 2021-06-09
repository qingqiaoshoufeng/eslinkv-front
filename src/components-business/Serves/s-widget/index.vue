<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul class="list">
			<li v-for="(k, i) in curr" :key="i">
				<div :class="['index', getIndexClass(i)]">
					{{ getIndex(i) }}
				</div>
				<div class="main">
					<div class="main-top">
						<span>{{ k.name }}</span>
						<b>{{ k.num | toThousand }}</b>
					</div>
					<div class="cons">
						<div
							class="val"
							:style="{ width: k.percent + '%' }"
						></div>
					</div>
				</div>
			</li>
		</ul>
		<img src="./img/page.svg" class="page" @click="nextPage" />
	</div>
</template>
<script>
import { widgetMixin } from '@eslinkv/vue2'
import { value } from './index.component'

const SIZE = 8
export default {
	mixins: [widgetMixin],
	data() {
		return {
			loop: 0,
		}
	},
	computed: {
		curr() {
			if (!this.data) return []
			return this.data.list.slice(
				this.loop * SIZE,
				(this.loop + 1) * SIZE,
			)
		},
	},
	methods: {
		nextPage() {
			if (this.loop === Math.ceil(this.data.list.length / SIZE) - 1) {
				this.loop = 0
			} else {
				this.loop++
			}
		},
		getIndex(n) {
			const num = n + 1 + this.loop * SIZE
			return num < 10 ? '0' + num : num
		},
		getIndexClass(n) {
			let res = ''
			const num = this.getIndex(n)
			switch (num) {
				case '01':
				case '02':
				case '03':
					res = 'top'
					break
				default:
					res = ''
			}
			return res
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
}
</script>
<style lang="scss" scoped>
.page {
	position: absolute;
	top: 200px;
	right: 0;
	cursor: pointer;
}

.list {
	position: relative;
	padding: 0 16px 0 8px;

	li {
		display: flex;
		align-items: center;
		margin-bottom: 20px;

		.index {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			margin-right: 12px;
			font-family: font-num;
			font-size: 24px;
			font-style: normal;
			font-weight: bold;
			line-height: 24px;
			color: #fff;
			background: rgba(0, 221, 255, 0.5);
			border-top: 2px solid #0df;

			&.top {
				background: rgba(255, 114, 23, 0.6);
				border-top-color: #ff7217;
			}
		}

		.main {
			.main-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 8px;

				span {
					font-size: 20px;
					color: #fff;
				}

				b {
					font-family: font-num;
					font-size: 24px;
					font-style: normal;
					font-weight: bold;
					color: #fff;
				}
			}

			.cons {
				width: 404px;
				height: 8px;
				background: #0057a9;

				.val {
					position: relative;
					width: 0;
					height: 100%;
					background: linear-gradient(
						270deg,
						#0df 0%,
						rgba(0, 221, 255, 0.5) 100%
					);

					&::after {
						position: absolute;
						top: 0;
						right: 0;
						display: block;
						width: 4px;
						height: 8px;
						content: '';
						background: #fff;
					}
				}
			}
		}
	}
}
</style>
