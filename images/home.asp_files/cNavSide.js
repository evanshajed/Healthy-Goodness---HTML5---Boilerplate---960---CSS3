function showNav(sType,theID)
{
	if (theID != '') {
		if (sType == 'top') {
			var topicCell = document.getElementById("hNavhTdTop" + theID);
			if (topicCell) topicCell.className = 'topSelected';
			imgHNav('show',sType,theID,5,'',5);
		} else if (sType == 'cat') {
			//ignore
		}
	}
}//showNav

function showSMenu(sType,theID,theObj)
{
	if (sType == 'top') {
		var topicCell = document.getElementById("hNavhTdTop" + theID);
		if (topicCell) {
			if (topicCell.className != 'topSelected') { 
				topicCell.className = 'topRollover';
			} else {
				topicCell.className = 'topSelected';
			}
		}
	} else if (sType == 'cat' && theObj) {
		theObj.className = 'catVerticalRollover';
	}
	
	//check for images
	imgHNav('show',sType,theID,4,'',4);
}//showSMenu
  	
function hideSMenu(sType,theID,theObj)
{
	var currentHighlight = '';
	if (sType == 'top') {
		currentHighlight = sideNavHighlight;
	} else if (sType == 'cat') {
		currentHighlight = catHighlight;
	}
	
	if (sType == 'top') {
		if (currentHighlight+'' != theID+'') { //sideNavHighlight
			var topicCell = document.getElementById("hNavhTdTop" + theID);
			if (topicCell.className != 'topSelected') {
				topicCell.className = 'topStandard';
			} else {
				topicCell.className = 'topSelected';
			}
		}
	} else if (sType == 'cat') {
		if (currentHighlight+'' != theID+'') {
			theObj.className = 'catVerticalStandard';
		} else {
			theObj.className = 'catVerticalSelected';
		}
	}
	
	//check for images
	imgHNav('hide',sType,theID,3,currentHighlight,5);
}//hideSMenu


