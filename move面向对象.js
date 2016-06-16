//面向对象的物体运动框架
//**********
//杨玺
//2015.3.20
//move(obj,json,fn)
var oDiv = null;
var value = 0;
var json = {};
var fnEnd = null;
function Move(obj,json,fnEnd)
{
	var _this = this;
	this.oDiv = obj;
	this.oDiv.timer = null
	this.json = json;
	this.fnEnd = fnEnd;
	clearInterval(this.oDiv.timer);
	this.oDiv.timer = setInterval(function()
	{
		_this.startmove();	
	},30)
}
Move.prototype.getStyle = function(Attr)
{
	if(this.oDiv.currentStyle)
	{
		return this.oDiv.currentStyle[Attr]	
	}
	else
	{
		return getComputedStyle(this.oDiv,false)[Attr];	
	}
}
Move.prototype.startmove = function()
{
	this.bStop = true;
	 for(this.attr in this.json)
	{
		if(this.attr=='opacity')
		{
			this.value = Math.round(parseFloat(this.getStyle(this.attr))*100);
		}
		else
		{
			this.value = parseInt(this.getStyle(this.attr));	
		}
		this.speed = (this.json[this.attr] - this.value)/6;
		this.speed = this.speed>0?Math.ceil(this.speed):Math.floor(this.speed);
		if(this.value != this.json[this.attr])
		{
			this.bStop = false;
		}
		if(this.attr=='opacity')
		{
			this.oDiv.style.filter = 'alpha(opacity:'+(this.value+this.speed)+')';
			this.oDiv.style.opacity = (this.value + this.speed)/100;
		}
		else
		{
			this.oDiv.style[this.attr] = this.value + this.speed + 'px';
				
		}
	}	
	if(this.bStop)
	{
		clearInterval(this.oDiv.timer);
		if(this.fnEnd)
		{
			this.fnEnd();	
		}	
	}
}