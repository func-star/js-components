// JavaScript Document
//2015/3/17
//杨玺

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
