function PositionList(positionListContainer) {
	this.positionList = positionListContainer;
  this.whichPage = 1;
  this.eachPageDataCount = 3;
  this.admin ="";
	this.init();
}

PositionList.tempLate = `
  <table class="table panel panel-default table-hover" cellspacing="0" cellpadding="0">
    <caption class="panel-heading">职位展示</caption>
    <thead>
      <tr>
        <th>#</th>
        <th>职位名称</th>
        <th>公司</th>
        <th>公司Logo</th>
        <th>薪资范围</th>
        <th>工作地点</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody class="js-positionListInfoContainer"></tbody>
    <tfoot></tfoot>
  </table>
`;
PositionList.warningTempLate = `
  <div class="alert alert-danger hide js-warningUser" role="alert">
    需要
    <span class="h2 js-warningUserH2">登录</span>
    才能进行后续的操作
  </div>
`;
$.extend(PositionList.prototype, {
	init: function() {
    this.createDom();
    this.listPageGetLoginInfo();
  },

  createDom: function() {
    this.positionListElem = $(PositionList.tempLate);
    this.positionList.append(this.positionListElem);
    this.warningTempLate = $(PositionList.warningTempLate);
    this.positionList.append(this.warningTempLate);
    this.positionListInfoContainer = this.positionListElem.find(".js-positionListInfoContainer");
    this.waring = this.warningTempLate.find(".js-waring");
    this.waringInfo = this.warningTempLate.find(".js-warningUserH2");
    
  },

  listPageGetLoginInfo: function() {
    $.ajax({
      url: "api/whetherLogin",
      success: $.proxy(this.handleListPageGetLoginInfoSuccess, this)
    })
  },

  handleListPageGetLoginInfoSuccess: function(res) {
    if (res && res.data && res.data.whetherLogin) {
      this.warningTempLate.addClass("hide");
      this.createModifyPosition();
      this.admin =res.data.admin;
      this.bindEvents();
      this.getPositionData();
    }else{
      this.warningTempLate.removeClass("hide");
    }
  },

  createModifyPosition: function() {
    this.modifyPosition = new ModifyPositionDom(this.positionList);
    $(this.modifyPosition).on("triggerAfreshModifyPositionData", $.proxy(this.getPositionData, this))
  },

  bindEvents: function() {
    this.onLineUser = $(".js-onLineUsername").html();
    this.positionListInfoContainer.on("click", $.proxy(this.handlePositionDeleteBtnClick, this));
  },

  handlePositionDeleteBtnClick: function(e) {
    this.target = $(e.target);
    this.deletingCondition = (this.onLineUser === this.admin)
    this.deleteTagName = (this.target)[0].tagName === "SPAN";

    this.isTargetDelete = this.target.hasClass("js-delete");
    this.isTargetModify = this.target.hasClass("js-modify");

    if (!this.deletingCondition && this.deleteTagName) {
      this.waringInfo.text("管理员权限");
      this.warningTempLate.removeClass("hide");
      setTimeout($.proxy(this.handleHideWaringInfo, this), 1500)
    } else if (this.isTargetDelete && this.deletingCondition) {
      this.handleDeletePosition(this.target.attr("data-id"));
    }
    if (this.isTargetModify) {
      this.modifyPosition.modifyPositionInfo(this.target.attr("data-id"));
      //解除点击修改时警告窗弹出的问题
      this.warningTempLate.addClass("hide");
    }
  },

  handleHideWaringInfo: function() {
    this.warningTempLate.addClass("hide");
  },

  handleDeletePosition: function(id) {
    $.ajax({
      url: '/api/deletePosition',
      data: {
        id:id
      },
      success: $.proxy(this.handleDeletePositionSuccess, this),
      error: $.proxy(this.handleDeletePositionDefeat, this)
    })
  },

  handleDeletePositionSuccess: function(res) {
    if (res && res.data && res.data.deletePosition) {
      this.getPositionData();
    }
  },

  handleDeletePositionDefeat: function(XMLHttpRequest, textStatus, errorThrown) {
    alert("errMessage:" + XMLHttpRequest.status + " " + errorThrown);
  },

  getPositionData: function() {
		$.ajax({
			url: '/api/getPositionList',
			data: {
				whichPage: this.whichPage,
				eachPageDataCount: this.eachPageDataCount
			},
			success: $.proxy(this.handleGetPositionDataSuccess, this)
		})
	},

	handleGetPositionDataSuccess: function(res) {
    // console.log(res)
		if (res && res.data && res.data.shouldShowWhichData) {
      this.createPositionListTempLate(res.data.shouldShowWhichData);
      //解决最后一页的职位信息删除干净后页面不自己跳到前一页的情况
      if (this.whichPage > res.data.totalPage) {
        this.whichPage = res.data.totalPage
        this.getPositionData();
      } else {
        $(this).trigger(new $.Event("triggerTotalPage", {
          totalPage: res.data.totalPage
        }))
      }      
    }
	},

  createPositionListTempLate: function(positionContent) {
    this.positionContent = positionContent;
    // console.log(this.positionContent)
    this.positionContentStr = "";
    this.i = 0;
    this.positionContentLength =this.positionContent.length;

    for (this.i; this.i < this.positionContentLength; this.i++) {
      this.positionItem = this.positionContent[this.i];
      this.imgSrc = this.positionItem.filename ?  this.positionItem.filename : 'default.jfif';
      // console.log(this.positionItem);
      this.positionContentStr += `
                                  <tr>
                                    <td>${this.i + 1}</td>
                                    <td>${this.positionItem.name}</td>
                                    <td>${this.positionItem.company}</td>
                                    <td><img src="/uploads/${this.imgSrc}" alt="" width=30 height=30 /></td>
                                    <td>${this.positionItem.salary}</td>
                                    <td>${this.positionItem.address}</td>
                                    <td>
                                      <span href="javascript:;" class="js-delete" data-id="${this.positionItem._id}">删除</span>
                                      <a href="javascript:;" class="js-modify" data-id="${this.positionItem._id}">修改</a>
                                    </td>
                                  </tr>
      `;
    }
    this.positionListInfoContainer.html(this.positionContentStr);
    /*this.thTdDom();
    this.thTdStyle();*/
  },

/*  给元素加id名和!important都不能覆盖bootstrap的样式,
    最后用了和bootstrap一样的的包含选择器才把bootstrap的样式覆盖掉
  thTdDom: function() {
    this.td = this.positionListElem.find("td");
    this.th = this.positionListElem.find("th");
  },
  thTdStyle: function() {
    this.td.attr("id","js-algin");
    this.th.attr("id","js-algin");
  }*/
  setWhichPageShow: function(whichPageShow,showli) {
    this.whichPage = whichPageShow;
    this.li = showli;
    this.getPositionData();
  }
})