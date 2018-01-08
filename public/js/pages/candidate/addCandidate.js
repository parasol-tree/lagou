function AddCandidate(addCandidateBtnContainer) {
	this.addCandidateBtnContainer = addCandidateBtnContainer;
	this.init();
}

AddCandidate.addCandidateBtnTempLate = `
	<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target=".js-candidateModal" data-whatever="@mdo">增加候选人</button>
`;

AddCandidate.modalFrameTempLate = `
<div class="modal fade js-candidateModal" tabindex="-1" role="dialog" aria-labelledby="candidateModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="candidateModalLabel">候选人管理</h4>
      </div>
      <div class="modal-body">
					<form>
			    	<div class="form-group">
			        	<label for="position-name" class="control-label">职位名称</label>
			        	<input type="text" class="form-control js-positionName" id="position-name" placeholder="请输入职位名称">
			    	</div>
			    	<div class="form-group">
			        	<label for="name" class="control-label">姓名</label>
			        	<input type="text" class="form-control js-name" id="position-name" placeholder="请输入姓名">
			    	</div>
      			<div class="form-group">
		        	<label for="sex" class="control-label">请选择性别</label>
		        	<select id="sex" class="form-control js-sex">
                <option>男</option>
                <option>女</option>
							</select>
		    		</div>
		    		<div class="form-group">
		        	<label for="salary" class="control-label">薪资范围</label>
		        	<select id="salary" class="form-control js-salary">
                <option>5k~10k</option>
                <option>10k~20k</option>
                <option>20k~25k</option>
                <option>35k+</option>
							</select>
		    		</div>
        	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary js-submitBtn">确认提交</button>
      </div>

			<div class="alert hide alert-success js-successNotice" style="margin:20px;">恭喜您添加职位成功！</div>
      <div class="alert hide alert-danger js-errorNotice" style="margin:20px;"></div>

    </div>
  </div>
</div>
`;

$.extend(AddCandidate.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
	},

	createDom: function() {
		this.createBtn();
		this.createModalFrame();
		this.successNotice = this.modalFrameElem.find(".js-successNotice");
		this.errorNotice = this.modalFrameElem.find(".js-errorNotice");
	},

	createBtn: function() {
		this.BtnElem = $(AddCandidate.addCandidateBtnTempLate);
		this.addCandidateBtnContainer.append(this.BtnElem);
	},

	createModalFrame: function() {
		this.modalFrameElem = $(AddCandidate.modalFrameTempLate);
		this.addCandidateBtnContainer.append(this.modalFrameElem);
	},

	bindEvents: function() {
		this.submitBtn = this.modalFrameElem.find(".js-submitBtn");
		this.submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
	},

	handleSubmitBtnClick: function() {
		var position = this.modalFrameElem.find(".js-positionName").val(),
		    name = this.modalFrameElem.find(".js-name").val(),
		    sex = this.modalFrameElem.find(".js-sex").val(),
		    salary = this.modalFrameElem.find(".js-salary").val();

		$.ajax({
			url: 'api/addCandidate',
			type: 'post',
			data: {
				position: position,
				name: name,
				sex: sex,
				salary: salary
			},
			success: $.proxy(this.handleAddCandidateSuccess, this),
			error: $.proxy(this.handleAddCandidateDefeat, this)
		})
	},

	handleAddCandidateSuccess: function(res) {
		if (res && res.data && res.data.addOnecandidate) {
			this.successNotice.removeClass("hide");
			setTimeout($.proxy(this.handleHideMadalAndsuccessNotice, this), 2000);
			//添加成功后向外trigger,让list页重新渲染DOM
			$(this).trigger('afreshGetCandidateData');
		}
	},

	handleHideMadalAndsuccessNotice: function() {
		this.successNotice.addClass("hide");
		this.modalFrameElem.modal("hide");
	},

	handleAddCandidateDefeat: function(XMLHttpRequest, textStatus, errorThrown) {
    this.errorNotice.html("添加候选人时出错："+"errMessage:" + XMLHttpRequest.status + " " + errorThrown)
    this.errorNotice.removeClass("hide");
		setTimeout($.proxy(this.handleHideErrorNotice, this), 2000);
  },

	handleHideErrorNotice: function() {
		this.errorNotice.addClass("hide");
	}
})