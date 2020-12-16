//
// HDX Query String parameter parsing
//
// Author: Jim Teresco, December 2020
//

// this object will be populated with properties that are the QS
// parameter names and values of those properties will be the QS
// parameter values
//
// the QS parameter load=NY-region-collapsed.tmg would result in
//
// HDXQS.load = "NY-region-collapsed.tmg"
//
// being one of its properties
var HDXQS = new Object();

// populate the object - this should be called on page load
function HDXInitQS() {
    
    // get the part of the URL that would contain QS parameters
    var qs = location.search.substring(1);

    // split into the QS parameters
    var qsitems = qs.split('&');

    // for each one, get the parameter and value and add
    // properties to the object
    for (let i = 0; i < qsitems.length; i++) {
        var qsitem = qsitems[i].split('=');
	if (qsitem.length > 1) {
	    HDXQS[qsitem[0]] = qsitem[1];
	}
	else {
	    HDXQS[qsitem[0]] = "";
	}
    }
}

// old load code:
/*
        if (qsitem[0] == "load") {
            var request = new XMLHttpRequest();
            //DBG.write("qsitem[1] = " + qsitem[1]);
            document.getElementById('filename').innerHTML = qsitem[1];
            request.open("GET", qsitem[1], false);
            request.setRequestHeader("User-Agent", navigator.userAgent);
            request.send(null);
            if (request.status == 200) {
                processContents(request.responseText);
            }
        }
*/
