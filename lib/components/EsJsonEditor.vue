<template>
    <div class="json-editor">
        <Button type="primary" @click="autoFormat">格式化</Button>
        <textarea ref="textarea" />
    </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css'; //编辑器css
import 'codemirror/theme/eclipse.css'; //主题
import 'codemirror/mode/javascript/javascript'; //代码高亮
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
//  支持代码折叠
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/comment-fold';
//括号匹配
import 'codemirror/addon/edit/matchbrackets';
//格式化
import '../vendor/formatting';
require('script-loader!jsonlint');
export default {
    name: 'JsonEditor',
    /* eslint-disable vue/require-prop-types */
    props: {
        value: {
            type: Object,
            default() {
                return {};
            }
        },
        // 是否只读，默认否
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            jsonEditor: null
        };
    },
    watch: {
        value: {
            handler(value) {
                const editorValue = this.jsonEditor.getValue();
                this.jsonEditor.setValue(editorValue);
            }
        }
    },
    mounted() {
        this.initJsonEditor();
        this.jsonEditor.setOption('readOnly', this.readOnly);
    },
    methods: {
        // 初始化jsonEditor
        initJsonEditor() {
            this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
                lineNumbers: true,
                mode: 'application/json',
                lineWrapping: true,
                foldGutter: true,
                gutters: ['CodeMirror-lint-markers', 'CodeMirror-foldgutter', 'CodeMirror-linenumbers'],
                theme: 'eclipse',
                smartIndent: true,
                matchBrackets: true,
                indentUnit: 2,
                lint: true,
                extraKeys: {
                    F7: function autoFormat(editor) {
                        var totalLines = editor.lineCount();
                        editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });
                    } //代码格式化
                }
            });
            this.jsonEditor.setValue(JSON.stringify(this.value, null, 8));
            this.jsonEditor.on('change', (cm) => {
                this.$emit('changed', cm.getValue());
                this.$emit('input', cm.getValue());
            });
            this.jsonEditor.on('blur', (cm) => {
                this.$emit('blur', cm.getValue());
            });
            this.autoFormat();
        },
        // 获取json
        getValue() {
            return this.jsonEditor.getValue();
        },
        autoFormat() {
            var totalLines = this.jsonEditor.lineCount();
            this.jsonEditor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });
        }
    }
};
</script>

<style lang="scss" >
.json-editor {
    position: relative;
    font-size: 14px;
    width: 100%;
    border: 1px solid #ddd;
    .CodeMirror {
        height: auto;
        min-height: 100px;
        .CodeMirror-line {
            line-height: 1.5;
        }
    }
    .CodeMirror-scroll {
        min-height: 100px;
    }
    .CodeMirror-linenumber {
        color: #2b91af;
        height: 21px;
        line-height: 21px;
    }
    .CodeMirror-gutters {
        background-color: #fff;
        border-right: 0;
    }
    span.cm-string {
        color: #f08047;
    }
}
</style>
