function initPage()
{
	if (sideNavHighlight != '') { writeNav(sideNavHighlight, loggedIn); sideNavHighlight = ''; }
	if (topNavHighlight != '') { imgTopNav(topNavHighlight,2); }
	if (pagePrmpt+'' != '') { alert(pagePrmpt); }
}

function makeImageArray(n)
{
     this.length = n;
     for (var i = 0; i<=n; i++) { this[i] = new Image(); }
     return this;
}

function imgOver(imgDocID,num) { if(num>0) { document.images[imgDocID].src = imageOver[num].src; return; } }
function imgOut(imgDocID,num) { if(num>0) { document.images[imgDocID].src = imageOut[num].src; return; } }
function imgTopNavOut(imgDocID,num) { if(num>0) { document.images[imgDocID].src = topNavOut[num].src; return; } }
function imgTopNavOver(imgDocID,num) { if(num>0) { document.images[imgDocID].src = topNavOver[num].src; return; } }
function imgSideNavOut(imgDocID,num) { if(num>0) { document.images[imgDocID].src = sideNavOut[num].src; return; } }
function imgSideNavOver(imgDocID,num) { if(num>0) { document.images[imgDocID].src = sideNavOver[num].src; return; } }
function aahOver(oID,oImg) { if (oImg) document.images[oID].src = oImg.src; }

function imgTopNav(id,index)
{
	var oArray = null;
	try { oArray = eval('aTopNav'+ id); } catch(oException) { oArray = null; }
	if (oArray && oArray[index]+'' != '' && document.images['topNavImg'+ id]) {
		if (index == 0 && topNavHighlight+'' == id+'' && oArray[2]+'' != '') { index = 2; }
		if (oArray[index]+'' != '') { document.images['topNavImg'+ id].src = '../../files/'+ oArray[index]; }
	}//if
}//imgTopNav

function isChkArrayEmpty(obj)
{
	if (obj.length == null) {
		return !(obj.checked);
	} else {
		for (i = 0; i < obj.length; i++) {
			if (obj[i].selected != null) { return obj[i].selected; }
			if (obj[i].checked) { return false; }
		}
		return true;
	}
}

function printPage()
{
	if (window.print) { setTimeout('window.print()', 1000); }
	return;
}

function isEmpty(s)
{   
	return ((s == null) || (s.length == 0) || /^\s+$/.test(s));
}

function isNumeric(strString)
{
	if (strString.length == 0) 
		return false;
	else
		if (strString.search(' ') != -1)
			return false;
		else
			return !isNaN(strString);
}

function popupNonclient()
{
	window.open('../s01_home/popup_nonclient.asp','popupWin','scrollbars=yes,width=320,height=320,toolbar=no,status=no');
}

function doPopupPrnt(strPage)
{	
	if (strPage+'' != '') window.open(strPage,'popupPrntWin','scrollbars=yes,width=640,height=480,toolbar=no,menubar=yes,status=no');
}

function doPopupDsclmr()
{
	// Added for SEO changes by Andrew Shemmeld
	var vfold = '../';
	if (document.getElementById('is_seo') != null) 
		{
		vfold='../../html/'; 
		}
	if (document.getElementById('is_seo_cat') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_serv') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_content') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_forum') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_faq') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_forum_msg') != null) 
		{
		vfold='../../html/'; 
		}
	//

	window.open(vfold + 's01_home/popup_dsclmr.asp','popupDsclmrWin','scrollbars=yes,width=640,height=480,toolbar=no,status=no');
}

function popupLink(sURL, iWidth, iHeight)
{
	if (isNaN(iWidth)) iWidth = 800;
	if (isNaN(iHeight)) iHeight = 600;
	window.open(sURL,'popupUrl','toolbar=no,location=yes,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,width='+ iWidth +',height='+ iHeight);
}

function doCartPrmpt(strURL)
{
	if (strURL+'' != '') { 
		if (!isEmpty(cartPrmpt)) {
			if (confirm(cartPrmpt)) location.href=strURL;
		} else {
			location.href=strURL;
		}
	}
}

function focusKeywordSearch(oElement,sText)
{
	if (oElement) { if (oElement.value == sText) { oElement.value = ''; }}
}//focusKeywordSearch

