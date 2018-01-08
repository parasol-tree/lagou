function Logout(container, username) {
	this.container = container;
	this.username = username;
	this.init();
}

Logout.Template = `
	<li>
		<a href="javascript:;" class="js-onLineUsername"></a>
	</li>
	<li>
		<a href='javascript:;' class="js-lououtBtn">退出</a>
	</li>
`;

$.extend(Logout.prototype, {
	init: function() {
		// alert(0)
		this.createDom();
		this.bindEvents();
	},

	createDom: function() {
		/*this.lououtBtn = $(Logout.Template);
		this.container.append(this.lououtBtn);
		this.usernameElem = this.lououtBtn.find(".js-onLineUsername");
		this.usernameElem.text(this.username);*/

		this.elem = $(Logout.Template);
		this.container.append(this.elem)
		this.lououtBtn = this.elem.find(".js-lououtBtn")
		this.usernameElem = this.elem.find(".js-onLineUsername");
		this.usernameElem.text(this.username);
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