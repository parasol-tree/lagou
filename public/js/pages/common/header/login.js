function Login(modalContainer, registerLoginBtnContainer) {
	this.modalContainer = modalContainer;
	this.registerLoginBtnContainer = registerLoginBtnContainer;
	this.init();
}

Login.btnTemplate = `
	<li>
		<a href='javascript:;' data-toggle='modal' data-target='.js-loginModal'>
			登陆
		</a>
	</li>
`;

Login.modalTempLate = `
<!--登陆模态框-->
	<div class="modal fade js-loginModal" tabindex="-1" role="dialog" aria-loginby="loginLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="loginLabel">登陆</h4>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
	            <label for="js-username" class="control-label">用户名</label>
	            <input type="text" class="form-control" id="js-username">
	          </div>
	          <div class="form-group">
	            <label for="js-password" class="control-label">密码</label>
	            <input type="text" class="form-control" id="js-password">
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" class="btn btn-primary js-loginBtn">登陆</button>
	      </div>
	    </div>

			<div class="alert hide alert-success" id="successNotice" style="margin:20px;">恭喜您登录成功！</div>
      <div class="alert hide alert-danger" id="errorNotice" style="margin:20px;">sorry, 用户名或者密码错误</div>

	  </div>
	</div>
`;

$.extend(Login.prototype, {
	init: function() {
		this.createBtn();
		this.createModal();
		this.bindEvents();
	},

	createBtn: function() {
		this.loginBtn = $(Login.btnTemplate);
		this.registerLoginBtnContainer.append(this.loginBtn);
	},

	createModal: function() {
		this.LoginModalElem = $(Login.modalTempLate);
		this.modalContainer.append(this.LoginModalElem);
	},

	bindEvents: function() {
		this.loginBtn = this.LoginModalElem.find(".js-loginBtn");
		// console.log(this.loginBtn)
		this.loginBtn.on("click", $.proxy(this.handleLoginBtnClick, this));
	},

	handleLoginBtnClick: function() {
		var username = this.LoginModalElem.find("#js-username").val();
				password = this.LoginModalElem.find("#js-password").val();
		$.ajax({
			url: '/api/login',
			type: 'post',
			data: {
				username: username,
				password: password
			},
			success: $.proxy(this.handleLoginSucc, this)
		})
	},

	handleLoginSucc: function(results) {
		if (results && results.ret && results.data && results.data.login) {
			window.location.reload();
		} else {
			alert("用户名密码错误")
		}
	}
})