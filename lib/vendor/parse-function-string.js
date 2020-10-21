const funcMatchReg = /^\s*(?:function(\s+[a-z0-9$_]*)?\(([^)]*)\)\s*\{([\s\S]*)\}|\(([^)]*)\)\s*=>([\s\S]*)|([a-z0-9$_]+)\s*=>([\s\S]*))\s*$/i;

const parseFunctionString = functionString => {
    const match = functionString.match(funcMatchReg)
    if (!match) return null
    return new Function(match[2], match[3])
}

export default parseFunctionString