function writeSNav(id)
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

	id = id.toLowerCase();
	id = id+'';
	id = id.replace('core','Core');
	id = id.replace('shop','Shop');
	
	if (!("document.getElementById('hNavhTdTopCat" + id + "')")) { return; }
	
	if (lastHighlight != -1) {
		theCell = document.getElementById("hNavhTdTopCat" + lastHighlight);
		if (theCell) theCell.innerHTML = "";
		if (document.images["arr" + lastHighlight]) document.images["arr" + lastHighlight].src = arr_out.src;
	}
	theCell = document.getElementById("hNavhTdTopCat" + id);
	if (!theCell) { theCell = document.getElementById("hNavhTdTopCat" + id.replace('Core','core')); }
	
	var isShop = false;
	var testStr = id + "no"
	if (testStr.toLowerCase().indexOf("shop") > -1) { isShop = true; }
	
	var theArray = '';
	try {
		theArray = eval("topkey" + id);
	} catch(oException) {
		try {
			theArray = eval("topkey" + id.replace('Core','core'));
		} catch(oException) {
			theArray = '';
		}//try
	}//try
	if (theArray == '') { return; }
	
	var cellData = "";
	if (theArray.length != undefined) {
		if (altNav == 'true') {
			cellData = '<table cellpadding="0" cellspacing="0" border="0" class="catAltTable" width=\"'+ sNavPopWidth +'\">';
		} else {
			cellData = '<table cellpadding="0" cellspacing="0" border="0" class="catVerticalTable">';
		}
	}
	
	if (altNav == 'true') { var dotPoint = new Image(); dotPoint.src = imgPopPoint; }
	
	var theArrayCat = '';
	for (var i = 0; i < theArray.length; i++) {
		catID = theArray[i]+'';
		//NO-catID = catID.toLowerCase();
		catID = catID.replace('core','Core');
		catID = catID.replace('shop','Shop');
		
		try {
			theArrayCat = eval("cat" + catID);
		} catch(oException) {
			try {
				theArrayCat = eval("cat" + catID.replace('Core','core'));
			} catch(oException) {
				theArrayCat = '';
			}//try
		}//try
		
		catTitle = '';
		catImg = '';
		catURL = '';
		catBgColor = '';
		catClass = 'catVerticalStandard';
		if (theArrayCat != '') {
			catTitle = theArrayCat[1];
			if (catHighlight.toLowerCase() == catID.toLowerCase()) {
				catImg = theArrayCat[5]+'';
				catClass = 'catVerticalSelected';
			} else {
				catImg = theArrayCat[3]+'';
				catClass = 'catVerticalStandard';
			}
			catURL = theArrayCat[6];
			
			if (catID.search(/core/gi) != -1) { catImg = ''; }
			
			if (altNav == 'true') {
				cellData += "<tr style=\"height:15px;\" class=\""+ catClass +"\" valign=\"top\" onMouseOver=\"showSMenu('cat','"+ catID +"',this);\" onMouseOut=\"hideSMenu('cat','"+ catID +"',this);\" onclick=\"location.href=";
			} else {
				cellData += "<tr class=\"catVerticalRow\" valign=\"top\" onclick=\"location.href=";
			}
			
			if (isShop) {
				if (catID == 'ShopC') {
					cellData += "'" + vfold + "s13_shopping/view_cart.asp?nav_top_id=" + escape(id.toLowerCase()) + "&nav_cat_id=ShopC" + "" + qDSAp + "';\"";
				} else if (catURL+'' != '') {
					cellData += "'"+ catURL +"';\"";
				} else {
					cellData += "'" + vfold + "s13_shopping/default.asp?nav_top_id=" + escape(id.toLowerCase()) + "&nav_cat_id=" + catID.toLowerCase() + ""+ qDSAp +"';\"";
				}
			} else if (catURL+'' != '') {
				cellData += "'"+ catURL +"';\"";
			} else {
				cellData += "'" + vfold + "s02_article/default.asp?nav_top_id=" + escape(id.toLowerCase()) + "&nav_cat_id=" + catID.toLowerCase() + ""+ qDSAa +"';\"";
			}
			
			cellData += ">";
			
			if (altNav == 'true') {
				if (dotPoint.width == 0) {
					cellData += "<td class=\"cellAlt1 navArrowCat\"></td><td class=\"cellAlt2\">";
				} else {
					cellData += "<td valign=\"top\" class=\"cellAlt1 navArrowCat\"><img height=\"7\" src=\""+ imgPopPoint +"\" "+ bPointGif +" alt=\"\"></td><td class=\"cellAlt2\">"; //hspace=\"3\" vspace=\"2\" 
				}
			} else {
				cellData += "<td valign=\"top\" class=\"navArrowCat\"><img height=\"7\" width=\"6\" src=\""+ imgBPointSrc +"\" "+ imgBPointOpt +" alt=\"\"></td>" //hspace=\"3\" vspace=\"4\" 
				cellData += "<td valign=\"middle\" class=\""+ catClass +"\" id=\"hNavhTdCat"+ catID +"\" onMouseOver=\"showSMenu('cat','"+ catID +"',this);\" onMouseOut=\"hideSMenu('cat','"+ catID +"',this);\" >";
			}//altNav
			
			if (catImg+'' != '' && catImg != undefined && catImg+'' != 'undefined') {
				cellData += "<img hspace=\"0\" vspace=\"0\" border=\"0\" src=\""+ catImg +"\" alt=\"" + catTitle.replace(/\"/gi,'\'') + "\" id=\"hNavhImgCat"+ catID +"\" name=\"hNavhImgCat"+ catID +"\">";
			} else {
				cellData += "<span>"+ sNavStartCH +"" + catTitle + ""+ sNavEndCH +"</span>";
			}
			
			cellData += "</td></tr>";
		}//theArrayCat
	}//for
	
	if (theArray.length != undefined) {
		if (altNav == 'true') {
			cellData += "<tr width=\""+ sNavPopWidth +"\"><td colspan=\"2\"><img alt=\"\" src=\""+ imgPopBtm +"\" width=\""+ sNavPopWidth +"\" height=\"5\"></td></tr>";
		}
		cellData += "</table>";
	}
	
	id = id.replace(/core/i,'core');
	if (document.images["arr" + id]) { document.images["arr" + id].src = arr_over.src; }

	if (theCell != null) { theCell.innerHTML = cellData; lastHighlight = id; }
} //writeSNav