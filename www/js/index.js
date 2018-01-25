//去注册
$(".register").click(function(){
	location.href = "/register.html";
});

//登录
$(".login").click(function(){
	location.href = "/login.html";
});

//头像
$("#lrupimg").click(function(){
	location.href = "/upload.html";
});

//var username = $.cookie("username");
var username = document.cookie;
username=window.decodeURIComponent(username);
username = username.split("=")[1];
console.log(username);

//判断username 有没有值 改变样式和行为行为
if(username){
	$("#lrupxx").find("p").text(username);
	$("#lrupxx span").text("");
	$("#lrupxx span").last().text("退出").addClass("logout");
	$(".login span").text(username);
	$(".register span").text("退出").addClass("logout");
}else{
	$("#lrupxx").find("p").text("欢迎来到京东").
	end().removeAttr("data-toggle").click(function(){
		location.href = "login.html";
	});
	
}


//退出登录
$(".logout").click(function(){
	$.post("/user/logout",function(resData){
		//如果退出登录正常  刷新页面
		if(resData.code == 1){
			location.reload();			 
		}
	});
});


//定位地址
$("#dizhi").hover(function(){
	$("#dizhi").css({
		"background-color":"white",
		"border":"1px solid gray",
		"border-bottom":"none"
		});
	$("#dizhilist").css({
		"display":"block",
		"border":"1px solid gray",
		"border-top":"none"
		});
	
},function(){
	$("#dizhi").css({
		"background-color":"",
		"border":"none"
		});
	$("#dizhilist").css({
		"display":"none",
		});
});
$("#dizhilist table td").hover(function(){
	$(this).css({
		"background-color":"#E3E4E5",
		"color":"red",
		"cursor":"pointer"
	})
	
},function(){
	
		$(this).css({
		"background-color":"",
		"color":""
		});
	
});
$("#dizhilist table td").click(function(){
	$(this).css({
		"background-color":"red",
		"color":"white"
	})
	$("#dizhilist table td").not(this).css({
		"background-color":"",
		"color":""
	})
	$("#xuanzhong").text($(this).text());
});
//我的京东
$(".myjd").hover(function(){
	$(this).css({
		"background-color":"white",
		"border-color":"gray"
	})
	$("#myjdlist").css({
		"display":"block",
		"border":"1px solid gray",
		"border-top":"none"
		});
},function(){
	$(this).css({
		"background-color":"",
		"border-color":"#E3E4E5"
	})
	$("#myjdlist").css({
		"display":"none",
		});
});
//客户服务
$(".khfw").hover(function(){
	$(this).css({
		"background-color":"white",
		"border-color":"gray"
	})
	$("#khfwlist").css({
		"display":"block",
		"border":"1px solid gray",
		"border-top":"none"
		});
},function(){
	$(this).css({
		"background-color":"",
		"border-color":"#E3E4E5"
	})
	$("#khfwlist").css({
		"display":"none",
		});
});
//网站导航
$(".wzdh").hover(function(){
	$(this).css({
		"background-color":"white",
		"border-color":"gray"
	})
	$("#wzdhlist").css({
		"display":"block",
		"border":"1px solid gray",
		"border-top":"none"
		});
},function(){
	$(this).css({
		"background-color":"",
		"border-color":"#E3E4E5"
	})
	$("#wzdhlist").css({
		"display":"none",
		});
});
//手机京东
$(".sjjd").hover(function(){
	$("#sjjdlist").css({
		"display":"block",
		"border":"1px solid gray",
		"border-top":"none"
		});
},function(){
	$("#sjjdlist").css({
		"display":"none",
		});
});
//我的购物车
$("#gouwuche").hover(function(){
	$(this).css("border-bottom","none");
	$("#gouwuchelist").css("display","block");
},function(){
	$(this).css("border-bottom","");
	$("#gouwuchelist").css("display","none");
});


//轮播图
var lunbo = document.getElementsByClassName("lunbotu-m").item(0);
var left = document.getElementsByClassName("left").item(0);
var right = document.getElementsByClassName("right").item(0);
var img = document.querySelectorAll(".im img");
var index = 0;
var lilist = document.querySelectorAll(".lunbotu-m .in li");
var timer = null;
var timer1 = null;

left.onclick = function(){
	/*for(var i=0;i<img.length;i++){
		img[i].style.opacity=0;
		
	}*/
	img[index].style.opacity=0;
	img[index].style.zIndex=0;
	 lilist[index].className="";
//	index--;
	if(index==0){
		index=7;
	}else{
		index--;
	}
	img[index].style.opacity=1;
	img[index].style.zIndex=1;
	 lilist[index].className="on";
};
right.onclick = function(){
	/*for(var i=0;i<img.length;i++){
		img[i].style.opacity=0;
	}*/
	img[index].style.opacity=0;
	img[index].style.zIndex=0;
	 lilist[index].className="";
//img[index].style.opacity=0;
//		index++;
	if(index==7){
		index=0;
	}else{
		index++;
	}

	img[index].style.opacity=1;
	img[index].style.zIndex=1;
	 lilist[index].className="on";

};
for(var i = 0;i<lilist.length;i++){
lilist[i].value = i;
lilist[i].onmouseover  = function(){
    var that = this;
    timer = setTimeout(function(){
        img[index].style.opacity=0;
        img[index].style.zIndex=0;
        lilist[index].className="";

        img[that.value].style.opacity=1;
        img[that.value].style.zIndex=1;
        lilist[that.value].className="on";
         index=that.value;
        },300);
    };
    lilist[i].onmouseout = function(){
        clearTimeout(timer);
    }
}


