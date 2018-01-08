function Page() {
	this.headerContainer = $(".js-mountPoint_header");
	this.bannerContainer = $(".js-mountPoint_banner")
}
//首页入口文件
$.extend(Page.prototype, {
	init: function() {
		this.createHeader();
		this.createBanner();
	},

	createHeader: function() {
		this.header = new Header(this.headerContainer, 0);
	},

	createBanner: function() {
		this.banner = new Banner(this.bannerContainer)
	}
})