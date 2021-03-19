<script>
	export default {
		name: 'Tabs',

		provide () {
			return {
				rootTabs: this
			}
		},

		props: {
			value: String
		},

		data () {
			return {
				panes: [],
				currentName: '',
				activeTab: ''
			}
		},
		watch: {
			value (val) {
				this.currentName = val
			}
		},
		created () {
			this.currentName = this.value
			this.activeTab = this.value
		},

		methods: {
			calcPaneInstances (isForceUpdate = false) {
				if (this.$slots.default) {
					const paneSlots = this.$slots.default.filter(
						vnode =>
							vnode.tag &&
							vnode.componentOptions &&
							vnode.componentOptions.Ctor.options.name === 'TabPane'
					)
					const panes = paneSlots.map(
						({ componentInstance }) => componentInstance
					)
					this.panes = panes
				} else if (this.panes.length !== 0) {
					this.panes = []
				}
			},
			handleTabClick (tab, tabName, event) {
				this.setCurrentName(tabName)
			},
			setCurrentName (value) {
				this.$emit('input', value)
			}
		},

		render (h) {
			const { panes, handleTabClick, activeTab } = this
			const navData = {
				props: {
					panes
				},
				ref: 'nav'
			}
			let header = null
			if (panes.length == 1) {
				header = (
				<div class="fn-flex flex-row h-title-1">
					<div class="h-title-1-icon" />
					<h2>{panes[0].label}</h2>
				</div>
				)
			}
			if (panes.length > 1) {
				header = (
				<div class="tabs__header">
					{panes.map(panel => {
						return (
							<div
								on-click={e =>
									handleTabClick(panel, panel.name, e)
								}
								class={panel.name === activeTab ? 'active' : ''}
							>
								{panel.label}
							</div>
						)
					})}
				</div>
				)
			}
			const panels = <div class="tabs__content">{this.$slots.default}</div>

			return <div class="tabs">{[header, panels]}</div>
		},

		mounted () {
			this.calcPaneInstances()
		}
	}
</script>
<style lang="scss" scoped>
.tabs {
	position: relative;
	padding-top: 0;
	perspective: 0;

	.tabs__header {
		position: sticky;
		top: 0;
		right: 0;
		left: 0;
		box-sizing: border-box;
		display: flex;
		font-size: 24px;
		line-height: 46px;
		color: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		user-select: none;
		background: rgba(0, 87, 169, 0.5);
		border: 1px solid #1773c9;

		> div {
			position: relative;
			flex: 1;
			text-align: center;

			&.active {
				font-weight: 600;
				color: rgba(255, 255, 255, 1);

				&::after {
					position: absolute;
					bottom: 0;
					left: 50%;
					width: 0;
					height: 0;
					content: '';
					border-color: transparent transparent #0df;
					border-style: solid;
					border-width: 0 8px 4px;
					transform: translateX(-50%);
				}
			}
		}

		&::before,
		&::after {
			position: absolute;
			top: 23px;
			display: block;
			width: 3px;
			height: 24px;
			content: ' ';
			background: #1773c9;
			transform: translateY(-50%);
		}

		&::before {
			left: 0;
		}

		&::after {
			right: 0;
		}
	}

	.tabs__content {
		position: relative;
	}
}

.flex-row {
	width: 480px;
	height: 43px;

	.h-title-1-icon {
		width: 34px;
		height: 34px;
		margin-right: 9px;
		background-image: url('/static/icons/h-title1-1.svg');
	}

	.h-title-1 {
		position: absolute;
		top: 0;
		align-items: center;
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);

		h2 {
			font-size: 24px;
			font-weight: 600;
			color: #fff;
		}
	}
}
</style>
