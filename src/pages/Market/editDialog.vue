<template lang="pug">
    Modal(v-model="modalShow" title="编辑")
        Form(:label-width="100" :rules="ruleValidate" ref="form" :model="form")
            FormItem(label="组件名" prop="componentTitle")
                Input(v-model="form.componentTitle")
            FormItem(label="组件英文名" prop="componentEnTitle")
                span(v-if="form.componentId") {{ form.componentEnTitle }}
                Input(v-model="form.componentEnTitle" v-else)
            FormItem(label="当前版本号" prop="componentVersion")
                span(v-if="form.componentId") {{ form.componentVersion }}
                Input(v-model="form.componentVersion" v-else)
            FormItem(label="排序" prop="sort")
                Input(v-model="form.sort" number)
            FormItem(label="类型" prop="componentTypeId")
                TreeSelect(v-model="form.componentTypeId" :options="componentTypeList" :normalizer="normalizer")
            FormItem(label="略缩图" prop="componentImage")
                Upload(action="/data/saveImage" :on-success="handleUploadSuccess" :show-upload-list="false")
                    .img-wrap
                        img.upload-img(:src="form.componentImage" v-if="form.componentImage")
                        Icon(type="ios-camera" size="20" v-else)
        div(slot="footer")
            Button(type="primary" @click="submit") 确定
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
    import {Modal, Form, FormItem, Input, Button, Upload, Icon} from 'view-design'
    import {createComponent, updateComponent, getAllComponentType, addComponentVersion} from '@/api/bussiness.api'
    import TreeSelect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    @Component({
        components: {
            Button,
            Modal,
            Upload,
            Icon,
            Form,
            FormItem,
            TreeSelect,
            Input
        }
    })
    class MarketEditDialog extends Vue {
        @Prop(Boolean) value!: boolean
        @Prop(Object) detail: any
        modalShow = false
        componentTypeList: any[] = []

        normalizer(node) {
            return {
                id: node.componentTypeId,
                label: node.componentTypeName,
                children: node.children,
            }
        }

        form: any = {
            componentTitle: '',
            componentImage: '',
            componentJsUrl: '',
			componentZipUrl: '',
            componentEnTitle: '',
			componentVersion: '',
            componentTypeId: '',
            sort: ''
        }

        ruleValidate = {
            componentTitle: {required: true, message: '请填写组件名', trigger: 'blur'},
            componentEnTitle: {required: true, message: '请填写组件英文名', trigger: 'blur'},
            componentJsUrl: {required: true, message: '请填写js地址', trigger: 'blur'},
			componentZipUrl: {required: true, message: '请填写zip地址', trigger: 'blur'},
			componentVersion: {required: true, message: '请填写版本号', trigger: 'blur'},
            componentImage: {required: true, message: '请上传略缩图', trigger: 'blur'},
            componentTypeId: {required: true, type: 'number', message: '请填选择组件类型', trigger: 'blur'},
            sort: {required: true, type: 'number', message: '请填写排序', trigger: 'blur'},
        }

        @Watch('value')
        onValueChange(val) {
            this.modalShow = val
        }

        @Watch('detail')
        onDetailChange(val) {
            this.form = {
                componentId: val.componentId,
                componentTitle: val.componentTitle,
                componentImage: val.componentImage,
                componentJsUrl: val.componentJsUrl,
				componentZipUrl: val.componentZipUrl,
                componentEnTitle: val.componentEnTitle,
				componentVersion: val.componentVersion,
                componentTypeId: val.componentTypeId,
                sort: val.sort,
            }
        }

        @Watch('modalShow')
        onModalShow(val) {
            this.$emit('input', val)
        }

        submit() {
            (this.$refs.form as any).validate((valid) => {
                if (!valid) return false
				if (this.detail?.componentId) {
                    updateComponent(this.form).then(() => {
                        this.$emit('reload')
                    })
                } else {
                    createComponent(this.form).then(() => {
                        this.$emit('reload')
                    })
                }
                this.modalShow = false
                this.$Message.success('操作成功')
            })
        }

        handleUploadSuccess(res, file) {
            this.form.componentImage = res.data.file
        }

        created() {
            getAllComponentType().then(r => {
                this.componentTypeList = r
            })
        }
    }

    export default MarketEditDialog

</script>
<style lang="scss" scoped>
    .img-wrap {
        width: 58px;
        height: 58px;
        line-height: 58px;
        border: 1px dashed #dcdee2;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;

        .upload-img {
            width: 100%;
            height: 100%;
        }
    }
</style>
