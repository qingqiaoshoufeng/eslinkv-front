<template>
	<div class="widget-part" :style="styles" v-if="data">
		<div class="container">
			<div class="title">线路详情</div>
			<ul class="list">
				<li v-for="(k, i) in data.list">
					<div class="sub-title">
						<img src="./img/arrow-3-right.svg">
						<span>{{ k.name }}</span>
					</div>
					<div class="content">{{ k.detail }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import {value} from './index.component'

	export default {
		mixins: [mixins],
		created() {
			this.configValue = this.parseConfigValue(value)
		},
	}
</script>
<style lang="scss" scoped>
	.widget-part {
		.container {
			padding: 16px 24px;
			overflow: auto;
			width: 100%;
			height: 100%;
		}

		.title {
			font-weight: 500;
			font-size: 24px;
			line-height: 34px;
			color: #66E3FD;
			text-align: left;
		}

		.list {
			text-align: left;

			li {
				margin-top: 15px;

				.sub-title {
					display: flex;
					align-items: center;

					> span {
						font-weight: 600;
						font-size: 18px;
						line-height: 25px;
						margin-left: 8px;
						color: #66E3FD;
					}
				}

				.content {
					font-size: 18px;
					line-height: 25px;
					color: #FFFFFF;
					margin-top: 8px;
				}
			}
		}
	}
</style>

