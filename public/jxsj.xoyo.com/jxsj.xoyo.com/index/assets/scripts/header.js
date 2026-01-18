function spreenavAdd() {
    document.writeln(
        '<style> ' +
        '.navbar-wrap {top: 0;left: 0;z-index: 99;width: 100%;height: 82px;background-image: url("./assets/images/topNav-bg.png");background-size: 1245px 48px;background-repeat: no-repeat;background-position:  center;}'+
        '.logo-img {display: block;top: 5px;left: 40px;width: 212px;}'+
        '.navbar-list {position: relative;z-index: 1;margin-top: 30px;font-size: 0;}'+
        '.navbar-list li {display: inline-block;margin-left: 58px;width: 84px;height: 19px;}'+
        '.navbar-list li a {display: block;margin: 0 auto;background-image: url("//jxsj.xoyo.com/index/assets/images/nvbar.png");background-size: 200px auto;background-repeat: no-repeat;width: 84px;height: 19px;}'+
        '.navbar-list li.nav-1 a {background-position: -9px 0;}'+
        '.navbar-list li.nav-2 a {background-position: -9px -24px;}'+
        '.navbar-list li.nav-3 a {background-position: -9px -48px;}'+
        '.navbar-list li.nav-4 a {background-position: -9px -71px;}'+
        '.navbar-list li.nav-5 a {background-position: -9px -94px;}'+
        '.navbar-list li.nav-6 a {background-position: -9px -117px;}'+
        '.navbar-list li.nav-7 a {background-position: -9px -140px;}'+
        '.navbar-list:hover + .navbar-list-sub,.navbar-list-sub:hover {display: block;}'+
        '.navbar-list-sub {display: none;top: 12px;right: 0;width: auto;}'+
        '.navbar-list-sub::before {content:"";position:absolute;top: 56px;left: 40px;width: 830px;height: 102px;border-radius: 8px;background: linear-gradient(to bottom, rgba(8, 46, 84, 0.2), rgba(8, 46, 84, 0.4));z-index: -1;}'+
        '.navbar-list-sub .navbar-item-sub {margin-left: 58px;padding-top: 58px;box-sizing: border-box;width: 84px;height: 174px;position:relative;}'+
        // '.navbar-list-sub .navbar-item-sub:hover {background-image: url("//jxsj.xoyo.com/index/assets/images/navbar_active.png");background-size: 100% auto;background-repeat: no-repeat;background-position: top center;}'+
        // '.navbar-sub-btn {display: block;line-height: 24px;font-size: 14px;color: #535c83;cursor: pointer;}'+
        '.navbar-sub-btn {display: block;line-height: 24px;font-size: 14px;color: #ffecb9;cursor: pointer;}'+
        '.navbar-sub-btn:active {color: #be170f;}'+
        '.navbar-sub-btn span {display: inline-block;position: relative;}'+
        '.navbar-sub-btn span i {top: 7px;left: -12px;width: 10px;height: 10px;background-position: -216px -324px;}'+
        '.navbar-sub-btn:hover span {text-decoration: underline;}'+
        // '.navbar-sub-btn.hot {color: #e0160b;}'+
        '.navbar-sub-btn.hot {color: #ffecb9;}'+
        '.navbar-sub-span {display: flex;line-height: 24px;font-size: 14px;color: #ffecb9;justify-content: center;white-space: nowrap;}'+
        '</style> '
    );
    var header = '<div class="pa navbar-wrap">'+
                    '<div class="wrap clearfix">'+
                        '<a href="./index.html" class="pa full-img logo-img">'+
                            '<img src="//jxsj.xoyo.com/index/assets/images/logo.png" alt="logo">'+
                        '</a>'+
                        '<ul class="navbar-list tc fr">'+
                            '<li class="nav-1"><a href="./index.html" title="首页"></a></li>'+
                            '<li class="nav-2"><a href="./news.html?catid=0" target="_blank" title="新闻中心"></a></li>'+
                            '<li class="nav-3"><a href="./activity.html?catid=5611" target="_blank" title="活动专区"></a></li>'+
                            '<li class="nav-4"><a href="./download.html" target="_blank" title="下载专区"></a></li>'+
                            '<li class="nav-5"><a href="https://jxsj.xoyo.com/p/zt/2021/07/21/ziliao/data_index.html" target="_blank" title="游戏指引"></a></li>'+
                            '<li class="nav-6"><a href="//support.seasungames.cn/" target="_blank" title="客服专区"></a></li>'+
                        '</ul>'+
                        '<ul class="pa navbar-list-sub clearfix tc">'+
                            '<li class="navbar-item-sub fl">'+
                                '<a href="./news.html?catid=3415" class="navbar-sub-btn hot" target="_blank"><span>官方新闻<i class="pa sp"></i></span></a>'+
                                '<a href="./news.html?catid=0" class="navbar-sub-btn" target="_blank"><span>官方公告</span></a>'+
                            '</li>'+
                            '<li class="navbar-item-sub fl">'+
                                '<a href="./news.html?catid=3411" class="navbar-sub-btn hot" target="_blank"><span>热点活动<i class="pa sp"></i></span></a>'+
                                '<a href="https://jxsj.xoyo.com/zt/2018/05/29/girlchoice/index.html#beauty" target="_blank" class="navbar-sub-btn"><span>美女认证</span></a>'+
                                '<a href="https://jxsj.xoyo.com/show-3415-10660-1.html" target="_blank" class="navbar-sub-btn"><span>指挥官福利</span></a>'+
                            '</li>'+
                            '<li class="navbar-item-sub fl">'+
                                '<a href="./download.html" class="navbar-sub-btn hot" target="_blank"><span>客户端下载<i class="pa sp"></i></span></a>'+
                                // '<a href="./pic.html?catid=3437" class="navbar-sub-btn t-hide" target="_blank" ><span>壁纸下载</span></a>'+
                                // '<a href="./pic.html?catid=3436" class="navbar-sub-btn t-hide" target="_blank"><span>原画下载</span></a>'+
                            '</li>'+
                            '<li class="navbar-item-sub fl">'+
                                '<a href="https://jxsj.xoyo.com/p/zt/2021/07/21/ziliao/xssl.html" target="_blank" class="navbar-sub-btn hot"><span>新手上路<i class="pa sp"></i></span></a>'+
                                '<a href="https://jxsj.xoyo.com/p/zt/2021/07/21/ziliao/gsjj.html" target="_blank" class="navbar-sub-btn"><span>高手进阶</span></a>'+
                                '<a href="https://jxsj.xoyo.com/p/zt/2021/07/21/ziliao/xtjs.html" target="_blank" class="navbar-sub-btn"><span>系统介绍</span></a>'+
                                '<a href="https://jxsj.xoyo.com/p/zt/2021/07/21/ziliao/hdtj.html" target="_blank" class="navbar-sub-btn"><span>活动推荐</span></a>'+
                            '</li>'+
                            '<li class="navbar-item-sub fl">'+
                                '<a href="https://kefu.xoyo.com/index.php?r=api/chat&id=12" class="navbar-sub-btn" target="_blank"><span>在线客服</span></a>'+
                                '<span class="navbar-sub-span">客服热线</span>'+
                                '<span class="navbar-sub-span">028-85437733</span>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                '</div>';
    $(".stage").prepend(header);
}
spreenavAdd();
