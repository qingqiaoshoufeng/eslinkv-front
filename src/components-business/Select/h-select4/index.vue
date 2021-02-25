<template>
	<div class="widget-part pos-r" :style="styles" v-if="data">
		<div class="h-select4 fn-flex flex-row pos-r">
			<h3 class="fn-flex flex-row" @click="openLeft">
				<span>{{data.selectType}}</span>
				<img src="/static/icons/h-select-1.svg" :class="{active:showLOptions}"/>
			</h3>
			<h2 class="fn-flex flex-row" @click="openRight">
				<span>{{data.selectValue}}</span>
				<img src="/static/icons/h-select-1.svg" :class="{active:showROptions}"/>
			</h2>
			<ul class="pos-a h-select4-right-options" :class="{active:showROptions}" v-if="data">
				<li class="pointer"
					:class="{active:data.selectValue===item}"
					v-for="item in selectROptions" @click="handleRChange(item)">
					{{item}}
				</li>
			</ul>
			<ul class="pos-a h-select4-left-options" :class="{active:showLOptions}" v-if="data">
				<li class="pointer"
					:class="{active:data.selectType===item}"
					v-for="item in selectLOptions" @click="handleLChange(item)">
					{{item}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import mixins from '../../../../lib/mixins'
	import format from 'date-fns/format'
	import addDays from 'date-fns/addDays'
	import addMonths from 'date-fns/addMonths'
	import addYears from 'date-fns/addYears'
	import { value } from './index.component'

	export default {
		data() {
			return {
				showROptions: false,
				showLOptions: false,
				selectROptions: [],
				selectLOptions: ['日', '月', '年']
			}
		},
		mixins: [mixins],
		watch: {
			data: {
				handler(val) {
					if (val) {
						this.init(this.data.selectType)
					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			openLeft() {
				this.showLOptions = !this.showLOptions
				this.showROptions = false
			},
			openRight() {
				this.showROptions = !this.showROptions
				this.showLOptions = false
			},
			handleRChange(item) {
				this.data.selectValue = item
				this.showROptions = false
				this.emitComponentUpdate({value: item, label: this.data.selectType})
			},
			handleLChange(item) {
				this.init(item, true)
				this.showLOptions = false
				this.data.selectType = item
			},
			init(type, need = false) {
				let i = 0
				let selectROptions = []
				while (i < 6) {
					if (type === '日') {
						selectROptions.push(format(addDays(new Date(), `-${i}`), 'yyyy.MM.dd'))
					}
					if (type === '月') {
						selectROptions.push(format(addMonths(new Date(), `-${i}`), 'yyyy.MM'))
					}
					if (type === '年') {
						selectROptions.push(format(addYears(new Date(), `-${i}`), 'yyyy'))
					}
					i++
				}
				this.selectROptions = selectROptions
				if (need) {
					this.data.selectValue = selectROptions[0]
					this.emitComponentUpdate({value: selectROptions[0], label: type})
				}
			}
		},
		created() {
			
			this.configValue = this.parseConfigValue(value)
		}
	}
</script>
<style lang="scss">
	.h-select4 {
		height: 100%;
		background: #0057A9;
		border-radius: 4px;

		ul {
			top: 32px;
			right: 0;
			width: 137px;
			background: #0057A9;
			border-radius: 4px;
			padding: 0;
			transition: all .3s;
			height: 0;
			overflow: hidden;

			&.active {
				padding: 8px 0;
				height: auto;
				max-height: 207px;
				border: 1px solid #00DDFF;
				overflow-y: auto;
			}
		}

		.h-select4-left-options {
			width: 60px;
			left: 0;
			right: auto;
		}

		h3 {
			color: #fff;
			align-items: center;
			width: 100%;
			font-weight: normal;

			span {
				font-size: 18px;
				line-height: 24px;
				margin-left: 8px;
			}

			img {
				margin-left: 8px;
				transition: all .3s;

				&.active {
					transform: rotate(180deg);
				}
			}
		}

		h2 {
			color: #fff;
			align-items: center;
			font-weight: normal;
			width: 121px;

			span {
				font-size: 16px;
				line-height: 16px;
				margin-left: 8px;
				position: relative;

				&:before {
					content: '';
					position: absolute;
					width: 1px;
					height: 16px;
					background: rgba(255, 255, 255, 0.3);
					left: -15px;
				}
			}

			img {
				margin-right: 8px;
				margin-left: 8px;
				transition: all .3s;

				&.active {
					transform: rotate(180deg);
				}
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
