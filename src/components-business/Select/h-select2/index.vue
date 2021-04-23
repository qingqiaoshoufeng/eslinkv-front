<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="h-select2 fn-flex flex-row pos-r">
			<h2 class="fn-flex flex-row" @click="showOptions = !showOptions" :class="{active: showOptions}">
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
import { widgetMixin } from 'eslinkv-sdk'
import { value } from './index.component'

export default {
	data() {
		return {
			showOptions: false,
			selectLabel: '居民户',
			selectValue: '居民户',
		}
	},
	mixins: [widgetMixin],
	methods: {
		handleChange(item) {
			this.selectValue = item.value
			this.selectLabel = item.label
			this.showOptions = false
			this.emitComponentUpdate({
				type: this.selectValue,
			})
		},
	},
	created() {
		this.configValue = this.parseConfigValue(value)
	},
	mounted() {
		this.emitComponentUpdate({
			type: this.selectValue,
		})
	},
}
</script>
