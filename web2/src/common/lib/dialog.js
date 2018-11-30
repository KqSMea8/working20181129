export default{
    install(Vue){
        var _loading = {
            bool: false,
            txt: "加载中…"
        };

        Object.defineProperty(Vue.prototype, '$dialog', {
            get () {
                return {
                    get _loading() {
                        return _loading
                    },
                    init(){
                        // this.$set('_loading', 'bool', true)
                        _loading.bool = true;
                        _loading.txt = "加载中…";
                    }
                }
            }
        });
        /**********************************     hasClass addClass removeClass     **********************************/
        Vue.prototype.$class = {
            hasClass: function (obj, cls) {
                if (obj) {
                    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
                    // obj.className === obj.attributes['class'].nodeValue
                }
                return false;
            },
            addClass: function (obj, cls) {
                if (obj && !this.hasClass(obj, cls)) {
                    obj.className += " " + cls;
                } else {
                    return false;
                }
            },
            removeClass: function (obj, cls) {
                if (obj && this.hasClass(obj, cls)) {
                    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                    obj.className = obj.className.replace(reg, ' ');
                }
            }
        }
        /**********************************     hasClass addClass removeClass     **********************************/
        /**********************************     cloneObject     **********************************/
        Vue.prototype.$Objects = {
            cloneObj: function (obj) { /* 深度克隆 */
                var str;
                let newobj = obj.constructor === Array ? [] : {};
                if (typeof obj !== 'object') {
                    return;
                } else if (window.JSON) {
                    str = JSON.stringify(obj);
                    newobj = JSON.parse(str);
                } else {
                    for (var i in obj) {
                        newobj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
                    }
                }
                return newobj;
            }
        }
        /**********************************     cloneObject     **********************************/


        /**********************************     loading tipsBox     **********************************/
        Vue.prototype.$box = {
            /*----------   开启提示框 start   ----------*/
            startTipsBlock: function (Tobject) {
                this.closeLoading();
                if (!Tobject) {
                    Tobject = {};
                }
                // (title, range,content, number, boxClose, confirmFun, cancelFun, boxWidth)
                if (!Tobject.range) {
                    Tobject.range = ""; // the dom ID name
                }
                if (!Tobject.width) {
                    Tobject.width = 320;
                }
                if (!Tobject.type) {   // 信息框（information） 提醒框（warning） 成功（success）  失败（error）
                    Tobject.type = "information";
                }
                if (!Tobject.title) {
                    Tobject.title = "温馨提示";
                }
                if (!Tobject.message) {
                    Tobject.message = "确定要这样做吗？";
                }
                if (!Tobject.confirmText) {
                    Tobject.confirmText = "确定";
                }
                if (!Tobject.cancelText) {
                    Tobject.cancelText = "取消";
                }
                if (!Tobject.confirmCallBack) {
                    Tobject.confirmCallBack = function () {
                        this.closeTipsBlock();
                    }.bind(this);
                }
                if (!Tobject.cancelCallBack) {
                    Tobject.cancelCallBack = function () {
                        this.closeTipsBlock();
                    }.bind(this);
                }
                /*type: success warning error information*/
                var HTML = [];
                HTML.push('<div class="exFloatCircalesBg" style="z-index: 888;">');
                HTML.push('<div class="tipBox box_css_tipsBox" style="width:' + Tobject.width + 'px;margin-left:-' + Tobject.width / 2 + 'px">');
                HTML.push('<div class="tipTitle">');
                HTML.push('<span>' + Tobject.title + '</span>');
                if (Tobject.type !== 'tips') {
                    HTML.push('<label id="loadingClose" class="curPoint box_js_closeAlert">X</label>');
                }
                HTML.push('</div>');
                switch (Tobject.type) {
                    case "information":
                        HTML.push('<div class="tipContent tipCenter">' + Tobject.message + '</div>');
                        HTML.push('<div class="tipBtn tipCenter">');
                        HTML.push('<button type="button" class="curPoint box_js_confirmCallBack" style="float: none;">' + Tobject.confirmText + '</button>');
                        HTML.push('</div>');
                        break;
                    case "warning":
                        HTML.push('<div class="tipContent">' + Tobject.message + '</div>');
                        HTML.push('<div class="tipBtn">');
                        HTML.push('<button type="button" class="curPoint box_js_confirmCallBack">' + Tobject.confirmText + '</button>');
                        HTML.push('<button type="button" class="tipBtnRight curPoint box_js_closeAlert" >' + Tobject.cancelText + '</button>');
                        HTML.push('</div>');
                        break;
                    case "tips":
                        HTML.push('<div class="tipContent">' + Tobject.message + '</div>');
                        HTML.push('<div class="tipBtn">');
                        HTML.push('<button type="button" class="curPoint box_js_confirmCallBack">' + Tobject.confirmText + '</button>');
                        HTML.push('<button type="button" class="tipBtnRight curPoint box_js_cancelCallBack" >' + Tobject.cancelText + '</button>');
                        HTML.push('</div>');
                        break;
                    default:
                        HTML.push('<div class="tipContent">' + Tobject.message + '</div>');
                        HTML.push('<div class="tipBtn">');
                        HTML.push('<button type="button" class="curPoint box_js_confirmCallBack">' + Tobject.confirmText + '</button>');
                        HTML.push('<button type="button" class="tipBtnRight curPoint box_js_closeAlert">' + Tobject.cancelText + '</button>');
                        HTML.push('</div>');
                        break;
                }
                HTML.push('</div></div>');

                var alertElement = document.createElement("div");
                alertElement.setAttribute("id", "box_js_tipsBox");
                if (document.body.innerHTML.indexOf('id="box_js_tipsBox"') <= 0) {
                    if (Tobject.range !== '' && Tobject.range !== null && Tobject.range !== undefined) {
                        document.getElementById(Tobject.range).parentNode.appendChild(alertElement);
                    } else {
                        document.body.appendChild(alertElement);
                    }
                    alertElement.innerHTML = HTML.join("");
                } else {
                    alertElement.innerHTML = HTML.join("");
                }
                /*  确定按钮--------关闭当前弹窗并添加相应的事件  */
                let confirmBtns = document.getElementsByClassName("box_js_confirmCallBack");
                if (confirmBtns && confirmBtns.length > 0) {
                    for (let i = 0; i < confirmBtns.length; i++) {
                        let item = confirmBtns[i];
                        if (window.attachEvent) {//IE
                            item.attachEvent("onclick", function () {
                                this.closeTipsBlock();
                                Tobject.confirmCallBack();
                            }.bind(this));
                        } else {//非IE
                            item.addEventListener("click", function () {
                                this.closeTipsBlock();
                                Tobject.confirmCallBack();
                            }.bind(this), false);
                        }
                    }
                }
                /*  取消按钮--------关闭当前弹窗并添加相应的事件  */
                let cancelBtns = document.getElementsByClassName("box_js_cancelCallBack");
                if (cancelBtns && cancelBtns.length > 0) {
                    for (let i = 0; i < cancelBtns.length; i++) {
                        let item = cancelBtns[i];
                        if (window.attachEvent) {//IE
                            item.attachEvent("onclick", function () {
                                this.closeTipsBlock();
                                Tobject.cancelCallBack();
                            }.bind(this));
                        } else {//非IE
                            item.addEventListener("click", function () {
                                this.closeTipsBlock();
                                Tobject.cancelCallBack();
                            }.bind(this), false);
                        }
                    }
                }
                /*  关闭按钮==取消按钮--------关闭当前弹窗  */
                let closeBtns = document.getElementsByClassName("box_js_closeAlert");
                if (closeBtns && closeBtns.length > 0) {
                    for (let i = 0; i < closeBtns.length; i++) {
                        let item = closeBtns[i];
                        if (window.attachEvent) {//IE
                            item.attachEvent("onclick", function () {
                                this.closeTipsBlock();
                            }.bind(this));
                        } else {//非IE
                            item.addEventListener("click", function () {
                                this.closeTipsBlock();
                            }.bind(this), false);
                        }
                    }
                }
            },
            /*----------   开启提示框 end   ----------*/

            /*----------   关闭提示框 start   ----------*/
            closeTipsBlock: function () {
                if (document.body.innerHTML.indexOf('id="box_js_tipsBox"') > 0) {
                    var jsLoading = document.getElementById("box_js_tipsBox");
                    var parentElement = jsLoading.parentNode;
                    if (parentElement) {
                        parentElement.removeChild(jsLoading);
                    }
                }
            },
            /*----------   关闭提示框 end   ----------*/

            /*----------   打开加载框 start   ----------*/
            startLoading: function (idName) {
                var HTML = [];
                HTML.push('<div class="exFloatCircalesBg" style="z-index: 999">');
                HTML.push('<div class="floatingCirclesG">');
                HTML.push('<div class="f_circleG frotateG_01"></div>');
                HTML.push('<div class="f_circleG frotateG_02"></div>');
                HTML.push('<div class="f_circleG frotateG_03"></div>');
                HTML.push('<div class="f_circleG frotateG_04"></div>');
                HTML.push('<div class="f_circleG frotateG_05"></div>');
                HTML.push('<div class="f_circleG frotateG_06"></div>');
                HTML.push('<div class="f_circleG frotateG_07"></div>');
                HTML.push('<div class="f_circleG frotateG_08"></div>');
                HTML.push('</div>');
                HTML.push('</div>');
                // var names = "box_div_right";
                // if (idName !== undefined && idName !== null && idName !== "") {
                //     names = idName;
                // }
                // var docBody = document.getElementById(names).parentNode;
                if (document.body.innerHTML.indexOf('id="box_js_loading"') <= 0) {
                    var alertElement = document.createElement("div");
                    alertElement.setAttribute("id", "box_js_loading");
                    // docBody.appendChild(alertElement);
                    document.body.appendChild(alertElement);
                    alertElement.innerHTML = HTML.join("");
                }
            },
            /*----------   打开加载框 end   ----------*/

            /*----------   关闭加载框 start   ----------*/
            closeLoading: function () {
                if (document.body.innerHTML.indexOf('id="box_js_loading"') > 0) {
                    var jsLoading = document.getElementById("box_js_loading");
                    var parentElement = jsLoading.parentNode;
                    if (parentElement) {
                        parentElement.removeChild(jsLoading);
                    }
                }
            }
            /*----------   关闭加载框 end   ----------*/
        };
        /**********************************     loading tipsBox     **********************************/

    }
}
