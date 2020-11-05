
<template>
	<div class="widget-part pos-r" :style="styles">
        <div class="engineering-box">
            <video src="/static/images/project/engineering.webm" controls="controls" autoplay="autoplay" muted="muted" loop>
            </video>
            <div class="engineering-value font-num">{{data&&data.value}}</div>
            <div class="engineering-desc">{{data&&data.desc}}</div>
        </div>	
	</div>
</template>
<script>
	import mixins from '../../mixins'
	// import options from './options'

	const config = {animation: true}
	const value = {
		api: {
            data: JSON.stringify({
				desc: '无安全事故（天）',
				value: 652
			})
		}
	}
	export default {
		mixins: [mixins],
		methods: {
			// setOption(data) {
			// 	options.series[0].data = data.value
			// 	this.instance && this.instance.setOption(options)
			// }
		},
		// watch: {
		// 	data: {
		// 		handler(val) {
		// 			if (this.id) {
		// 				const data = {...val}
		// 				this.$nextTick(() => {
		// 					this.instance = echarts.init(document.getElementById(this.id))
		// 					this.setOption(data)
		// 				})
		// 			}
		// 		},
		// 		deep: true,
		// 		immediate: true
		// 	}
		// },
		created() {
			this.configSource = this.parseConfigSource(config)
			this.configValue = this.parseConfigValue(config, value)
		}
	}
</script>
<style lang="scss">
	.engineering-box{
        height: 150px;
        width: 340px;
        position: relative;
        video::-webkit-media-controls{
            display:none !important;
        }
        .engineering-value{
            height: 150px;
            width: 150px;
            line-height: 150px;
            text-align: center;
            position: absolute;
            left: 0;
            top:0;  
            font-size: 48px;
            color: #fff;
        }
        .engineering-desc{
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            height: 150px;
            line-height: 150px;
            position: absolute;
            left: 170px;
            top:0;  
            color: #fff;
        }
        
    }
</style>

