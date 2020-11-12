<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row" @click="showOptions=!showOptions">
				<span>{{innerLabel}}</span>
				<img src="/static/icons/h-select-1.svg"/>
			</h2>
			<ul class="pos-a" v-if="showOptions">
				<li class="pointer" v-for="item in data&&mergedConfig.options" @click="handleHandler(item.value)">
					{{item.label}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../mixins'
	import optionsParser from '../../../../lib/views/core/widgets/parts/other/inquiry/options-parser'
	import {
		getBooleanInput,
		getInput,
		getSelect
	} from '../../../../lib'
	import isEqualByType from '../../../../lib/views/core/widgets/parts/other/inquiry/is-equal-by-type'

	const config = {
		animation: true,
		config: {
			clearable: true,
			options: true,
			'value.index': true,
			valueType: true,
		},
	}

	const configSource = {
		config: {
			fields: {
				clearable: getBooleanInput('clearable', '可清空'),
				options: getInput('options', '选项清单', {
					innerType: 'textarea',
					rows: 3,
					placeholder: 'label1:value1,label2,value2',
					title: 'label1:value1,label2,value2'
				}),
				'value.index': [
					getInput('value', '选中', {placeholder: '值'}),
					getInput('index', '选中', {placeholder: '索引'})
				],
				valueType: getSelect('valueType', '数据类型', ['String']),
			}
		}
	}
	const value = {
		config: {
			clearable: false,
			options: '年:year,月:month',
			value: 'month',
			index: 0,
			valueType: 'String',
		},
		api: {
			data: JSON.stringify([{"label": "年", "value": "year"}, {"label": "月", "value": "month"}]),
			bind: {
				enable: true,
				role: ['provider']
			}
		}
	}
	export default {
		data() {
			return {
				showOptions: false
			}
		},
		mixins: [mixins],
		watch: {
			'config.config.options'(value) {
				this.data = JSON.stringify(optionsParser(value))
			},
			'config.config.value': {
				handler: function (value) {
					if (value === undefined || value === null) return
					this.output = value
					this.config.config.index = 0
				},
				immediate: true
			}
		},
		computed: {
			innerLabel() {
				const {valueType, options, value} = this.mergedConfig
				const selectedValue = value
				const selectedOption = options.find(option => isEqualByType(option.value, selectedValue, valueType)) || {}
				return selectedOption.label || selectedOption.value || ''
			},
			mergedConfig() {
				const {config = {}} = this.config
				const {
					value = 'month',
					valueType = 'Number',
				} = config

				let options = this.data || config.options || [{"label": "年", "value": "year"}, {
					"label": "月",
					"value": "month"
				}]

				if (!Array.isArray(options)) options = optionsParser(options)

				return {
					options,
					value,
					valueType,
				}
			},
		},
		methods: {
			handleHandler(value) {
				this.config.config.value = value
				this.showOptions = false
			}
		},
		created() {
			this.configSource = this.parseConfigSource(config, configSource)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss">
	.h-select {
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

