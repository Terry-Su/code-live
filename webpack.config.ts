import * as PATH from 'path'
const { resolve } = PATH
const webpack = require( 'webpack' )
const CopyWebpackPlugin = require( "copy-webpack-plugin" )
const CleanWebpackPlugin = require( 'clean-webpack-plugin' )
import { __DEV__ } from "./server/global"
import { OUTPUT_FILE_NAME, ENTRY, OUTPUT, ENTRY_INDEX_HTML, OUTPUT_INDEX_HTML, ENTRY_STATIC, ENTRY_CODE_VIEWER_COMPANION, OUTPUT_CODE_VIEWER_COMPANION } from './server/constants'
const BundleAnalyzerPlugin = require( "webpack-bundle-analyzer" ).BundleAnalyzerPlugin




const webpackClientConfig = {
  mode : __DEV__ ? 'development' : 'production',
  entry: {
    [ OUTPUT_FILE_NAME ]: [ 
      ENTRY,
      `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000`,   
    ]
  },
  output: {
    path      : OUTPUT,
    filename  : '[name]',
    publicPath: '/'
  },
  devtool: __DEV__ ? 'source-map' : false,
  module : {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use : {
          loader: 'ts-loader',
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use : [ "style-loader", "css-loader" ]
      },
      {
        test  : /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000000"
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  plugins: [
    new CleanWebpackPlugin( [
      OUTPUT
		] ),
    new CopyWebpackPlugin( [
      {
        from: ENTRY_INDEX_HTML,
        to  : OUTPUT_INDEX_HTML
      },
      {
        from: ENTRY_STATIC,
        to  : OUTPUT
      },{
        from: ENTRY_CODE_VIEWER_COMPANION,
        to  : OUTPUT_CODE_VIEWER_COMPANION
      }
    ],
   ),
  ].concat(
    __DEV__ ?
     [
      new webpack.HotModuleReplacementPlugin()
    ] :
    [
          // new BundleAnalyzerPlugin()
    ]    
  )
}


export default webpackClientConfig