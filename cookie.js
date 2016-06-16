// JavaScript Document


//cookie 的操作；
function setCookie(name,value,iDelay)
{
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+iDelay);
	document.cookie = name +'='+value+';expires='+oDate;	
}
function getCookie(name)
{
	var arr = document.cookie.split(';');
	for(var i=0;i<arr.length;i++)
	{
		var arr2 = arr[i].split('=');
		if(arr2[0]==name)
		{
			return arr2[1];	
		}	
	}
	return '';
}
function removeCookie(name)
{
	setCookie(name,2,-1);	
}