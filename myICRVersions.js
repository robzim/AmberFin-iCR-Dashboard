function getHTTPObject() {
var xhr;
if(window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}  // end if window.XMLHt
else if(window.ActiveXObject)   {
	//xhr = new ActiveXObject("Msxml2.XMLHTTP");
	//xhr = new ActiveXObject("MSXML2.XMLHTTP.3.0");
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}  // end if window.Active
	return xhr;
}   // end function getHTTPObject


var myResponse = "VOID";


document.write('<table border="1">');
for ( ip = 0 ; ip < myIcrs.length ; ip++ )
	{
	document.write("<tr>");
	document.write("<td> " + myIcrNames[ip] + " </td>");
	document.write("<td> " + myIcrs[ip] + " Software Version = </td>");
	document.write("<td id=" + myIcrs[ip] + ">" + " WAITING " + "</td>");
	document.write("</tr>");
	}
document.write("</table>");
//document.write('<button type="button" onclick="displayStatus()">Get iCR Software Versions</button>');
document.write('<br><br><a href="iCR Dashboard.html">Back to Dashboard</a> <br>');

function displayStatus() {
for ( i = 0 ; i < myIcrs.length ; i++ ) {
	(function(i) {
		//try {console.log(i); }
		//catch(e) {};
		var myxmlhttp = new Array();
		myxmlhttp[i] = getHTTPObject();
		WEBSERVICE_NAMESPACE = "http://snellwilcox.com/xmlbinding/icr/2007/04/control";
		/* The web method to invoke */
		WEBSERVICE_METHOD 	 = "getVersion";
		WEBSERVICE_URL = "http://" + myIcrs[i] + ":8080/icr/ICRControl";
		try {
		myxmlhttp[i].onreadystatechange = function() {
		if (4==myxmlhttp[i].readyState)  {
			if (  200==myxmlhttp[i].status ) {
				// we have to parse the returned XML here and find the 'return' object.
				myResp = myxmlhttp[i].responseXML.getElementsByTagName("return")[0].childNodes[0].nodeValue
				document.getElementById(myIcrs[i]).innerHTML=myResp;
			} // endif 200=
		} // endif 4=
			//else alert("i readyState not 4..." + myxmlhttp[i].readyState);
		//else alert("i status not 200 ..." + myxmlhttp[i].status);
		}  // end anonymous readystatchange function
		// we are here because we dont get the status200 and readyState4 that we need
		document.getElementById(myIcrs[i]).innerHTML="NO RESPONSE";
		}

		catch (myErr) {alert('ONREADYSTATCHANGE FAILED ' + myIcrs[i]);}
		try { myxmlhttp[i].open("POST", WEBSERVICE_URL, true); }
		catch (myErr) { alert('OPEN FAILED TO ' + myIcrs[i]);}
		try{ myxmlhttp[i].setRequestHeader("Content-Type", "text/xml"); }
		catch (myErr) { alert('SETRUQUESTHEADER CONTENT-TYPE FAILED TO ' + myIcrs[i]);}
		try { myxmlhttp[i].setRequestHeader("SOAPAction", WEBSERVICE_NAMESPACE + "/" + WEBSERVICE_METHOD ); }
		catch (myErr) { alert('SETRUQUESTHEADER SOAPACTION FAILED TO ' + myIcrs[i]);}
		try { myxmlhttp[i].send('<?xml version="1.0" ?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/"><S:Body><'
			+ WEBSERVICE_METHOD + ' xmlns="' + WEBSERVICE_NAMESPACE + '"/></S:Body></S:Envelope>'); }
		catch (myErr) {alert('SEND FAILED TO ' + myIcrs[i]);}
 	})(i); // end of function(i)
	} // end for loop
}  // end of displayStatus() function


function getHTTPObject() {
  var xmlhttp = false;
  if (window.XMLHttpRequest) {
   xmlhttp = new XMLHttpRequest();
  } else if(window.ActiveXObject) {
   try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
   } catch (e) {
    try {
     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
     xmlhttp = false;
    }
   }
  }
  return xmlhttp;
 };


