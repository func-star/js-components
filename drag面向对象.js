// JavaScript Document

//Drag(obj)拖拽对象，obj为向里面传递的拖拽物体
var oDiv = null;
var disX = 0;
var disY = 0;
function Drag(obj)
{
	var _this = this;
	this.oDiv = obj;
	this.oDiv.onmousedown = function(ev)
	{
		_this.fndown(ev);
	}
}
Drag.prototype.fndown = function(ev)
{
	var _this = this
	var oEvent = ev||event;
	this.disX = oEvent.clientX - this.oDiv.offsetLeft;
	this.disY = oEvent.clientY - this.oDiv.offsetTop;
	document.onmousemove = function(ev)
	{
		_this.fnmove(ev);
	}
	document.onmouseup = function()
	{
		_this.fnup();	
	}
}
Drag.prototype.fnmove = function(ev)
{
	var oEvent = ev||event;
	this.disL = oEvent.clientX - this.disX;
	this.disT = oEvent.clientY - this.disY;
	if(this.disL<0)
	{
		this.disL = 0;	
	}
	else if(this.disL>document.documentElement.clientWidth - this.oDiv.offsetWidth)
	{
		this.disL = document.documentElement.clientWidth - this.oDiv.offsetWidth;
	}
	if(this.disT<0)
	{
		this.disT = 0;
	}
	else if(this.disT>document.documentElement.clientHeight - this.oDiv.offsetHeight)
	{
		this.disT = document.documentElement - this.oDiv.offsetHeight;	
	}
	this.oDiv.style.left = this.disL + 'px';
	this.oDiv.style.top = this.disT + 'px';
}
Drag.prototype.fnup = function()
{
	document.onmousemove = null;
	document.onmouseup = null;
}