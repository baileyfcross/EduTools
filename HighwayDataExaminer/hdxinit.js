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

    console.log(HDXQS);
    
    // TravelMapping's loadmap
    loadmap();

    // graph list for data load menu (load later on demand?)
    getDescriptions();
    getGraphs();

    // HDX AV initialization (could also delay?)
    hdxAV.initOnLoad();
    
    // create the tabs for HDX instructions popup
    createTabs();
}
