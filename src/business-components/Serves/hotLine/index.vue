<template>
	<div class="widget-part pos-r" :style="styles">
        <div class="widget-bg">
            <div class="ceshi"></div>
            <div class="Rotate-left"></div>
            <div class="Rotate-right"></div>
            <div class="Rotate-number"></div>
        </div>
	</div>
</template>
<script>
	import mixins from '../../mixins'

	export default {
		mixins: [mixins],
		created() {
			this.configSource = this.parseConfigSource()
			this.configValue = this.parseConfigValue()
		}
	}
</script>
<style lang="scss">
    .ceshi{
        /* 多边形 */
        // position: absolute;
        // width: 30px;
        // height: 30px;
        // left: 1px;
        // top: calc(50% - 30px/2 - 4px);
        // background: #C4C4C4;

        /* 多边形 */

        position: absolute;
        width: 30px;
        height: 30px;
        left: 1px;
        top: calc(50% - 30px/2 - 4px);

        background: #C4C4C4;

    }
	.widget-bg{
        margin: -15px auto;
        height: 110px;
        width: 110px;
        // background-color: #000;
        position: relative;
        .Rotate-left{
            position: absolute;
            width: 110px;
            height: 96px;
            left: 156px;
            top: 117.05px;
            background: #00DDFF;
            opacity: 0.1;
            transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);

            
        }
    }

</style>

