function CandidateList (candidateListContainer) {
	this.candidateListContainer = candidateListContainer;
	this.whichPage = 1;
	this.eachPageDataCount = 3;
  this.admin ="";
	this.init();
}

CandidateList.tempLate = `
  <table class="table panel panel-default table-hover" cellspacing="0" cellpadding="0">
    <caption class="panel-heading">职位展示</caption>
    <thead>
      <tr>
        <th>#</th>
        <th>职位名称</th>
        <th>姓名</th>
        <th>性别</th>
        <th>薪资范围</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody class="js-candidateListInfoContainer"></tbody>
    <tfoot></tfoot>
  </table>
`;

CandidateList.warningTempLate = `
  <div class="alert alert-danger hide js-warningUser" role="alert">
    需要
    <span class="h2 js-warningUserH2">登录</span>
    才能进行后续的操作
  </div>
`;

$.extend(CandidateList.prototype, {
	init: function() {
		this.createDom();
    this.getUserLoginInfo();
	},

	createDom: function() {
		this.candidateListElem = $(CandidateList.tempLate);
		this.candidateListContainer.append(this.candidateListElem);

		this.candidateListInfoContainer = this.candidateListElem.find(".js-candidateListInfoContainer");

		this.warningTempLate = $(CandidateList.warningTempLate);

    this.waring = this.warningTempLate.find(".js-waring");
    this.waringInfo = this.warningTempLate.find(".js-warningUserH2");

		this.candidateListContainer.append(this.warningTempLate);
	},

  getUserLoginInfo: function() {
    $.ajax({
      url: "api/whetherLogin",
      success: $.proxy(this.handlegetUserLoginInfoSuccess, this)
    })
  },

  handlegetUserLoginInfoSuccess: function(res) {
    if (res && res.data && res.data.whetherLogin) {
      this.warningTempLate.addClass("hide");
      this.createCandidateModify();//修改数据
      this.admin =res.data.admin;
      this.bindEvents();
      this.getCandidatesData();
    }else{
      this.warningTempLate.removeClass("hide");
    }
  },

  createCandidateModify: function() {
    this.candidateModify = new CandidateModify(this.candidateListContainer);
    $(this.candidateModify).on("triggerAfreshModifyCandidateData", $.proxy(this.getCandidatesData, this))
  },
//----deleteInfo start--------
  bindEvents: function() {
    //需要管理员的账户才能删除数据
    this.onLineUser = $(".js-onLineUsername").html();
    this.candidateListInfoContainer.on("click", $.proxy(this.handleCandidateDeleteBtnClick, this));
  },

  handleCandidateDeleteBtnClick: function(e) {
    this.target = $(e.target);
    this.deletCondition = (this.onLineUser === this.admin)
    this.deleteTagName = (this.target)[0].tagName === "SPAN";

    this.isTargetDelete = this.target.hasClass("js-delete");
    this.isTargetModify = this.target.hasClass("js-modify");

    if (!this.deletCondition && this.deleteTagName) {
      this.waringInfo.text("管理员权限");
      this.warningTempLate.removeClass("hide");
      setTimeout($.proxy(this.handleHideWaringInfo, this), 1500)
    } else if (this.isTargetDelete && this.deletCondition) {
      this.handleDeleteCandidate(this.target.attr("data-id"));
    }
    if (this.isTargetModify) {
      this.candidateModify.modifyCandidateInfo(this.target.attr("data-id"));
      //解除点击修改时警告窗弹出的问题
      this.warningTempLate.addClass("hide");
    }
  },

  handleHideWaringInfo: function() {
    this.warningTempLate.addClass("hide");
  },

  handleDeleteCandidate: function(id) {
    $.ajax({
      url: '/api/deleteCandidate',
      data: {
        id:id
      },
      success: $.proxy(this.handleDeleteCandidateSuccess, this),
      error: $.proxy(this.handleDeleteCandidateDefeat, this)
    })
  },

  handleDeleteCandidateSuccess: function(res) {
    // console.log(res);
    if (res && res.data && res.data.deleteCandidate) {
      this.getCandidatesData();
    }
  },

  handleDeleteCandidateDefeat: function(XMLHttpRequest, textStatus, errorThrown) {
    alert("errMessage:" + XMLHttpRequest.status + " " + errorThrown);
  },
//----deleteInfo end---------
  getCandidatesData: function() {
		$.ajax({
			url: '/api/getCandidatesList',
			data: {
				whichPage: this.whichPage,
				eachPageDataCount: this.eachPageDataCount
			},
			success: $.proxy(this.handleGetCandidatesDataSuccess, this)
		})
	},

	handleGetCandidatesDataSuccess: function(res) {
    if (res && res.data && res.data.shouldShowWhichData) {
      this.createCandidateListTempLate(res.data.shouldShowWhichData);
      //解决最后一页的职位信息删除干净后页面不自己跳到前一页的情况
      if (this.whichPage > res.data.totalPage) {
        this.whichPage = res.data.totalPage
        this.getCandidatesData();
      } else {
        $(this).trigger(new $.Event("triggerTotalPage", {
          totalPage: res.data.totalPage
        }))
      }      
    }
	},

  createCandidateListTempLate: function(cadidateContent) {
    this.cadidateContent = cadidateContent;
    // console.log(this.cadidateContent)
    this.cadidateContentStr = "";
    this.i = 0;
    this.cadidateContentLength =this.cadidateContent.length;

    for (this.i; this.i < this.cadidateContentLength; this.i++) {
      this.candidateItem = this.cadidateContent[this.i];
      // console.log(this.candidateItem);
      this.cadidateContentStr += `
                                  <tr>
                                    <td>${this.i + 1}</td>
                                    <td>${this.candidateItem.position}</td>
                                    <td>${this.candidateItem.name}</td>
                                    <td>${this.candidateItem.sex}</td>
                                    <td>${this.candidateItem.salary}</td>
                                    <td>
                                      <span href="javascript:;" class="js-delete" data-id="${this.candidateItem._id}">删除</span>
                                      <a href="javascript:;" class="js-modify" data-id="${this.candidateItem._id}">修改</a>
                                    </td>
                                  </tr>
      `;
    }
    this.candidateListInfoContainer.html(this.cadidateContentStr);
  },

  setWhichPageShow: function(whichPageShow) {
    this.whichPage = whichPageShow;
    this.getCandidatesData();
  }
})