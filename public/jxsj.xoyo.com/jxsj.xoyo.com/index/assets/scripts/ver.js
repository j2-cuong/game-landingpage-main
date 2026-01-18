var isMaster = true; //环境切换 正式是true, 测试环境是false
var g = {
  domain: isMaster ? "//jxsj.xoyo.com" : "//test-jxsj.xoyo.com",
  path: "/api.php",
  apis: {
    article: "get_article_list", //获取文章列表接口(包含轮播、江湖图赏)
    mergeArticle: "get_merge_article_list", // 文章列表合并接口
    notice: "get_customer_article_list", //获取公告
    newTj: "get_article_detail", //新服推荐
    noticeDetails: "get_customer_article_detail", //公告详情
    articleDetails: "get_article_detail", // 普通详情页
    searchByTitle: "search_by_title", // 新闻标题搜索
  },
  data: {
    // catid
    catid: {
      0: {
        name: "公告",
        idx: 0,
        href: "./news.html",
      },
      5609: {
        name: "活动",
        href: "./news.html",
        // 分流页轮播广告位
      },
      5610: {
        name: "活动",
        href: "./news.html",
        // 官网首屏轮播广告
      },
      3415: {
        name: "新闻",
        idx: 1,
        href: "./news.html",
      },
      3411: {
        name: "活动",
        idx: 2,
        href: "./news.html",
      },
      5611: {
        name: "正在进行",
        idx: 0, //列表页序列,
        href: "./activity.html",
      },
      5612: {
        name: "长期活动",
        idx: 1, //列表页序列
        href: "./activity.html",
      },
      3436: {
        name: "游戏壁纸",
        idx: 0,
        href: "./pic.html",
      },
      3437: {
        name: "精美原画",
        idx: 1,
        href: "./pic.html",
      },
      5653: {
        name: "历史版本",
        href: "./index.html",
      },
      5662: {
        name: "内页侧边栏活动",
      },
    },
    zxGwData: [], //官网公告数据
  },
  ajax: function (o, cb) {
    var t = {
      method: o.method || "get",
      url: g.domain + g.path + (o.url ? o.url : ""),
      data: o.data || {},
      dataType: o.dataType || "jsonp",
      contentType: o.contentType || "application/x-www-form-urlencoded",
      callbackName: o.callbackName || "newsCallback" + g.getRandom(0, 10000),
    };
    // console.log(t);
    var load = null;

    o.load && (load = $.lay.load(1, { content: "加载中，请稍后..." }));
    $.ajax({
      type: t.method,
      url: t.url,
      data: t.data,
      dataType: t.dataType,
      contentType: t.contentType,
      jsonpCallback: t.callbackName,
      xhrFields: { withCredentials: true },
      success: function (d) {
        // console.log(d);
        setTimeout(function () {
          o.load && $.lay.close(load);
        }, 500);

        cb && cb(d);
      },
      error: function (xhr, type) {
        o.load && $.lay.close(load);
        var d = {
          code: -505,
          msg: "系统错误",
          message: "系统错误",
        };
        cb && cb(d);
      },
    });
  },
  getData: {
    //获取合并接口（新闻、活动、正在进行活动、长期活动、新服推荐）
    getMergeList: function (o, cb) {
      var def = {
        url: "",
        data: {
          op: "search_api",
          action: g.apis.mergeArticle,
          merge_id: o.merge_id,
        },
      };
      o = $.extend(true, def, o);
      g.ajax(o, cb);
    },
    // 获取文章列表
    getArticleList: function (o, cb) {
      var def = {
        url: "",
        data: {
          op: "search_api",
          action: g.apis.article,
          catid: o.catid,
          page: o.page || 1,
          num: o.num || 10,
          order_by: "listorder",
          sort_by: "desc",
        },
      };
      o = $.extend(true, def, o);
      g.ajax(o, cb);
    },
    // 获取公告数据
    getNotice: function (o, cb) {
      var def = {
        url: "",
        data: {
          op: "search_api",
          action: g.apis.notice,
          page: o.page || 1,
          num: o.num || 6,
          order_by: "listorder",
          sort_by: "desc",
          game: "jxsj",
          _: "1600248347393",
        },
        callbackName: "Notice",
      };
      o = $.extend(true, def, o);
      g.ajax(o, cb);
    },
    // 获取认证美女
    getGirlChoice: function () {
      $.ajax({
        type: "get",
        url: "https://ws.xoyo.com/jxsj/girlchoice/get_approve_list?&callback=jQuery172039526444236589686_1600248714793&_=1600248715355",
        data: {
          page_num: 1,
          num: 9,
        },
        dataType: "jsonp",
        contentType: "application/x-www-form-urlencoded",
        xhrFields: { withCredentials: true },
        success: function (d) {
          // console.log(d);
          if (d.code == "1") {
            g.handler.editGirlChoice(d.data);
          } else {
            console.log(d.msg);
          }
        },
        error: function () {
          console.log("系统错误");
        },
      });
    },
    //获取公告详情
    getNoticeDetails: function (o, cb) {
      var def = {
        url: "",
        data: {
          op: "search_api",
          action: g.apis.noticeDetails,
          catid: o.catid,
          page: o.page || 1,
          num: o.num || 1,
          order_by: "listorder",
          sort_by: "desc",
          kid: o.kid,
          game: "jxsj",
          _: "1600845744312",
        },
      };
      o = $.extend(true, def, o);
      g.ajax(o, cb);
    },
    // 获取文章详情
    getArticleDetails: function (o, cb) {
      var def = {
        url: "",
        data: {
          op: "search_api",
          action: g.apis.articleDetails,
          catid: o.catid,
          page: o.page || 1,
          num: o.num || 1,
          order_by: "listorder",
          sort_by: "desc",
          catid: o.catid,
          id: o.id,
          _: "1600843272960",
        },
      };
      o = $.extend(true, def, o);
      g.ajax(o, cb);
    },
    // 获取补丁信息
    downloadBd: function () {
      $.ajax({
        url: "//zt.xoyo.com/other/updatepage/index.php?act=apilist&game=jxsj&num=300",
        dataType: "jsonp",
        success: function ($data) {
          if ($data.status == "ok") {
            // 修改补丁信息
            g.handler.editPath($data);
          } else {
            console.log("加载出错");
          }
        },
      });
    },
    // 获取CMS下载配置
    downloadCms: function () {
      $.ajax({
        url: "https://jxsj.xoyo.com/api/config/tag/zt/pc_download_config",
        dataType: "jsonp",
        success: function ($data) {
          if ($data && $data.pc_full_update_date) {
            // 修改下载链接信息
            g.handler.editDownloadInfo($data);
          } else {
            console.log("加载出错");
          }
        },
      });
    },

    // 获取新闻文章列表
    //  params.catid 3414 公告
    //  params.catid 3415 新闻
    //  params.catid 3411 活动
    getTabListByKeyword: function (params, cb) {
      var def = {
        url: "",
        data: {
          op: "search_api",
          action: g.apis.searchByTitle,
          modelid: 318,
          catid: params.catid,
          // order_by: "listorder",
          // sort_by: "desc", // "asc",
          page: params.page || 1,
          num: params.num || 13,
          q: params.q || $(".box-keywords .box-keywords-input").val() || "",
        },
      };
      params = $.extend(true, def, params);
      g.ajax(params, cb);
    },
  },
  handler: {
    // 修改官网轮播信息
    editGwBanner: function (data) {
      if (data.length > 0) {
        var slide = "";
        g.swiperLunbo.count = data.length;
        data.forEach(function (e, i) {
          if (e.islink == 1 || (e.catid != 0 && g.isExtraUrl(e.url))) {
            slide =
              '<a href="' +
              e.url +
              '" target="_blank" class="full-img banner-img" title="' +
              e.title +
              '">';
          } else {
            slide =
              '<a href="./details.html?catid=' +
              e.catid +
              "&id=" +
              e.id +
              '" target="_blank" class="full-img banner-img" title="' +
              e.title +
              '">';
          }
          slide += '<img src="' + e.thumb + '" alt="轮播图"></a>';
          g.swiperLunbo.appendSlide(
            slide,
            "swiper-slide swiper-no-swiping",
            "div"
          );
          g.swiperLunbo.swipeTo(0, 0);
        });
      }
    },
    //修改新闻头条
    editFrontPage: function (data) {
      var e = data[0];
      $(".news-item-first").text(e.title).attr({ title: e.title, href: e.url });
    },
    //修改官网公告
    editGwNotice: function (data) {
      var str = "",
        time = 0;
      data.data.list.forEach(function (e, i) {
        // 最新栏目数据添加
        if (i < 2) {
          g.data.zxGwData[i] = e;
        }
        time = g.timeFormate(parseInt(e.inputtime * 1000), false);
        str +=
          '<li class="news-item clearfix"><a href="./details.html?kid=' +
          e.id +
          '" style="' +
          g.initStyle(e.style) +
          ';" target="_blank" class="fl t-hide"><span class="news-label">[公告]</span>' +
          e.title +
          '</a><span class="time-text fr">[' +
          time +
          "]</span></li>";
      });
      g.handler.editGwZx(); //渲染最新数据
      $(".news-list-container .news-list-item:eq(1) ul").html(str);
    },
    //修改官网 新闻&活动
    editGwNews: function (data, idx) {
      var str = "",
        time = 0,
        label,
        url,
        label = idx == 2 ? "新闻" : "活动";
      data.forEach(function (e, i) {
        // 最新栏目数据添加 start
        if (idx == 2 && i < 3) {
          g.data.zxGwData[i + 2] = e;
        } else if (idx == 3 && i < 1) {
          g.data.zxGwData[5] = e;
        }
        // 最新栏目数据添加 end
        time = g.timeFormate(parseInt(e.inputtime * 1000), false);
        // 是否跳转外链
        if (e.islink == 1 || (e.catid != 0 && g.isExtraUrl(e.url))) {
          url = e.url;
        } else {
          url = "./details.html?catid=" + e.catid + "&id=" + e.id;
        }
        str +=
          '<li class="news-item clearfix"><a href="' +
          url +
          '" style="' +
          g.initStyle(e.style) +
          ';" target="_blank" class="fl t-hide"><span class="news-label">[' +
          label +
          "]</span>" +
          e.title +
          '</a><span class="time-text fr">[' +
          time +
          "]</span></li>";
      });
      g.handler.editGwZx(); //渲染最新数据
      $(".news-list-container .news-list-item:eq(" + idx + ") ul").html(str);
    },
    // 修改官网最新
    editGwZx: function () {
      var length = 0;
      g.data.zxGwData.forEach(function (e, i) {
        length++;
      });
      if (length < 6) return false;
      var str = "",
        label = "";
      g.data.zxGwData.forEach(function (e, i) {
        time = g.timeFormate(parseInt(e.inputtime * 1000), false);
        // 是否跳转外链
        if (e.islink == 1 || (e.catid != 0 && g.isExtraUrl(e.url))) {
          url = e.url;
        } else if (e.catid) {
          url = "./details.html?catid=" + e.catid + "&id=" + e.id;
        } else {
          url = "./details.html?&kid=" + e.id;
        }
        if (i < 2) {
          label = "公告";
        } else if (i < 5) {
          label = "新闻";
        } else if (i < 6) {
          label = "活动";
        }
        str +=
          '<li class="news-item clearfix"><a href="' +
          url +
          '" style="' +
          g.initStyle(e.style) +
          ';" target="_blank" class="fl t-hide"><span class="news-label">[' +
          label +
          "]</span>" +
          e.title +
          '</a><span class="time-text fr">[' +
          time +
          "]</span></li>";
      });
      $(".news-list-container .news-list-item:eq(0) ul").html(str);
    },
    // 修改官网热门活动
    editGwHd: function (data, idx) {
      var str = "";
      data.forEach(function (e, i) {
        str += '<li class="hd-item fl">';
        // 是否跳转外链
        if (e.islink == 1 || (e.catid != 0 && g.isExtraUrl(e.url))) {
          str +=
            '<a href="' + e.url + '" title="' + e.title + '" target="_blank">';
        } else {
          str +=
            '<a href="./details.html?catid=' +
            e.catid +
            "&id=" +
            e.id +
            '" title="' +
            e.title +
            '" target="_blank">';
        }
        str +=
          '<div class="pr full-img hd-img">' +
          '<img src="' +
          e.thumb +
          '" alt="' +
          e.title +
          '">' +
          '<i class="pa bg hd-inset"></i>' +
          "</div>" +
          '<p class="hd-name-text t-2">' +
          e.title +
          "</p>";
        if (e.hdtime) str += '<span class="hd-label">' + e.hdtime + "</span>";
        str += "</a>" + "</li>";
      });
      $(".hd-list-container ul").eq(idx).html(str);
    },
    // 修改官网新服推荐
    editNewTj: function (data) {
      var that = data[0];
      $(".hd-tj .hd-img img").attr("src", that.thumb);
      $(".hd-tj .hd-name-text").text(that.title);
      $(".hd-tj .hd-msg-text").text(that.description);
      // 是否跳转外链
      if (that.islink == 1 || (that.catid != 0 && g.isExtraUrl(that.url))) {
        $(".hd-tj a").attr("href", that.url);
      } else {
        $(".hd-tj a").attr(
          "href",
          "./details.html?catid=" + that.catid + "&id=" + that.id
        );
      }
      $(".hd-tj a").attr("title", that.title);
    },
    // 修改认证美女
    editGirlChoice: function (data) {
      var str = "";
      data.list.forEach(function (e, i) {
        if (i < 7) {
          str +=
            '<li class="hd-item item-' +
            (i + 1) +
            ' fl" target="_blank" title="前往查看">' +
            '<a href="//jxsj.xoyo.com/zt/2018/05/29/girlchoice/index.html#beauty" class="full-img">' +
            '<img src="' +
            e.image +
            '" alt="认证美女">' +
            "</a>" +
            "</li>";
        }
      });
      $(".hd-rz .hd-list").html(str);
    },
    // 修改历史版本
    editBbList: function (data) {
      // console.log(data);
      var str = "";
      data.forEach(function (e, i) {
        if (i == 0) {
          $(".sj-img")
            .attr("href", e.url)
            .find("img")
            .attr({ src: e.thumb, alt: e.title });
        }
        str +=
          '<li class="pr sj-item btn-hover clearfix" data-url="' +
          e.url +
          '" data-img="' +
          e.thumb +
          '"><i class="sp sj-icon fl"></i><p class="fl">' +
          e.title +
          '</p><span class="fr">' +
          e.hdtime +
          "</span></li>";
      });
      $(".sj-wrap-container ul")
        .html(str)
        .find(".sj-item")
        .eq(0)
        .addClass("active");
    },
    // 修改详情页 内容
    editDetails: function (data) {
      document.title = data.title + " - " + document.title;
      $(".article-title .title-text").text(data.title);
      $(".article-title .time-text").text(
        g.timeFormate(parseInt(data.inputtime * 1000), true)
      );
      if (data.content.indexOf("[page]") >= 0) {
        $(".paging-container").show();
        var dataList = data.content.split("[page]");
        dataList.unshift(0);
        // 调用分页
        $(".article-content").html(dataList[1]);
        var myPagination = new pagination(
          {
            pageDom: ".paging-container",
            num: 1,
            total: dataList.length - 1,
          },
          function (i) {
            $(".article-content").html(dataList[i]);
          }
        );
      } else {
        $(".article-content").html(data.content);
      }
    },
    //修改详情页侧边栏活动
    editDetailsHd: function (data) {
      if (data.code == "1") {
        var str = "",
          url = "";
        data.data.list.forEach(function (ev, idx) {
          // 是否跳转外链
          if (ev.islink == 1 || (ev.catid != 0 && g.isExtraUrl(ev.url))) {
            url = ev.url;
          } else {
            url = "./details.html?catid=" + ev.catid + "&id=" + ev.id;
          }
          str +=
            '<a href="' +
            url +
            '" class="activity-img" target="_blank" title="' +
            ev.title +
            '"><img src="' +
            ev.thumb +
            '" alt="' +
            ev.title +
            '"></a>';
        });
        $(".hd-list").html(str);
        // 调整内容区域高度，小于侧边栏时与其保持一致
        $(".details-container").css(
          "min-height",
          $(".sidebar-container").height() + "px"
        );
      } else {
        console.log(data.msg);
      }
    },
    // 修改新闻列表页 - 新闻列表
    editListNews: function (node, data) {
      if (data.code == "1") {
        var str = "",
          time = "",
          url = "";
        if (data.data.list <= 0) {
          $(node).html(
            `<div class="no-data">
              未搜索出相关内容，换个关键词试试吧。
            </div>`
          );
          return;
        }
        data.data.list.forEach(function (e, i) {
          // 最新栏目数据添加 end
          time = g.timeFormate(parseInt(e.inputtime * 1000), false);
          // 是否跳转外链
          if (e.islink || (e.catid != 0 && g.isExtraUrl(e.url))) {
            url = e.url;
          } else {
            url = "./details.html?catid=" + e.catid + "&id=" + e.id;
          }
          g.initStyle(e.style);
          str +=
            '<li class="news-item clearfix">' +
            '<a href="' +
            url +
            '" style="' +
            g.initStyle(e.style) +
            ';" target="_blank" class="fl">[' +
            g.data.catid[e.catid].name +
            "]  " +
            e.title +
            "</a>" +
            '<span class="time-text fr">' +
            time +
            "</span>" +
            "</li>";
        });
        $(node).html(str);
      } else {
        console.log(data.msg);
      }
    },
    // 修改新闻列表页 - 活动列表
    editListNewsHd: function (node, data) {
      if (data.code == "1") {
        var str = "",
          time = "",
          url = "";
        if (data.data.list <= 0) {
          $(node).html(
            `<div class="no-data">
            未搜索出相关内容，换个关键词试试吧。
            </div>`
          );
          return;
        }
        data.data.list.forEach(function (e, i) {
          // 最新栏目数据添加 end
          time = g.timeFormate(parseInt(e.inputtime * 1000), false);
          // 是否跳转外链
          if (e.islink == 1 || (e.catid != 0 && g.isExtraUrl(e.url))) {
            url = e.url;
          } else {
            url = "./details.html?catid=" + e.catid + "&id=" + e.id;
          }
          str +=
            '<li class="news-hd-item clearfix">' +
            '<a href="' +
            url +
            '" class="full-img hd-img fl" target="_blank">' +
            '<img src="' +
            e.thumb +
            '" alt="">' +
            "</a>" +
            '<div class="hd-wrap fl">' +
            '<p class="title-text t-hide">' +
            e.title +
            "</p>" +
            '<p class="hd-time-text">' +
            time +
            "</p>" +
            '<p class="msg-text t-3"> ' +
            e.description +
            "</p>" +
            '<a href="' +
            url +
            '" target="_blank" class="sp btn-look-detail btn-hover t" title="查看详情">查看详情</a>' +
            "</div>" +
            "</li>";
        });
        $(node).html(str);
      } else {
        console.log(data.msg);
      }
    },
    // 修改新闻列表页 - 公告列表
    editListNotice: function (node, data) {
      if (data.code == "1") {
        var str = "",
          time = "",
          url = "";
        data.data.list.forEach(function (e, i) {
          // 最新栏目数据添加 end
          time = g.timeFormate(parseInt(e.inputtime * 1000), false);
          // 是否跳转外链
          if (e.islink == 1 || (e.catid != 0 && g.isExtraUrl(e.url))) {
            url = e.url;
          } else {
            url = "./details.html?kid=" + e.id;
          }
          str +=
            '<li class="news-item clearfix">' +
            '<a href="' +
            url +
            '" style="' +
            g.initStyle(e.style) +
            ';" target="_blank" class="fl">[公告]  ' +
            e.title +
            "</a>" +
            '<span class="time-text fr">' +
            time +
            "</span>" +
            "</li>";
        });
        $(node).html(str);
      } else {
        console.log(data.msg);
      }
    },
    // 修改活动列表页 - 最新活动、长期活动列表
    editListActivity: function (node, data) {
      if (data.code == "1") {
        var str = "",
          time = "",
          url = "";
        data.data.list.forEach(function (e, i) {
          // 最新栏目数据添加 end
          time = g.timeFormate(parseInt(e.inputtime * 1000), false);
          // 是否跳转外链
          if (e.islink == 1 || (e.catid != 0 && g.isExtraUrl(e.url))) {
            url = e.url;
          } else {
            url = "./details.html?catid=" + e.catid + "&id=" + e.id;
          }
          str +=
            '<li class="news-hd-item clearfix">' +
            '<a href="' +
            url +
            '" class="full-img hd-img fl" target="_blank">' +
            '<img src="' +
            e.thumb +
            '" alt="">' +
            "</a>" +
            '<div class="hd-wrap fl">' +
            '<p class="title-text t-hide">' +
            e.title +
            "</p>" +
            '<p class="hd-time-text">' +
            e.hdtime +
            "</p>" +
            '<p class="msg-text t-2"> ' +
            e.description +
            "</p>" +
            '<a href="' +
            url +
            '" target="_blank" class="sp btn-look-detail btn-hover t" title="查看详情">查看详情</a>' +
            "</div>" +
            "</li>";
        });
        $(node).html(str);
      } else {
        console.log(data.msg);
      }
    },
    // 修改江湖图赏列表页 - 游戏壁纸、精美原画列表
    editListPic: function (node, data) {
      if (data.code == "1") {
        var str = "",
          url = "";
        data.data.list.forEach(function (e, i) {
          // 最新栏目数据添加 end
          // 是否跳转外链
          if (e.islink == 1 || (e.catid != 0 && g.isExtraUrl(e.url))) {
            url = e.url;
          } else {
            url = "./details.html?catid=" + e.catid + "&id=" + e.id;
          }
          str +=
            '<li class="pic-item fl">' +
            '<a href="' +
            url +
            '" target="_blank" title="' +
            e.title +
            '">' +
            '<div class="pic-img">' +
            '<img src="' +
            e.thumb +
            '" alt="' +
            e.title +
            '">' +
            "</div>" +
            '<p class="title-text t-hide">' +
            e.title +
            "</p>" +
            "</a>" +
            "</li>";
        });
        $(node).html(str);
      } else {
        console.log(data.msg);
      }
    },
    // 修改补丁
    editPath: function (data) {
      var html = "";
      $.each(data.data, function (i, item) {
        if (i === 0) {
          html +=
            "<tr>" +
            "<td>" +
            item.version +
            "</td>" +
            "<td>" +
            item.size +
            "</td>" +
            "<td>" +
            item.update_time +
            "</td>" +
            "<td>" +
            item.md5 +
            "</td>" +
            '<td><a href="' +
            item.url +
            '" target="_blank" title="HTTP下载">HTTP下载</a> </td>' +
            "</tr>";
        }
      });
      $("#patch").html(html);
    },
    // 修改补丁
    editDownloadInfo: function (data) {
      var pc_full_info = "",
        pc_mini_info = "";

      pc_full_info =
        "<p>" +
        "版本号：" +
        data.pc_full_version +
        "<br>" +
        "文件大小：" +
        data.pc_full_file_size +
        "<br>" +
        "更新日期：" +
        data.pc_full_update_date +
        "<br>" +
        "MD5码：" +
        data.pc_full_md5;
      ("</p>");
      $("#pc_full_info").html(pc_full_info);
      $("#pc_full_download").attr("href", data.pc_full_download_url);
      $("#pc_full_download2").attr("href", data.pc_full_download_url);

      pc_mini_info =
        "<p>" +
        "版本号：" +
        data.pc_mini_version +
        "<br>" +
        "文件大小：" +
        data.pc_mini_file_size +
        "<br>" +
        "更新日期：" +
        data.pc_mini_update_date +
        "<br>" +
        "MD5码：" +
        data.pc_mini_md5;
      ("</p>");
      $("#pc_mini_info").html(pc_mini_info);
      $("#pc_mini_download").attr("href", data.pc_mini_download_url);
      $("#pc_mini_download2").attr("href", data.pc_mini_download_url);

      let qdq_full_info =
        "<p>" +
        "版本号：" +
        data.qdq_version +
        "<br>" +
        "文件大小：" +
        data.qdq_file_size +
        "<br>" +
        "更新日期：" +
        data.qdq_update_date +
        "<br>" +
        // "MD5码：" +
        // data.qdq_md5;
        "</p>";
      $("#qdq_full_info").html(qdq_full_info);
      $("#qdq_download").attr("href", data.qdq_download_url);

      // let yyx_full_info =
      //   "<p>" +
      //   "版本号：" +
      //   data.qdq_version +
      //   "<br>" +
      //   "文件大小：" +
      //   data.qdq_file_size +
      //   "<br>" +
      //   "更新日期：" +
      //   data.qdq_update_date +
      //   "<br>" +
      //   "MD5码：" +
      //   data.qdq_md5;
      // ("</p>");

      let yyx_full_info = "<p>随时随地，一点即玩</p>";

      $("#yyx_full_info").html(yyx_full_info);
      $("#yyx_download").attr("href", data.yyx_download_url);
    },
    onSearchByCatid() {
      var catid = $(".box-keywords").attr("data-activeid");
      //  params.catid 3415 新闻
      if (catid === "3415") {
        g.getNewsList({ page: 1, catid: "3415" });
      }
      //  params.catid 3411 活动
      else if (catid === "3411") {
        g.getActiveList({ page: 1, num: 6, catid: "3411" });
      }
    },
  },
  /**
   * 标题分页搜索-新闻列表tab页
   * @param {number} searchParams.page 页码
   * @param {string} searchParams.q 搜索值
   * @param {number} searchParams.catid 分类id
   *  */
  getNewsList: function (searchParams = {}) {
    var that = this;
    var { page, q, catid } = searchParams || {};
    var nodeContainer = ".page-list-container .page-list-item:eq(1) ul";
    var paginationContainer =
      ".page-list-container .page-list-item:eq(1) .paging-container";

    var argOne = { data: { page, q, catid } };
    var requestEndCb = function (res) {
      //渲染列表
      that.handler.editListNews(nodeContainer, res);
      // 调用分页
      var options = {
        pageDom: paginationContainer,
        num: page,
        total: Math.ceil(res.data.total / 13),
      };
      var pageNumClick = (i) => {
        $.lay.load(1, { content: "加载中，请稍后..." });
        g.getData.getTabListByKeyword(
          { page: i, q, catid },
          function (pageRes) {
            // debugger
            $.lay.close();
            that.handler.editListNews(nodeContainer, pageRes); //渲染列表
            // 滚动到标题处
            g.scrollTab();
          }
        );
      };
      var myPagination = new pagination(options, pageNumClick);
    };
    g.getData.getTabListByKeyword(argOne, requestEndCb);
  },
  /**
   * 标题分页搜索-活动列表tab页
   * @param {number} searchParams.page 页码
   * @param {number} searchParams.num 条数
   * @param {string} searchParams.q 搜索参数
   * @param {number} searchParams.catid 分类id
   *  */
  getActiveList: function (searchParams = {}) {
    var that = this;
    var { page, q, num, catid } = searchParams || {};
    var nodeContainer = ".page-list-container .page-list-item:eq(2) ul";
    var paginationContainer =
      ".page-list-container .page-list-item:eq(2) .paging-container";

    var argOne = { data: { page, q, num, catid } };
    var requestEndCb = function (res) {
      //渲染列表
      that.handler.editListNewsHd(nodeContainer, res);
      // 调用分页
      var options = {
        pageDom: paginationContainer,
        num: page,
        total: Math.ceil(res.data.total / 13),
      };
      var pageNumClick = (i) => {
        $.lay.load(1, { content: "加载中，请稍后..." });
        g.getData.getTabListByKeyword(
          { page: i, q, num, catid },
          function (pageRes) {
            // debugger
            $.lay.close();
            that.handler.editListNewsHd(nodeContainer, pageRes); //渲染列表
            // 滚动到标题处
            g.scrollTab();
          }
        );
      };
      var myPagination = new pagination(options, pageNumClick);
    };
    g.getData.getTabListByKeyword(argOne, requestEndCb);
  },
  timeFormate: function (timeStp, full) {
    var timeObj = $.tools.stampToTime(timeStp);
    var YY = timeObj.YY,
      MM = timeObj.MM,
      DD = timeObj.DD,
      hh = timeObj.hh,
      mm = timeObj.mm,
      ss = timeObj.ss;
    YY = YY;
    MM = $.tools.fixNumer(MM, 2); //将不足两位的数字前面补0补足2位显示
    DD = $.tools.fixNumer(DD, 2);
    hh = $.tools.fixNumer(hh, 2);
    mm = $.tools.fixNumer(mm, 2);
    ss = $.tools.fixNumer(ss, 2);
    if (full == 2) {
      return YY + "-" + MM + "-" + DD;
    } else if (full) {
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
    } else {
      return MM + "-" + DD;
    }
  },
  //判断链接中是否含有/show-
  isExtraUrl: function (url) {
    return url.lastIndexOf("/show-") == -1;
  },
  //判断链接中是否含有 /m/
  isDeviceUrl: function (url) {
    var url = url;
    if (url.lastIndexOf("/m/") != -1) {
      url = url.replace("/m/", "/PC/");
    }
    return url;
  },
  transUrl: function (url) {
    var m = url.match(/show-\d*?-\d*?\S*/);
    if (m) {
      var a = m[0].split("-");
      var catid = a[1],
        aid = a[2];
      url = "detail.html?catid=" + catid + "&id=" + aid;
    }
    return url;
  },
  //tab切换
  cutTab: function (op, cb) {
    var nav = $(op.nav),
      panel = $(op.panel);
    function showTab(i, isCb) {
      nav.removeClass("active").eq(i).addClass("active");
      panel.hide().eq(i).show();
      if (cb && isCb) cb({ i: i, length: nav.length });
    }
    nav.on("click", function () {
      var i = $(this).index();
      showTab(i, true);
    });
    showTab(op.i || 0, false);
  },
  //初始化自定义样式
  initStyle: function (style) {
    var arr = style.split(";"),
      fontStyle = "";
    if (arr.length <= 0) return;
    arr.forEach(function (e, i) {
      if (e.indexOf("#") >= 0) {
        fontStyle += "color: " + e + ";";
      } else if (e == "bold") {
        fontStyle += "font-weight: bold;";
      }
    });
    return fontStyle;
  },
  // 页面滚动
  scrollTab: function (offset) {
    $("html,body").animate(
      {
        scrollTop: 590,
      },
      500
    );
  },
  // 加载首页数据
  initIndex: function () {
    // 公告
    g.getData.getNotice({ callbackName: "indexNotice" }, function (data) {
      g.handler.editGwNotice(data);
    });
    //  接口合并调用 - 轮播5610、头条4209、新闻3415、活动3411、最新活动5611、长期活动5612、新服推荐5657、版本历史5653
    g.getData.getMergeList(
      {
        merge_id:
          "5610|1|10,4209|1|10,3415|1|6,3411|1|6,5611|1|4,5612|1|4,5657|1|1,5653|1|1000",
        callbackName: "indexData",
      },
      function (data) {
        if (data.code == "1") {
          // 轮播 5610
          g.handler.editGwBanner(data.data["5610"].list);
          // 头条 4209
          g.handler.editFrontPage(data.data["4209"].list);
          // 新闻 3415
          g.handler.editGwNews(data.data["3415"].list, 2);
          // 活动 3411
          g.handler.editGwNews(data.data["3411"].list, 3);
          // 最新活动 5611
          g.handler.editGwHd(data.data["5611"].list, 0);
          // 长期活动 5612
          g.handler.editGwHd(data.data["5612"].list, 1);
          // 新服推荐 5657
          g.handler.editNewTj(data.data["5657"].list);
          // 版本历史 5653
          g.handler.editBbList(data.data["5653"].list);
        } else {
          console.log(data.msg);
        }
      }
    );
    // 认证美女
    g.getData.getGirlChoice();
  },
  // 加载详情页数据
  initDetails: function () {
    var that = this;
    (param = $.tools.getRequest()), (type = ""), (href = "");
    if (param.kid && param.kid != "undefined") {
      type = "公告";
      g.getData.getNoticeDetails({ kid: param.kid }, function (data) {
        g.handler.editDetails(data.data);
      });
      href = g.data.catid[0].href;
    } else {
      type = g.data.catid[param.catid].name;
      g.getData.getArticleDetails(
        { catid: param.catid, id: param.id },
        function (data) {
          g.handler.editDetails(data.data[0]);
        }
      );
      href = g.data.catid[param.catid].href + "?catid=" + param.catid;
    }
    g.getData.getArticleList(
      {
        data: {
          catid: 5662,
          page: 1,
          num: 2,
        },
      },
      function (data) {
        that.handler.editDetailsHd(data); //渲染列表
      }
    );
    $(".crumbs-wrap .type-text").text(type).attr("href", href);
  },
  // 列表页-新闻数据加载
  list: function (op) {
    // 列表页 数据加载
    var that = this;
    g.getData.getArticleList(
      {
        data: {
          catid: op.catid,
          page: op.page,
          num: op.num,
        },
      },
      function (obj) {
        // 调用分页
        that.handler.editListNews(op.node, obj); //渲染列表
        var myPagination = new pagination(
          {
            pageDom: op.pagination,
            num: op.page,
            total: Math.ceil(obj.data.total / 13),
          },
          function (i) {
            $.lay.load(1, { content: "加载中，请稍后..." });
            g.getData.getArticleList(
              {
                data: {
                  catid: op.catid,
                  page: i,
                  num: op.num,
                },
              },
              function (obj2) {
                $.lay.close();
                that.handler.editListNews(op.node, obj2); //渲染列表
                // 滚动到标题处
                g.scrollTab();
              }
            );
          }
        );
      }
    );
  },
  // 列表页-活动数据加载
  listHd: function (op) {
    // 列表页 数据加载
    var that = this;
    g.getData.getArticleList(
      {
        data: {
          catid: op.catid,
          page: op.page,
          num: op.num,
        },
      },
      function (obj) {
        // 调用分页
        that.handler.editListNewsHd(op.node, obj); //渲染列表
        var myPagination = new pagination(
          {
            pageDom: op.pagination,
            num: op.page,
            total: Math.ceil(obj.data.total / 13),
          },
          function (i) {
            $.lay.load(1, { content: "加载中，请稍后..." });
            g.getData.getArticleList(
              {
                data: {
                  catid: op.catid,
                  page: i,
                  num: op.num,
                },
              },
              function (obj2) {
                $.lay.close();
                that.handler.editListNewsHd(op.node, obj2); //渲染列表
                // 滚动到标题处
                g.scrollTab();
              }
            );
          }
        );
      }
    );
  },
  //列表页-公告数据加载
  listNotice: function (op) {
    var that = this;
    g.getData.getNotice(
      {
        data: {
          page: op.page || 1,
          num: op.num,
        },
      },
      function (obj) {
        // 调用分页
        that.handler.editListNotice(op.node, obj); //渲染列表
        var myPagination = new pagination(
          {
            pageDom: op.pagination,
            num: op.page,
            total: Math.ceil(obj.data.count / 13),
          },
          function (i) {
            $.lay.load(1, { content: "加载中，请稍后..." });
            g.getData.getNotice(
              {
                data: {
                  page: i,
                  num: op.num,
                },
              },
              function (obj2) {
                $.lay.close();
                that.handler.editListNotice(op.node, obj2); //渲染列表
                // 滚动到标题处
                g.scrollTab();
              }
            );
          }
        );
      }
    );
  },
  //活动列表页-正在进行、长期活动数据加载
  listActivity: function (op) {
    // 列表页 数据加载
    var that = this;
    g.getData.getArticleList(
      {
        data: {
          catid: op.catid,
          page: op.page,
          num: op.num,
        },
      },
      function (obj) {
        // 调用分页
        that.handler.editListActivity(op.node, obj); //渲染列表
        var myPagination = new pagination(
          {
            pageDom: op.pagination,
            num: op.page,
            total: Math.ceil(obj.data.total / 8),
          },
          function (i) {
            $.lay.load(1, { content: "加载中，请稍后..." });
            g.getData.getArticleList(
              {
                data: {
                  catid: op.catid,
                  page: i,
                  num: op.num,
                },
              },
              function (obj2) {
                $.lay.close();
                that.handler.editListActivity(op.node, obj2); //渲染列表
                // 滚动到标题处
                g.scrollTab();
              }
            );
          }
        );
      }
    );
  },
  // 江湖图赏列表页-游戏壁纸、精美原画数据加载
  listPic: function (op) {
    // 列表页 数据加载
    var that = this;
    g.getData.getArticleList(
      {
        data: {
          catid: op.catid,
          page: op.page,
          num: op.num,
        },
      },
      function (obj) {
        // 调用分页
        that.handler.editListPic(op.node, obj); //渲染列表
        var myPagination = new pagination(
          {
            pageDom: op.pagination,
            num: op.page,
            total: Math.ceil(obj.data.total / 13),
          },
          function (i) {
            $.lay.load(1, { content: "加载中，请稍后..." });
            g.getData.getArticleList(
              {
                data: {
                  catid: op.catid,
                  page: i,
                  num: op.num,
                },
              },
              function (obj2) {
                $.lay.close();
                that.handler.editListPic(op.node, obj2); //渲染列表
                // 滚动到标题处
                g.scrollTab();
              }
            );
          }
        );
      }
    );
  },
  // 下载页数据加载
  download: function () {
    // 补丁
    g.getData.downloadBd();
    // cms
    g.getData.downloadCms();
  },
  // 切换历史版本
  cutBbList: function (op) {
    var $sjCon = $(".sj-wrap-container");
    $(".sj-more").on("click", function (e) {
      e.stopPropagation();
      $sjCon.addClass("on");
      $(".sj-wrap-container ul")
        .css("margin-top", "0px")
        .parent()
        .animate({ scrollTop: $sjCon.attr("data-top") + "px" }, 0);
      // 点击其他地方关闭更多版本列表
      $("html,body").one("click", function () {
        var idx = $(".sj-list-container ul li.active").index(),
          length = $sjCon.find("ul li").length;
        h = idx * 38;
        if (h > 38 * (length - 4)) h -= 38 * 3;
        $sjCon
          .attr("data-top", h)
          .animate({ scrollTop: 0 }, 0)
          .find("ul")
          .css("margin-top", -h + "px");
        $sjCon.removeClass("on");
      });
    });
    // 版本切换
    $(".sj-list-container ul").on("click", ".sj-item", function (e) {
      e.stopPropagation();
      var $this = $(this),
        idx = $this.index();
      (name = $this.find("p").text()),
        (url = $this.attr("data-url")),
        (img = $this.attr("data-img"));
      $this.addClass("active").siblings("li").removeClass("active");
      $(".sj-img").attr("href", url).find("img").attr({ src: img, alt: name });
    });
  },
  // 门派切换
  cutMp: function () {
    var mp = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
      ],
      idx = 13, // 调整为默认显示为新门派 一品堂
      $sxList = $(".sx-plank-list .sx-plank-item"),
      $sxBtnList = $(".sx-list li");
    function cutMp(idx) {
      $sxBtnList.removeClass("active").eq(mp[idx][0]).addClass("active");
      $sxList
        .hide()
        .find(".mp-select-list a")
        .removeClass("active")
        .end()
        .find(".mp-list .mp-item")
        .hide();
      $sxList
        .eq(mp[idx][0])
        .show()
        .find(".mp-select-list a")
        .eq(mp[idx][1])
        .addClass("active")
        .end()
        .end()
        .find(".mp-list .mp-item")
        .eq(mp[idx][1])
        .show();
    }
    cutMp(idx);
    // 五属性切换
    $sxBtnList.on("click", function () {
      idx = parseInt($(this).attr("data-num"));
      cutMp(idx);
    });
    // 门派点击切换
    $(".mp-select-list a").on("click", function () {
      idx = parseInt($(this).attr("data-num"));
      cutMp(idx);
    });
    // 上一页 下一页
    $(".mp-container .btn-prev").on("click", function () {
      idx--;
      if (idx < 0) idx = mp.length - 1;
      cutMp(idx);
    });
    $(".mp-container .btn-next").on("click", function () {
      idx++;
      if (idx >= mp.length) idx = 0;
      cutMp(idx);
    });
  },
  //内页切换
  pageCutTitle: function () {
    g.cutTab(
      {
        nav: ".menu-list li",
        panel: ".page-list-container .page-list-item",
        i: 0,
      },
      function (o) {
        var pageName = $(".menu-list li").eq(o.i).find("a").text();
        $(".crumbs-wrap .active").text(pageName);
        //  设置新闻中心查询分类
        if (location.pathname.indexOf("news.html") != -1) {
          var catid = $(".menu-list .menu-item.fl.active").data("id");
          var catidStr = String(catid);
          var currentActiveId = $(".box-keywords").attr("data-activeid");
          console.log({ catidStr, currentActiveId });
          if (catidStr === currentActiveId) return;
          $(".box-keywords").attr("data-activeid", catidStr);
          $(".box-keywords-input").val("");
          // console.log({
          //   catidStr,
          //   currentActiveId: $(".box-keywords").attr("data-activeid"),
          // });
          catidStr === "3414"
            // 当前代码使用的是 jQuery 的 hide() 方法，这是通过修改元素的 style 属性（display: none）来隐藏元素
            ? $(".box-keywords").hide()
            : $(".box-keywords").show();

          // 切换tab重新请求
          if (catidStr === "3414") {
            g.listNotice({
              page: 1, //当前页
              num: 13, //每页数据条数
              node: ".page-list-container .page-list-item:eq(0) ul", //列表容器
              pagination:
                ".page-list-container .page-list-item:eq(0) .paging-container", //分页容器
            });
          } else if (catidStr === "3415") {
            console.log("新闻查询");
            g.getNewsList({ page: 1, catid });
          } else if (catidStr === "3411") {
            g.getActiveList({ page: 1, num: 6, catid });
          }
        }
      }
    );
  },
  //内页导航定位
  pageNavDw: function (type) {
    var idx = 0;
    // 监听页面是否从子页返回
    window.addEventListener(
      "pageshow",
      function (event) {
        // 是 则拉取本地存储 当前tab选中值
        if (
          event.persisted ||
          (window.performance && window.performance.navigation.type == 2)
        ) {
          idx = window.localStorage.getItem(type) || 0;
        } else {
          // 否 则拉取拉取 地址栏tab选中值
          g[type] = {};
          var catid = $.tools.getParam("catid");
          if (catid) {
            g[type].catid = catid;
            idx =
              g.data.catid[g[type].catid].idx &&
              g.data.catid[g[type].catid].idx;
          }
        }
        $(".menu-list li").eq(idx).click();
      },
      false
    );
  },
  // 二维码轮播
  codeSwiper: function () {
    g.swiperCode = new Swiper("#codeLunbo", {
      speed: 500,
      loop: true,
      initialSlide: 0,
      autoplay: 3000,
      noSwiping: true,
      autoplayDisableOnInteraction: false,
      pagination: "#codePaging",
      paginationClickable: true,
    });
    $(".cut-show-btn").on("click", function () {
      var $this = $(this);
      if ($this.hasClass("on")) {
        $this.removeClass("on");
        $this.parent().animate(
          {
            right: "-154px",
          },
          500
        );
      } else {
        $this.addClass("on");
        $this.parent().animate(
          {
            right: "0",
          },
          500
        );
      }
    });
  },
  // 监听视频加载完成
  // loadedVideo: function(){
  //     var myVideo = $("#bgVideo")[0];
  //     myVideo.addEventListener("canplaythrough", function () {
  //         setTimeout(function(){
  //             $('.video-container').show();
  //         }, 200);
  //     });
  // },
  // 获取随机数
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  //  所有页面的初始化入口通过 body的page属性值去判断当前是哪个页面
  init: function () {
    // 地址栏参数
    var param = $.tools.getRequest();
    //二维码轮播
    g.codeSwiper();

    switch ($("body").attr("page")) {
      // 首页
      case "index": {
        // g.loadedVideo();
        //广告轮播图
        g.swiperLunbo = new Swiper("#swiperlunbo", {
          speed: 700,
          loop: true,
          initialSlide: 0,
          autoplay: 3000,
          noSwiping: true,
          autoplayDisableOnInteraction: false,
          pagination: "#palunbo",
          paginationClickable: true,
          onInit: function (swiper) {
            // 数量大于1 自动切换
            if (swiper.count > 1) {
              swiper.startAutoplay();
              $("#palunbo").show();
            } else {
              swiper.stopAutoplay();
              $("#palunbo").hide();
            }
          },
        });
        $("#swiperlunbo").hover(
          function () {
            g.swiperLunbo.stopAutoplay();
          },
          function () {
            g.swiperLunbo.startAutoplay();
          }
        );
        // 新闻资讯切换
        g.cutTab({
          nav: ".news-menu li",
          panel: ".news-list-container .news-list-item",
          i: 0,
        });
        // 查看更多
        $(".news-wrap .btn-more").on("click", function () {
          var catid = $(".news-wrap .news-menu li.active").attr("data-catid");
          window.open("news.html?catid=" + catid);
        });
        // 热门活动切换
        g.cutTab({
          nav: ".hd-hot .hd-menu li",
          panel: ".hd-list-container .hd-list-item",
          i: 0,
        });
        // 江湖图赏切换
        g.cutTab({
          nav: ".hd-ts .hd-menu li",
          panel: ".ts-list-container .hd-list",
          i: 0,
        });
        //合作伙伴轮播
        g.swiperLink = new Swiper("#linkLunbo", {
          speed: 500,
          loop: true,
          slidesPerView: 4,
          initialSlide: 0,
          autoplay: 3000,
          noSwiping: true,
          autoplayDisableOnInteraction: false,
        });
        $(".btn-link-prev").on("click", function () {
          g.swiperLink.swipePrev();
        });
        $(".btn-link-next").on("click", function () {
          g.swiperLink.swipeNext();
        });
        // 切换门派
        g.cutMp();
        // 切换历史版本
        g.cutBbList();
        // 加载首页数据
        g.initIndex();
        break;
      }
      // 新闻中心
      case "news": {
        // 新闻资讯切换
        g.pageNavDw("news");
        g.pageCutTitle();
        // 公告、新闻、活动
        var catidArr = ["", "3415", "3411"];
        // 调用分页
        catidArr.forEach(function (ev, idx) {
          if (idx == 0) {
            g.listNotice({
              page: 1, //当前页
              num: 13, //每页数据条数
              node: ".page-list-container .page-list-item:eq(0) ul", //列表容器
              pagination:
                ".page-list-container .page-list-item:eq(0) .paging-container", //分页容器
            });
          } else if (idx == 1) {
            g.getNewsList({ page: 1, catid: ev });
            //拉取新闻数据
            // g.list({
            //   catid: ev,
            //   page: 1, //当前页
            //   num: 13, //每页数据条数
            //   node: ".page-list-container .page-list-item:eq(" + idx + ") ul", //列表容器
            //   pagination:
            //     ".page-list-container .page-list-item:eq(" +
            //     idx +
            //     ") .paging-container", //分页容器
            // });
          } else if (idx == 2) {
            g.getActiveList({ page: 1, num: 6, catid: ev });
            //拉取活动数据
            // g.listHd({
            //   catid: ev,
            //   page: 1, //当前页
            //   num: 6, //每页数据条数
            //   node: ".page-list-container .page-list-item:eq(" + idx + ") ul", //列表容器
            //   pagination:
            //     ".page-list-container .page-list-item:eq(" +
            //     idx +
            //     ") .paging-container", //分页容器
            // });
          }
        });
        break;
      }
      // 热门活动
      case "activity": {
        // 热门活动切换
        g.pageNavDw("activity");
        g.pageCutTitle();
        // 正在进行、长期活动
        var catidArr = [3411, 5611, 5612];
        catidArr.forEach(function (ev, idx) {
          if (idx == 0) {
            //拉取活动数据
            g.listHd({
              catid: ev,
              page: 1, //当前页
              num: 6, //每页数据条数
              node: ".page-list-container .page-list-item:eq(" + idx + ") ul", //列表容器
              pagination:
                ".page-list-container .page-list-item:eq(" +
                idx +
                ") .paging-container", //分页容器
            });
          } else {
            //拉取活动数据
            g.listActivity({
              catid: ev,
              page: 1, //当前页
              num: 8, //每页数据条数
              node: ".page-list-container .page-list-item:eq(" + idx + ") ul", //列表容器
              pagination:
                ".page-list-container .page-list-item:eq(" +
                idx +
                ") .paging-container", //分页容器
            });
          }
        });
        break;
      }
      // 江湖图赏
      case "pic": {
        // 江湖图赏切换
        g.pageNavDw("pic");
        g.pageCutTitle();
        // 游戏壁纸/精美原画
        var catidArr = [3436, 3437];
        catidArr.forEach(function (ev, idx) {
          g.listPic({
            catid: ev,
            page: 1, //当前页
            num: 12, //每页数据条数
            node: ".page-list-container .page-list-item:eq(" + idx + ") ul", //列表容器
            pagination:
              ".page-list-container .page-list-item:eq(" +
              idx +
              ") .paging-container", //分页容器
          });
        });
        break;
      }
      // 详情页
      case "details": {
        // 加载详情页数据
        g.initDetails();
      }
      // 下载页
      case "download": {
        // 江湖图赏切换
        g.pageCutTitle();
        // 下载页数据加载
        g.download();
        break;
      }
    }
  },
};

$(function () {
  // 初始化
  g.init();
});
