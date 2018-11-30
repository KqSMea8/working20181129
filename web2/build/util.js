const os = require('os')
const path = require('path')
const HappyPack = require('happypack') //并行处理
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//目录辅助函数
const resolve = function (dir) {
    return path.join(__dirname, '..', dir)
}
// 前端接口头部,鉴权登录等接口地址 按环境匹配
const config = {
    dev:{
        token:'123456Abc',  
        basUrl:'/api/v1/ckv',   
        logonUrl:'/api/v1.0/Auth/Verification',    //登录
        RolesUrl:'/WebHttp/Tencent.OA.RIO.RightWay.Node.NodeSlave/NodeSlaveService/GetStaffRoles',  //是获取权限
        redirectUrl:'http://dev.passport.tpcloud.oa.com/?url='      //登陆重定向
    },
    test:{
        token:'e18f94b5fa585c7123f56803d925d2e7',
        basUrl:'/api/v1/ckv',
        logonUrl:'http:test.rbac.tpcloud.oa.com/api/v1.0/Auth/Verification',
        RolesUrl:'http:test.RolesUrl.oa.com/WebHttp/Tencent.OA.RIO.RightWay.Node.NodeSlave/NodeSlaveService/GetStaffRoles',
        redirectUrl:'http://test.passport.tpcloud.oa.com/?url='        
    },
    production:{
        token:'123456Abc',  
        basUrl:'/api/v1/ckv',   
        logonUrl:'/api/v1.0/Auth/Verification',    //登录
        RolesUrl:'/WebHttp/Tencent.OA.RIO.RightWay.Node.NodeSlave/NodeSlaveService/GetStaffRoles',  //是获取权限
        redirectUrl:'http://test.passport.itcloud.oa.com/?url='          
    }
}
//样式文件loader处理集合
const cssLoaders = function (isDev, isTest) {
    const options = { sourceMap: isDev || isTest };
    const cssLoader = {
        loader: 'css-loader',
        options: options
    }
    const postcssLoader = {
        loader: 'postcss-loader',
        options: options
    }
    const stylusLoader = {
        loader: 'stylus-loader',
        options: options
    }

    if (isDev) {
        return ['vue-style-loader', cssLoader, stylusLoader]
    }
    return ['vue-style-loader', MiniCssExtractPlugin.loader, cssLoader, postcssLoader, stylusLoader]
}

const vueLoaderOptions = function (isDev, isTest) {
    return {
        loaders:{
            css:['happypack/loader?id=css'],
            stylus: ['happypack/loader?id=css'],
            styl: ['happypack/loader?id=css']            
        },
        productionMode:!isDev,
        cacheBusting: true,
        transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
        }
    }
}
const webpackRules = function (isDev, isTest) {
    return [
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'static/image/[name].[ext]?[hash]'
            }
        },
        {
            test: /\.(css|styl|stylus)$/,
            loaders: cssLoaders(isDev, isTest),
        },
        {
            test: /\.vue$/,
            loader:'vue-loader',
            options: vueLoaderOptions(isDev, isTest)
        },
        {
            test: /\.js$/,
            loader: ['happypack/loader?id=babel'],
            include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')],
            exclude: /node_modules/
        }
    ]
}

const webpackResolve = function () {
    return {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'vue-router$': 'vue-router/dist/vue-router.esm.js',
            '@': resolve('src')
        },
        modules: [path.resolve(__dirname, '../node_modules')],
        mainFields: ["jsnext:main",'main'],
    }
}

const happypackPlugins = function (isDev, isTest) {
    //HappyPackA
    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
    const loaderArray = [['babel-loader?cacheDirectory'], cssLoaders(isDev, isTest)];
    return ['babel', 'css'].map((item, index) => {
        return new HappyPack({
            id: item,
            threads: 4,
            threadPool: happyThreadPool,
            loaders: loaderArray[index]
        })
    });
}
// devr-server 代理 接口返回数据打印
const ProxyRes = function(proxyRes, req, res){
    var body = new Buffer('');
    proxyRes.on('data', function (data) {
        body = Buffer.concat([body, data]);
    });
    proxyRes.on('end', function () {
        if(body.length){
            try{
                let data = JSON.parse(body.toString());
                body = data.data
            }catch(e){
                body = '接口错误'
            }
        }else{
            body = body.toString();
        }         
        console.log(req.method + ' ' + req.url + ' ' +  proxyRes.statusCode, body);
    });
}
module.exports = {
    appName: "demo",
    webpackResolve: webpackResolve,
    webpackRules: webpackRules,
    happypackPlugins: happypackPlugins,
    ProxyRes:ProxyRes,
    config:config,
}