function Pagination(paginationContainer) {
	this.paginationContainer = paginationContainer;
	this.init();
}

$.extend(Pagination.prototype, {
	init: function() {
		this.bindEvents();
	},

	//由candidateList.jstrigger的事件启动这个函数
	setTotalPage: function(totalPage) {
		this.createDom(totalPage);
	},

	createDom: function(totalPage) {
		this.paginationBtn = "";
		for(this.i = 1; this.i <= totalPage; this.i++) {
			this.paginationBtn += `<li><a href="javascript:;">${this.i}</a></li>`;
		}
		this.paginationContainer.html(this.paginationBtn);
	},

	bindEvents: function() {
		this.paginationContainer.on("click", $.proxy(this.handlePaginationBtnClick, this))
	},

	handlePaginationBtnClick: function(e) {
		this.target = $(e.target);
		this.whichPage = parseInt(this.target.text(), 10);
		//页码分页拿到没什么用,得暴露出去告诉 candidateList.js 来渲染该页的数据
		$(this).trigger(new $.Event("triggerWhichPage", {
			whichPage: this.whichPage,
		}))
	}
})