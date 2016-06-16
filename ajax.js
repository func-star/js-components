// JavaScript Document

function ajax(url,fnSuc,fnFail)
{
	//1.
	if(window.XMLHttpRequest)
	{
		var oAjax = new XMLHttpRequest();
	}
	else
	{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//2.
	oAjax.open('GET',url,true);
	//3.
	oAjax.send();
	//4.
	oAjax.onreadystatechange = function()
	{
		if(oAjax.readyState==4)//读取完成
		{
			if(oAjax.status==200)//读取成功
			{
				var str = oAjax.responseText;
				fnSuc(str);
			}
			else
			{
				fnFail();
			}
		}
		
	}	
}
