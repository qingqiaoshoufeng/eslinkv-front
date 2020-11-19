<script>
export default {
	name: 'Tabs',

	provide() {
		return {
			rootTabs: this,
		};
	},

	props: {
		value: String,
	},

	data() {
		return {
			panes: [],
			currentName: '',
			activeTab: '',
		};
	},
	watch: {
		value(val) {
			console.log(val, 'val');
			this.currentName = val;
		},
		immedate: true,
	},
	created() {
		this.currentName = this.value;
		this.activeTab = this.value;
	},

	methods: {
		calcPaneInstances(isForceUpdate = false) {
			if (this.$slots.default) {
				const paneSlots = this.$slots.default.filter(
					vnode =>
						vnode.tag &&
						vnode.componentOptions &&
						vnode.componentOptions.Ctor.options.name === 'TabPane'
				);
				const panes = paneSlots.map(
					({ componentInstance }) => componentInstance
				);
				this.panes = panes;
			} else if (this.panes.length !== 0) {
				this.panes = [];
			}
		},
		handleTabClick(tab, tabName, event) {
			this.setCurrentName(tabName);
		},
		setCurrentName(value) {
			this.$emit('input', value);
		},
	},

	render(h) {
		let { panes, handleTabClick, activeTab } = this;

		const navData = {
			props: {
				panes,
			},
			ref: 'nav',
		};
		let header = null;
		if (panes.length == 1) {
			header = (
				<div class="fn-flex flex-row h-title-1">
					<div class="h-title-1-icon" />
					<h2>{panes[0].label}</h2>
				</div>
			);
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
						);
					})}
				</div>
			);
		}
		const panels = <div class="tabs__content">{this.$slots.default}</div>;

		return <div class="tabs">{[header, panels]}</div>;
	},

	mounted() {
		this.calcPaneInstances();
	},
};
</script>
<style lang="scss" scoped>
.tabs {
	perspective: 0px;
	padding-top: 0;
	.tabs__header {
		background: #051040;
		border: 1px solid #1773c9;
		box-sizing: border-box;
		line-height: 46px;
		display: flex;
		font-size: 24px;
		position: sticky;
		top: 0;
		right: 0;
		left: 0;
		cursor: pointer;
		user-select: none;
		color: rgba(255, 255, 255, 0.6);
		> div {
			flex: 1;
			text-align: center;
			position: relative;
			&.active {
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				&::after {
					content: '';
					width: 0;
					height: 0;
					position: absolute;
					bottom: 0px;
					left: 50%;
					transform: translateX(-50%);
					border-width: 0 8px 4px;
					border-style: solid;
					border-color: transparent transparent #00ddff;
				}
			}
		}
		&:before,
		&:after {
			content: ' ';
			display: block;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			background: #1773c9;
			height: 24px;
			width: 3px;
		}
		&:before {
			left: 0;
		}
		&:after {
			right: 0;
		}
	}
}
.flex-row {
	width: 480px;
	height: 43px;
	.h-title-1-icon {
		background-image: url('/static/icons/h-title1-1.svg');
		height: 34px;
		width: 34px;
		margin-right: 9px;
	}

	.h-title-1 {
		align-items: center;
		padding-bottom: 8px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);
		position: absolute;
		top: 0;

		h2 {
			font-weight: 600;
			font-size: 24px;
			color: #fff;
		}
	}
}
</style>