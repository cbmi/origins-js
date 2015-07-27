/* global module */
module.exports = {
	entry: './spec/origins_spec.js',
	output: {
		filename: 'origins_bundle.js',
		path: ".",
		// Output path from the view of the JS/HTML
		publicPath: '.'
	}
};