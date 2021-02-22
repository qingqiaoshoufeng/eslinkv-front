<template>
    <div class="widget-part pos-r" :style="styles">
        <div class="h-curve-1" :id="id"/>
    </div>
</template>
<script>
    import mixins from '../../mixins'
    import options from './options'
    import {value, config} from './index.component'

    export default {
        mixins: [mixins],
        methods: {
            setOption(data) {
                options.series.data = data.value;
                options.series.links = data.links;
                this.instance && this.instance.setOption(options);
            },
        },
        watch: {
            data: {
                handler(val) {
                    if (this.id) {
                        const data = {...val};
                        this.$nextTick(() => {
                            this.instance = echarts.init(
                                document.getElementById(this.id)
                            );
                            this.setOption(data);
                        });
                    }
                },
                deep: true,
                immediate: true,
            },
        },
        created() {
            
            this.configValue = this.parseConfigValue(value)
        },
    };
</script>
<style lang="scss">
    .h-curve-1 {
        height: 100%;
    }

    .h-curve-1-title {
        font-size: 16px;
        color: #fff;
        line-height: 16px;
        top: 0;
        left: 0;
    }
</style>

