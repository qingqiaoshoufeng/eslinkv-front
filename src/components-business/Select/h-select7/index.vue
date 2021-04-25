<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select2 fn-flex flex-row pos-r">
			<h2
				class="fn-flex flex-row"
				@click="showOptions = !showOptions"
				:class="{ active: showOptions }"
			>
				<span>{{ selectLabel }}</span>
				<img src="/static/icons/h-select-1.svg" />
			</h2>
			<ul
				class="pos-a"
				v-if="showOptions"
				:class="{ active: showOptions }"
			>
				<li
					class="pointer"
					v-for="item in data ? data : []"
					@click="handleChange(item)"
				>
					{{ item.label }}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
const { widgetMixin } = eslinkV
import { value } from './index.component'

export default {
	data() {
		return {
			showOptions: false,
			selectLabel: '罗茨表',
			selectValue: 'metertype_01',
		}
	},
	mixins: [widgetMixin],
	methods: {
		handleChange(item) {
			this.selectValue = item.value
			this.selectLabel = item.label
			this.showOptions = false
			this.emitComponentUpdate({ metertypecode: this.selectValue })
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	mounted() {
		this.emitComponentUpdate({
			metertypecode: this.selectValue,
		})
	},
}
</script>
<style lang="scss" scoped>
ul {
	&::-webkit-scrollbar {
		width: 4px;
		height: 1px;
		transition: all 0.3s;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 10px;
		transition: all 0.3s;
	}

	&::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0);
		border-radius: 10px;
		transition: all 0.3s;
	}
}
</style>
