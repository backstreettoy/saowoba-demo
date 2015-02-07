/**
* shen hualin
*/

//install context menu
chrome.runtime.onInstalled.addListener(function() {


	chrome.contextMenus.create({"title": "用扫我吧分享...","contexts" : ["selection"],  "id": "selectionCtxMenu" });

});

//Install events
chrome.contextMenus.onClicked.addListener(function(){

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var tabId = tabs[0].id;
		var getInfo = new Object();
		getInfo.populate=false;

		chrome.tabs.sendMessage(tabId,SWB.Constants["RequestWindowSelection"],SWB.Message.selectionInfoCallback);
	});
});


//internal message
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.key==SWB.Constants["RequestCodeInfo"]) {
    	sendResponse(SWB.CodeInfo);
    }
    else if(request.key==SWB.Constants["SaveCurrentTabUrl"]) {
    	//保存当前Tab的url，用于actionbar
    	SWB.CodeInfo.info = request.info;
    	sendResponse({});
    }
    else if(inRemoteAction(request.key)) {
    	SWB.Functions.doRemoteAction(request,sender,sendResponse);
    }
});

//external message
chrome.runtime.onMessageExternal.addListener(function(request,sender,sendResponse){

	if(!/.+lg\.saowoba\.net.+/.test(sender.url)) {
		return ;
	}

	//Login request
	if(request.key=SWB.Constants["LoginRequest"]) {
		SWB.LoginStatus.sessionId = request.id;
		SWB.LoginStatus.token = request.token;
		sendResponse({success:true});
	}
});

var Menu = new Object();
Menu.selectionCtxMenu_Click = function() {
	
};


SWB.Message = new Object();


//callback after recevie info from content page
/*
*  info.text content
*  info.type type 
*  info.codetype type for code info
*/
SWB.Message.selectionInfoCallback = function(info) {
	SWB.CodeInfo.info= info;
};


SWB.Functions.doRemoteAction = function(request,sender,sendResponse) {
	var action = request.key;
	var codeInfo = request.codeInfo;
	return SWB.Functions.requestAction(action,codeInfo,sendResponse);
}


//远程请求入口
SWB.Functions.requestAction = function(action,codeInfo,sendResponse) {
	var type = codeInfo.type;
	var info = codeInfo.text;
	var codetype = codeInfo.codetype.commitType;

	var requestParam = {
		a : action,
		dt : codetype,
		d : info,
		v : '1.0',
		u :  SWB.LoginStatus.sessionId
	};

	var sign = SWB.Common.calcSign(requestParam,SWB.LoginStatus.token);
	requestParam.s = sign;

	$.ajax({
		url : '',
		data : requestParam,
		type : 'POST',
		success : function(data,textStatus,jqXHR) {

		},
		error : function(jqXHR,textStatus,errorThrown) {}
	});
}