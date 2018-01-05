function Page() {
	this.container = $(".js-mountPoint_header");
}
//首页入口文件
$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
	},

	createHeader: function() {
		this.header = new Header(this.container, 0);
	}
})