timer1 = setInterval(right.onclick,2000);
lunbo.onmouseover = function(){
    clearInterval(timer1);
};
lunbo.onmouseout = function(){
    timer1 = setInterval(right.onclick,2000);
};

//轮播图左边的隐藏列表
$(function(){
    $(".ying div").hide();
    $("#duolist li").hover(function() {
        
        $(".ying").find("div").eq($(this).index()).show();
    }, function() {
        
        $(".ying").find("div").eq($(this).index()).hide();
    });
    $(".ying div").hover(function() {
        $(this).show();
    }, function() {
        $(this).hide();
    });
})

//轮播图右边分页
window.onload = function(){
	// 获取分页条
	var lis = document.querySelectorAll("#lrtab li");
	// 获取内容的三个 ul 标签
	var uls = document.querySelectorAll("#lrcontent ul");
	// 保存上一个选中的 li 标签的索引
	var lastIndex = 0;
	
	for (var i = 0; i < lis.length; i++) {
		// 鼠标移入
		lis[i].onmouseover = function(){
			// 先把上个li标签样式清除
			lis[lastIndex].className = "";
			// 先把上个ul隐藏掉
			uls[lastIndex].style.display = "none";
	
			// 更新 lastIndex 的索引值。当前这个 li 的索引就成为上一个
			// indexOf(this)：属于Array的方法，根据元素返回索引位
			// Array.from(lis)：把 HTMLCollection 类数组转化成 Array数组
			lastIndex = Array.from(lis).indexOf(this);
			// 把当前这个 ul 显示出来
			uls[lastIndex].style.display = "block";
		}
	}
}
//分页中的动画
$(".cx").hover(function(){
	$("#huakuai").css("margin-left","8px").css("animation","huaa 1s");
},function(){
	$("#huakuai").css("animation","");
});
$(".gg").hover(function(){
	$("#huakuai").css("margin-left","44px").css("animation","hua 1s");
	
},function(){
	$("#huakuai").css("animation","");
});

//倒计时
var spans = document.querySelectorAll("#daojishi span");
var interval = setInterval(updateTime,1000);
function updateTime(){
		// 获取总的时间（s），并让时间减一
		var totalSeconds = spans[1].innerHTML*3600 +spans[3].innerHTML*60+ spans[5].innerHTML*1;
		totalSeconds --;
		
		// 重新获取分钟和秒数
		var hours = Math.floor(totalSeconds / 3600);
		var minutes = (Math.floor(totalSeconds / 60))%60;
		var seconds = totalSeconds % 60;
		
		// 把时间显示上去
		spans[1].innerHTML = hours.toString().replace(/^(\d)$/,"0$1");
		spans[3].innerHTML = minutes.toString().replace(/^(\d)$/,"0$1");
		spans[5].innerHTML = seconds.toString().replace(/^(\d)$/,"0$1");
	
		// 判断倒计时是否结束
		if (totalSeconds <= 0) {
			// 关闭计时器
			clearInterval(interval);
		}
}

//倒计时下面的轮播图
function henglunbo(){
	$("#lunbo2-1").hover(function(){
	$(".jian").css("display","block");
},function(){
	$(".jian").css("display","");
})

	$(".jian").hover(function(){
	$(".jian").css("display","block");
},function(){
	$(".jian").css("display","");
})

function showPrevImage(){

}
function showNextImage(){

}
 
   //改变上一张下一张
   $('.left-btn').click(function(){
        showPrevImage();
    });
    $('.right-btn').click(function(){            
		showNextImage();
    });
}
henglunbo();


//悬浮搜索框   和 //左侧边栏
window.onscroll = function(){
	var top = document.documentElement.scrollTop;
	if(top >= 400){
		$(".xuanfuhead").finish().slideDown(600).css("display","block");
		$(".youcebian").slideDown(600).css("display","block");
	}else{
		$(".xuanfuhead").css("display","");
		$(".youcebian").css("display","");
	}
	

}

//右侧边栏选项
$(".xiaokuai").hover(function(){
	$(this).css("background-color","firebrick");
	$(this).next().finish().show(500).css({
		"display":"block",
		"background-color":"firebrick"
		});
},function(){
	$(this).css("background-color","#7A6E6E");
	$(this).next().css("display","");
});

$(".dakuai").hover(function(){
	$(this).css("display","block");
	$(this).prev().css("background-color","firebrick");
},function(){
	$(this).css("display","");
	$(this).prev().css("background-color","#7A6E6E");
})

//回到顶部
$(".scroll_top").click(function(){
			$("html,body").animate({
				scrollTop: 0
			},"slow");
});