const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'my-first-webpack.bundle.js',
		clean: true
	},
	module: {
		rules: [
			// CSS, PostCSS, Sass
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			// изображения
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'assets/resource'
			}
		]
	},
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, 'public')
		},
		open: true,
		compress: true,
		hot: true,
		port: 8079
	},
	plugins: [
		// ...
		// применять изменения только при горячей перезагрузке
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'webpack Boilerplate',
			template: path.resolve(__dirname, './public/index.html'), // шаблон
			filename: 'index.html' // название выходного файла
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './public/images',
					to: 'images',
					globOptions: {
						ignore: ['*.DS_Store']
					},
					noErrorOnMissing: true
				}
			]
		})
	],
	resolve: {
		modules: ['./src', 'node_modules'],
		extensions: ['.js', '.scss', '.json']
	}
};
