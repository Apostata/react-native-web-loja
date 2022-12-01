module.exports = {
	presets: [
		[
			'module:metro-react-native-babel-preset',
			{
				unstable_disableES6Transforms: true,
			},
		],
		['@babel/preset-env', {targets: {node: 'current'}}],
		['@babel/preset-react', {targets: {node: 'current'}}],
	],

	env: {
		production: {
			plugins: ['react-native-paper/babel'],
		},
	},
};
