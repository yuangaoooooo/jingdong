//返回上一页
$("#goBack").click(function(){
	history.go(-1);
});

//回到首页
$("#home").click(function(){
	location.href = "/";
});

//注册
$("form").submit(function(event){
	//阻止默认事件
	event.preventDefault();
	//判断密码和确认密码是否一致
	var pswInputs = $("input[type=password]");
	if(pswInputs[0].value != pswInputs[1].value){
		//弹出模态框给用户提示
		$(".modal-body").text("俩次密码输入不一致!");
		//弹出模态框
		$("#myModal").modal('show');  
		return;
	}
	
	//发送注册请求
	//获取数据
	//var data = new FormData(this); //用formdata获取表单数据
	//将表单数据编译成字符串（username=123141&password=123456&isMale=true&email=123444%40qq.com&course=HTML5）
	var data = $(this).serialize();
	//console.log(data);
	$.post("/user/register",data,function(resData){
		$(".modal-body").text(resData.msg);
		$("#myModal").modal('show').on("hide.bs.modal",function(){
			if(resData.code == 1){
				//注册成功后跳到登录页面否则还留在本页面
				location.href = "/login.html";
			}
		});
	});
	
});



