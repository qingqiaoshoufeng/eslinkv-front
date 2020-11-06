<template>
  <div>
	  <!-- 防止抖动高度加了 18-->
    <canvas ref="CVS" id="myCanvas" width="719" height="181"></canvas>
  </div>
</template>

<script>
export default {
	name: 'HCvs',
	data() {
		return {
			cvsSize: {}
		};
	},
	props: {
		source: {
			type: Array,
			default: () => ([
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
				{
					name: '低压管道',
					percent: 50,
					count: '1,233,234',
					circleStyle: '#2C99FF',
					markStyle: '',
					countStyle: '',
					unitStyle: '',
					percentStyle: ''
				}
			])
		}
  	},
	mounted() {
		this.CTX = this.getCtx();
		// 画主图
		this.renderMain();
		// 画图标示
		this.renderMark();
		// 画文字标识
		this.renderDesc();
	},
	methods: {
		getAngle(percent = 0){
			const _p = percent / 100;
			const circleTotalPI = 2 * Math.PI;
			const endAngle = 1.5 * Math.PI;
			// 当前百分比需要占据的角度
			const angle = circleTotalPI * _p;
			// 因为结束角度固定在圆的顶部 即1.5PI的地方所以需要计算开始角度
			if(angle < endAngle){
				return endAngle - angle;
			}else if(angle === endAngle){
				return 0;
			}else {
				return -(angle - endAngle);
			}

		},
		renderMain(){
			const r = 39;
			// 圆心 x轴坐标
			const circleX = 79;
			// 圆心 y轴坐标
			const circleY = 82;
			// 线宽
			const lineWidth = 8.5;
			// 间隔
			const interval = 7.5;
			// 本图终点固定在 1.5 PI 的地方
			const endAngle = 1.5 * Math.PI;
			// 默认顺时针画圆
			const direction = false;

			this.source && this.source.forEach((item, index) => {
				const _r = r + lineWidth * index + interval * index;
				const percent = item.percent || 0;
				const startAngle  = this.getAngle(percent);
				const lineColor = item.circleStyle || '';
				this.animateCircle(
					circleX,
					circleY, _r,
					startAngle,
					endAngle,
					direction,
					lineColor,
					lineWidth
				)
				.then(() => {
					// 此处开始画标注线

					// 开始点的X轴
					const lineX = 79;
					// 开始点的Y轴
					const startLineY = 42;
					// 线长
					const lineWidth = 82;
					// 线高
					const lineHeight = 2;
					// 线的颜色
					const lineColor = item.circleStyle || '';
					// 每条线之间的间隔
					const interval = 16;
					const endLineY = startLineY - (interval * index);
					this.animateLine(
						lineX,
						endLineY,
						lineWidth,
						lineHeight,
						lineColor
					);
					// 此处开始画文字

					// 开始x坐标
					const startFontX = 169;
					// 开始y坐标
					const startFontY = 58;
					// 默认字体白色
					const fontColor = '#ffffff';
					const fontStyle = item.fontStyle || '16px PingFang SC';
					const text = `${item.name || ''}${percent}%`;
					const endFontY = startFontY - (interval * index);
					this.drawText(startFontX, endFontY, fontColor, fontStyle, text);
				});
			})
		},
		renderMark(){
			// 半径
			const r = 7;
			// 圆心 x轴坐标
			const circleX = 314;
			// 圆心 第一个原的y轴坐标
			const circleStartY = 138;
			// 线宽
			const lineWidth = 6;
			// 间隔
			const interval = 41;
			// 从顶部开始画
			const startAngle = -0.5 * Math.PI;
			// 本图终点固定在 1.5 PI 的地方
			const endAngle = 1.5 * Math.PI;
			// 默认顺时针画圆
			const direction = false;

			this.source && this.source.forEach((item, index) => {
				const circleY = circleStartY  - interval * index;
				const lineColor = item.circleStyle || '';
				this.animateCircle(
					circleX,
					circleY,
					r,
					startAngle,
					endAngle,
					direction,
					lineColor,
					lineWidth
				)
				.then(() => {
					// 此处开始画文字

					// 开始x坐标
					const startFontX = 332;
					// 开始y坐标
					const startFontY = 143;
					// 默认字体白色
					const fontColor = '#ffffff';
					const fontY = startFontY - interval * index;
					const fontStyle = item.fontStyle || '18px PingFang SC';
					const text = item.name;
					this.drawText(startFontX, fontY, fontColor, fontStyle, text);
				});
			})
		},
		renderDesc(){
			this.source && this.source.forEach((item, index) => {
				const countText = item.count || '';
				const percent = item.percent || '';
				const countStyle = item.countStyle || '24px font-num';
				const unitStyle = item.unitStyle || '18px PingFang SC';
				const percentStyle = item.percentStyle || '24px font-num';
				// 文字默认都为白色
				const fontColor = '#ffffff';

				// 画数量
				// 数量开始x轴
				const countStartX = 490;
				// 数量开始y轴
				const countStartY = 145;
				// 数量上下间隔
				const countInterval = 41;
				this.drawText(countStartX, countStartY - (countInterval * index), fontColor, countStyle, countText);

				// 画单位
				// 单位开始x轴
				const unitStartX = countStartX + this.getTextWith(countText, countStyle) + 8 ;
				// 单位y轴
				const unitStartY = 143;
				// 单位上下间隔
				const unitInterval = 42;
				this.drawText(unitStartX, unitStartY - (unitInterval * index), fontColor, unitStyle, '万km');

				// 画百分比
				// 百分比x轴
				const percentStartX = unitStartX + this.getTextWith('万km', unitStyle) + 24;
				// 百分比y轴
				const percentStartY = 146;
				// 百分比上下间隔
				const percentInterval = 42;
				this.drawText(percentStartX, percentStartY - (percentInterval * index), fontColor, percentStyle, `${percent}%`);
			})
		},
		drawCircle(
			x,
			y,
			r,
			startAngle,
			endAngle,
			direction = false,
			color,
			lineWidth
		) {
			const { XDown = 0, yDown = 0} = this.getOffset();
			const ctx = this.CTX;
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.arc(x + XDown, y + yDown, r, startAngle, endAngle, direction);
			ctx.stroke();
			ctx.closePath();
		},
		drawLine(startX, startY, width, height, color) {
			const { XDown = 0, yDown = 0 } = this.getOffset();
			const ctx = this.CTX;
			ctx.fillStyle = color;
			ctx.fillRect(startX + XDown, startY + yDown, width, height);
		},
		drawText(startX, startY, color, font, text) {
			// 延时加载字体
			setTimeout(() => {
				const { XDown = 0, yDown = 0 } = this.getOffset();
				const ctx = this.CTX;
				ctx.font = font;
				ctx.fillStyle = color;
				ctx.fillText(text, startX + XDown, startY + yDown);
			}, 0)
		},
		getCtx() {
			const len = this?.source?.length ?? 0;
			let width = 719;
			let height = 163;
			if(len > 3) {
				width += 2*((len - 3)*(8.5 + 7.5));
				height += 2*((len - 3)*(8.5 + 7.5));
			}
			this.cvsSize = {
				width,
				height
			}
			const domCvs = this.$refs.CVS;
			const dpr = window.devicePixelRatio || 1;
			domCvs.style.width = `${width}px`;
			domCvs.style.height = `${height}px`;
			domCvs.width = 2 * width * dpr;
			domCvs.height = 2 * height * dpr;
			const ctx = domCvs.getContext('2d');
			ctx.scale(2 * dpr, 2 * dpr);
			return ctx;
		},
		animateCircle(
			x,
			y,
			r,
			startAngle,
			endAngle,
			direction = false,
			color,
			lineWidth,
		) {
			return new Promise(resolve => {
				let temAngle = startAngle;
				let speed = 10 * (Math.PI / 180);
				const render = () => {
					if (temAngle >= endAngle) {
						return resolve(true);
					} else if (temAngle + speed > endAngle) {
						temAngle = endAngle;
					} else {
						temAngle += speed;
					}
					this.drawCircle(
						x,
						y,
						r,
						startAngle,
						temAngle,
						direction,
						color,
						lineWidth
					);

					requestAnimationFrame(render);
				};
				render();
			})
		},
		animateLine(startX, startY, width, height, color) {
			return new Promise(resolve => {
				let speed = 6;
				let tempWidth = 0;
				const render = (cb) => {
					if (tempWidth >= width) {
						return resolve(true);
					} else if (tempWidth + speed > width) {
						tempWidth = width;
					} else {
						tempWidth += speed;
					}
					this.drawLine(startX, startY, tempWidth, height, color);
					requestAnimationFrame(render);
				};
				render();
			})
		},
		getTextWith(text, fontStyle) {
			const canvas = document.createElement('canvas')
			const context = canvas.getContext('2d')
			context.font = fontStyle || '16px'
			const dimension = context.measureText(text)
			return dimension.width
		},
		getOffset(){
			const initX = 719;
			const initY = 163;
			const { width, height } = this.cvsSize;
			const yDown = Math.floor((height - initY)/2);
			const XDown = Math.floor((width - initX)/2);

			return {
				yDown: yDown || 0,
				XDown: XDown || 0
			}
		}
  	},
};
</script>
