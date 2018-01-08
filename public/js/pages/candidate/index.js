function Page() {
	this.container = $(".js-mountPoint_header");
}
//列表页
$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
		this.createAddCandidate();
		this.createCandidateList();
		this.createPagination();
	},

	createHeader: function() {
		this.header = new Header(this.container, 2);
	},

	createAddCandidate: function() {
		this.addCandidateBtnContainer = $(".js-mountPoint_addCandidateBtn");
		this.addCandidate = new AddCandidate(this.addCandidateBtnContainer)
		$(this.addCandidate).on("afreshGetCandidateData", $.proxy(this.handleAfreshGetCandidateData, this));
	},
//添加信息后,让list页重新渲染DOM
	handleAfreshGetCandidateData: function() {
		this.candidateList.getCandidatesData();
	},

	createCandidateList: function() {
		this.candidateListContainer = $(".js-mountPoint_candidateList");
		this.candidateList = new CandidateList(this.candidateListContainer);
		$(this.candidateList).on("triggerTotalPage", $.proxy(this.handleTriggerTotalPage, this))
	},

	createPagination: function() {
		this.paginationContainer = $(".js-mountPoint_pagination");
		this.pagination = new Pagination(this.paginationContainer);
		$(this.pagination).on("triggerWhichPage", $.proxy(this.handleTriggerWhichPage, this))
	},

	handleTriggerTotalPage: function(e) {
		// console.log(e.totalPage)
		this.pagination.setTotalPage(e.totalPage);
	},

	handleTriggerWhichPage: function(e) {
		this.candidateList.setWhichPageShow(e.whichPage);
	}
})