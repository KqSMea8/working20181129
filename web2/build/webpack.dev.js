
'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const util = require("./util")
const { VueLoaderPlugin } = require('vue-loader')
//后台请求地址
const isDev = true
//导出
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: util.webpackResolve(),
    module: {
        rules: util.webpackRules(isDev, false)
    },
    plugins: [
        ...util.happypackPlugins(isDev, false),
        new VueLoaderPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:9091' }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "app",
            config: JSON.stringify(util.config['dev']),
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        //dll映射
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, './dll', 'vueBarrels.manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, './dll', 'otherBarrels.manifest.json'))
        }),
        new AddAssetHtmlPlugin(
            [
                { filepath: require.resolve('./dll/vueBarrels.dll.js'), includeSourcemap: false },
                { filepath: require.resolve('./dll/otherBarrels.dll.js'), includeSourcemap: false },
            ]
        )
    ],
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {},
        inline: true,
        hot: true,
        contentBase: false,
        compress: true,
        host: 'localhost',//dev.cmq.oa.com
        port: '9091',
        open: false,
        overlay: { warnings: false, errors: true },
        publicPath: '/',
        proxy: {
            '/api/v1.0/Auth': {
                // target: "http://dev.rbac.tpcloud.oa.com",
                target: "http://localhost:8081",
                secure: false,
                changeOrigin: true
            },
            '/WebHttp/*': {
                // target: "http://10.123.10.52:19905",
                target: "http://localhost:8081",
                secure: false,
                changeOrigin: true
            },
            '/api/v1/ckv': {
                // target: 'http://10.12.142.216:30835',
                target: "http://localhost:8081",
                onProxyRes: util.ProxyRes
            }
        },
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 500,
            poll: 200
        }
    }
}