const enableProduction = process.env.mode === 'prod'

module.exports = ({ ctx }) => ({
	map: enableProduction ? false : 'inline',
	plugins: {
    'postcss-import': {},
		'postcss-discard-comments': enableProduction ? {} : false,
		'@csstools/postcss-bundler': {},
		'postcss-preset-env': {
			stage: 3,
			minimumVendorImplementations: 2,
			autoprefixer: {},
			debug: true,
			features: {
    		'color-mix': true,
				'nesting-rules': true,
				'oklab-function': true,
        //'cascade-layers': true,
        'custom-media-queries': true,
  			}
		},
		'postcss-focus': {},
		'postcss-sort-media-queries': {},
		'cssnano': enableProduction ? {} : false,
	}
})
