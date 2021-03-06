const HtmlWebpackPlugin = require( 'html-webpack-plugin');
const path = require( 'path' );
const { InjectManifest } = require( 'workbox-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );

const webpackPlugins = [
  new HtmlWebpackPlugin( {
    template: path.resolve( __dirname, 'public/index.html' ),
    filename: 'index.html',
  } ),
  new CopyPlugin( {
    patterns: [
      { from: './src/favicon.ico', to: '' },
      { from: './src/manifest.json', to: '' },
      { from: './src/icon-small.png', to: '' },
      { from: './src/icon-big.png', to: '' },
    ],
  } ),
];

if ( 'production' === process.env.NODE_ENV ) {
  webpackPlugins.push( new InjectManifest( {
    swSrc: './src/src-sw.js',
    swDest: 'sw.js',
  } ) );
}

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css?$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader?name=./images/[name].[ext]',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: webpackPlugins,
};
