
var codeInfo = {};


$(document).ready(function(){
	bindEvents();

	var info = null;
	chrome.runtime.sendMessage({"key":SWB.Constants["RequestCodeInfo"]}, function(response) {
  		if(response.info!='undefined') {
  			codeInfo = response.info;
  			var info = codeInfo;
  			var text = info.text ? info.text : "";
			var typeElem = $("#J_CodeType");
			typeElem.text(info.codetype.desp);
			typeElem.attr('data-type',info.codetype.type);
			typeElem.attr('data-commitType',info.codetype.commitType);
			var infoElem = $("#J_CodeInfo");
			infoElem.text(info.text)
			//show code
			$("#J_Qrcode").qrcode({
				width: 100,
				height: 100,
				color: '#3a3',
				text: utf16to8(text)
			});

			renderActionButton(info);
  		}
	});
});

function bindEvents() {
	//====================后台交互按钮===============================
	//收藏
	$('#J_Collect').click(function(){
		chrome.runtime.sendMessage({"key" : SWB.Constants.Actions["doFavourite"] , "codeInfo" : codeInfo});
	});
	$('#J_Call').click(function(){
		chrome.runtime.sendMessage({"key" : SWB.Constants.Actions["doCall"] , "codeInfo" : codeInfo});
	});
	$('#J_SendSms').click(function(){
		chrome.runtime.sendMessage({"key" : SWB.Constants.Actions["doSendSms"] , "codeInfo" : codeInfo});
	});
	$('#J_SendEmail').click(function(){
		chrome.runtime.sendMessage({"key" : SWB.Constants.Actions["doSendEmail"] , "codeInfo" : codeInfo});
	});

	//=================前台按钮======================================
	$('#J_ExpandButton').click(function(event){
		//todo 旋转方向向上
		var targetElem = event.currentTarget;
		var container = $('#J_TextContainer');
		var info = $('#J_CodeInfo');
		if($(targetElem).attr('data-status')=='expanded') {
			//收缩
			container.removeClass('container-expand');
			container.addClass('container-collapse');
			info.addClass('overflow-hide');
			$(targetElem).attr('data-status','collapse');
			$(targetElem).html('▼');
		}
		else {
			//扩张
			container.addClass('container-expand');
			container.removeClass('container-collapse');
			info.removeClass('overflow-hide');
			$(targetElem).attr('data-status','expanded');
			$(targetElem).html('▲');
		}

		
	});
}


function renderActionButton(info) {
	var codetype = info.codetype.type;
	// if(codetype=="Mobile") {
	// 	$('#J_SendEmail').hide();
	// 	$('#J_SendSms').show();
	// 	$('#J_Call').show();
	// 	$('#J_Collect').show();
	// }
	// else if(codetype=="Email") {
	// 	$('#J_SendSms').hide();
	// 	$('#J_Call').hide();
	// 	$('#J_SendEmail').show();
	// 	$('#J_Collect').show();
	// }
	// else if(codetype=="Text") {
	// 	$('#J_SendSms').hide();
	// 	$('#J_Call').hide();
	// 	$('#J_SendEmail').hide();
	// 	$('#J_Collect').show();
	// }
	// else if(codetype=="链接") {
	// 	$('#J_SendSms').hide();
	// 	$('#J_Call').hide();
	// 	$('#J_SendEmail').hide();
	// 	$('#J_Collect').show();
	// }
}

function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
    } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    } else {
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    }
    }
    return out;
}