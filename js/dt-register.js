//全民/地推/转换
var chid = "";
var plat = "";
var type = "";
var reportUrl = "//dt.6cchome.com/register/";

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

$(document).ready(function () {
    var qm = getQueryString();
    if (qm == null || qm.length < 5) {
        chid = '0';
    }
    else {
        var jsonde = JSON.parse(atob(qm));
        chid = jsonde.ch;
        plat = jsonde.pt;
        type = jsonde.t;
    }
    console.log("chid:" + chid);
    console.log("plat:" + plat);
    console.log("type:" + type);

    var a_list = document.getElementsByTagName("a");
    for (i = 0; i < a_list.length; i++) {
        (function (index) {
            a_list[index].addEventListener('click', function () {
                if (chid != "0" && reportUrl != "") {
                    setupCopy(type, chid);
                    reportInfo(type, chid, "0.0.0.0", qm);
                }
                if (browser.versions.android) {
                    InitOpenInstall(type + "" + chid, info.a_key);
                }
                else if (browser.versions.ios) {
                    InitOpenInstall(type + "" + chid, info.i_key);
                }
            }, false);
        })(i)
    }
});

function getQueryString() {
    var str = window.location.search
    var pid = ''
    if (str.indexOf('&') > 0) {
        pid = str.substring(str.indexOf('=') + 1, str.indexOf('&'))
    } else {
        pid = str.substring(str.indexOf('=') + 1, str.length)
    }
    return pid
}

function reportInfo(t, id, addr, p) {
    $.get(reportUrl, { ip: addr, m: p, t: t }, function (data, status, xhr) { });
}

function setupCopy(t, id) {
    var text = "&8#@" + t + "" + id;
    $('.appdown').find('a').attr("data-clipboard-action", "copy");
    $('.appdown').find('a').attr("data-clipboard-text", text);

    var clipboard = new ClipboardJS('a');
    clipboard.on('success', function (e) {
        //console.log('Text:', e.text);
        e.clearSelection();
    });
    clipboard.on('error', function (e) {
        console.error('Trigger:', e.trigger);
    });
}

function InitOpenInstall(id, key) {
    var data = { p: id };
    new OpenInstall({
        appKey: key,
        onready: function () {
            var m = this;
            m.wakeupOrInstall();
            return false;
        }
    }, data);
}
