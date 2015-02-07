
SWB.Common = {};

/*
* 计算请求签名
*/
SWB.Common.calcSign = function (data ,token){

	var t = [];
	for(var key in data) {
		if (data.hasOwnProperty(key) && data[key]) {
			t.push(key);
		}
	}

	var len = t.length;
	t.sort();
	var ret ="";
	for (i = 0; i < len; i++)
	{
	    ret += i<len-1 ? t[i]+"="+data[t[i]] + "&" : t[i]+"="+data[t[i]];
	}
	var hash = CryptoJS.SHA256(ret);
	return hash.toString(CryptoJS.enc.Hex)
}
