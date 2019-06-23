//node request模块安装命令：npm install request
var request = require('request');
var querystring = require('querystring');

var queryData = querystring.stringify({
     "mobile": "18666086022",  // 接受短信的用户手机号码
     "tpl_id": "155597",  // 您申请的短信模板ID，根据实际情况修改
     "tpl_value": "#code#=88888",  // 您设置的模板变量，根据实际情况修改
     "key": "c0570ef0cf102c596043aee5b9bddb16",  // 应用APPKEY(应用详细页查询)
});

var queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;

var getMsgCode= async function getMsg(){ 

    const result = await request(queryUrl, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body) // 打印接口返回内容
		var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
        console.log(jsonObj)
        return jsonObj
	} else {
        console.log('请求异常');
        var a ='不ok'
        return '1111'
    }
        
}) 

}
module.exports=getMsgCode;
