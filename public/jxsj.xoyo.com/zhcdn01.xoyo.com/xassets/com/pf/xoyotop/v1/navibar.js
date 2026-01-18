/*!
 * XOYO site top navigation bar
 * require jquery.js
 * 2017-02-27
 */
(function($) {
	var tongjiParams = window.location.hostname.split('.').join('');

	var isMaster = true;

	// noinspection JSUnresolvedVariable
	if(window.XOYO_TOP_NAVIBAR_CONFIG) {
		// noinspection JSUnresolvedVariable
		isMaster = window.XOYO_TOP_NAVIBAR_CONFIG.isMaster;
	} else {
		if (window.location.hostname.indexOf('test-zt') > -1) {
			isMaster = false;
		}
	}

	var navibarLoginUrl = (!isMaster ? 'https://passport-dev.xoyo.com/signin?redirect=' : 'https://passport.xoyo.com/signin?redirect=') + encodeURIComponent(window.location.href);
	var signupUrl = (!isMaster ? 'https://passport-dev.xoyo.com/signup?origin=game&utm_source=': 'https://passport.xoyo.com/signup?origin=game&utm_source=') + tongjiParams;
	var apiUrl = !isMaster ? 'https://my-api-dev.xoyo.com/passport/common_api/': 'https://pf-api.xoyo.com/passport/common_api/';

	var nav_dom_list = [
		'<div id="xoyo-top-navi-bar">' +
		'<div class="inner-i">' +
		'<div class="l-nav">' +
		'<div class="xoyo-logo">' +
		'<a target="_top" href="//www.xoyo.com/">' +
		'<img src="//zhcdn01.xoyo.com/xassets/com/pf/xoyotop/v1/images/xoyo-logo.png" alt="逍遥网">' +
		'</a>' +
		'</div>' +
		'</div>' +
		'<div class="r-nav">' +
		'<div class="t-links">' +
		'<a class="XPASS_signin J_navibarTopOthers" href=' + navibarLoginUrl + '>登录</a>' +
		'<a href="' + signupUrl + '" target="_blank">注册账号</a>' +
		'<a target="_blank" href="https://charge.xoyo.com/charge-items?origin=game&utm_source=' + tongjiParams + '" >账号充值</a>' +
		'<a href="javascript:;" class="game-list-pr J_serverTopListBtn"><span class="game-list-icon game-icon-gray"></span>服务列表</a>' +
		'<a href="javascript:;" class="game-list-pr hlight J_gameTopListBtn"><span class="game-list-icon"></span>游戏列表</a>' +
		'</div>' +
		'<div class="t_xpass_signin_u_i" style="display:none;"></div>' +
		'</div>' +
		'<div class="xoyo-top-pop-box xoyo-top-pop-kefu J_serverTopListCon">' +
		'<div class="xoyo-top-pop">' +
		'<ul class="xoyo-top-pop-head">' +
		'<li>我的通行证</li>' +
		'<li>安全中心</li>' +
		'<li class="xoyo-top-bor-none">充值中心</li>' +
		'</ul>' +
		'<ul class="xoyo-top-list">' +
		'<li><a href="https://security.xoyo.com/change-password" target="_blank">修改密码</a></li>' +
		'<li><a href="https://security.xoyo.com/phone-setting" target="_blank">修改绑定手机</a></li>' +
		'<li><a href="https://security.xoyo.com/email-setting" target="_blank">修改绑定邮箱</a></li>' +
		'</ul>' +
		'<ul class="xoyo-top-list">' +
		'<li><a href="https://security.xoyo.com/ks-phone-token" target="_blank">手机令牌</a></li>' +
		'<li><a href="https://security.xoyo.com/account-freeze" target="_blank">自助冻结踢号</a></li>' +
		'</ul>' +
		'<ul class="xoyo-top-list xoyo-top-bor-none">' +
		'<li><a href="https://charge.xoyo.com/charge-items?origin=game" target="_blank">游戏充值</a></li>' +
		'<li><a href="https://charge.xoyo.com/charge-record" target="_blank">查询充值记录</a></li>' +
		'<li><a href="https://charge.xoyo.com/pay?step=2&item=kcoin" target="_blank">充值金山币</a></li>' +
		'</ul>' +
		'</div>' +
		'</div>' +
		'<div class="xoyo-top-pop-box xoyo-top-pop-game J_gameTopListCon">' +
		'<div class="xoyo-top-pop">' +
		'<ul class="xoyo-top-pop-head">' +
		'<li class="head-big-width">剑侠系列</li>' +
		'<li class="xoyo-top-bor-none">其他系列</li>' +
		'</ul>' +
		'<ul class="xoyo-top-list xoyo-top-list-jianxia xoyo-top-bor-none J_xoyoTopListJianxia">' +
		'<li class="top-list-tit">剑侠系列</li>' +
		'<li class="xoyo-top-hot"><a class="imp xoyo_top_games_icon_clicked" href="//jx3.xoyo.com/"  target="_blank">剑网3</a></li>' +
		'<li class="xoyo-top-hot"><a href="//jxsj.xoyo.com/"  target="_blank">剑侠世界</a></li>' +
		'<li><a href="//jx.xoyo.com/"  target="_blank">剑网1</a></li>' +
		'<li><a href="//jx2.xoyo.com/"  target="_blank">剑网2</a></li>' +
		'<li><a href="//jx2xz.xoyo.com/"  target="_blank"  class="xoyo-top-new">剑网2(新传区)</a></li>' +
		'<li><a href="//jw.xoyo.com/"  target="_blank">剑侠2外传</a></li>' +
		'</ul>' +
		'<ul class="xoyo-top-list xoyo-top-bor-none J_xoyoTopListOther">' +
		'<li class="xoyo-top-hot"><a href="https://jx3.qq.com/"  target="_blank">剑网3指尖江湖</a></li>' +
		'<li class="xoyo-top-new"><a href="//dy.xoyo.com/"  target="_blank">剑网3指尖对弈</a></li>' +
		'<li class="xoyo-top-hot"><a href="//js2.xoyo.com/"  target="_blank">剑侠世界2手游</a></li>' +
		'<li class="xoyo-top-hot"><a href="//js3.xoyo.com/"  target="_blank">剑侠世界3手游</a></li>' +
		'<li class="xoyo-top-hot"><a href="//mysy.xoyo.com/"  target="_blank">魔域手游</a></li>' +
		// '<li><a href="//ly2.xoyo.com/"  target="_blank">灵域</a></li>'+
		'<li><a href="//ysyy.qq.com"  target="_blank">云裳羽衣</a></li>' +
		'<li><a href="//js.xoyo.com"  target="_blank">剑侠世界手游</a></li>' +
		'<li><a href="//ffbe.xoyo.com/"  target="_blank">最终幻想：勇气启示录</a></li>' +
		'</ul>' +
		'</div>' +
		'</div>' +

		'</div>' +
		'</div>'
	];

	XOYO_top_navi = {
		xurl: apiUrl,
		init: function() {
			var that = this;

			this.require_css(
				'//zhcdn01.xoyo.com/',
				'xassets/com/pf/xoyotop/v1/navibar.css'
			);
			setTimeout(function() {
				$('#xoyo-top-navi-bar').show();
				$('body').prepend(nav_dom_list.join(''));
				that.infoListModule();
				that.rending();
				that.gameList();
			}, 250);

		},

		gameList: function() {
			var that = this;
			$.ajax({
				url: '//content.xoyo.com/api/page/game.html',
				type: 'GET',
				cache: true,
				jsonpCallback: 'gameHtmlCallback' + Math.floor(new Date().getTime() / 600000),
				dataType: 'jsonp',
				success: function($data) {
					var html = '', htmlOtherGames = '';
					$.each($data.data.game_list, function(i, item) {
						/**
						 *
						 * @type gameUrl url修改来源后缀
						 * @type classNames 热点和新游icon
						 * @type classIconNames PC和手游icon
						 */
						var gameUrl = null;
						var classNames = '', classIconNames = '';
						if (item.recommend_type[0] == 'hot') {
							classNames = ' class="xoyo-top-hot"';
						} else if (item.recommend_type[0] == 'newest') {
							classNames = ' class="xoyo-top-new"';
						}
						if (item.game_type == 'pc') {
							classIconNames = ' class="xoyo-top-pc-icon"';
						} else if (item.game_type == 'mobile') {
							classIconNames = ' class="xoyo-top-mobi-icon"';
						}

						if (item.website_url.indexOf('utm_source') > -1) {
							var gameUrl = item.website_url.replace('utm_source=xoyo', 'utm_source=xoyoGameTop');
						} else {
							var gameUrl = item.website_url.replace('from=xoyo', 'form=xoyoGameTop');
						}
						if (item.cat_id == '4009') {
							html += '<li' + classNames + '><a' + classIconNames + 'href="' + gameUrl + '"  target="_blank">' + item.title + '</a></li>';
						}
						if (item.cat_id == '4010') {
							htmlOtherGames += '<li' + classNames + '><a' + classIconNames + 'href="' + gameUrl + '"  target="_blank">' + item.title + '</a></li>';
						}
					});
					$('.J_xoyoTopListJianxia').empty().html(html);
					$('.J_xoyoTopListOther').empty().html(htmlOtherGames);
				}
			});
		},

		rending: function(userCallback) { //获取登录信息
			var that = this;
			that.exitEventBind();
			try {
				$.ajax({
					url: this.xurl + 'get_info',
					type: 'GET',
					dataType: 'jsonp',
					success: function(account) {
						if (account.code * 1 > 0) {
							var _userName = account.data.account;
							if (_userName.length > 11) {
								_userName = (_userName.substr(0, 8)) + '...';
							}

							if (userCallback && typeof userCallback == 'function') {
								userCallback(_userName);
							}

							if (that._callbacks['sin_callback_oklogin']) {
								that._callbacks.sin_callback_oklogin(_userName);
							}

							$('.XPASS_signin').remove();
							$('.t_xpass_signin_u_i')
								.html('<a class="t_xpass_signin_u_name_i" href="https://i.xoyo.com/"><span>'
									+ _userName + '</span></a><a class="t_xpass_s_out" \
                                href="javascript:;"><span>退出</span></a>')
								.show();
							that.exitEventBind();
						} else {
							if (that._callbacks['sin_callback_nologin']) {
								that._callbacks.sin_callback_nologin();
							}
						}
					}
				});
			} catch (e) {
			}
		},
		isLogin: function(userCallback, nologin) { //获取用户登录信息
			var that = this;

			if (userCallback && typeof userCallback == 'function') {
				this._callbacks.sin_callback_oklogin = userCallback;
			}
			if (nologin && typeof nologin == 'function') {
				this._callbacks.sin_callback_nologin = nologin;
			}

		},
		exitEventBind: function() {
			var that = this;
			$('.t_xpass_s_out').on('click', function() {
				that.exit();
			});
		},
		exit: function(callback) {
			try {
				$.ajax({
					url: this.xurl + 'logout',
					type: 'GET',
					dataType: 'jsonp',
					jsonpCallback: 'logoutCallback',
					success: function(result) {
						if (callback && typeof callback == 'function') {
							callback();
						} else {
							window.location.reload();
						}

					}
				});
			} catch (e) {
			}
		},
		_callbacks: {
			'sin_callback': false,
			'sup_callback': false,
			'sin_callback_oklogin': false,
			'sin_callback_nologin': false
		},
		infoListModule: function() {
			$('.J_serverTopListBtn, .J_serverTopListCon').on('mouseenter', function() {
				$('.J_serverTopListCon').show().addClass('xoyo-top-pop-avtive');
				$('.J_serverTopListBtn').addClass('active');
			});
			$('.J_serverTopListBtn, .J_serverTopListCon').on('mouseleave', function() {
				$('.J_serverTopListCon').hide().removeClass('xoyo-top-pop-avtive');
				$('.J_serverTopListBtn').removeClass('active');
			});

			$('.J_gameTopListBtn, .J_gameTopListCon').on('mouseenter', function() {

				$('.J_gameTopListCon').show().addClass('xoyo-top-pop-avtive');
				$('.J_gameTopListBtn').addClass('active');
			});
			$('.J_gameTopListBtn, .J_gameTopListCon').on('mouseleave', function() {
				$('.J_gameTopListCon').hide().removeClass('xoyo-top-pop-avtive');
				$('.J_gameTopListBtn').removeClass('active');
			});
		},
		require_css: function(domain_name, file_path) {

			var d_name = domain_name || '//zhcdn01.xoyo.com/';
			try {
				var head = document.getElementsByTagName('head').item(0),
					style;
				style = document.createElement('link');
				style.setAttribute('rel', 'stylesheet');
				style.setAttribute('type', 'text/css');
				style.setAttribute('href', d_name + file_path);
				head.appendChild(style);
			} catch (e) {
			}

		}

	};

	XOYO_top_navi.init();

})(jQuery);