function doKeywordSearch()
{

	// Added for SEO changes by Andrew Shemmeld
	var vfold = '../';
	if (document.getElementById('is_seo') != null) 
		{
		vfold='../../html/'; 
		}
	if (document.getElementById('is_seo_cat') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_serv') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_content') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_forum') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_faq') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_forum_msg') != null) 
		{
		vfold='../../html/'; 
		}
	//

	var objSearchString = document.forms["formKeywordSearch"].elements["searchString"];
	var searchString = objSearchString.value;
	if (isEmpty(searchString)) {
		alert(ksearch1);
		objSearchString.focus();
		return;
	}
	var searchArray = searchString.replace(/[,]/gi," ").replace(/[,]/gi," ").split(" ");
	var goodValue = true;
	if (searchArray.length == 1) {
		searchString = searchString.toLowerCase();
		if (searchString.length == 1) goodValue = false;
		if (searchString == 'as' || searchString == 'or' || searchString == 'on' || searchString == 'and' || searchString == 'the') goodValue = false;
	}
	if (!(goodValue)) {
		alert(ksearch2);
		objSearchString.focus();
		return;
	}
	
	document.location.href = vfold + 's09_search/default.asp?s='+ escape(searchString) +'&dsa='+ idsa;
}//doKeywordSearch

function focusSwiClient(oElement,sText)
{
	if (oElement) { if (oElement.value == sText) { oElement.value = ''; }}
}//focusSwiClient

function doSwiClient()
{
	var oElement = document.getElementById('swi_email');
	if (oElement) {
		if (isEmpty(oElement.value)) {
			oElement.focus();
			alert('Please enter an email address');
			return;
		}
		
		if (!isEmpty(oElement.value)) {
			if (!checkSwiEmail(oElement)) { return; }
		}
		oElement = document.getElementById('swi_redirect');
		if (oElement) { oElement.value = location.href; }
		
		document.getElementById('swiEmailForm').submit();
	}//if
}//doSwiClient

function checkSwiEmail(oElement)
{
	var emailAddress = oElement.value.replace(/\-/gi,"");
	// checks for email syntax
	var email_syntax = /(\w+)@(\w+)[.](\w+)/
	if (!email_syntax.test(emailAddress)) {
		oElement.focus();
		alert('Your email address appears to be invalid');
		return false;
	}//if
	
	// checks for invalid characters
	var invalid_char = " :,;`~!#$%^*()+={}[]\<>?";
	var bad_char = "";
	
	for (i = 0; i < invalid_char.length; i++) {
		bad_char = invalid_char.charAt(i);
		if (emailAddress.indexOf(bad_char, 0) > -1) {
			oElement.focus();
			alert('Your email address appears to be invalid');
			return false;
		}//if
	}//for
	return true;
}//checkSwiEmail

function addBookmark()
{
	if (document.all) { // IE
		window.external.AddFavorite(location.href, document.title);
	} else if (window.sidebar) { // Mozilla Firefox
		window.sidebar.addPanel(document.title, location.href, '');
	} else {
		alert('Sorry. Your browser doesn\'t support this function. Please bookmark this page manually.');
	}//if
}//addBookmark

function showThumbnail(theURL, theWidth, theHeight)
{

	// Added for SEO changes by Andrew Shemmeld
	var vfold = '../';
	if (document.getElementById('is_seo') != null) 
		{
		vfold='../../html/'; 
		}
	if (document.getElementById('is_seo_cat') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_serv') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_content') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_forum') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_faq') != null) 
		{
		vfold='../html/'; 
		}
	if (document.getElementById('is_seo_forum_msg') != null) 
		{
		vfold='../../html/'; 
		}
	//

	var centerHeight = 0;
	var centerWidth = 0;
	var scrollbars = "0";
	if (theWidth > (screen.width - 100)) { centerWidth = 0; theWidth = screen.width - 70; scrollbars = "1"; }
	if (theHeight > (screen.height - 80)) { centerHeight = 0; theHeight = screen.height - 80; scrollbars = "1"; }
	centerHeight = ((screen.availHeight / 2) - (theHeight / 2));
	centerWidth = ((screen.availWidth / 2) - (theWidth / 2));
	window.open(vfold + 'includes/showImage.asp?theAction='+theThumbAction+'&imageName=' + escape(theURL),'_blank','top=' + centerHeight + ',left=' + centerWidth + ',toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=' + scrollbars + ',resizable=no,width=' + theWidth + ',height=' + theHeight);
}

function writeNav(id, loggedIn)
{
	writeNav(id, loggedIn);
}

function highlightTopNav(navitem)
{
	if (navitem != '' && document.getElementById) {
		if (navitem != -1) {
			var objNavitem = document.getElementById('sn_' + navitem);
			if (objNavitem) objNavitem.style.color = highlightTNc;
		}//if
	}//if
}

function getRealTop(el)
{
    if (arguments.length==0) el = this;
    var yPos = el.offsetTop;
    var tempEl = el.offsetParent;
    while (tempEl != null) {
		yPos += tempEl.offsetTop;
		tempEl = tempEl.offsetParent;
    }
    return yPos;
}

