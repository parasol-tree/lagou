function Pagination(paginationContainer) {
	this.paginationContainer = paginationContainer;
	this.init();
}

$.extend(Pagination.prototype, {
	init: function() {
		this.bindEvents();
	},

	setTotalPage: function(totalPage) {
		this.createDom(totalPage);
	},

	createDom: function(totalPage) {
		this.paginationBtn = "";
		for(this.i = 1; this.i <= totalPage; this.i++) {
			this.paginationBtn += `<li><a href="javascript:;">${this.i}</a></li>`;
		}
		this.paginationContainer.html(this.paginationBtn);
		// console.log(this.paginationBtn)
	},

	bindEvents: function() {
		this.paginationContainer.on("click", $.proxy(this.handlePaginationBtnClick, this))
	},

	handlePaginationBtnClick: function(e) {
		this.target = $(e.target);
		this.whichPage = parseInt(this.target.text(), 10);
		$(this).trigger(new $.Event("triggerWhichPage", {
			whichPage: this.whichPage,
		}))
	}
})