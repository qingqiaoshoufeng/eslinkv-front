<template>
	<ul class="h-vertical-tabs">
		<li
			:class="`
				h-vertical-tabs__item
				h-vertical-tabs__item${actived === index ? '--actived' : ''}`"
			v-for="(item, index) in (source || [])"
			:key="item.name || index"
			@click="() => clickTabEvt(index)">
			<div
				:class="`
				h-vertical-tabs__item__name
				h-vertical-tabs__item__name${actived === index ? '--actived' : ''}`">
				{{item.name || ''}}
			</div>
			<div v-if="actived === index" class="h-vertical-tabs__item__icon"></div>
		</li>
	</ul>
</template>

<script>

export default {
	name: 'h-tabs-circle',

	data() {
		return {
			actived: 0,
			intervalId: null,
			waitIntervalId: null
		};
	},
	props: {
		config: {
			type: Object,
			default: () => ({
				delay: 1000,
				interval: 3000,
				wait: 5000
			})
		},
		defaultActived: {
			type: Number,
			default: 0
		},
		source: {
			type: Array,
			default: () => ([])
		}
	},
	mounted(){
		this.actived = this.defaultActived || 0;
		this.beginInterval();
	},
	destroyed(){
		this.clearInterval();
		this.clearWaitInterval();
	},
	methods: {
		beginInterval(){
			const { delay = 1000 } = this.config || {};
			setTimeout(() => {
				this.autoCheckTab();
			}, delay)
		},
		autoCheckTab(){
			const { interval = 2500 } = this.config || {};
			const maxIndex = this.source?.length ?  this.source?.length - 1 : 0;

			let count = this.actived !== null && this.actived  || 0;
			this.intervalId = setInterval(() => {
				this.changeActived(count);
				count ++;
				if(count > maxIndex){
					count = 0;
				}
			}, interval)
		},
		changeActived(index){
			this.actived = index;
			this.$emit('actived-change', index);
		},
		clearInterval(){
			clearInterval(this.intervalId);
			this.intervalId = null;
		},
		clearWaitInterval(){
			clearInterval(this.waitIntervalId);
			this.waitIntervalId = null;
		},
		clickTabEvt(index){
			this.clearInterval();
			this.changeActived(index);
			this.timeWaitCount();
		},
		timeWaitCount(){
			if(this.waitIntervalId){
				this.clearWaitInterval();
			}
			const { wait = 30000 } = this.config || {};
			let count = 0;
			this.waitIntervalId = setInterval(() => {
				count += 1000;
				if(count >= wait){
					this.autoCheckTab();
					this.clearWaitInterval();
				}
			}, 1000);
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.h-vertical-tabs {
		&__item {
			width: 200px;
			height: 40px;
			background-color: rgba(0, 31, 109, 0.5);
			box-sizing: border-box;
			border-left: 4px solid rgba(0, 0, 0, 0);
			cursor: pointer;
			&--actived {
				background-color: #0057A9;
				border-left: 4px solid #00DDFF;
			}
			&__name {
				font-family: PingFang SC;
				font-size: 18px;
				line-height: 24px;
				color: #FFFFFF;
				float: left;
				margin-left: 8px;
				margin-top: 7px;
			}
			&__icon {
				width: 24px;
				height: 24px;
				background-image: url('/static/icons/arrow-right.svg');
				background-size: 24px;
				background-position: center;
				background-repeat: no-repeat;
				margin-right: 8px;
				margin-top: 7px;
				float: right;
				margin-right: 8px;
				margin-top: 7px;
			}
		}
	}
</style>
