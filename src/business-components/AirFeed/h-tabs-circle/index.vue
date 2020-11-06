<template>
<div>
	<h-cvs :source="data"/>
</div>

</template>

<script>
	import JSONStringify from '../../../../lib/vendor/JSONStringify';
	import mixins from '../../mixins';
	import HCvs from './HCvs';
	const config = {animation: true}
	const value = {
		api: {
			data: JSONStringify([
				{
				name: '高压管道',
				percent: 20,
				count: '1,233,234',
				circleStyle: '#FB592C',
				markStyle: '',
				countStyle: '',
				unitStyle: '',
				percentStyle: ''
			},
			{
				name: '中压管道',
				percent: 30,
				count: '1,233,234',
				circleStyle: '#18CEB9',
				markStyle: '',
				countStyle: '',
				unitStyle: '',
				percentStyle: ''
			},
			{
				name: '低压管道',
				percent: 50,
				count: '1,233,234',
				circleStyle: '#2C99FF',
				markStyle: '',
				countStyle: '',
				unitStyle: '',
				percentStyle: ''
			},

			])
		}
	}
export default {
	name: 'h-tabs-circle',
	components: {
		HCvs
	},
	data() {
		return {
			CVS: null,
			space: 10,
			count: 1,
			lineWidth: 8.72,
			R: 39,
		};
	},
	mixins: [mixins],
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	mounted(){
	},
	methods: {
		draw(percent) {
			const ctx = this.setupCanvas(document.getElementById("circleCanvas"));
			const per = percent / 100;
			const drawLong = per * 2;
			let startAngle = 0;
			const xAngle = 10 * (Math.PI / 180);
			const endAngle = 1.5 * Math.PI;
			if (drawLong < 1.5) {
				startAngle = 1.5 - drawLong;
			} else if (drawLong === 1.5) {
				startAngle = 0;
			} else {
				startAngle = -(drawLong - 1.5);
			}
			let tmpAngle = startAngle;
			const render = () => {
				if (tmpAngle >= endAngle) {
				return;
				} else if (tmpAngle + xAngle > endAngle) {
				tmpAngle = endAngle;
				} else {
				tmpAngle += xAngle;
				}
				ctx.lineWidth = this.lineWidth;
				ctx.beginPath();
				ctx.arc(79, 79, 50, startAngle * Math.PI, tmpAngle, false);
				ctx.strokeStyle = "#FB592C";
				ctx.stroke();
				ctx.closePath();
				requestAnimationFrame(render);
			};
			// render(this.r, startAngle, endAngle, this.lineWidth, tmpAngle);
			render();
			// this.r += this.space + this.lineWidth;
		},
		setupCanvas(canvas) {
			const ctx = canvas.getContext("2d");
			let width = canvas.width,height=canvas.height;
			if (window.devicePixelRatio) {
				const dpr = dpr || 1;
				canvas.style.width = width + "px";
				canvas.style.height = height + "px";
				canvas.height = height * dpr;
				canvas.width = width * dpr;
				ctx.scale(dpr, dpr);
			}
			return ctx;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#circleCanvas{
	width: 719px;
	height: 163px;
	border: 1px solid green;
	background-color: #fff;
}
</style>
