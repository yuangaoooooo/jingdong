//加载模块
var  express = require("express");//服务器模块
var  bodyParser = require("body-parser");//处理解析post请求数据模块
var  multer = require("multer");//处理formdata 格式提交数据模块
var fs = require("fs");//处理文件写入/读出模块
var  cookieParser = require("cookie-parser");//解析cookie 模块

//创建服务器对象
var app = express();

//指定目录文件夹
app.use(express.static("www"));

//解析请求数据
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());

//配置上传头像的存储信息
var storage = multer.diskStorage({
	destination: "www/uploads",
	//cb :请求处理管线
	filename: function(req,res,cb){
		var username = req.cookies.username;
		cb(null,username+".jpg");
	}
});
var upload = multer({storage});

/*************************************注册***********************************/
app.post("/user/register",function(req,res){
	//先判断用户是否存在
	var filePath = "users/"+req.body.username+".json";
	fs.exists(filePath,function(exi){
		if(exi){
			//存在
			res.status(200).json({code:2,msg:"用户名已存在，请重新填写！"});
		}else{
			//不存在
			//直接把注册等信息写到本地
			//在body里添加 注册时间 和ip
			req.body.ip = req.ip;
			req.body.time = new Date();
			fs.writeFile(filePath,JSON.stringify(req.body),function(err){
				if(err){
					res.status(200).json({code:0,msg:"系统写入文件失请稍后继续败"});
				}else{
					res.status(200).json({code:1,msg:"注册成功"});
				}
			});
		}
	});	
});

/***************************************登录**************************************/
app.post("/user/login",function(req,res){
	//先判断用户是否存在
	var filePath = "users/"+req.body.username+".json";
	fs.exists(filePath,function(exi){
		if(exi){
			//存在   判断密码是否正确
			fs.readFile(filePath,function(err,data){
				if(err){
					//读取文件失败
					res.status(200).json({code:2,msg:"系统错误，读取文件失败"});	
				}else{
					//注意 data 是一个字符串
					var user = JSON.parse(data);
					if (req.body.password == user.password) {
						//把用户名存到响应报文的cookie(1.把用户名以cookie的形式保存在前端，
						//可以作为是否登录的凭证  2.发送网络请求的时候会把cookie带到后台)
						
						//param1：键  param2：值  param3:：过期时间 对象object{expires}
						var time = new Date();
						time.setMonth(time.getMonth()+1);
						res.cookie("username",req.body.username,{expires:time});
						res.status(200).json({code:1,msg:"登录成功"});
					} else{
						res.status(200).json({code:3,msg:"密码错误"});
					}
				}
			});
		}else{
			//不存在
			res.status(200).json({code:0,msg:"用户名不存在，请重新填写！"});	
		}
	});	
});
/***************************************退出登录**************************************/
app.post("/user/logout",function(req,res){
	//清除cookie中 的 username （access_token、timestamp）
	res.clearCookie("username");
	res.status(200).json({code:1,msg:"退出登录成功"});	
});

/***************************************上传头像**************************************/
//upload.single 一次只能上传一张图片
app.post("/user/upload",upload.single("photo"),function(req,res){
	res.status(200).json({code:1,msg:"上传头像成功"})
});

/***************************************提问问题**************************************/
app.post("/question/ask",function(req,res){
	//通过cookie中的username判断用户有没有登录
	var username = req.cookies.username;
	if (!username) {
		res.status(200).json({code:0,msg:"登录异常,请重新登录"});
		//跳出整个方法
		return;
	}
	//写入提问的问题
	//生成问题文件的文件名
	var time = new Date();
	var filePath= "questions/"+time.getTime() + ".json";
	//组合完善存储数据
	req.body.content = req.body.content.replace(/</g,"&lt");
	req.body.content = req.body.content.replace(/>/g,"&gt");
	req.body.ip = req.ip;
	req.body.time = time;
	req.body.username = username;
	//写入文件
	fs.writeFile(filePath,JSON.stringify(req.body),function(err){
		if (!err) {
			res.status(200).json({code:1,msg:"提交问题成功"});
		} else{
			res.status(200).json({code:2,msg:"系统错误，写入文件失败"});
		}
	});
});

/***************************************获取首页数据**************************************/
app.get("/question/all",function(req,res){
	//返回所有问题   （包含答案）
	//获取一个文件夹中 所有子文件
	fs.readdir("questions",function(err,files){
		//console.log(files);
		if (err) {
			//读取失败
			res.status(200).json({code:2,msg:"系统错误，读取文件失败"});
		} else{
			//读取成功
			//数组逆序  让最新的问题在上面
			files = files.reverse();
			//创建一个数组  存放所有的问题对象
			var allquestions = [];
			//方法一 用for循环 遍历所有文件
			/*
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				//console.log(file);
				//拼接读取文件的文件路径
				var filePath = "questions/" + file;
				//读取文件
				//readFile() 异步 readFileSync()同步
				//使用异步很有可能前端拿不到数据 因为还没读取完就已经响应
				
//				fs.readFile(filePath,function(err,data){
//					//console.log(data);
//					var obj = JSON.parse(data);
//					console.log(obj);
//					allquestions.push(obj);
//				});
				
				var data= fs.readFileSync(filePath);
				var obj = JSON.parse(data);
				allquestions.push(obj);
			}
			//响应
			res.status(200).json(allquestions);
			*/
			
			//方法二：使用递归来遍历
			var i = 0;
			function readQuestion(){
				if(i < files.length){
					var file = files[i];
					//拼接读取文件的文件路径
					var filePath = "questions/" + file;
					fs.readFile(filePath,function(err,data){
						if(!err){
							var obj = JSON.parse(data);
							console.log(obj);
							allquestions.push(obj);
							//改变i
							i ++;
							readQuestion();
						}
					});					
				}else{
					//响应
					res.status(200).json(allquestions);
				}	
			}
			readQuestion();
			
		}
	});
});

/***************************************回答问题**************************************/
app.post("/question/answer",function(req,res){
	//console.log(req.body);
	//通过cookie中的username判断用户有没有登录
	var username = req.cookies.username;
	if (!username) {
		res.status(200).json({code:0,msg:"登录异常,请重新登录"});
		//跳出整个方法
		return;
	}
	//console.log(req.cookies.question);
	//console.log(req.body.content);
	//先根据 req.cookies.question 读取对应的文件
	var filePath = "questions/"+req.cookies.question+".json";
	//console.log(filePath);
	fs.readFile(filePath,function(err,data){
		if(!err){
			var dataObj = JSON.parse(data);
			//console.log(dataObj);
			//判断这个问题之前有没有答案
			if(!dataObj.answers){
				//console.log("之前没答案");
				dataObj.answers = [];
			}
			//console.log(dataObj);
			//把answer 也封装成一个小对象
			// {content,time,ip,username}
			//req.body.content = req.body.content.replace(/</g,"&lt");
			//req.body.content = req.body.content.replace(/>/g,"&gt");
			req.body.ip = req.ip;
			req.body.time = new Date();
			req.body.username = username;
			//把这个小回答的对象放到answer数组中
			dataObj.answers.push(req.body);
			console.log(dataObj);
			//修改过之后 从新写入文件
			fs.writeFile(filePath,JSON.stringify(dataObj),function(err){
				if (!err) {
					res.status(200).json({code:1,msg:"提交答案成功"});
				} else{
					res.status(200).json({code:2,msg:"系统错误，写入文件失败"});
				}
			});
			
		}
	});
});



//监听
app.listen(3000,function(){
	console.log("服务器已启动！！！");
});

