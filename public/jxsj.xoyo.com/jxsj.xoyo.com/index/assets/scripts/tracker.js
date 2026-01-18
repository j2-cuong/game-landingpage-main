function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
    function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
    window.stReportGlobal023MultiProps = function (_ref) {
        var eventName = _ref.eventName,
          eventDescription = _ref.eventDescription,
          props = _objectWithoutProperties(_ref, ["eventName", "eventDescription"]);
        try {
            StReportSdk023Report.report({
                eventName: eventName,
                projectIdentifier: 'jxsj2',
                eventDescription: eventDescription,
                eventTags: ['jxsj2', 'pc'], //埋点标签
                eventGroup: 'jxsj2_gw_download_pc_20230515',  //埋点的组名
                eventDataValue: {
                    title: props.title ? props.title : undefined,
                    status: props.status ? props.status : undefined,
                    ev_status_reason: props.ev_status_reason ? props.ev_status_reason : undefined,
                    passport_uid: props.passport_uid ? props.passport_uid : undefined,
                    passport: props.passport ? props.passport : undefined,
                    td_pl: StReportSdk023.getDiffRouteTime(),
                }
            });
        } catch (e) {
            setTimeout(function(){
                throw e;
            });
        }
    };
    /**
     *
     * @param eventName  事件名称，对应统计文档ev_n
     * @param eventDescription 事件描述，对应统计文档ev_desc
     * @param ret_code 错误提示码,常用于后端接口返回的错误状态码，如 -20001
     * @param ret_msg 错误提示文案，常用于后端接口返回错误描述，如： XX失败
     */
    /**
     * 调用方法，比如： window.stReportGlobal('load_page','页面加载');
     */
    var StReportSdk023Report = StReportSdk023.getInstance('jxsj2_gw_download_pc_20230515'); //埋点的组名
    window.stReportGlobal023MultiProps({eventName: 'load_page_start', eventDescription: '页面加载(默认上报，进入页面就上报)'});
    $(function () {
        $(window).load(function () {
            window.stReportGlobal023MultiProps({eventName: 'load_page', eventDescription: '页面加载(默认上报，页面全部加载完才上报)'});
        });
        $(window).unload(function () {
            window.stReportGlobal023MultiProps({eventName: 'page_leave', eventDescription: '离开页面(默认上报)'});
        });
        // 在需要发送统计信息的逻辑代码中添加发送统计信息 - Start
        // window.stReportGlobal023MultiProps({
        //     eventName: 'click_submit',  //事件名称，对应需求方提供的事件列表中的字段（必须要对应）
        //     eventDescription: '确认提交投稿',  // 事件名称，对应需求方提供的事件列表中的字段（一般情况下是要对应的）
        //     passport: '',  //如果有就传加,没有就不加这个属性
        //     passport_uid: '' // 如果有就加,没有就不加这个属性
        // });
        // 在需要发送统计信息的逻辑代码中添加发送统计信息 - End
        //埋点DEMO -Start
        // 给需要添加统计的按钮添加样式J_tongjiBtn，然后增加属性data-eventName，和data-eventDesc，这2个参数都需要向需求方要埋点数据的表格。
        $('.J_tongjiBtn').on('click', function () {
            var eventName = $(this).attr('data-eventName'),
              eventDesc = $(this).attr('data-eventDesc'),
              title = $(this).attr('data-title');
            window.stReportGlobal023MultiProps({eventName: eventName, eventDescription: eventDesc, title: title});
        });
        //埋点DEMO -End
    })
