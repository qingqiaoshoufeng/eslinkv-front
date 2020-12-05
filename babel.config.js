// module.exports = {
//     presets: [
//         '@vue/cli-plugin-babel/preset'
//     ],
//     plugins: [
//         '@babel/plugin-proposal-nullish-coalescing-operator',
//         '@babel/plugin-proposal-optional-chaining',
//         ["import", {
//             "libraryName": "view-design",
//             "libraryDirectory": "src/components"
//         }]]
// }
module.exports = {
    presets: [
        "@vue/cli-plugin-babel/preset",
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: 3
            }
        ]

    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        ["import", {
            "libraryName": "view-design",
            "libraryDirectory": "src/components"
        }]]
}
