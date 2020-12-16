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
    HDXGraphSearchInit();

    // HDX AV initialization (could delay?)
    hdxAV.initOnLoad();
    
    // create the tabs for HDX instructions popup
    createTabs();

    // if the load= QS parameter is present, try to load the file
    // from the graphdata on the server
    if (HDXQSIsSpecified("load")) {
	HDXReadFileFromWebServer(HDXQSValue("load"));
    }
}
