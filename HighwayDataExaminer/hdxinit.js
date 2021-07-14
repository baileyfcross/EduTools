//
// HDX startup function
//
// Author: Jim Teresco, December 2020
//
// This function replaces the previous list of functions that the main
// HDX page calls on page load

function HDXInit() {

    // get query string parameters
    HDXInitQS();
    
    // TravelMapping's loadmap
    loadmap();

    // graph selector data initialization
    //HDXGraphSearchInit();

    // HDX menuing system initialization
    defaultMenu();

    // HDX AV initialization (could delay?)
    hdxAV.initOnLoad();
    
    // create the tabs for HDX instructions popup
    createTabs();

    // if the units= QS parameter is present, honor it if valid
    if (HDXQSIsSpecified("units")) {
	let units = HDXQSValue("units");
	if (units == "miles" || units == "km" ||
	    units == "ft" || units == "meters") {
	    // set variable inherited from TM
	    distanceUnits = units;
	    // store it also in a browser cookie
	    setTMCookie("units", units);
	}
    }
    else {
	// otherwise see if we have a cookie, default to miles
	// if not
	distanceUnits = getTMCookie("units");
	if (distanceUnits == "") distanceUnits = "miles";
    }
    
    // if the load= QS parameter is present, try to load the file
    // from the graphdata on the server
    if (HDXQSIsSpecified("load")) {
	HDXReadFileFromWebServer(HDXQSValue("load"));
    }
    
    map.on('baselayerchange', newMapTileSelected);
}
