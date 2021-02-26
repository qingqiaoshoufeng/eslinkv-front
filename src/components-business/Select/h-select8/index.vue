<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-select8 fn-flex flex-column pos-r">
			<li @click="handleChange(item)" class="pointer pos-r text-left"
				:class="{active:(selectLabel?selectLabel:data.label)===item.name}" v-for="item in list">
				{{item.name}}
			</li>
		</ul>
	</div>
</template>
<script>
	import mixins from 'eslink-npm/mixins'
	import {
		AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX1,
		AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX2,
	} from '../../../components-map/AMap/a-map/config/scene'
	import {value} from './index.component'
	import instance from 'eslink-npm/src/store/instance.store'

	export default {
		data() {
			return {
				list: [],
				showOptions: false,
				selectLabel: '',
			}
		},
		watch: {
			data: {
				handler(val) {
					if (val) {
						let c
						this.list.forEach(item => {
							if (item.label === val.label) {
								c = item
							}
						})
						if (c) {
							this.selectLabel = c.label
						}
					}
				},
				deep: true,
				immediate: true
			}
		},
		mixins: [mixins],
		methods: {
			handleChange(a) {
				this.selectLabel = a.name
				this.showOptions = false
				this.emitComponentUpdate({
					label: this.selectLabel,
					id: a.id,
				})
				AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX1.forEach(item => {
					instance.actions.updateComponent(item, {
						data: {
							label: a.name,
							title: a.name,
							image: a.name,
							stationId: a.id,
						},
					});
				});
				AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX2.forEach(item => {
					instance.actions.updateComponent(item, {
						params: {
							id: a.id,
						},
					});
				});
			}
		},
		created() {
			this.configValue = this.parseConfigValue(value)
		},
		mounted() {
			this.$sysApi.map.airSupply.getAllTypeStationList({types: 'GasStation'}).then(res => {
				this.list = res.gasStationList
			})
		}
	}
</script>
<style lang="scss">
	.h-select8 {
		height: 100%;
		background: #001A77;

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
			color: rgba(255, 255, 255, 0.75);
			font-weight: 600;
			font-size: 24px;
			line-height: 80px;
			padding-left: 16px;
			transition: all .3s;
			height: 80px;
			width: 100%;

			&:hover {
				background: #0057A9;
				color: #fff;

				&:before {
					content: '';
					position: absolute;
					width: 4px;
					height: 100%;
					left: 0;
					top: 0;
					background: #00DDFF;
				}

				&:after {
					width: 15px;
					height: 15px;
					background-image: url('./img/right.svg');
					background-size: 15px;
					right: 14px;
					top: 50%;
					margin-top: -7.5px;
					content: '';
					position: absolute;
				}
			}

			&.active {
				background: #0057A9;
				color: #fff;

				&:after {
					width: 15px;
					height: 15px;
					background-image: url('./img/right.svg');
					background-size: 15px;
					right: 14px;
					top: 50%;
					margin-top: -7.5px;
					content: '';
					position: absolute;
				}

				&:before {
					content: '';
					position: absolute;
					width: 4px;
					height: 100%;
					left: 0;
					top: 0;
					background: #00DDFF;
				}
			}
		}
	}

</style>
