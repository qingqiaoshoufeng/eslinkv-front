import CodeMirror from 'codemirror';

(function() {
    CodeMirror.extendMode('css', {
        commentStart: '/*',
        commentEnd: '*/',
        newlineAfterToken: function(type, content) {
            return /^[;{}]$/.test(content);
        }
    });

    CodeMirror.extendMode('javascript', {
        commentStart: '/*',
        commentEnd: '*/',
        // FIXME semicolons inside of for
        newlineAfterToken: function(type, content, textAfter, state) {
            if (this.jsonMode) {
                return /^[\[,{]$/.test(content) || /^}/.test(textAfter);
            } else {
                if (content == ';' && state.lexical && state.lexical.type == ')') return false;
                return /^[;{}]$/.test(content) && !/^;/.test(textAfter);
            }
        }
    });

    CodeMirror.extendMode('xml', {
        commentStart: '<!--',
        commentEnd: '-->',
        newlineAfterToken: function(type, content, textAfter) {
            return (type == 'tag' && />$/.test(content)) || /^</.test(textAfter);
        }
    });

    // Comment/uncomment the specified range
    CodeMirror.defineExtension('commentRange', function(isComment, from, to) {
        let cm = this;
        let curMode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(from).state).mode;
        cm.operation(function() {
            if (isComment) {
                // Comment range
                cm.replaceRange(curMode.commentEnd, to);
                cm.replaceRange(curMode.commentStart, from);
                if (from.line == to.line && from.ch == to.ch)
                    // An empty comment inserted - put cursor inside
                    cm.setCursor(from.line, from.ch + curMode.commentStart.length);
            } else {
                // Uncomment range
                let selText = cm.getRange(from, to);
                let startIndex = selText.indexOf(curMode.commentStart);
                let endIndex = selText.lastIndexOf(curMode.commentEnd);
                if (startIndex > -1 && endIndex > -1 && endIndex > startIndex) {
                    // Take string till comment start
                    selText =
                        selText.substr(0, startIndex) +
                        // From comment start till comment end
                        selText.substring(startIndex + curMode.commentStart.length, endIndex) +
                        // From comment end till string end
                        selText.substr(endIndex + curMode.commentEnd.length);
                }
                cm.replaceRange(selText, from, to);
            }
        });
    });

    // Applies automatic mode-aware indentation to the specified range
    CodeMirror.defineExtension('autoIndentRange', function(from, to) {
        let cmInstance = this;
        this.operation(function() {
            for (let i = from.line; i <= to.line; i++) {
                cmInstance.indentLine(i, 'smart');
            }
        });
    });

    // Applies automatic formatting to the specified range
    CodeMirror.defineExtension('autoFormatRange', function(from, to) {
        let cm = this;
        let outer = cm.getMode();
        let text = cm.getRange(from, to).split('\n');
        let state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
        let tabSize = cm.getOption('tabSize');

        let out = '';
        let lines = 0;
        let atSol = from.ch == 0;
        function newline() {
            out += '\n';
            atSol = true;
            ++lines;
        }

        for (let i = 0; i < text.length; ++i) {
            let stream = new CodeMirror.StringStream(text[i], tabSize);
            while (!stream.eol()) {
                let inner = CodeMirror.innerMode(outer, state);
                let style = outer.token(stream, state);
                let cur = stream.current();
                stream.start = stream.pos;
                if (!atSol || /\S/.test(cur)) {
                    out += cur;
                    atSol = false;
                }
                if (
                    !atSol &&
                    inner.mode.newlineAfterToken &&
                    inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || '', inner.state)
                )
                    newline();
            }
            if (!stream.pos && outer.blankLine) outer.blankLine(state);
            if (!atSol) newline();
        }

        cm.operation(function() {
            cm.replaceRange(out, from, to);
            for (let cur = from.line + 1, end = from.line + lines; cur <= end; ++cur) cm.indentLine(cur, 'smart');
            cm.setSelection(from, cm.getCursor(false));
        });
    });
})();
