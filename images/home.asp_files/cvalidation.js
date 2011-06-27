		
function elementFocusCheck(objElement, strType)
{
	return elementFocus(objElement, strType);
}//elementFocusCheck

function elementFocus(objElement, strType)
{
	if (objElement) {
		objElement.focus();
		return true;
	} else {
		return false;
	}//if
}//elementFocus

function checkEmailSyntax(objFormTextField, strNameOfField)
{
	var emailAddress = objFormTextField.value.replace(/\-/gi,"");
	//emailAddress = objFormTextField.value;
	// checks for email syntax
	var email_syntax = /(\w+)@(\w+)[.](\w+)/
	if (!email_syntax.test(emailAddress)) {
		if (elementFocusCheck(objFormTextField, 'email')) {
			verifyMessage('', 'notValid', strNameOfField);
			return false;
		}//if
	}//if
	
	// checks for invalid characters
	//var invalid_char = " :,;`~!#$%^*()+={}[]/\<>?"; --commented to allow "/" in email - 20/10/2006
	var invalid_char = " :,;`~!#$%^*()+={}[]\<>?"; 
	var bad_char = "";
	
	for (i = 0; i < invalid_char.length; i++) {
		bad_char = invalid_char.charAt(i);
		if (emailAddress.indexOf(bad_char, 0) > -1) {
			if (elementFocusCheck(objFormTextField, 'email')) {
				verifyMessage('', 'notValid', strNameOfField);
				return false;
			}//if
		}//if
	}//for
	return true;
}//checkEmailSyntax

function checkNumCurrField(theObject)
{
	var bolOK = true;
	var intNumDollar = 0;
	for (var i = 0; i < theObject.value.length; i++) {
	    var c = theObject.value.charAt(i);
		c = escape(c);
		//dollar %24
		//pound %A3
		//yen %A5
		//euro %u20AC
		if ((c == '%24') || (c == '%A3') || (c == '%A5') || (c == '%u20AC')) {
			intNumDollar += 1;
		} else if (c == escape(',')) {
			if (theObject.value.length == 1) bolOK = false;
		} else {
			if (isNaN(c) == true)
				bolOK = false;
		}// if
		if (intNumDollar > 1) bolOK = false;
		if (!bolOK) break;
	}// for
	if ((bolOK == false) || (isEmpty(theObject.value))) {
		if (elementFocusCheck(theObject, 'currency')) { 
			verifyMessage('', 'notValidNumber', '');
			return false;
		}//if
	} // if
}//checkNumCurrField

