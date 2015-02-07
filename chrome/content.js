
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){

	console.log("Receive:" + message);

	if(message===undefined || message == null) {
		return ;
	}

	if(message == SWB.Constants["RequestWindowSelection"]) {
		onRequestSelection(message,sender,sendResponse);
	}

});


$(document).ready(function(){
	highLightKeyContent();	//关键词高亮
});


function highLightKeyContent() {
	
	var highLightKey = SWB.Constants.HighLightPatterns;
	highlightSearchTerms(highLightKey,false);	
}


function onRequestSelection(message,sender,sendResponse) {
	var info = new Object();
	info.text = window.getSelection().toString();
	info.type = SWB.Constants["ResponseWindowSelectionReq"];
	info.codetype = parseCodeType(info.text);
	sendResponse(info);

	renderOnScreen(info)

}

function parseCodeType(text) {
	var pattern = SWB.Constants.HighLightPatterns;
	for(i=0;i<pattern.length;++i) {
		p=pattern[i];
		if(p.pattern) {
			var testP = new RegExp(p.pattern[1],'img');
			if(testP.test(text)) {
				return p;
			}
		}
	}
	return pattern[0];
}

function renderOnScreen(info) {
	var iframeurl = SWB.Constants.CodeInfoPageUrl;
	var targetDiv = $("#J_SAOWOBA_DIALOG");
	if(targetDiv.length <=0) {
		var iframeurl = "chrome-extension://" + chrome.runtime.id + "/page/contentshow.htm";
		var divStr = '<div id="J_SAOWOBA_DIALOG" class="hide">'
					+'<iframe width="300" height="380" scrolling="no" frameborder="no" border="0" class="SWB-DIV-visible" src="' + iframeurl +  '"></iframe>'
					+'</div>'
		$('body').append(divStr);
		targetDiv = $("#J_SAOWOBA_DIALOG");
	}
    
    targetDiv.modal({
        "minHeight": 385,
        "minWidth" : 305,
        "maxHeight" : 500,
        "maxWidth" : 500,
        "autoResize":true,
        "autoPosition":true,
        "close":true,
        "escClose":true,
        "overlayClose":true,
        "fixed" : false,
        "overlayId" : "J_SAOWOBA-simplemodal-overlay",
        "containerId" : "J_SAOWOBA-simplemodal-container",
        "dataId" : "j_SAOWOBA-simplemodal-data"
    });
}