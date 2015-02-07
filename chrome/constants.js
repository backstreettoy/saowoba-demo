
//define all constants
var SWB = SWB || new Object();
window.SWB = SWB;
//define code info from message
SWB.CodeInfo = SWB.CodeInfo || new Object();
//login status
SWB.LoginStatus = {};

//Functions
SWB.Functions = {};

SWB.Constants = {
	"RequestWindowSelection" : "RequestWindowSelection",
	"ResponseWindowSelectionReq" : "ResponseWindowSelectionReq",
	"RequestCodeInfo" : "RequestCodeInfo",

	"ContentInjectDivId" :  "J_SAOWOBA_DIALOG",
	"ContentInjectDivClass" : "_SAOWOBA_CLASS",
	"SaveCurrentTabUrl" : "SaveCurrentTabUrl",
	"OpenLoginWindow" : "OpenLoginWindow",
	"LoginRequest" : "LoginRequest",

	"Favourite" : "Favourite"
};

//和后端交互的Action
SWB.Constants.Actions = {
	"doFavourite" : "doFavourite",
	"doCall" : "doCall",
	"doSendSms" : "doSendSms",
	"doSendEmail" : "doSendEmail"  
};


//高亮的检索pattern
SWB.Constants.HighLightPatterns = 
	[
		{	//default
	    	"type" : "Text",
	    	"commitType" : "TEXT",
	    	"desp" : "文字"
	    },
	    {
	    	"type" : "Mobile",
	    	"commitType" : "TEXT",
	        "desp": "手机",
	        "pattern": [
	            "\\d{11}",
	            "(86){0,1}1[34578]\\d{9}"
	        ]
	    },
	    {	
	    	"type" : "Email",
	    	"commitType" : "TEXT",
	        "desp": "邮箱",
	        "pattern": [
	            "@",
	            "[a-z0-9][a-z0-9\\.\\-\\_]*[a-z0-9]@[a-z0-9][a-z0-9\\.\\-\\_]*(?:com|net|cn|edu|org)"
	        ]
	    }
	] ;

//展示页
if(chrome && chrome.runtime) {
	SWB.Constants.CodeInfoPageUrl = "chrome-extension://" + chrome.runtime.id + "/page/contentshow.htm";
}
