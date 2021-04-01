<template>
	<div class="widget-part" :style="styles" v-if="data">
		<ul class="tabs">
			<li></li>
			<li
				:class="{active: currIndex === i}"
				v-for="(k, i) in data.list"
				:key="i"
				@click="changeTab(i)"
			>
				<span>{{ k.name }}</span>
			</li>
			<li></li>
		</ul>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import { value } from './index.component'

	export default {
		mixins: [widgetMixin],
		data () {
			return {
				currIndex: 0
			}
		},
		computed: {},
		methods: {
			changeTab (n) {
				this.currIndex = n
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss" scoped>
	.tabs {
		display: flex;
		height: 56px;
		font-size: 24px;
		color: #0df;

		li {
			position: relative;
			width: 200px;
			line-height: 56px;
			text-align: center;
			cursor: pointer;

			&:hover {
				color: #fff;
			}

			&::after {
				position: absolute;
				bottom: 0;
				left: 0;
				display: block;
				width: 100%;
				height: 2px;
				content: '';
				background: #0df;
			}

			&:first-child::after {
				background: linear-gradient(to left, #0df, rgba(0, 221, 255, 0));
			}

			&:last-child::after {
				background: linear-gradient(to right, #0df, rgba(0, 221, 255, 0));
			}

			&.active {
				width: 326px;
				font-size: 32px;
				font-weight: 600;
				background: url("./img/menu-bg.svg") no-repeat;
				background-size: 100% 100%;

				span {
					background-image: -webkit-linear-gradient(top, #fff, #7aedff);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				&::after {
					height: 0;
				}
			}
		}
	}
</style>

