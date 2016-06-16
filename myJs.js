// JavaScript Document

/*
*
*杨玺
*浏览器兼容性的解决（主要）
*2015/1/28
*
*/

//获取元素的属性名,适应FF,Chrome,IE(非行间元素属性)
function getStyle(obj,attrName){
	if(obj.currentStyle){
		return obj.currentStyle[attrName];
		}
	else{
		return getComputedStyle(obj,false)[attrName];
		}
	}

//可直接在样式里获取属性的属性值改变运动（调用getStyle()方法获取属性名）
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

//获取父节点oParent中所有带有className=sClass的结点，得到数组
function getByClass(oParent,sClass){
	var aResult = [];
	var aEle = oParent.getElementsByTagName('*');
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className==sClass){
			aResult.push(aEle[i]);
			}
		}
		return aResult;
	}
	
//获取结点的第一个字节点,适应FF,Chrome,IE
function getFirstChild(NodeName){
	if(NodeName.firstElementChild)
	{
		return NodeName.firstElementChild;
	}
	else
	{
		return NodeName.firstChild;
	}
}

//事件绑定，适应FF,Chrome,IE
function myAddEvent(obj,ev,fn)
{
	if(obj.attachEvent){
		obj.attachEvent('on'+ev,fn);
		}
	else{
		obj.addEventListener(ev,fn,false);
		}
};

//拖拽框架，适用FF,Chrome,IE
function drag(obj)
{
	obj.onmousedown = function(ev)
	{
		
		var oEvent = ev||event;
		var disX = oEvent.clientX - obj.offsetLeft;
		var disY = oEvent.clientY - obj.offsetTop;
		if(obj.setCapture)
		{
			obj.onmousemove = mouseMove;
			obj.onmouseup = mouseUp;
			obj.setCapture();	
		}
		else
		{
			document.onmousemove = mouseMove;
			document.onmouseup = mouseUp;
		}
		
		return false;
		function mouseMove(ev)
		{
			var oEvent=ev||event;
			disL = oEvent.clientX - disX;
			disT = oEvent.clientY - disY;
			obj.style.left = disL + 'px';
			obj.style.top = disT + 'px';	
			if(disL<0)
			{
				obj.style.left = 0;	
			}
			if(disT<0)
			{
				obj.style.top = 0;	
			}
			if(disL>(document.documentElement.clientWidth-obj.offsetWidth))
			{
				obj.style.left = document.documentElement.clientWidth-obj.offsetWidth + 'px';
			}
			if(disT>document.documentElement.clientHeight-obj.offsetHeight)
			{
				obj.style.top = document.documentElement.clientHeight-obj.offsetHeight + 'px';
			}	
		}
	}
	
	function mouseUp()
	{
		this.onmousemove = null;
		this.onmouseup = null;
		if(obj.setCapture)
		{
			obj.releaseCapture();	
		}	
	}
}