function getRealLeft(el)
{
    if (arguments.length==0) el = this;
    var yPos = el.offsetLeft;
    var tempEl = el.offsetParent;
    while (tempEl != null) {
		yPos += tempEl.offsetLeft;
		tempEl = tempEl.offsetParent;
    }
    return yPos;
}

function trim(sString) 
{
	while (sString.substring(0,1) == ' ') { sString = sString.substring(1, sString.length); }
	while (sString.substring(sString.length-1, sString.length) == ' ') { sString = sString.substring(0,sString.length-1); }
	return sString;
}

function loginHandler(e)
{
	if (document.all) {
		e = window.event;
		if (e.keyCode == 13) { loginSubmit(); }
	} else {
		if (e.which == 13) { loginSubmit(); }
	}
}

function setLoginHandlers()
{
	var objForm = document.forms["formLogin"];
	if (objForm) { objForm.elements["strUsername"].focus(); objForm.elements["strUsername"].onkeypress = loginHandler; objForm.elements["strPassword"].onkeypress = loginHandler; }
}

function openWebAddr()
{
	var webAddress = document.getElementById('strWebAddress');
	if (webAddress && webAddress.value != '' && webAddress.value != undefined) {
		if (webAddress.value.indexOf("://", 0) == -1) {
			webAddress.value = "http://" + webAddress.value;
		}
		window.open(webAddress.value,'_blank','');
	}
}

function getFileExtension(strFile)
{
	var theFileExt = '';
	var resultL = strFile.lastIndexOf('.'); if (resultL > -1 && resultL >= strFile.length - 4) { theFileExt = strFile.substr(resultL+1, strFile.length); }
	return theFileExt.toLowerCase();
}


function loginInlineSubmit()
{
	if (loginFormValidate()) {
		var objForm = document.forms["formLogin"];
		if (objForm.elements["theRedirect"]) { if (isEmpty(objForm.elements["theRedirect"].value)) { objForm.elements["theRedirect"].value = location.href; } }
		var newDate = new Date();
		//if (window.opener) objForm.winDetails.value = 'popup';
		objForm.action += '?'+ escape(newDate)
		objForm.target = '';
		objForm.submit();
	}//if
}//function

function loginFormValidate()
	{
		var objForm = document.forms["formLogin"];
		//If cfg_emailAsUsername")=true then
		//if (!checkTextField(objForm.elements["strUsername"], "Email Address"))
		//else
		if (!checkTextField(objForm.elements["strUsername"], "User Name"))
			return false;

		if (!checkTextField(objForm.elements["strPassword"], "Password"))
			return false;
			
		return true;
	}//formValidate
	
function checkTextField(objFormTextField, strNameOfField)
{
	if (isEmpty(objFormTextField.value)) {
		if (elementFocusCheck(objFormTextField, 'free')) {
			verifyMessage('', 'noblank', strNameOfField);
			return false;
		}//if
	}
	return true;
}//checkTextField

function agExpand(sExpand,sImg,sCaption,iWidth,iHeight)
{
	var oExpand = document.getElementById('agExpImage'+ sExpand);
	if (oExpand && sImg!='') { oExpand.src='../../files/'+ sImg; oExpand.alt=''; if (parseInt(iWidth)>0) { oExpand.width=iWidth; } if (parseInt(iHeight)>0) { oExpand.height=iHeight; } }
	var oExpand = document.getElementById('agExpCaption'+ sExpand);
	if (oExpand) { oExpand.innerHTML=sCaption; }
}//agExpand

function agWindow(sImg,sCaption,iWidth,iHeight)
{
	if (isEmpty(iWidth) || isNaN(iWidth)) { iWidth = 640; }
	if (isEmpty(iHeight) || isNaN(iHeight)) { iHeight = 480; }
	if (sImg!='') { showThumbnail(sImg, iWidth, iHeight); }
}//agWindow

function agNavigation(sAction,sExpand)
{
	var i; try { i = eval('agI'+sExpand) } catch(oException) { i = -1 }
	var aInfo; try { aInfo = eval('agA'+sExpand) } catch(oException) { aInfo = null }
	if (parseInt(i) >= -1 && aInfo) {
		if (sAction == 'left') {
			if (parseInt(i-1) < 0) { i = parseInt(aInfo.length-1) } else { i -= 1 }
		} else if (sAction == 'right') {
			if (parseInt(i+1) >= aInfo.length) { i = 0 } else { i += 1 }
		}//if
		eval('agI'+sExpand +' = i');
		var sImg = aInfo[i][0];
		var sCaption = aInfo[i][1];
		var iWidth = aInfo[i][2];
		var iHeight = aInfo[i][3];
		agExpand(sExpand,sImg,sCaption,iWidth,iHeight);
	}//if
}//agNavigation