function verifyField(strWhere, objForm, strElementName, strDisplayName, strType, blnRequired)
{
	//alert('verifyField: '+ strWhere +' , '+ objForm +' , '+ strElementName +' , '+ strDisplayName +' , '+ strType +' , '+ blnRequired +' , pagetype:'+ pagetype);
	blnRequired = blnRequired.toLowerCase();
	objElement = document.getElementById(strElementName);
	if (!objElement) objElement = objForm.elements[strElementName];
	if (objElement) {
		if (strType == 'checkbox' || strType == 'multiple') {
			var bolChecked = false;
			var intElementLength;
			var objElementItem;
			if (strWhere == 'client') { intElementLength = parseInt(objElement.value) + 1; }
			else { intElementLength = objElement.length; }
			for (var j=0; j<intElementLength; j++) {
				if (strWhere == 'client') { objElementItem = document.getElementById(strElementName +'_'+ j); }
				else { objElementItem = objElement[j]; }
				if (objElementItem) {
					if (objElementItem.checked == true)  {
						bolChecked = true;
						break;
					}// if  
				} else {
					break;
				}//if
			}// for
			if (blnRequired == 'true' && !bolChecked) {
				if (strWhere == 'client') { objElementItem = document.getElementById(strElementName +'_0'); }
				else { objElementItem = objElement[0]; }
				if (elementFocusCheck(objElementItem, strType)) {
					verifyMessage(strWhere, 'noblank', strDisplayName);
					return false;
				}//if
			}// if
			return true;
		} else if (strType == 'radio') {
			var bolChecked = false;
			var intElementLength = objElement.length;
			if (intElementLength == undefined) {
				objElement = objForm.elements[strElementName]; //get the forms reference instead
				intElementLength = objElement.length; //try now
			}
			if (intElementLength == null || intElementLength == undefined) {
				if (objElement.checked == true)
					bolChecked = true;
				else
					bolChecked = false;
			} else {
				for (var j=0; j<=intElementLength-1; j++) {
					if (objElement[j]) {
						if (objElement[j].checked == true)  {
							bolChecked = true;
							break;
						}// if  
					} else {
						break;
					}//if
				}// for
				objElement = objElement[0];
			}//if
			if (blnRequired == 'true' && !bolChecked) {
				if (elementFocusCheck(objElement, strType)) {
					verifyMessage(strWhere, 'noblank', strDisplayName);
					return false;
				}//if
			}// if
			return true;
		} else if (strType == 'select' || strType == 'select-one') {
			if (blnRequired == 'true') {
				if (objElement.options[objElement.selectedIndex].value == -1 || objElement.options[objElement.selectedIndex].value == '-1') {
					if (elementFocusCheck(objElement, strType)) {
						verifyMessage(strWhere, 'noblank', strDisplayName);
						return false;
					}//if
				}//if
			}// if
			return true;
		} else if (strType == 'date') {
			var strElementValue = objElement.value.replace(' ','');
			if (strElementValue == '' || strElementValue == null || strElementValue == '//') {
				if (blnRequired == 'true') {
					if (elementFocusCheck(objElement, strType)) {
						verifyMessage(strWhere, 'noblank', strDisplayName);
						return false;
					}//if
				} //if
			} else {
				if (!chkdate(strElementValue)) {
					if (elementFocusCheck(objElement, strType)) {
						verifyMessage(strWhere, 'notValidDate', strDisplayName);
						return false; 
					}//if
				}// if
			}// if
			return true;
		} else if (strType == 'free' || strType == 'text') {
			if (blnRequired == 'true') {
				if (objElement.value == '' || objElement.value == null || objElement.value == ' ' || objElement.value == '  ') {
					if (elementFocusCheck(objElement, strType)) {
						verifyMessage(strWhere, 'noblank', strDisplayName);
						return false;
					}//if
				}// if
			}// if
			if (strWhere == 's11-type' || strWhere == 'survey-type' || strWhere == 'client-type') return verifyType(strWhere, strDisplayName, objElement, strType, strElementName); //(pagetype == 's11d-re' || pagetype == 's02s-re')
			return true;
		} else if (strType == 'file') {
			if (blnRequired == 'true') {
				var blnFocusCheck = true;
				if (objElement.value == '' || objElement.value == null || objElement.value == undefined || objElement.value == '-1') {
					blnFocusCheck = true;
				} else {
					blnFocusCheck = false;
				}// if
				if (blnFocusCheck == true && strWhere == 'client') {
					var objElementSpan = document.getElementById('file_span'+ objElement.id.replace(/property/g,''));
					if (objElementSpan) {
						if (objElementSpan.innerHTML == '') {
							blnFocusCheck = true;
						} else {
							blnFocusCheck = false;
						}// if
					}// if
				}// if
				if (blnFocusCheck) {
					if (elementFocusCheck(objElement, strType)) {
						verifyMessage(strWhere, 'noblank', strDisplayName);
						return false;
					}//if
				}//if
			}// if
			return true;
		} else if (strType == 'number' || strType == 'auto') {
			if (!isNumeric(objElement.value) && objElement.value != '' && objElement.value != null) {
				if (elementFocusCheck(objElement, strType)) {
					verifyMessage(strWhere, 'notValidNumber', strDisplayName);
					return false;
				}//if
			}//if
			if (blnRequired == 'true') {
				if (objElement.value == '' || objElement.value == null) {
					if (elementFocusCheck(objElement, strType)) {
						verifyMessage(strWhere, 'noblank', strDisplayName);
						return false;
					}//if
				}//if
			}//if
			return true;
		} else if (strType == 'pref') {
			return verifyPreference(objForm);
		}// if - strType
	} else {
		return true;
	}// if - objElement
}//verifyField


