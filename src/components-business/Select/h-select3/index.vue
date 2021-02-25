<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select3 fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row" @click="showOptions=!showOptions">
				<span>{{selectLabel}}</span>
				<img src="/static/icons/h-select-1.svg"/>
			</h2>
			<ul class="pos-a" v-if="showOptions">
				<li class="pointer" v-for="item in data?data:[]" @click="handleChange(item)">
					{{item.label}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import { value } from './index.component'

	export default {
		data() {
			return {
				showOptions: false,
				selectLabel: '月用气对比',
				selectValue: 'month'
			}
		},
		mixins: [mixins],
		methods: {
			handleChange(item) {
				this.selectValue = item.value
				this.selectLabel = item.label
				this.showOptions = false
				this.emitComponentUpdate(item)
			}
		},
		created() {
			
			this.configValue = this.parseConfigValue(value)
		},
		mounted() {
			this.emitComponentUpdate({
				value: this.selectLabel,
				label: this.selectValue,
			})
		}
	}
</script>
<style lang="scss">
	.h-select3 {
		height: 100%;
		background: #001F6D;
		border: 1px solid #0057A9;
		border-radius: 4px;

		ul {
			top: 24px;
			right: 0;
			width: 100%;
			border: 1px solid #0057A9;
			border-radius: 4px;
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
			line-height: 20px;
			padding-right: 8px;
			border-bottom: 1px solid #0057A9;
			transition: all .3s;
			background: #001F6D;

			&:hover {
				opacity: 0.8;
			}

			&:last-child {
				border-bottom: none;
			}
		}
	}

</style>
