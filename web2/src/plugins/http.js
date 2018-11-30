import axios from 'axios'

axios.defaults.baseURL = config.basUrl;
axios.defaults.timeout = 100000

window.loadingClose = false;

const CancelToken = axios.CancelToken; //请求token

const Success = 200; //业务请求正确code

var pending = [],
    cancelKey, Vm; // 请求队列  当次标识 vue实例
//过滤重复请求
let removePending = (config, fn) => {
    let flagUrl = config.url.replace(config.baseURL, '') + '&' + config.method
    if (pending.indexOf(flagUrl) !== -1) {
        if (fn) {
            fn('requset repeat')
        } else {
            pending.splice(pending.indexOf(flagUrl), 1)
        }
    } else {
        if (fn) {
            cancelKey = flagUrl;
            pending.push(flagUrl)
        }
    }
}
let errAlert = errMessage => {
    //弹窗显示错误信息
    if (Vm) Vm.$alert(errMessage);

}

// requst interceptor
axios.interceptors.request.use(req => {
    if (Vm && !loadingClose) Vm.$loading();
    req.headers['Auth-Token'] = config.token;
    req.cancelToken = new CancelToken((fn) => {
        removePending(req, fn)
    });
    return req
}, error => {
    errAlert(error);
    return new Promise(() => {});
})

// response interceptor
axios.interceptors.response.use(response => {
    removePending(response.config);
    let result = response.data
    if (result.code === Success) { //正确请求
        if (pending.length == 0 && Vm && !loadingClose) Vm.$close();
        return result.data;
    }
    errAlert(result.message);
    return new Promise(() => {});
}, error => {
    console.log(error.response)
    let showError;
    if (error && error.response) { //浏览器错误
        // if (error.response.data.message) error.message = error.response.data.message
        if (error.response.data.message) error.message = setErrmsg(error.response.data.code, error.response.data.message)
        removePending(error.response.config);
        showError = true;
    } else { //重复请求会被reject 但不需要被提示 直接过滤掉
        pending = [];
        showError = !(error && error.message && error.message === 'requset repeat');
        error && error.messgae ? '' : error.messgae = '请求错误,请刷新重试!' //无response的error对象容错处理
    };
    showError ? errAlert(error.message) : '';
    return new Promise(() => {});
})


const get = (url, params) => {
    return axios({
        method: 'get',
        url,
        params: params
    })
}

const post = (url, data = {}) => {
    return axios({
        method: 'post',
        url,
        data: data,
    })
}

const jsop = function(url, callbackName) {
    if (!url) return new Error("url is jsonp request required")
    callbackName = callbackName || "callback_" + Date.now()
    url = url.indexOf("?") > 0 ? `${url}&callback=${callbackName}` : `${url}?callback=${callbackName}`
    return new Promise((resolve, reject) => {
        let script = document.createElement("script")
        script.type = "text\/javascript"
        script.onerror = function(err) {
            //:todo 将该错误处理注入到axios之中
            reject(err)
                //根据需要 将reject 截断 使用同一的错误终止方式处理
        }
        script.onload = function() {
            console.log(arguments)
        }
        document.head.appendChild(script)
        window[callbackName] = function(data) {
            delete window[callbackName]
            document.head.removeChild(script)
            resolve(data)

        }
        script.src = url;
    })
}

export default {
    install: function(Vue, Option) {
        Vm = new Vue();
        Vue.prototype.$get = get;
        Vue.prototype.$http = axios;
        Vue.prototype.$post = post;
        Vue.prototype.$jsop = jsop;
    }
}

let setErrmsg = (code, val) => {
    switch (code) {
        case 0:
            return "正常"
        case 1:
            return "搜索失败，请稍后重试"
        case 2:
            return "创建失败，请稍后重试"
        case 3:
            return "删除失败，请稍后重试"
        case 4:
            return "参数错误，请重新输入"
        case 5:
            return "请输入密码授权操作"
        case 6:
            return "该IP已被占用，请重新选择"
        case 7:
            return "内部服务错误，请检查密码或联系管理员"
        case 8:
            return "该集群已存在，请重新输入"
        case 9:
            switch (val) {
                case "password is wrong":
                    return "密码错误，请重新输入"
                case "invalid parameter(s)":
                    return "参数错误，请重新输入"
                case "internal(master) error":
                    return "内部服务错误，请检查密码或联系管理员"
                default:
                    return val;
            }
        case 10:
            return "该集群没有管理节点，请联系管理员"
        case 11:
            return "该管理节点已存在，请重新输入"
        case 12:
            return "内部服务错误，请检查密码或联系管理员"
        case 13:
            return "集群的管理节点不可少于3台，无法下架"
        case 14:
            return "内部服务错误，请检查密码或联系管理员"
        case 15:
            return "该可用区已存在，请重新输入"
        case "exit status 127":
            return "内部错误"
        case "ERR shard exist in dump list":
            return "迁移目标服务器已存在分片"
        case "no available caches to create backup shard in set[1]":
            return "在可用区[1]上没有足够的cache,无法创建备份分片"
        case "replica[42] has no legal backup shard switched to be leader":
            return "[42]分片没有有效的备分片用来切换为主分片"
        default:
            return val
    }
}