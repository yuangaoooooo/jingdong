//返回上一页
$("#goBack").click(function(){
	history.go(-1);
});

//去注册
$("#register").click(function(){
	location.href = "/register.html";
});

//发送登录请求
$("form").submit(function(event){
	event.preventDefault();
	
	//获取表单数据 拼接成字符串
	var data= $(this).serialize();
	
	//发送请求
	$.post("/user/login",data,function(resData){
		$(".modal-body").text(resData.msg);
		$("#myModal").modal('show').on("hide.bs.modal",function(){
			if(resData.code == 1){
				//登录成功后跳到登录页面否则还留在本页面
				location.href = "/";
			}
		});
	})
});
