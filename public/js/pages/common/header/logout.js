function Logout(container) {
	this.container = container;
	this.init();
}

Logout.btnTemplate = `
	<li>
		<a href='javascript:;'>退出</a>
	</li>
`;

$.extend(Logout.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},

	createDom: function() {
		this.lououtBtn = $(Logout.btnTemplate);
		this.container.append(this.lououtBtn);
	},

	bindEvents: function() {
		this.lououtBtn.on("click", $.proxy(this.handleLououtBtnClick, this));
	},

	handleLououtBtnClick: function() {
		$.ajax({
			url: "/api/logout",
			success: $.proxy(this.handleLououtSuccess, this)
		})
	},

	handleLououtSuccess: function(res) {
		if (res && res.ret && res.data && res.data.logout) {
			window.location.reload();
		}
	}
})