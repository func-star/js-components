// JavaScript Document
//杨玺

//运动框架，通过改变对象的属性值运动（调用getStyle()方法获取属性名）
function attrValueChange(obj,json,fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//假设：所有值都已经到了
		
		for(var attrName in json)
		{
			var val=0;
			
			if(attrName=='opacity')
			{
				val=Math.round(parseFloat(getStyle(obj, attrName))*100);
			}
			else
			{
				val=parseInt(getStyle(obj, attrName));
			}
			
			var speed=(json[attrName]-val)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(val!=json[attrName])
				bStop=false;
			
			if(attrName=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(val+speed)+')';
				obj.style.opacity=(val+speed)/100;
			}
			else
			{
				obj.style[attrName]=val+speed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
						
			if(fnEnd)fnEnd();
		}
	}, 30);
}

function getStyle(obj,attrName){
	if(obj.currentStyle){
		return obj.currentStyle[attrName];
		}
	else{
		return getComputedStyle(obj,false)[attrName];
		}
	}