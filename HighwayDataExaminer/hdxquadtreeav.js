//
// HDX Quadtree construction AV
//
// METAL Project
//
// Primary Authors: Jim Teresco
//

var hdxQuadtreeAV = {

    // entries for list of AVs
    value: "quadtree",
    name: "Quadtree Construction",
    description: "Construct a quadtree by inserting all waypoints and refining as needed.",

    //show which way point is being added
    nextToCheck: 0,
    //# leaf quadrants so far
    numLeafQuads: 0,
    // # empty quadtrees
    numEmptyQuads: 0,
    //refinement threshold
    refinement: 3,

    // list of polylines showing the universe bounds
    // and divisions between quadtrees, updated by
    // directionalBoundingBox function below
    boundingPoly: [],

    quadtree: null,

    code: "TBD",
    
    prepToStart() {
    },
    
    nextStep() {

    },

    setupUI() {
        hdxAV.algStat.style.display = "";
        hdxAV.algStat.innerHTML = "Setting up";
        hdxAV.logMessageArr = [];
        hdxAV.logMessageArr.push("Setting up");
        let newAO = 'Refinement threshold <input type="number" id="minPoints" min="3" max="' 
        + (waypoints.length - 1)/2 + '" value="3">';
        hdxAV.algOptions.innerHTML = newAO;
        addEntryToAVControlPanel("totalChecked", visualSettings.visiting);
        addEntryToAVControlPanel("savedCheck", visualSettings.undiscovered); 
    },

    cleanupUI() {
        
    }
};

//Quadtree object constructor
function Quadtree(latMin,latMax,lngMin,lngMax,refinement){
    this.latMax = latMax;
    this.lngMax = lngMax;
    this.latMin = latMin;
    this.lngMin = lngMin;
    this.midLat = (latMax + latMin) / 2;
    this.midLng = (lngMax + lngMin) / 2;
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
    

    this.refinement = refinement;
    points = [];

    this.refineIfNeeded = function() {
        if (points.length > refinement){
            this.sw = Quadtree(latMin, midLat, lngMin, midLng, refinement);
            this.nw = Quadtree(midLat, latMax, lngMin, midLng, refinement);
            this.se = Quadtree(latMin, midLat, midLng, lngMax, refinement);
            this.ne = Quadtree(midLat, latMax, midLng, lngMax, refinement);
            for(var i = 0; i < points.length; i++){
                childThatContains(points[i].lat,points[i],points[i].lng).push(points[i]);
            }
        }
    }
    this.childThatContains = function(lat,lng){
        if (lat < midLat) {
            if (lng < midLng) {
            return sw;
            }
            else {
            return se;
            }
        }
        else {
            if (lng < midlng) {
            return nw;
            }
            else {
            return ne;
            }
    }
}

function Coordinate(lat,lng){
    this.lat = lat;
    this.lng = lng;
}