function verifyType(strWhere, strDisplayName, objElement, strType, strElementName)
{
	//alert('verifyType: '+ strWhere +' , '+ strDisplayName +' , '+ objElement +' , '+ strType +' , '+ strElementName);
	var objRE = null;
	try {
		var intElementName = strElementName.replace(/ntext/gi,'').replace(/atext/gi,'').replace(/file/gi,'').replace(/answer/gi,'').replace(/ptext/gi,'').replace(/property/gi,'');
		objRE = eval('arrayCheckType_'+ intElementName);
	} catch(oException) {
		objRE = null;
	}//try
	if (objRE && objElement && !isEmpty(objElement.value)) {
		var sType = objRE[0];
		var sAllowed = objRE[1];
		var sMsg = objRE[2];
		if (sType == 'R') {
			if (!sAllowed.test(objElement.value)) {
				if (elementFocusCheck(objElement, strType)) {
					if (isEmpty(sMsg)) { verifyMessage(strWhere, 'notValid', strDisplayName); } else { alert(sMsg); }
					return false;
				} else {
					//will have to ignore as not visible (hidden by selections)
				}
			}//if
		} else if (sType == 'L1') { //9=numeric, a=alpha, x=alphanumeric
			var iCharAtAllowed = '', iCharAtEntered = '', isOkay = true, sEntered = objElement.value;
			//make sure lengths are the same
			if (sAllowed.length != sEntered.length) {
				if (elementFocusCheck(objElement, strType)) {
					if (isEmpty(sMsg)) { verifyMessage(strWhere, 'notValid', strDisplayName); } else { alert(sMsg); }
					return false;
				} else {
					//will have to ignore as not visible (hidden by selections)
				}
			}
			//check each character
			for (i = 0; i < sAllowed.length && isOkay == true; i++) {
				iCharAtAllowed = sAllowed.charCodeAt(i); //charAt
				iCharAtEntered = sEntered.charCodeAt(i); // charAt
				if (iCharAtAllowed == 57) { //9 = numeric = char:57
					if (iCharAtEntered >= 48 && iCharAtEntered <= 57) //0=48 --> 9=57
						isOkay = true;
					else
						isOkay = false;
				} else if (iCharAtAllowed+'' == '97') { // a = alpha = char:97
					if ((iCharAtEntered >= 97 && iCharAtEntered <= 122) || (iCharAtEntered >= 65 && iCharAtEntered <= 90)) //a=97 --> z=122 && A=65 --> Z=90
						isOkay = true;
					else
						isOkay = false;
				} else if (iCharAtAllowed+'' == '120') { // x = alphanumeric = char:120
					
				} else {
					if (iCharAtAllowed == iCharAtEntered)
						isOkay = true;
					else
						isOkay = false;
				}
			}
			if (!isOkay) {
				if (elementFocusCheck(objElement, strType)) {
					if (isEmpty(sMsg)) { verifyMessage(strWhere, 'notValid', strDisplayName); } else { alert(sMsg); }
					return false;
				} else {
					//will have to ignore as not visible (hidden by selections)
				}
			}
		}//if
	}//if
	return true;
}//verifyType

function checkImageField(theObject)
{
	theExt = theObject.value.substring((theObject.value.length - 4));
	theExt = theExt.toLowerCase();
	if ((theExt == '.jpg')||(theExt == 'jpeg')||(theExt == '.jpe')||(theExt == '.png')||(theExt == '.bmp')||(theExt == '.gif'))
	{
		var bolOK = true;
	}
	else
	{
		var bolOK = false;
	}
	if ((bolOK == false) || (isEmpty(theObject.value))) {
		if (elementFocusCheck(theObject, 'currency')) { 
			verifyMessage('', 'notValidImage', '');
			return false;
		}//if
	} // if
}//checkImageField