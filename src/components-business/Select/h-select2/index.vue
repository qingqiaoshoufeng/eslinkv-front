<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select2 fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row" @click="showOptions=!showOptions">
				<span>{{selectLabel}}</span>
				<img src="/static/icons/h-select-1.svg"/>
			</h2>
			<ul class="pos-a" v-if="showOptions" :class="{active:showOptions}">
				<li class="pointer" v-for="item in data?data:[]" @click="handleChange(item)">
					{{item.label}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import { config, value } from './index.component'

	export default {
		data() {
			return {
				showOptions: false,
				selectLabel: '居民户',
				selectValue: '居民户'
			}
		},
		mixins: [mixins],
		methods: {
			handleChange(item) {
				this.selectValue = item.value
				this.selectLabel = item.label
				this.showOptions = false
				this.emitComponentUpdate({
					type: this.selectValue,
				})
			}
		},
		created() {
			
			this.configValue = this.parseConfigValue(value)
		},
		mounted() {
			this.emitComponentUpdate({
				type: this.selectValue,
			})
		}
	}
</script>
<style lang="scss">
	.h-select2 {
		height: 100%;
		background: #0057A9;
		border-radius: 4px;

		ul {
			top: 24px;
			right: 0;
			width: 100%;
			background: #0057A9;
			border-radius: 4px;

			&.active {
				padding: 8px 0;
				height: auto;
				max-height: 207px;
				border: 1px solid #00DDFF;
				overflow-y: auto;
			}
		}

		h2 {
			color: #fff;
			align-items: center;
			width: 100%;
			font-weight: normal;

			span {
				font-size: 16px;
				line-height: 16px;
				margin-left: 8px;
				margin-right: auto;
			}

			img {
				margin-right: 8px;
			}
		}

		li {
			color: #fff;
			font-size: 16px;
			line-height: 32px;
			padding-right: 8px;
			transition: all .3s;
			height: 32px;

			&:hover {
				background: rgba(0, 221, 255, 0.5);
			}

			&.active {
				background: rgba(0, 221, 255, 0.5);
			}

			&:last-child {
				border-bottom: none;
			}
		}
	}

</style>
