<template>
  <div class="js-editor">
    <textarea ref="textarea" :placeholder="placeholder" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/display/placeholder';
import 'codemirror/theme/eclipse.css';

export default {
  name: 'js-editor',
  props: {
    value: String,
    // 是否只读，默认否
    readOnly: {
      type: Boolean,
      default: false
    },
    placeholder: String
  },
  data () {
    return {
      editor: null,
      options: {
        tabSize: 2,
        lineNumbers: true,
        line: true,
        mode: { name: 'javascript' },
        theme: 'eclipse',
        styleActiveLine: true,
        smartIndent: true,
        hintOptions: {
          completeSingle: false
        }
      }
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.initEditor();
      this.editor.setOption('readOnly', this.readOnly);
    });
  },
  methods: {
    initEditor () {
      this.editor = CodeMirror.fromTextArea(this.$refs['textarea'], this.options);
      this.editor.setValue(this.value);
      this.editor.on('inputRead', () => {
        this.editor.showHint();
      });
      this.editor.on('focus', () => {
        this.$emit('focus');
      });
      this.editor.on('change', (cm) => {
        this.$emit('changed', cm.getValue());
        this.$emit('input', cm.getValue());
      });
      this.editor.on('blur', (cm) => {
        this.$emit('blur', cm.getValue());
      });
    }
  },
  watch: {
    value: {
      handler (value) {
        const innerValue = this.editor.getValue();
        if (value !== innerValue) {
          this.editor.setValue(value);
        }
      }
    }
  }
};
</script>
<style>
  .CodeMirror-hints {
    z-index: 9999;
  }
  .CodeMirror-code {
    font-family: Fira code, monospace;
  }
</style>
