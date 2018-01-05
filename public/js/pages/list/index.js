function Page() {
	this.container = $(".js-mountPoint_header");
}
//列表页
$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
		this.createPositionManagement();
		this.createPositionList();
		this.createPagination();
	},

	createHeader: function() {
		this.header = new Header(this.container, 1);
	},

	createPositionManagement: function() {
		this.addPositionBtnContainer = $(".js-mountPoint_addPositionBtn");
		this.positionManagementContainer = $(".js-mountPoint_positionManagement");
		this.positionManagement = new PositionManagement(this.addPositionBtnContainer, this.positionManagementContainer)
		$(this.positionManagement).on("afreshGetPositionData", $.proxy(this.handleAfreshGetPositionData, this));
	},

	handleAfreshGetPositionData: function() {
		this.positionList.getPositionData();
	},

	createPositionList: function() {
		this.positionListContainer = $(".js-mountPoint_positionList");
		this.positionList = new PositionList(this.positionListContainer);
		$(this.positionList).on("triggerTotalPage", $.proxy(this.handleTriggerTotalPage, this))
	},

	createPagination: function() {
		this.paginationContainer = $(".js-mountPoint_pagination");
		this.pagination = new Pagination(this.paginationContainer);
		$(this.pagination).on("triggerWhichPage", $.proxy(this.handleTriggerWhichPage, this))
	},

	handleTriggerTotalPage: function(e) {
		this.pagination.setTotalPage(e.totalPage);
	},

	handleTriggerWhichPage: function(e) {
		this.positionList.setWhichPageShow(e.whichPage, e.li);
	}
})