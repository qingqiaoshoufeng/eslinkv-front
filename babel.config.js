module.exports = {
	presets: [
		// '@vue/cli-plugin-babel/preset',
		['@vue/app', { useBuiltIns: 'entry' }],
	],
	plugins: [
		'@babel/plugin-proposal-nullish-coalescing-operator',
		'@babel/plugin-proposal-optional-chaining',
		[
			'import',
			{
				libraryName: 'view-design',
				libraryDirectory: 'src/components',
			},
		],
	],
}
