function CandidateModify(candidateModifyModalFrameContainer) {
	this.CandidateModifyModalFrameContainer = candidateModifyModalFrameContainer;
	this.id = "";
	this.init();
}

CandidateModify.modalFrameTempLate = `
  <div class="modal fade js-modifyPositionModal" tabindex="-1" role="dialog" aria-loginby="modifyPositionLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="modifyPositionLabel">修改职位</h4>
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
          <button type="button" class="btn btn-primary js-modifyCandidateBtn">修改此候选人信息</button>
        </div>

        <div class="alert hide alert-success js-successNotice" style="margin:20px;">恭喜您修改候选人信息成功！</div>
        <div class="alert hide alert-danger js-errorNotice" style="margin:20px;"></div>

      </div>
    </div>
  </div>
`;

$.extend(CandidateModify.prototype, {
  init: function() {
    this.craeteDom();
    this.bindEvents();
  },

  craeteDom: function() {
    this.candidateModifyDom = $(CandidateModify.modalFrameTempLate);
    this.CandidateModifyModalFrameContainer.append(this.candidateModifyDom);

    this.position = this.candidateModifyDom.find(".js-positionName");
    this.name = this.candidateModifyDom.find(".js-name");
    this.sex = this.candidateModifyDom.find(".js-sex");
    this.salary = this.candidateModifyDom.find(".js-salary");

    this.successNotice = this.candidateModifyDom.find(".js-successNotice");
    this.errorNotice = this.candidateModifyDom.find(".js-errorNotice");
  },

//由ModifyPositionTemplate.js调用下面的modifyPositionInfo()方法,进行修改职位信息
  modifyCandidateInfo: function(id) {


    this.candidateModifyDom.modal("show");
    this.findAndModifyOneCandidateData(id);
  },

  findAndModifyOneCandidateData: function(id) {
    $.ajax({
      url: '/api/getOneCandidateInfo',
      data: {
        id: id
      },
      success: $.proxy(this.getOneCandidateInfo, this)
    })
  },

  getOneCandidateInfo: function(res) {
  	// console.log(res);
    if (res && res.data && res.data.modify) {
      // alert(0)
      this.modify = res.data.modify;
      this.position.val(this.modify.position);
      this.name.val(this.modify.name);
      this.sex.val(this.modify.sex);
      this.salary.val(this.modify.salary);
      this.id = this.modify._id;
// console.log(this.modify)
    }
  },

  bindEvents: function() {
    this.modifyCandidateBtn = this.candidateModifyDom.find(".js-modifyCandidateBtn");
    this.modifyCandidateBtn.on("click", $.proxy(this.handleModifyCandidateBtnClick, this))
  },

  handleModifyCandidateBtnClick: function() {
    var position = this.position.val(),
        name = this.name.val(),
        sex = this.sex.val(),
        salary = this.salary.val();
        id = this.id;
    $.ajax({
      url: '/api/modifyCandidateInfo',
      type:'post',
      data: {
        position: position,
        name: name,
        sex: sex,
        salary: salary,
        id: id
      },
      success: $.proxy(this.handleModifyCandidateSuccess, this),
      error: $.proxy(this.handleModifyCandidateDefeat, this),
    })
    // alert(456)
  },

  handleModifyCandidateSuccess: function(res) {
    // alert(123);
    // console.log(res);
    if (res && res.data && res.data.modify) {
      this.successNotice.removeClass("hide");
      setTimeout($.proxy(this.handleHideMadalAndSuccessNotice, this), 2000);
      //向外trigger,以重新渲染list页DOM
      $(this).trigger('triggerAfreshModifyCandidateData');
    }
  },

  handleHideMadalAndSuccessNotice: function() {
    this.successNotice.addClass("hide");
    this.candidateModifyDom.modal("hide");
  },

  handleModifyCandidateDefeat: function(XMLHttpRequest, textStatus, errorThrown) {
    this.errorNotice.html("修改职位信息时出错："+"errMessage:" + XMLHttpRequest.status + " " + errorThrown)
    this.errorNotice.removeClass("hide");
    setTimeout($.proxy(this.handleHideErrorNotice, this), 2000);
  },

  handleHideErrorNotice: function() {
    this.errorNotice.addClass("hide");
  }
})