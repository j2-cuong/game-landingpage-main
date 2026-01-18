function pagination(op, cb){
    this.pageDom = $(op.pageDom);//分页容器
    this.num = op.num || 1; //初始页
    this.total = op.total || 0; //总页数
    this.pageNum = op.pageNum || 15; //每页显示条数
    this.isFirstBtn = op.isFirstBtn || true;// 是否开启首页按钮
    this.isLastBtn = op.isLastBtn || true;// 是否开启末页按钮
    if(cb)this.cb = cb;
    this.init();
}

pagination.prototype = {
    init: function(){
        var that = this;
        that.pageDom.html('');
        that.btnPrev();
        if( that.pageList )that.pageList();
        that.btnNext();
    },
    btnPrev: function(){
        var that = this,
            btnPrev = document.createElement('a');
        btnPrev.innerText = '上一页';
        btnPrev.className = 'btn-prev';
        if(this.num > 1){
            btnPrev.onclick = function(){
                var num = parseInt(that.num) - 1;
                that.goPage(num);
            }
        }else {
            btnPrev.className = 'btn-prev disabled';
        }
        that.pageDom.append(btnPrev);
    },
    btnNext: function(){
        var that = this,
            btnNext = document.createElement('a');
        btnNext.innerText = '下一页';
        btnNext.className = 'btn-next';
        if(that.num < that.total){
            btnNext.onclick = function(){
                var num = parseInt(that.num) + 1;
                that.goPage(num);
            }
        }else {
            btnNext.className = 'btn-next disabled';
        }
        that.pageDom.append(btnNext);
    },
    pageList: function(){
        var that = this,
            list = '',
            num = this.num - 3;
        if(num<1)num=1;
        if(that.isFirstBtn && num > 1)list += '<a class="btn-num" data-idx="1">1</a><a class="disabled">...</a>';
        for(var i=num;i<=num+6&&i<=this.total;i++){
            if(i == that.num){
                list += '<a class="btn-num active disabled" data-idx="'+ i +'">'+ i +'</a>';
            }else {
                list += '<a class="btn-num" data-idx="'+ i +'">'+ i +'</a>';
            }
        }
        if(that.isFirstBtn && num+6 < that.total)list += '<a class="disabled">...</a><a class="btn-num" data-idx="'+ that.total +'">'+ that.total +'</a>';
        that.pageDom.append(list);
        that.pageDom.unbind().on("click", '.btn-num', function(){
            var $this = $(this),
                i = parseInt($this.attr('data-idx'));
            that.goPage(i);
        });
    },
    goPage: function(num){
        var that = this;
        that.num = num;
        that.init();
        if(that.cb)that.cb(that.num);
    }
}