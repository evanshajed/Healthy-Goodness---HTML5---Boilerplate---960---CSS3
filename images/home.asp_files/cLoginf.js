function doLogin() 
{
	window.open('../s01_home/popup_login.asp?baseurl='+ escape(theBaseURL) +'&theRedirect='+ escape(theRedirect),'popupLogin','scrollbars=no,width=245,height=195,toolbar=no,status=no');
}

function doLogout() 
{ 
	if (confirm("Are you sure you want to logout?")) {
		var nowdate = new Date();
		document.location.href='../clientLogout.asp?ds='+ escape(nowdate);
	} else {
	   return;
	}
}
