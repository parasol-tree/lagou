function PositionManagement(addPositionBtnContainer,positionManagementContainer) {
	this.addPositionBtnContainer = addPositionBtnContainer;
	this.positionManagementContainer = positionManagementContainer;
	this.init();
}

//The static attribute of the constructor
PositionManagement.addPositionBtnTempLate = `
	<button type="button" class="btn btn-primary btn-lg"  data-toggle='modal' data-target='.js-positionModal'>增加职位</button>
`;

PositionManagement.positionManagementTempLate = `
	<div class="modal fade js-positionModal" tabindex="-1" role="dialog" aria-loginby="positionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="positionLabel">添加职位</h4>
	      </div>
	      <div class="modal-body">
					<form>
			    	<div class="form-group">
			        	<label for="position-name" class="control-label">职位名称</label>
			        	<input type="text" class="form-control js-positionName" id="position-name" placeholder="请输入职位名称">
			    	</div>
      			<div class="form-group">
		        	<label for="company-name" class="control-label">公司</label>
		        	<input type="text" class="form-control js-companyName" id="company-name" placeholder="请输入公司名称">
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
			        	<input type="text" class="form-control js-workAddress" id="work-address" placeholder="请输入工作地点">
			    	</div>
			    	<div class="form-group">
			        	<label for="company-logo" class="control-label">公司logo</label>
			        	<input type="file" class="form-control js-companyLogo" id="company-logo">
			    	</div>
        	</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" class="btn btn-primary js-addPositionBtn">添加此职位</button>
	      </div>

				<div class="alert hide alert-success js-successNotice" style="margin:20px;">恭喜您添加职位成功！</div>
	      <div class="alert hide alert-danger js-errorNotice" style="margin:20px;"></div>

	    </div>
	  </div>
	</div>
`;


$.extend(PositionManagement.prototype, {
	init: function() {
		this.createAddPositionBtn();
		this.craeteDom();
		this.bindEvents();
	},

	createAddPositionBtn: function() {
		this.addPositionBtn = $(PositionManagement.addPositionBtnTempLate);
		this.addPositionBtnContainer.append(this.addPositionBtn);
	},

	craeteDom: function() {
		this.positionManagement = $(PositionManagement.positionManagementTempLate);
		this.positionManagementContainer.append(this.positionManagement);
		this.successNotice = this.positionManagement.find(".js-successNotice");
		this.errorNotice = this.positionManagement.find(".js-errorNotice");
	},

	bindEvents: function() {
		this.addPositionBtn = this.positionManagementContainer.find(".js-addPositionBtn");
		this.addPositionBtn.on("click", $.proxy(this.handleAddPositionBtnClick, this))
	},

	handleAddPositionBtnClick: function() {
		var position = this.positionManagement.find(".js-positionName").val(),
				companyName = this.positionManagement.find(".js-companyName").val(),
				salary = this.positionManagement.find(".js-salary").val(),
				workAddress = this.positionManagement.find(".js-workAddress").val();
		console.log(position,companyName,salary,workAddress)
		$.ajax({
			url: 'api/addPosition',
			type: 'post',
			data: {
				position: position,
				companyName: companyName,
				salary: salary,
				workAddress: workAddress
			},
			success: $.proxy(this.handleAddPositionSuccess, this),
			error: $.proxy(this.handleAddPositionDefeat, this)
		})
		alert("sadasd")
	},

	handleAddPositionSuccess: function(res) {
		// console.log(res);
		// alert(123)
		if (res && res.data && res.data.addOnePosition) {
			// alert(456)
			this.successNotice.removeClass("hide");
			setTimeout($.proxy(this.handleHideMadalAndsuccessNotice, this), 2000);
			$(this).trigger('afreshGetPositionData');
		}
	},

	handleHideMadalAndsuccessNotice: function() {
		// alert(123)
		this.successNotice.addClass("hide");
		this.positionManagement.modal("hide");
	},

	handleAddPositionDefeat: function(XMLHttpRequest, textStatus, errorThrown) {
		this.errorNotice.html("添加职位信息时出错："+"errMessage:" + XMLHttpRequest.status + " " + errorThrown)
		this.errorNotice.removeClass("hide");
		setTimeout($.proxy(this.handleHideErrorNotice, this), 2000);
	},

	handleHideErrorNotice: function() {
		this.errorNotice.addClass("hide");
	}
})