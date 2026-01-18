
//弹出层插件，采用打开新弹窗就对应提高遮罩层的zIndex，当关闭最新的弹窗时就降低遮罩层的zIndex
$.extend($, {
    "lay": function() {
        var base_zIndex = 19870906;

        //重新定位弹窗位置
        //con为jq选择器对象：弹窗主体
        function pos(con){
            con.css({
                position:'fixed',
                left: ($(window).width() - con.width()) / 2,
                top: ($(window).height() - con.height()) / 2,
            });
        }
        var ret = {
                index: 0,
                init: !1,
                isJson: function (obj) {
                    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
                    return isjson;
                },
                msg: function (t, o) {
                    $('[lay-type="load"],[lay-type="msg"]').remove(); //先关闭还未关闭的所有的msg以及对应的遮罩层
                    t = (t || t=='') ? t : '轻轻地提示...';
                    o = $.extend({shade: 0.4, opacity: 0.65, time: 2000, bgColor: 'rgba(0,0,0,1)'}, o);
                    //创建一个
                    var index = ++this.index,
                        con = $('<div />').addClass('lay-msg').attr({
                            'times': index,
                            'lay-type': 'msg'
                        }).css({
                            'opacity': 0,
                            'background-color': o.bgColor,
                            'z-index': (base_zIndex + index)
                        }).html(t),
                        shade = $('<div />').addClass('lay-shade').attr({
                            'times': index,
                            'lay-type': 'msg'
                        }).css({'opacity': o.shade, zIndex: (base_zIndex + index)});
                    $('body').append(shade).append(con);
                    pos(con);
                    con.css({opacity: 1});

                    //显示以后自动消失
                    window.setTimeout(function () {
                        console.log('序号为', index, '的弹出层消失')
                        $('[times="' + index + '"]').css({'opacity': 0});
                        setTimeout(function () {
                            $('[times="' + index + '"]').remove();
                        }, 500);
                    }, o.time)
                    return index;
                },
                load: function (t, o) {
                    $('[lay-type="load"],[lay-type="msg"]').remove(); //先关闭还未关闭的所有的load以及对应的遮罩层
                    t = t ? t : 0;
                    o = $.extend({
                        shade: 0.3,
                        time: false,  //自动关闭时间：如果设定了自动消失的时间，则设定的时间后，自动隐藏，如果没有设置，则需要手动关闭
                        content:'',
                        color:'#fff'
                    }, o);
                    //创建一个
                    var index = ++this.index,
                        loadTxt = $('<div class="load-txt">'+o.content+'</div>').css({'color': o.color})
                        , con = $('<div />').addClass('lay-load lay-load-' + t).append('<span class="lay-load-icon"></span>').append(loadTxt).attr({
                        'times': index,
                        'lay-type': 'load'
                    }).css({display:'block', 'opacity': 0, zIndex: (base_zIndex + index)})
                        , shade = $('<div />').addClass('lay-shade').attr({
                        'times': index,
                        'lay-type': 'load'
                    }).css({'opacity': o.shade, zIndex: (base_zIndex + index)});
                    $('body').append(shade).append(con);
                    pos(con);
                    con.css({opacity: 1});

                    if (isNaN(o.time)) {
                        window.setTimeout(function () {
                            $('[times]').css({'opacity': 0}) && $('.lay-shade').css({'opacity': 0});
                            setTimeout(function () {
                                $('[times]').remove() && $('.lay-shade').remove();
                            }, 500);
                        }, o.time)
                    }
                    return index;
                },
                alert: function (o) {
                    o = $.extend({
                        shade: 0.6,
                        title: '提示',
                        content: '',
                        close: function () { console.log('默认的关闭按钮回调') }
                    },o);
                    var index = ++this.index;
                    // el接受选择器以及字符串
                    var shade = $('<div />').addClass('lay-shade').attr({
                            'times': index,
                            'lay-type': 'load'
                        }).css({'opacity': o.shade, 'z-index' : (base_zIndex + index)}),
                        // 默认模式
                        con = $('<div />').addClass('lay-alert').attr({
                            'times': index,
                            'lay-type': 'alert',
                        }).css({'opacity': 0, 'z-index' : (base_zIndex + index)}),
                        popHead = $('<div />').addClass('lay-alert-head').html(o.title),
                        popBody = $('<div />').addClass('lay-alert-body').html(o.content),
                        popBtnClose = $('<a />').addClass('lay-btn-close').attr({
                            'times-close': index,
                            'href': 'javascript:',
                        }).html('&times;');
                    con.append(popHead);
                    con.append(popBody);
                    con.append(popBtnClose);
                    $('body').append(shade).append(con);
                    pos(con);
                    con.css({opacity: 1});
                    $(window).on('resize orientationchange', function () {
                        pos(con);
                        setTimeout(function(){pos(con);}, 300);
                    });

                    $(con).on('click', '.lay-btn-close', function () {
                        var timesClose = $(this).attr('times-close');
                        console.log('关闭', timesClose);
                        $.lay.close(timesClose);
                        o.close();
                    });
                    return index;
                },
                open: function (el, o) {
                    if($(el).length<1){ return; }
                    o = $.extend({
                        shade: 0.6,
                        title: '提示',
                        content: '',
                        close: function () { console.log('默认的关闭回调') }
                    },o);
                    var index = ++this.index;
                    var shade = $('<div />').addClass('lay-shade').attr({
                        'times': index,
                        'lay-type': 'open'
                    }).css({'opacity': o.shade, zIndex: (base_zIndex + index)}),con = $(el);
                    con.attr({
                        'times': index,
                        'lay-type': 'open'
                    }).css({display:'block', 'opacity': 0, zIndex: (base_zIndex + index)});
                    shade.insertBefore(con);
                    pos(con);
                    con.css({opacity: 1})
                    $(window).on('resize orientationchange', function () {
                        pos(con);
                        setTimeout(function(){pos(con);}, 300);
                    });
                    $('body').css({'overflow':'hidden'})
                    return index;
                },
                closeLast: function () {
                    $('body').css({'overflow':''})
                    this.close(this.index - 1);
                },
                close: function (index) {
                    var isDom = $(index).length>0;
                    if(isDom){ index = $(index).attr('times'); }
                    var el = index ? $('[times="' + index + '"]') : $('[times]');
                    el.css({'transition-duration': '0.1s', 'opacity': 0, 'z-index':'-1'});
                    setTimeout(function () {
                        el.hide();
                        $('.lay-shade[times="' + index + '"]').remove();
                        if(!isDom){ $('[lay-type="msg"],[lay-type="load"],[lay-type="alert"]').remove(); $('.lay-shade').remove(); }
                        else{el.css({display:'none'}).removeAttr('times');}
                    }, 300);
                    $('body').css({'overflow':''});
                    return;
                }
            },
            init = function () {
                //创建需要用到的样式,只有第一次调用时才加载样式
                !ret.init && $('body').append($('<style type="text/css">' +
                    '.lay-shade{transition: opacity 0.3s; position: fixed; width:100%; height: 100%; top:0; left:0; z-index: 999; background: rgb(0,0,0);}' +
                    '.lay-alert{max-width:90%; transition: opacity 0.5s; position: fixed; width:300px; min-height: 160px; top:0; left:0; z-index: 1000; border-radius: 6px; box-shadow: 0 0 8px rgba(0,0,0,.1); background: rgba(255,255,255,1); }' +
                    '.lay-alert-head{font-size: 14px; font-weight: bold; line-height: 36px; padding:0 10px; background: #F2F2F2; border-radius: 5px 5px 0 0;}' +
                    '.lay-alert-body{min-height: 160px;}' +
                    '.lay-btn-close{width:34px; height: 34px; font-size: 30px; text-align: center; line-height: 30px; color:#333; text-shadow: rgba(0,0,0,.5); position: absolute; right:0; top:0px;}' +
                    '.lay-msg{transition: opacity 0.3s; position: fixed; width:auto; height: auto; max-width:80%; word-break: break-all; top:0; left:0; padding:12px 25px; font-size: 14px; color: #fff; z-index: 1000;' +
                    ' box-shadow: 0 0 8px rgba(0,0,0,.1);  border-radius: 3px;}' +
                    '.lay-load{transition: opacity 0.5s; position: fixed; width:auto; height: auto; top:0%; left:0; z-index: 1000; text-align:center;  padding:10px 20px; background: rgba(0,0,0,0.6)}' +
                    '.lay-load .lay-load-icon{display:inline-block;}'+
                    '.lay-load-0 .lay-load-icon{width:60px; height: 24px; background: url(data:image/gif;base64,R0lGODlhPAAYALMPAPPJp/HYxfSwkf50Df5TD/+HAPe5bvqHR/twOviZavyrMu/m3f9EAP9mAP+ZAO7u7iH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6QUNDRERBRjMxRTIwNjgxMTg4QzZERjVGQ0I0MDI1NDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTlDMEI5MzU5RTY2MTFFMTkxRDY5NkVCMDBGOTBFRUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTlDMEI5MzQ5RTY2MTFFMTkxRDY5NkVCMDBGOTBFRUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENzU2N0YwMTMyMjA2ODExODhDNkRGNUZDQjQwMjU0OSIgc3RS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) no-repeat; background-size: 60px 24px; }' +
                    '.lay-load-1 .lay-load-icon{width:37px; height: 37px; background: url(data:image/gif;base64,R0lGODlhJQAlAJECAL3L2AYrTv///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAAJQAlAAACi5SPqcvtDyGYIFpF690i8xUw3qJBwUlSadmcLqYmGQu6KDIeM13beGzYWWy3DlB4IYaMk+Dso2RWkFCfLPcRvFbZxFLUDTt21BW56TyjRep1e20+i+eYMR145W2eefj+6VFmgTQi+ECVY8iGxcg35phGo/iDFwlTyXWphwlm1imGRdcnuqhHeop6UAAAIfkEBQoAAgAsEAACAAQACwAAAgWMj6nLXAAh+QQFCgACACwVAAUACgALAAACFZQvgRi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwXABEADAADAAACBYyPqcsFACH5BAUKAAIALBUAFQAKAAsAAAITlGKZwWoMHYxqtmplxlNT7ixGAQAh+QQFCgACACwQABgABAALAAACBYyPqctcACH5BAUKAAIALAUAFQAKAAsAAAIVlC+BGL3Z3IlxUmUuhtR2LzHhsiEFACH5BAUKAAIALAEAEQAMAAMAAAIFjI+pywUAIfkEBQoAAgAsBQAFAAoACwAAAhOUYJnAagwdjGq2amXGU1PuLEYBACH5BAUKAAIALBAAAgAEAAsAAAIFhI+py1wAIfkEBQoAAgAsFQAFAAoACwAAAhWUL4AIvdnciXFSZS6G1HYvMeGyIQUAIfkEBQoAAgAsFwARAAwAAwAAAgWEj6nLBQAh+QQFCgACACwVABUACgALAAACE5RgmcBqDB2MarZqZcZTU+4sRgEAIfkEBQoAAgAsEAAYAAQACwAAAgWEj6nLXAAh+QQFCgACACwFABUACgALAAACFZQvgAi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwBABEADAADAAACBYSPqcsFADs=) no-repeat; background-size: 37px 37px; }' +
                    '.lay-load-2 .lay-load-icon{width:32px; height: 32px; background: url(data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs=) no-repeat; background-size: 32px 32px; }' +
                    '</style>')) && (ret.init = !ret.init);
            }();
        return ret;
    }(),
    "tools": {
        browser: {
            versions: function () {
                var u = window.navigator.userAgent;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
                    iPad: u.indexOf('iPad') > -1, //是否为iPad
                    webApp: u.indexOf('Safari') == -1,//是否为web应用程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') > -1, //是否为微信浏览器
                    qq: u.indexOf('mqqbrowser') > -1 && u.indexOf(" qq") < 0,
                    qqInstalled: u.indexOf(' qq') > -1 && u.indexOf('mqqbrowser') < 0,
                };
            }(),
            isQQWx: function () {
                var u = window.navigator.userAgent;
                return (u.indexOf('MicroMessenger') > -1 || u.indexOf('mqqbrowser') > -1 && u.indexOf(" qq") < 0 || u.indexOf(' qq') > -1 && u.indexOf('mqqbrowser') < 0)
            }()
        },
        //获取参数
        getParam: function (variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
        },
        getRequest: function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        //json转url参数
        parseParam : function(param, key) {
            var _this = this;
            var paramStr = "";
            if (param instanceof String || param instanceof Number || param instanceof Boolean) {
                paramStr += "&" + key + "=" + encodeURIComponent(param);
            } else {
                $.each(param, function(i) {
                    var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                    paramStr += '&' + _this.parseParam(this, k);
                });
            }
            return paramStr.substr(1);
        },
        getUrl: function () {
            return window.location.protocol + '//' +
                window.location.host;
        }(),
        getFielname: function () {
            var pathname = window.location.pathname;
            var arr = pathname.split('\/');
            var filename = arr[arr.length-1];
            return filename;
        }(),
        getPath:function(){
            var pathname = window.location.pathname;
            var arr = pathname.split('\/');
            var filename = arr[arr.length-1];
            return pathname.replace(filename,'');
        }(),
        getCurentTime: function () {
            var curentTime = new Date();
            var timeString = curentTime.getFullYear() + '-' + (curentTime.getMonth() + 1) + "-" + curentTime.getDate();
            timeString += ' ' + curentTime.getHours() + ':' + curentTime.getMinutes() + ":" + curentTime.getSeconds();
            return timeString;
        },
        stampToTime: function (stamp) {
            //13位数字的时间戳转为时间对象
            var d = new Date(stamp);
            return {
                d: d,
                YY: d.getFullYear(),
                MM: d.getMonth() + 1,
                DD: d.getDate(),
                hh: d.getHours(),
                mm: d.getMinutes(),
                ss: d.getSeconds(),
            };
        },
        fixNumer:function(num,max){
            var numStr = num.toString();
            var r = num;
            if(numStr.length<max){
                var zero = '';
                for(var i=0; i<max-numStr.length; i++){
                    zero+='0';
                }
                r = zero+numStr;
            }
            return r;
        },
        getRnd: function (num1, num2) {
            switch (arguments.length) {
                case 1:
                    return Math.floor(Math.random() * arguments[0] + 1);     //返回0-max的随机整数
                case 2:
                    var min = arguments[0], max = arguments[1];
                    if (arguments[0] - arguments[1] > 0) {
                        min = arguments[1];
                        max = arguments[0];
                    }
                    return Math.floor(Math.random() * (max - min + 1) + min);      //返回min-max的随机整数
                default:
                    return 0;
            }
        },
        // 格式化手机号，隐藏中间4位
        fixPhone: function (phone) {
            var head3 = phone.slice(0, 3);
            var end4 = phone.slice(-4);
            return head3 + '****' + end4;
        },
        //检测是否为手机号码
        isMobile: function (txt) {
            if (txt == null || txt == "") {
                return false;
            }
            else {
                var regex = /^((13[0-9])|(14[5,7,9])|(15[^4])|(16[0-9])|(18[0-9])|(19[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;
                return regex.test(txt);
            }
        },
        // 正则判断
        isInteger:function (str) {
            var reg = /^-?[1-9]d*$/;  //整数
            return (reg.test(str));
        },
        isPosInteger:function (str) {
            var reg = /^[1-9]\d*$/;  //正整数
            return (reg.test(str));
        },
        isNagInteger:function (str) {
            var reg = /^-?[1-9]\d*$/;  //负整数
            return (reg.test(str) || str<0);
        },

    }
},true);
