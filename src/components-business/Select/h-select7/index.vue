<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select7 fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row" @click="showOptions = !showOptions">
				<span>{{ selectLabel }}</span>
				<img src="/static/icons/h-select-1.svg"/>
			</h2>
			<ul class="pos-a" v-if="showOptions" :class="{active:showOptions}">
				<li class="pointer" v-for="item in data ? data : []" @click="handleChange(item)">
					{{ item.label }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { widgetMixin } from 'eslinkv-sdk'
	import { value } from './index.component'

	export default {
		data () {
			return {
				showOptions: false,
				selectLabel: '罗茨表',
				selectValue: 'metertype_01'
			}
		},
		mixins: [widgetMixin],
		methods: {
			handleChange (item) {
				this.selectValue = item.value
				this.selectLabel = item.label
				this.showOptions = false
				this.emitComponentUpdate({ metertypecode: this.selectValue })
			}
		},
		created () {
			this.configValue = this.parseConfigValue(value)
		},
		mounted () {
			this.emitComponentUpdate({
				metertypecode: this.selectValue
			})
		}
	}
</script>
<style lang="scss">
	.h-select7 {
		height: 100%;
		background: #0057a9;
		border-radius: 4px;

		ul {
			top: 24px;
			right: 0;
			width: 100%;
			background: #0057a9;
			border-radius: 4px;

			&.active {
				height: auto;
				max-height: 207px;
				padding: 8px 0;
				overflow-y: auto;
				border: 1px solid #0df;
			}
		}

		h2 {
			align-items: center;
			width: 100%;
			font-weight: normal;
			color: #fff;

			span {
				margin-right: auto;
				margin-left: 8px;
				font-size: 16px;
				line-height: 16px;
			}

			img {
				margin-right: 8px;
			}
		}

		li {
			height: 32px;
			padding-right: 8px;
			font-size: 16px;
			line-height: 32px;
			color: #fff;
			transition: all 0.3s;

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
