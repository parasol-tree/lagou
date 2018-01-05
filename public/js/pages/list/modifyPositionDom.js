function ModifyPositionDom(modifyPositionDomContainer) {
	this.modifyPositionTemplateContainer = modifyPositionDomContainer;
  this.id = "";
	this.init();
}

//The static attribute of the constructor
ModifyPositionDom.TempLate = `
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
                <input type="text" class="form-control js-positionName" id="position-name">
            </div>
            <div class="form-group">
              <label for="company-name" class="control-label">公司</label>
              <input type="text" class="form-control js-companyName" id="company-name">
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
            <div class="form-group">
                <label for="work-address" class="control-label">工作地点</label>
                <input type="text" class="form-control js-workAddress" id="work-address">
            </div>
            <div class="form-group">
                <label for="company-logo" class="control-label">公司logo</label>
                <input type="file" class="form-control js-companyLogo" id="company-logo">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary js-modifyPositionBtn">修改此职位</button>
        </div>

        <div class="alert hide alert-success js-successNotice" style="margin:20px;">恭喜您修改职位成功！</div>
        <div class="alert hide alert-danger js-errorNotice" style="margin:20px;"></div>

      </div>
    </div>
  </div>
`;

$.extend(ModifyPositionDom.prototype, {
  init: function() {
    this.craeteDom();
    this.bindEvents();
  },

  craeteDom: function() {
    this.modifyPositionDom = $(ModifyPositionDom.TempLate);
    this.modifyPositionTemplateContainer.append(this.modifyPositionDom);

    this.positionName = this.modifyPositionDom.find(".js-positionName");
    this.companyName = this.modifyPositionDom.find(".js-companyName");
    this.salary = this.modifyPositionDom.find(".js-salary");
    this.workAddress = this.modifyPositionDom.find(".js-workAddress");

    this.successNotice = this.modifyPositionDom.find(".js-successNotice");
    this.errorNotice = this.modifyPositionDom.find(".js-errorNotice");
  },

//由ModifyPositionTemplate.js调用下面的modifyPositionInfo()方法,进行修改职位信息
  modifyPositionInfo: function(id) {
    this.modifyPositionDom.modal("show");
    this.findAndModifyOnePositionData(id);
  },

  findAndModifyOnePositionData: function(id) {
    $.ajax({
      url: '/api/getOnePositionInfo',
      data: {
        id: id
      },
      success: $.proxy(this.handleGetOnePositionInfo, this)
    })
  },

  handleGetOnePositionInfo: function(res) {
    if (res && res.data && res.data.modify) {
      this.modify = res.data.modify;

      this.positionName.val(this.modify.position);
      this.companyName.val(this.modify.companyName);
      this.salary.val(this.modify.salary);
      this.workAddress.val(this.modify.workAddress);
      this.id = this.modify._id;
    }
  },

  bindEvents: function() {
    this.modifyPositionBtn = this.modifyPositionDom.find(".js-modifyPositionBtn");
    this.modifyPositionBtn.on("click", $.proxy(this.handleModifyPositionBtnClick, this))
  },

  handleModifyPositionBtnClick: function() {
    this.positionNameValue = this.positionName.val();
    this.companyNameValue = this.companyName.val();
    this.salaryValue = this.salary.val();
    this.workAddressValue = this.workAddress.val();

    $.ajax({
      url: "api/modifyPosition",
      type: "post",
      data: {
        position: this.positionNameValue,
        companyName: this.companyNameValue,
        salary: this.salaryValue,
        workAddress: this.workAddressValue,
        id: this.id
      },
      success: $.proxy(this.handleModifyPositionSuccess, this),
      error: $.proxy(this.handleModifyPositionDefeat, this),
    });
  },

  handleModifyPositionSuccess: function(res) {
    console.log(res);
    if (res && res.data && res.data.modify) {
      this.successNotice.removeClass("hide");
      setTimeout($.proxy(this.handleHideMadalAndSuccessNotice, this), 2000);
      $(this).trigger('triggerAfreshModifyPositionData');
    }
  },

  handleHideMadalAndSuccessNotice: function() {
    this.successNotice.addClass("hide");
    this.modifyPositionDom.modal("hide");
  },

  handleModifyPositionDefeat: function(XMLHttpRequest, textStatus, errorThrown) {
    this.errorNotice.html("修改职位信息时出错："+"errMessage:" + XMLHttpRequest.status + " " + errorThrown)
    this.errorNotice.removeClass("hide");
    setTimeout($.proxy(this.handleHideErrorNotice, this), 2000);
  },

  handleHideErrorNotice: function() {
    this.errorNotice.addClass("hide");
  }
})