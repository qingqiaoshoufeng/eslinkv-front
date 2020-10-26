<template>
	<div class="widget-part" :style="styles">
		<ul class="table-header fn-flex flex-row">
			<li>时间</li>
			<li>渠道</li>
			<li>业务渠道</li>
			<li>客户</li>
			<li>状态</li>
		</ul>
		<ul class="table-list fn-flex flex-row">
			<li>
				06/03 09:11
			</li>
			<li>
				热线
			</li>
			<li>
				安装
			</li>
			<li>
				李萌萌
			</li>
			<li>
				<a>已恢复</a>
			</li>
		</ul>
		<ul class="table-list fn-flex flex-row">
			<li>
				06/03 08:59
			</li>
			<li>
				在线客服
			</li>
			<li>
				气价咨询
			</li>
			<li>
				王自健
			</li>
			<li>
				<a>已受理</a>
			</li>
		</ul>
		<ul class="table-list fn-flex flex-row">
			<li>
				06/03 08:57
			</li>
			<li>
				热线
			</li>
			<li>
				气价咨询
			</li>
			<li>
				张峰
			</li>
			<li>
				<a>已受理</a>
			</li>
		</ul>
		<ul class="table-list fn-flex flex-row">
			<li>
				06/03 08:31
			</li>
			<li>
				在线客服
			</li>
			<li>
				维修
			</li>
			<li>
				魏紫雨
			</li>
			<li>
				<a>已派工</a>
			</li>
		</ul>
		<ul class="table-list fn-flex flex-row">
			<li>
				06/03 07:23
			</li>
			<li>
				在线客服
			</li>
			<li>
				自采暖安装
			</li>
			<li>
				郑强
			</li>
			<li>
				<a>已派工</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import {styleParser, widgetMixin} from '../../../../lib'

	export default {
		mixins: [widgetMixin],
		computed: {
			styles() {
				const {layout} = this.config
				return styleParser(layout, this.time)
			},
			mergedConfig() {
				if (!this.config.config) return false
				return {...this.config.config}
			}
		},
		mounted() {
		},
		created() {
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValue()
		}
	}
</script>
<style lang="scss">
	.table-header {
		background-color: #061B63;
		color: #00CBF4;

		li {
			padding: 4px 0;

			&:nth-child(1) {
				width: 100px;
			}

			&:nth-child(2) {
				width: 80px;
			}

			&:nth-child(3) {
				width: 100px;
			}

			&:nth-child(4) {
				width: 70px;
			}
		}
	}

	.table-list {
		background-color: #03053E;

		li {
			padding: 4px 0;
			color: #fff;

			&:nth-child(1) {
				width: 100px;
			}

			&:nth-child(2) {
				width: 80px;
			}

			&:nth-child(3) {
				width: 100px;
			}

			&:nth-child(4) {
				width: 70px;
			}
		}

		a {
			color: #00CBF4;
		}
	}
</style>

