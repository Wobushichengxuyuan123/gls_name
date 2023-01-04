/* eslint-disable */
window.BASICS_SYSTEM = "/nelda-smcc";
window.SYSTEM_CONFIG_APPLICATIONAPI = "/nelda-admin";//认证授权+系统服务为
window.SYSTEM_CONFIG_APPLICATIONAUTH = "/nelda-auth";
window.SYSTEM_NELDA_OUTAPI = "/nelda-outapi";
window.SYSTEM_CONFIG_BASICS = "/nelda-basics";
window.SYSTEM_CONFIG_China = "/nelda-basics"; // 在绩溪和晓晨调试的后续都是basics
window.SYSTEM_CONFIG_PPMS = '/ppms-portal-web';
window.SYSTEM_NELDA_ALARM = '/nelda-alarm';
window.ZHDD = '/nelda-yjfz';
window.API = '/api';
window.ISCVR = 'iscvr';
// 判断运行环境
const micpath = {
    '8.142.19.151': '6019',
}
window.MICRO_PATH = `http://${window.location.hostname}:${micpath[window.location.hostname] || '19302'}` // 微服务注册地址
// window.DISPATCHWSS = (window.parent._vue_config && window.parent._vue_config.DISPATCHWSS) || 'wss://39.103.237.231:28443';
window.DISPATCHWSS = (window.parent._vue_config && window.parent._vue_config.DISPATCHWSS) || 'wss://192.168.1.111:28443';
window.authentication = true;// 机器人重要操作是否鉴权
window.SECURITY_PD = '04b315b25009b71843d5fd5bdee4ed10d2c1a17a185bf6c89798b41dd90526e573134fb66c3c802fe7ffa2dda8291bb4c32eaac633ad919c9c5c0b7b090d469b48'; // 安全密钥


// 本地测试
window.LOGINPATH = "http://192.168.1.52:8099";//登录服务页面(本地)
window.SYSTEM_WEBSOCKET = 'ws://192.168.1.52:19301';//websocket(发版)用于alert弹窗用
window.ISXUNJIAN = false;

/**
 * 机器人包含的方向
 * <1>: = 前进
 * <2>: = 后退
 * <3>: = 左转
 * <4>: = 右转
 */
window.ROBOT_DIRECTION = [1, 2]

//格式化时间
Date.prototype.Format = function (fmt) { //author: meizzq
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
window.TimeDifference = function (time) {
    let reval = "";
    let h = parseInt(time / (1000 * 60 * 60));
    let m = parseInt(time / (1000 * 60)) - h * 60;
    let s = parseInt(time / 1000) - h * 60 * 60 - m * 60;
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    reval += h + ":" + m + ":" + s;
    return reval;
}
window.openTab = (url) => {
    var tmp = window.open("about:blank", "", "");
    tmp.focus();
    tmp.location.href = url;
}

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

if (getQueryString("token")) {
    let token = getQueryString("token")
    sessionStorage.setItem('token', token);
    //三维存储token,防止刷新重登录
    window.PushData && window.PushData("GisToken" + "@" + JSON.stringify({ token }))
}
//扩展fetch
let oldFetch = fetch;
fetch = function (url, param = {}) {
    if (url.indexOf("?") != -1) {
        url += "&t=" + new Date().getTime();
    } else {
        url += "?t=" + new Date().getTime();
    }
    //处理fetch 参数
    if (param) {
        if (!param.headers) {
            param.headers = {}
        }
        if (url.indexOf(window.MICRO_PATH) === -1) {
            param.headers.Authorization = sessionStorage.getItem('token');
        }
        if (param.method) {
            if (param.method.toUpperCase() == "POST") {//post提交时自动添加contentType
                param.headers["Content-Type"] = "application/json";
            } else {
                url = encodeURI(url);
            }
        } else {//默认请求方式为get   get请求时  中文乱码 解决
            url = encodeURI(url);
        }
        param.cache = 'no-cache';
    }
    if (url.indexOf('$') > -1) {
        return oldFetch?.apply(this, [url, param])
    }
    const response = oldFetch?.apply(this, [url, param])
    if (param.mode != "no-cors") {
        response.then((r) => {
            let rOld = r.clone();
            return rOld.json();
        })
            .then(b => {
                if (b.code == "13") {
                    // token校验不合法
                    if (LOGINPATH) {
                        if (window.location.href.includes('centerSecond')) {
                            window.location.href = LOGINPATH + "?pathUrl=" + location.protocol + "//" + location.host + '/centerSecond';
                        } else {
                            window.location.href = LOGINPATH + "?pathUrl=" + location.protocol + "//" + location.host;
                            // window.location.href = LOGINPATH
                        }
                    } else {
                        alert("登录地址未配置成功！");
                    }
                }
            })
    }
    return response;
}
/* eslint-enable */
