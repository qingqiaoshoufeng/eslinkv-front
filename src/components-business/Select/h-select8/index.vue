<template>
	<div class="widget-part pos-r" :style="styles">
		<ul class="h-select8 fn-flex flex-column pos-r">
			<li
				@click="handleChange(item)"
				class="pointer pos-r text-left"
				:class="{
					active:
						(selectLabel ? selectLabel : data.label) === item.name,
				}"
				v-for="item in list"
			>
				{{ item.name }}
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
import { widgetMixin } from '@eslinkv/vue2'
import { Editor } from '@eslinkv/core'
import {
	AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX1,
	AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX2,
} from '../../../components-map/AMap/a-map/config/scene'
import { value } from './index.component'

export default {
	data() {
		return {
			editor: Editor.instance(),
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
			immediate: true,
		},
	},
	mixins: [widgetMixin],
	methods: {
		handleChange(a) {
			this.selectLabel = a.name
			this.showOptions = false
			this.emitComponentUpdate({
				label: this.selectLabel,
				id: a.id,
			})
			AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX1.forEach(item => {
				this.editor.updateComponent(item, {
					data: {
						label: a.name,
						title: a.name,
						image: a.name,
						stationId: a.id,
					},
				})
			})
			AIRSUPPLY_ARTWORK__MODEL_COMPONENTINDEX2.forEach(item => {
				this.editor.updateComponent(item, {
					params: {
						id: a.id,
					},
				})
			})
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	mounted() {
		this.$api.map.airSupply
			.getAllTypeStationList({ types: 'GasStation' })
			.then(res => {
				this.list = res.gasStationList
			})
	},
}
</script>
<style lang="scss">
.h-select8 {
	height: 100%;
	background: #001a77;

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
		width: 100%;
		height: 80px;
		padding-left: 16px;
		font-size: 24px;
		font-weight: 600;
		line-height: 80px;
		color: rgba(255, 255, 255, 0.75);
		transition: all 0.3s;

		&:hover {
			color: #fff;
			background: #0057a9;

			&::before {
				position: absolute;
				top: 0;
				left: 0;
				width: 4px;
				height: 100%;
				content: '';
				background: #0df;
			}

			&::after {
				position: absolute;
				top: 50%;
				right: 14px;
				width: 15px;
				height: 15px;
				margin-top: -7.5px;
				content: '';
				background-image: url('./img/right.svg');
				background-size: 15px;
			}
		}

		&.active {
			color: #fff;
			background: #0057a9;

			&::after {
				position: absolute;
				top: 50%;
				right: 14px;
				width: 15px;
				height: 15px;
				margin-top: -7.5px;
				content: '';
				background-image: url('./img/right.svg');
				background-size: 15px;
			}

			&::before {
				position: absolute;
				top: 0;
				left: 0;
				width: 4px;
				height: 100%;
				content: '';
				background: #0df;
			}
		}
	}
}
</style>
