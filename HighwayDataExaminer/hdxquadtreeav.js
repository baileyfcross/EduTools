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

    //show which waypoint is being added
    nextToCheck: 0,
    //# leaf quadrants so far
    numLeafQuads: 0,
    // # empty quadtrees
    numEmptyQuads: 0,
    //refinement threshold, should be deterimined with a fill in box before the av runs
    refinement: 3,

    // list of polylines showing the universe bounds
    // and divisions between quadtrees, updated by
    // directionalBoundingBox function below
    boundingPoly: [],

    quadtree: null,

    avActions: [
        {
            label: "START",
            comment: "creating bounding box that contains all waypoints",
            code: function(thisAV){
                //other stuff needs to go here but at least the boundingBox should be generated from here
                thisAV.generateBoundingBox();
            },
            logMessage: function(thisAV){
                return "Creating bounding box that contains all waypoints"
            }


        },
        {
            label: "cleanup",
            comment: "cleanup and updates at the end of the visualization",
            code: function(thisAV) {
                hdxAV.algStat.innerHTML =
                    "Done! Visited " + waypoints.length + " waypoints.";
                updateAVControlEntry("undiscovered", "0 vertices not yet visited");
                updateAVControlEntry("visiting", "");
                hdxAV.nextAction = "DONE";
                hdxAV.iterationDone = true;
                
            },
            logMessage: function(thisAV) {
                return "Cleanup and finalize visualization";
            }
        }
    ],

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
        let newAO = 'Refinement threshold <input type="number" id="minPoints" min="1" max="' 
        + (waypoints.length) + '" value="3">';
        hdxAV.algOptions.innerHTML = newAO;
        addEntryToAVControlPanel("totalChecked", visualSettings.visiting);
        addEntryToAVControlPanel("savedCheck", visualSettings.undiscovered); 
    },

    cleanupUI() {
        
    },

    idOfAction(action) {
	
        return action.label;
    },
    //this function generates the bounding box that represents the universe of the quadtree
    generateBoundingBox(){
        let n = waypoints[0].lat;
        let s = waypoints[0].lat;
        let e = waypoints[0].lon;
        let w = waypoints[0].lon;
        for(var i = 1; i < waypoints.length; i++){

            if(waypoints[i].lat > n){
                n = waypoints[i].lat;
            } else if (waypoints[i].lat < s){
                s = waypoints[i].lat;
            }
            if(waypoints[i].lon > e){
                e = waypoints[i].lon;
            } else if (waypoints[i].lon < w){
                w = waypoints[i].lon;
            }
        }

        //creating the polylines for the bounding box
        let nEnds = [[n,w],[n,e]];
        let sEnds = [[s,w],[s,e]];
        let eEnds = [[n,e],[s,e]];
        let wEnds = [[n,w],[s,w]];

            this.boundingPoly.push(
                L.polyline(nEnds, {
                    color: hdxVertexExtremesSearchAV.categories[0].visualSettings.color,
                    opacity: 0.6,
                    weight: 3
                })
            );
            this.boundingPoly.push(
                L.polyline(sEnds, {
                    color: hdxVertexExtremesSearchAV.categories[1].visualSettings.color,
                    opacity: 0.6,
                    weight: 3
                })
            );
            this.boundingPoly.push(
                L.polyline(eEnds, {
                    color: hdxVertexExtremesSearchAV.categories[2].visualSettings.color,
                    opacity: 0.6,
                    weight: 3
                })
            );
            this.boundingPoly.push(
                L.polyline(wEnds, {
                    color: hdxVertexExtremesSearchAV.categories[3].visualSettings.color,
                    opacity: 0.6,
                    weight: 3
                }) 
            );

            for (var i = 0; i < 4; i++) {
                this.boundingPoly[i].addTo(map);
            }
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
    
    //determines the refinement factor of the quadtree
    this.refinement = refinement;

    //contains waypoint objects
    points = [];

    this.refineIfNeeded = function() {
        if (points.length > refinement){
            this.sw = Quadtree(latMin, midLat, lngMin, midLng, refinement);
            this.nw = Quadtree(midLat, latMax, lngMin, midLng, refinement);
            this.se = Quadtree(latMin, midLat, midLng, lngMax, refinement);
            this.ne = Quadtree(midLat, latMax, midLng, lngMax, refinement);
            for(var i = 0; i < points.length; i++){
                childThatContains(points[i].lat,points[i],points[i].lon).push(points[i]);
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
    this.get = function(lat,lng){
        if(isLeaf()){
            for(var i = 0; i < points.length; i++){
                if(points[i].lat == lat && points[i].lon == lng){
                    return points[i];
                }
            }
            return null;
        } 
        //if not a leaf return the quadtree that would contain this point
        return childThatContains(lat,lng).get(lat,lng);
    }
    this.isLeaf = function(){
        return se == null;
    }
    this.add = function(waypoint){
        if(isLeaf){
            points.push(waypoint);
            this.refineIfNeeded();
        } else {
            this.childThatContains(waypoint.lat,waypoint.lon).add(waypoint);
        }
    }
}