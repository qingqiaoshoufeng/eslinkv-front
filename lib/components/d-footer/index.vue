<template lang="pug">
    .d-footer.fn-flex
        .d-footer-left.fn-flex
            slot(name="left")
        .d-footer-right.fn-flex
            span(style="padding-right: 25px")
                a.doc-link.fn-flex.flex-row(title="使用文档" @click="handleClick")
                    span 使用文档
                    i-icon(type="md-help-circle")
            slot(name="right")
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {Icon} from 'view-design'

    @Component({
        components: {'i-icon': Icon},
    })
    class DFooter extends Vue {
        handleClick() {
            window.open(`${location.origin}${location.pathname}#/help/HowToUseMarket`)
        }
    }

    export default DFooter
</script>
<style lang="scss">
    .d-footer {
        width: 100%;
        height: 50px;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        
        /deep/ button {
            margin-left: 10px;
        }
        
        .d-footer-left, .d-footer-right {
            align-items: center;
            
            .return {
                margin-left: 0;
            }
        }
        
        .doc-link {
            align-items: center;
        }
        
        .d-footer-left {
            .d-footer-title {
                font-size: 15px;
                padding: 0 15px 0 0;
            }
        }
    }
</style>
