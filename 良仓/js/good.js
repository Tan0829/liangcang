window.onload=function(){
	//获取数据
	(function(){
		var pagenum=0;
		var mode1=document.getElementById("mode1").innerHTML;//模板字符串
		var mode2=document.getElementById("mode2").innerHTML;//模板字符串
		var mainbox1=document.getElementById("mainbox1");
		var mainbox2=document.getElementById("mainbox2");
		var pagebox=document.getElementById("pagebox");
		$.get("http://h6.duchengjiu.top/shop/api_goods.php",{"page":1,"pagesize":30},function(data){
			var obj=data.data;console.log(data,obj);
			for(var i=0;i<obj.length;i++){
				var compile=_.template(mode2);
				mainbox2.innerHTML+=compile(obj[i]);
				if((i+3)%3==0){mainbox1.innerHTML+=mode1;}
			}
			pagenum=data.page.page_count;
			var ali=mainbox2.getElementsByTagName("li");
			for(var a=0;a<ali.length;a++){
				if((a+1)%3==0){ali[a].style.marginRight="0px";}
			}
			//创建分页栏
			var page=document.createElement('div');
			page.className='page';
			pagebox.appendChild(page);
			$('.page').pagination({//调用的这个方法是用对象去设置参数
				pageCount : pagenum,
				current: 1,
				prevContent:'上一页',
				nextContent:'下一页',
				keepShowPN:false,
				count:11,
				mode:'fixed',
				isHide:false,
				jump:true,
				jumpBtn:'确认',
				callback:function(api){
				var ipt=page.getElementsByTagName('input')[0];
				var btn=page.getElementsByClassName('jump-btn')[0];
				var p1=document.createElement('p');
				p1.innerHTML='&nbsp;|&nbsp;&nbsp;跳转到';
				var p2=document.createElement('p');
				p2.innerHTML='&nbsp;页';
				page.insertBefore(p1,ipt);
				page.insertBefore(p2,btn);
				getdata(api.getCurrent());
				}
			});
			var ipt=page.getElementsByTagName('input')[0];
			var btn=page.getElementsByClassName('jump-btn')[0];
			var p1=document.createElement('p');
			p1.innerHTML='&nbsp;|&nbsp;&nbsp;跳转到';
			var p2=document.createElement('p');
			p2.innerHTML='&nbsp;页';
			page.insertBefore(p1,ipt);
			page.insertBefore(p2,btn);
		});
		function getdata(page){
			$.get("http://h6.duchengjiu.top/shop/api_goods.php",{'page':page,'pagesize':30},function(data){
				mainbox2.innerHTML='';
				var obj=data.data;
				for(var i=0;i<obj.length;i++){
					var compile =_.template(mode2);
					mainbox2.innerHTML+=compile(obj[i]);
				}
				var aLi=mainbox2.getElementsByTagName('li');
				for(var i=0;i<aLi.length;i++){
					if((i+1)%3==0){aLi[i].style.marginRight='0px';}
				}
			});
		};
	})();
	

	
}
