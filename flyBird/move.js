//抓取非行间对象属性
function getStyle(obj,attrName)
{
	if(obj.currentStyle){
		return obj.currentStyle[attrName];
	}else{
		return getComputedStyle(obj,false)[attrName];
	}
}
//获取父节点oParent中所有带有className=sClass的结点，得到数组
function getByClass(oParent,sClass)
{
	var aResult = [];
	var aEle = oParent.getElementsByTagName('*');
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className==sClass){
			aResult.push(aEle[i]);
			}
		}
	return aResult;
}
window.onload=function()
{
	var timer = null;
	var timer1 = null;
	var timer2 = null;
	var timer3 = null;
	var count = 0;
	var oDivCon = document.getElementById("contain");
	var oDivMove = document.getElementById("move");
	var oDivCount =document.getElementById("count");
	var gameOver = false;
	oDivMove.style.top = parseInt(getStyle(oDivCon,'height'))/2-30 +'px';
	document.onkeydown = function(ev)
	{
		var oEvent = ev||event;
		if(oEvent.keyCode == 32){
			move_small();
			//怪物生产
			clearInterval(timer1);
			timer1 = setInterval(generous(),4000);
			clearInterval(timer2);
			timer2 = setInterval(generous_zidan(),300);
			clearInterval(timer3);
			timer3 = setInterval(remove(),100);
		}else{
			return false;
		}
	}
	//飞机运动函数
	function move_small()
	{	
		var speed = 25;
		clearInterval(timer);
		timer = setInterval(function(){
			oDivMove.style.top = parseInt(getStyle(oDivMove,'top'))-speed + 'px';
			speed = speed-2;
			if(parseInt(getStyle(oDivMove,'top')) < 0){
			oDivMove.style.top = 0 + 'px';
			speed = 0;
			}
			if(parseInt(getStyle(oDivMove,'top')) > 770){
			oDivMove.style.top = 770 + 'px';
			speed = 25;
			}
		},20);
	}
	//怪物运动函数
	function move_guaiwu(obj)
	{
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			obj.style.right = parseInt(getStyle(obj,'right')) + 2 + 'px';
			if(parseInt(getStyle(obj,'right')) > 1000){
				clearInterval(obj.timer);
				oDivCon.removeChild(obj);
				count++;
				oDivCount.innerHTML = count;
			}
			if(gameOver == true){
				clearInterval(obj.timer);
			}
		},20)
	}
	//怪物生产函数	
	function generous()
	{
		var numH = Math.ceil(Math.random()*740+20);
		var oDiv = document.createElement("div");
		oDiv.className = "guaiwu";
		oDivCon.appendChild(oDiv);
		oDiv.style.top = numH + 'px';
		move_guaiwu(oDiv);
	}
	//子弹运动函数
	function move_zidan(obj)
	{
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			obj.style.left = parseInt(getStyle(obj,'left')) + 8 + 'px';
			if(parseInt(getStyle(obj,'left')) > 1050){
				clearInterval(obj.timer);
				oDivCon.removeChild(obj);
			}
			if(gameOver == true){
				clearInterval(obj.timer);
			}
		},30)
	}
	
	//子弹生产函数
	function generous_zidan()
	{
		var oDiv_zidan = document.createElement("div");
		oDiv_zidan.className = "zidan";
		oDivCon.appendChild(oDiv_zidan);
		oDiv_zidan.style.top = parseInt(getStyle(oDivMove,'top')) + 15 + 'px';
		move_zidan(oDiv_zidan);
	}
	//子弹消失函数
	function remove()
	{
		var aZidan = getByClass(oDivCon,'zidan');
		var aGuaiwu = getByClass(oDivCon,'guaiwu');
		for(var i=0;i<aZidan.length;i++){
			for(var j=0;j<aGuaiwu.length;j++){
				if((parseInt(getStyle(aZidan[i],'top')) - parseInt(getStyle(aGuaiwu[j],'top')))>-3&&(parseInt(getStyle(aZidan[i],'top')) - parseInt(getStyle(aGuaiwu[j],'top')))<25&&(parseInt(getStyle(aZidan[i],'left')) - parseInt(getStyle(aGuaiwu[j],'right')))>-35){
					oDivCon.removeChild(aZidan[i]);
					oDivCon.removeChild(aGuaiwu[j]);
					clearInterval(timer3);
				}
			}
		}
	}

	//游戏结束
	function toEnd()
	{
		if(confirm("Game Over"))
		{
			close();
		}else{
			location.reload();
		}
		gameOver = true;
	}
}