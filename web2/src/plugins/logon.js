import axios from 'axios';
import Vue from 'vue'


//写cookies 

function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

//读取cookies 
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
}

export var logon =  function(callback){
    var ticket	= getCookie("SSO_TICKET");
    var token	= getCookie("SSO_TOKEN");
    axios.post(config.logonUrl,{
        Ticket: ticket,
        Token: token,
        Ip: '127.0.0.1',
        '_': Math.random()
    }).then( res => {
        console.log(res,'登录')
       //创建成功跳转到我的应用页面
        if(res.status == 200){
            Vue.prototype.userInfo = res.data || res;
            getAdmin(callback);
        }else{
            window.location = config.redirectUrl+window.location;
        }
    }).catch( err => {       
        window.location = config.redirectUrl+window.location;
    })
}

function getAdmin(callback){
    axios.post(config.RolesUrl,{
        "systemId": "SIP_EXT_DEV",
        "version": 0,
        "staffId":Vue.prototype.userInfo.UserId,
        "includeAgent": false,
        "includeDimission": false
    }).then( res => {
        console.log(res,'登录')
       //创建成功跳转到我的应用页面
            var userInfo = res.data || res;
            Vue.prototype.userInfo.admins = userInfo.GetStaffRolesResult;
            Vue.prototype.userInfo.isAdmin = userInfo.GetStaffRolesResult.includes("SystemAdmin");
            callback && callback();
    }).catch( err => {
        console.log(err);
    })
}

// logon();

