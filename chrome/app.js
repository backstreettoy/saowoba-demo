
$(document).ready(function(S) {
    var currentURL;
    chrome.tabs.getSelected(null, function(tab) {
        console.log('popup');
        currentURL = tab.url;
        if (!currentURL) return;

        var req = new Object();
        req.key = SWB.Constants["SaveCurrentTabUrl"];
        req.info = {};
        req.info.text = currentURL;
        req.info.type = SWB.Constants["SaveCurrentTabUrl"];
        req.info.codetype = SWB.Constants.HighLightPatterns[0]; //文字
        chrome.runtime.sendMessage(req, function(response) {
            window.location = SWB.Constants.CodeInfoPageUrl;
        });
    });
});
