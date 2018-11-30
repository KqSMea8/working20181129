/**
 *  
 * alert接口 [type] 默认值 loading状态
 * [type] string [loading,success,info,warning,error] 可扩展不同样式
 * [contnt] string [文本DOM，文本]
 * [options] object [宽度,按钮内容显示，回调(确定返回true)]
 * 设置el 父级因有显示的声明定位属性
 * close 只保留最后一个弹窗的引用 多弹窗在页面中 let alert = this.$alert(); alert.close() 
 */
class Dialog {
    constructor(type, content, options) {
        if (typeof type !== 'string' || typeof content !== 'string') {
            throw new Error(`Dialog:type or content not String`)
        } else if (!this.isObject(options)) {
            throw new Error(`Dialog:optins not Object`)
        }
        var config = {
            el: 'body',
            type: type,
            content: content,
            width: '298px',
            btnOkText: '确定',
            btnCancleText: '取消',
            btnOk: false,
            btnCancle: false,
            callback: null,
        }
        this.config = Object.assign(config, options);
        this.template = null
        this.init();
    }
    isObject(data) {
        return data && typeof data === 'object' && Object == data.constructor;
    }
    isFunction(data) {
        return data && typeof data == "function" && Function == data.constructor;
    }
    content(con) {
        return `<div class='dialog_content'>
					<span class='dialog_${con.type}' ><span class='dialog_title'>温馨提示</span><span id='dialog_close'></span></span>
					<div class='dialog_message'>${con.content}</div>
					`
    }
    btn(con) {
        let btnOk = `<span class='btn-main   ${ this.config.btnOk ?  'btn_show': 'btn_hidden'}' id='dialog_btn_ok'>${con.btnOkText}</span>`;
        let btnCancle = `<span class='btn-main btn-default ${ this.config.btnCancle ?  'btn_show': 'btn_hidden'}'' id='dialog_btn_cancle'>${con.btnCancleText}</div>`;
        return (btnOk + btnCancle);
    }
    getDom(el) {
        return document.querySelector(el)
    }
    init(options) {
        let con = this.config;
        var template = this.getDom(`${con.el} .dialog_shade`)
        if (template && template.parentNode === this.getDom(con.el)) {
            this.template = template
        } else {
            this.template = document.createElement('div')
            this.template.setAttribute('class', 'dialog_shade');
            if (con.el === 'body') this.template.setAttribute('style', 'position:fixed');
        }
        this.template.innerHTML = `
					<div class='dialog dialog_content_${con.type == "loading" ? 'loading' :"type_all"}' style='min-width:${con.width}'>
						${this.content(con)}
						<div class='dialog_btn'>${this.btn(con)}</div>
					</div>`
        this.getDom(con.el).appendChild(this.template)
        document.body.onclick = this.event.bind(this);
    }
    event(e) {
        let con = this.config;
        if (e.target.id === 'dialog_btn_ok' || e.target.id === 'dialog_btn_cancle' || e.target.id === 'dialog_close') {
            this.isFunction(con.callback) && con.callback(e.target.id === 'dialog_btn_ok');
            this.close();
        }
    }
    close() {
        let con = this.config;
        let template = this.template || this.getDom(`${con.el} .dialog_shade`);
        if (this.getDom(`${con.el} .dialog_shade`)) this.getDom(con.el).removeChild(template);
    }
}

const Message = {
    Dialog: '',
    close() {
        Message.Dialog.close();
        loadingClose = false;
    },
    loading(options = {}) {
        Message.Dialog = new Dialog('loading', '数据加载中，请稍候...', options)
        return Message.Dialog;
    },
    alert(content = '操作成功', options = { btnOk: true }) {
        let type = 'success';
        Message.Dialog = new Dialog(type, content, options)
        return Message.Dialog
    },
    install(vue, options) {
        vue.prototype.$close = Message.close;
        vue.prototype.$alert = Message.alert;
        vue.prototype.$loading = Message.loading;
    }
}


export default Message;