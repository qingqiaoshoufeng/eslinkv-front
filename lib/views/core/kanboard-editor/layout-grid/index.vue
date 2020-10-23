<template>
	<div class="layout-grid" @click.stop @mousedown.stop @mousemove.stop>
		<h2 class="title">
			<div>
				布局格子
				<a class="doc-link" href="http://zentao.eslink.cc/zentao/doc-view-4590.html" target="_blank" title="文档">
					<Icon type="md-help-circle"/>
				</a>
			</div>
			<label>
				格子间隙
				<input type="number" v-model="gap" :min="0" step="1"/>
			</label>
		</h2>
		<Divider/>
		<div class="grid-create">
			<div class="left">
				<div class="row-grid">
					<h3>
						行格子
						<label>
							格子数
							<input type="number" v-model.number="rowNumber" :min="1" :max="24" step="1"/>
						</label>
					</h3>
					<div class="grid-template row" draggable="true" @dragstart.stop="dragstart($event, 'row')">
						<div v-for="i in rowNumber" :key="i" class="grid"></div>
					</div>
				</div>
				<h4>使用说明</h4>
				<ol>
					<li><strong>行格子</strong>总是占满画布或另一个格子块的宽度，而<strong>列格子</strong>总是占满画布或另一个格子块的高度。</li>
					<li>行格子、列格子可以互相嵌套，一个布局可由行格子和列格子嵌套完成。</li>
					<li>各类小工具总是充满一个格子块。</li>
				</ol>
			</div>
			<div class="col-grid">
				<h3>
					列格子
					<label>
						格子数
						<input type="number" v-model.number="colNumber" :min="1" :max="24" step="1"/>
					</label>
				</h3>
				<div class="grid-template col" draggable="true" @dragstart.stop="dragstart($event, 'col')">
					<div v-for="i in colNumber" :key="i" class="grid"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {Divider, Icon} from 'view-design'

	export default {
		name: 'layout-grid',
		components: {Divider, Icon},
		data() {
			return {
				rowNumber: 3,
				colNumber: 3,
				gap: 15
			}
		},
		methods: {
			dragstart(e, direction) {
				e.dataTransfer.setData('layout-grid', JSON.stringify({
					type: 'layout-grid',
					direction,
					gap: this.gap,
					grids: this[`${direction}Number`]
				}))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.layout-grid {
		position: absolute;
		right: 55px;
		top: 88px;
		width: 510px;
		height: auto;
		overflow: hidden;
		z-index: 3;
		padding: 15px;
		background-color: #fff;
		border-radius: 5px;
		filter: drop-shadow(rgba(0, 0, 0, 0.15) 0 5px 5px);

		.title {
			display: flex;
			font-size: 16px;
			justify-content: space-between;
			align-items: center;

			label {
				max-width: 40%;
			}

			.doc-link {
				color: #2d8cf0;
				font-size: 1.4em;
			}
		}

		h3 {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		label {
			display: flex;
			align-items: center;
			max-width: 70%;
			font-size: 14px;
			font-weight: normal;
			white-space: nowrap;
		}

		.grid-create {
			display: flex;

			.left {
				display: flex;
				flex-direction: column;
				width: 240px;
				margin-right: 15px;
			}
		}

		input[type='number'] {
			border: #e2e2e2 1px solid;
			height: 30px;
			margin-left: 10px;
			flex-grow: 1;
			flex-shrink: 1;
			padding: 0 7px;
			width: 50px;
			text-align: center;

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}

			&:hover {
				border-color: #57a3f3;
			}

			&:focus {
				border-color: #57a3f3;
				outline: 4px solid #57a3f345;
			}
		}

		.row-grid,
		.col-grid {
			line-height: 1.5;
		}

		.col-grid {
			flex-grow: 1;
			padding-left: 15px;
			border-left: #e2e2e2 1px solid;
		}

		.grid-template {
			display: flex;
			width: 240px;
			height: 70px;
			padding: 2px 2px 2px 0;
			margin: 10px auto;
			border: 1px solid #e6e6e6;
			cursor: grab;

			.grid {
				background-color: #d2d2d2;
				flex-grow: 1;
				margin-left: 2px;
			}

			&.col {
				flex-direction: column;
				width: 80px;
				height: 240px;
				padding: 0 2px 2px 2px;
				margin: 10px auto;

				.grid {
					height: 50px;
					margin-top: 2px;
					margin-left: 0;
				}
			}
		}

		ol {
			padding-left: 1.5em;

			li {
				list-style: decimal;
				margin-top: 10px;
			}
		}
	}

	/deep/ {
		.ivu-divider {
			margin: 10px 0;
		}
	}
</style>
