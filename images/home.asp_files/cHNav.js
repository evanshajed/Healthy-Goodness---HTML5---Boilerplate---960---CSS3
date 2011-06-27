function initPage()
{
	if (sideNavHighlight != '' && sideNavHighlight != '-1') { showNav('top',sideNavHighlight); writeSNav(sideNavHighlight); }
	if (topNavHighlight != '') { imgTopNav(topNavHighlight,2); }
	if (pagePrmpt+'' != '') { alert(pagePrmpt); }
}//initPage

//Hack for Niven Web Designs - JS error on page on WriteSNav(sideNavHighlight); - 28/12/2007
function initNivenPage()
{
	if (sideNavHighlight != '' && sideNavHighlight != '-1') {
		showNav('top',sideNavHighlight);
		//writeSNav(sideNavHighlight);
	}
}//initNivenPage


function imgHNav(sWhere,sType,theID,aIndex,compareID,aIndexAlt)
{
	var theArrayCat = '';
	try {
		theArrayCat = eval(sType + theID);
	} catch(oException) {
		theArrayCat = '';
	}
	
	var imagesName = getImageName(sType+'');
	if (theArrayCat != '' && imagesName != '') {
		var theImg = '';
		var theImgAlt = '';
		if (sType == 'top' && loggedIn == 'true') {
			if (sWhere == 'show') {
				theImg = theArrayCat[8]+'';
			} else {
				theImg = theArrayCat[7]+'';
			}
		}
		if (theImg+'' == '') theImg = theArrayCat[aIndex]+'';
		if (compareID+'' == theID+'') {
			theImgAlt = theArrayCat[aIndexAlt]+'';
			if (theImgAlt+'' != '') theImg = theImgAlt;
		}
		if (theImg != '' && document.images[imagesName + theID]) { 
			document.images[imagesName + theID].src = theImg;
		}
	}
}// imgHNav

function getImageName(sType)
{
	if (sType == 'top') {
		return 'hNavhImgTop';
	} else if (sType == 'cat') {
		return 'hNavhImgCat';
	} else {
		return '';
	}
} // getImageName

function writeCheckDiv(sText)
{
	var objTestDiv = document.getElementById('tdiv');
	if (objTestDiv) {
		objTestDiv.innerHTML += sText;
		objTestDiv.scrollTop = objTestDiv.scrollHeight;
	}
} // writeCheckDiv