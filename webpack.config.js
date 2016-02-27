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
      title: 'Your Title',
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
      "./app/app.jsx"
    ],
    output: {
        path: './dist/',
        filename: "bundle.[hash:6].js"
    },
    module: {
        preLoaders: [
          { test: /\.jsx$/, exclude: /node_modules|bower_components|crayfish\.js/, loader: 'jsxhint-loader' },
          { test: /\.js$/, exclude: /node_modules|bower_components|crayfish\.js/, loader: 'jshint-loader' },
        ],
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /bower_components|node_modules/ },
            { test: /\.js$/, exclude: /bower_components|node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')},
            { test: /\.(gif|png|jpg|svg|ttf|woff2|woff|eot)$/, loader: 'url?limit=1000&name=[path][name].[hash:6].[ext]' }
        ]
    },
    resolve:{
        root : [
          path.join(__dirname, "./bower_components"),
          path.join(__dirname, './node_modules'),
          path.join(__dirname, './app'),
          path.join(__dirname, './css'),
          path.join(__dirname, './fonts'),
        ]
    },
    plugins: plugins,
    jshint: {
      camelcase: false,
      quotmark: "double",
      laxcomma: true,
      esnext: true,
      undef: true,
      unused: true,
      indent: 2,
      node: true,
      browser: true,
      jquery: true,
      globals: {
        $: true,
        $element: true,
        console: true,
        confirm: true,
        alert: true,
        angular: true,
        Geohash: true,
        objectStorage: true,
        qq: true,
        ga: true,
        _: true,
        __dirname: true,
        TWEEN: true,
        DomUtil: true,
        live800: true,
        globalWindowAttribute: true,
        UserAddress: true
      }
    }
};
