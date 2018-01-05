function Register(modalContainer, registerLoginBtnContainer) {
	this.modalContainer = modalContainer;
	this.registerLoginBtnContainer = registerLoginBtnContainer;
	this.init();
}

Register.btnTemplate = `
	<li>
		<a href='#' data-toggle='modal' data-target='.js-registerModal'>
			注册
		</a>
	</li>
`;

Register.modalTempLate = `
<!--注册模态框-->
	<div class="modal fade js-registerModal" tabindex="-1" role="dialog" aria-labelledby="registerLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="registerLabel">注册</h4>
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
	        <button type="button" class="btn btn-primary js-registerBtn">提交</button>
	      </div>

	      <div class="alert hide alert-success js-registerSuccessNotice" role="alert" style="margin:15px;">注册成功</div>
	      <div class="alert hide alert-danger js-registerDefeatNotice" role="alert" style="margin:15px;">注册失败,用户已被使用</div>

	    </div>
	  </div>
	</div>
`;

$.extend(Register.prototype, {
	init: function() {
		this.createBtn();
		this.createModel();
		this.bindEvents();
	},

	createBtn: function() {
		this.registerBtn = $(Register.btnTemplate);
		this.registerLoginBtnContainer.append(this.registerBtn);
	},

	createModel: function() {
		this.registerModalElem = $(Register.modalTempLate);
		this.modalContainer.append(this.registerModalElem);
		/*
		Obtain to the elements of a registration notice After creating the model
		创建完模型后直接获取注册通知的DOM	☟☟☟
		*/
		this.registerSuccessNoticeElem = this.registerModalElem.find(".js-registerSuccessNotice")
		this.registerDefeatNoticeElem = this.registerModalElem.find(".js-registerDefeatNotice")
	},

	bindEvents: function() {
		this.registerBtn = this.registerModalElem.find(".js-registerBtn");
		this.registerBtn.on("click", $.proxy(this.handleRegisterBtnClick, this));
	},

	handleRegisterBtnClick: function() {
		var username = this.registerModalElem.find("#js-username").val();
				password = this.registerModalElem.find("#js-password").val();
		// console.log(username, password);
		$.ajax({
			url: '/api/register',
			type: 'post',
			data: {
				username: username,
				password: password
			},
			success: $.proxy(this.handleRegisterSucc, this),
			error: $.proxy(this.handleRegisterDefeat, this)
		})
	},

	handleRegisterSucc: function(res) {
		if (res && res.ret && res.data && res.data.register) {
			this.registerSuccessNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleSuccessModelHide, this), 2000);
		} else {
			this.registerDefeatNoticeElem.removeClass("hide");
			setTimeout($.proxy(this.handleDeaeatModelHide, this), 2000);
		}
	},

	handleSuccessModelHide: function() {
		this.registerSuccessNoticeElem.addClass("hide");
		this.registerModalElem.modal("hide");
	},

	handleDeaeatModelHide: function() {
		this.registerDefeatNoticeElem.addClass("hide");
	},

	handleRegisterDefeat: function(XMLHttpRequest, textStatus, errorThrown) {
		alert("errMessage:" + XMLHttpRequest.status + " " + errorThrown);
	}
})