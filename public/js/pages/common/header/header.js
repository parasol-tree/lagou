function Header(container, whichPageShow) {
	this.container = container;
	this.whichPageShow = whichPageShow;
	this.init();
}

Header.tempLate = `
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="/">拉钩网后台管理系统</a>
	    </div>
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav js-whichPage">
	        <li>
	        	<a href="/">首页</a>
	        </li>
	        <li>
	        	<a href="/list.html">职位管理</a>
	        </li>
	        <li>
	        	<a href="/candidate.html">候选人管理</a>
	        </li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right registerLoginBtnContainer">
	      </ul>
	    </div>
	  </div>
	</nav>
`;

$.extend(Header.prototype, {
	init: function() {
		this.createDom();
		this.setWhichPage();
		this.getLoginInfo();
	},

	createDom: function() {
		this.elem = $(Header.tempLate);
		this.container.append(this.elem);
		this.registerLoginBtnContainer = this.elem.find(".registerLoginBtnContainer");
		// console.log(this.registerLoginBtnContainer)
	},

	setWhichPage: function() {
		this.whichPage = this.elem.find(".js-whichPage");
		this.whichPageShowLi = this.whichPage.find("li");
		this.whichPageShowLi.eq(this.whichPageShow).addClass("active")
	},

	getLoginInfo: function() {
		$.ajax({
			url: "api/whetherLogin",
			success: $.proxy(this.handleGetLoginInfoSuccess, this)
		})
	},

	handleGetLoginInfoSuccess: function(res) {
		if (res && res.data && res.data.whetherLogin) {
			this.createLogout(res.data.username);
		} else {
			this.createRegister();
			this.createLogin();
		}
	},

	createRegister: function() {
		this.register = new Register(this.elem, this.registerLoginBtnContainer);
	},

	createLogin: function() {
		this.login = new Login(this.elem, this.registerLoginBtnContainer);
	},

	createLogout: function(username) {
		// console.log(username)
		this.logout = new Logout(this.registerLoginBtnContainer, username);
	}
})