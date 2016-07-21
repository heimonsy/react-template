const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
    new ExtractTextPlugin('[name].[contenthash:6].css'),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      // options
      title: 'React Templates',
    }),
    new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          swal: "sweetalert",
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    ),
];

if (process.env.COMPRESS) {
  plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        banner: '',
        footer: '',
        mangle: {},
        beautify: false,
        report: 'min',
        expression: false,
        compressor: {
          warnings: false
        }
      })
  );
}

module.exports = {
    entry: [
      //'webpack/hot/only-dev-server',
      "./src/entry/index.jsx"
    ],
    output: {
        path: './dist/',
        filename: "bundle.[hash:6].js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel', 'eslint-loader'], exclude: /bower_components|node_modules/, include: __dirname},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')},
            { test: /\.(gif|png|jpg|svg|ttf|woff2|woff|eot)$/, loader: 'url?limit=1000&name=[path][name].[hash:6].[ext]' }
        ]
    },
    resolve:{
        root : [
          path.join(__dirname, "./bower_components"),
          path.join(__dirname, './node_modules'),
          path.join(__dirname, './src'),
          path.join(__dirname, './css'),
          path.join(__dirname, './fonts'),
        ],
        extensions: ['', '.js', '.jsx'],
    },
    plugins: plugins
};
