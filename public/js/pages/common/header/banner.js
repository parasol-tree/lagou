function Banner(bannerContainer) {
	this.bannerContainer = bannerContainer;
	this.init();
}

Banner.tempLate = `
	<div class="jumbotron">
	  <h1>欢迎</h1>
	  <p>使用后台管理系统</p>
	  <a href="https://www.lagou.com/?utm_source=m_cf_cpt_baidu_pc" target="_blank"" class="btn btn-primary btn-lg" role="button">Learn more</a>
	</div>
`;

$.extend(Banner.prototype, {
	init: function() {
		this.createDom();
	},

	createDom: function() {
		this.bannerElem = $(Banner.tempLate);
		this.bannerContainer.append(this.bannerElem);
	}
})