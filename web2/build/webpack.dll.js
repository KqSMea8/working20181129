const path = require('path')

const DllPlugin = require('webpack/lib/DllPlugin');

const webpack = require('webpack')

module.exports = {
    entry: {
        vueBarrels: ['vue/dist/vue.esm.js', 'vue-router/dist/vue-router.esm.js', 'axios', 'url-search-params'],
        otherBarrels: ['css-loader/lib/css-base.js', 'echarts', 'babel-runtime/core-js/symbol.js', 'babel-runtime/core-js/json/stringify.js', 'vue-style-loader/lib/listToStyles.js', 'vue-style-loader/lib/addStylesClient.js', 'core-js/library/index.js', 'core-js/library/fn/json/stringify.js', 'webpack/hot/log-apply-result.js', 'core-js/library/fn/promise.js', 'sockjs-client/dist/sockjs.js', 'url/url.js', 'events/events.js', 'querystring-es3/index.js', 'querystring-es3/encode.js', 'html-entities/index.js', 'vue-hot-reload-api/dist/index.js', 'webpack-dev-server/client/index.js', 'webpack-dev-server/client/socket.js']
    },
    mode: 'development',
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dll'),
        //library 可设置库的名称 防止全局变量冲突 为_dll_vue...
        library: '_dll_[name]'
    },
    plugins: [
        //生成映射
        new DllPlugin({
            context: __dirname,
            name: '_dll_[name]',
            path: path.resolve(__dirname, './dll', '[name].manifest.json')
        })
    ]
}