//
// HDX Traversal Orderings AV
//
// METAL Project
//
// Primary Author: Luke Jennings
//

var hdxOrderingAV = {
    value: "ordering",
    name: "Traversal Orderings",
    decription: "Visualize different ways of ordering vertices in a 2D space.",

    //used to track the num of the two verticies we are drawing an edge between
    v1: 0,
    v2: 0,

    //used to help calculate Hilbert Curve Order
    xCoord: 0,
    yCoord: 0,

    //default refinement threshold for the quadtree used by the morton order
    //deterimined with an i/o box before the av runs
    refinement: 3,

    supportRefinement: false,

    //loop variable that tracks which point is currently being added to graph
    nextToCheck: -1,
    //rainbow object that returns the color for the polylines
    rainbowGradiant: new Rainbow(),
    
    //used to keep track of all the polylines added to the map
    polyLines: [],

    originalWaypoints: [],
    //fhc: fixedHilbertCurve(),
    numVUndiscovered: waypoints.length,

    mortonQT: null,

    avActions: [
        {
            label: "START",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);
                thisAV.nextToCheck = -1;
                thisAV.polyLines = [];

                thisAV.originalWaypoints = waypoints.slice();
                numVUndiscovered = waypoints.length,

                thisAV.xCoord = 0;
                thisAV.yCoord = 0;

                thisAV.rainbowGradiant = new Rainbow();
                thisAV.rainbowGradiant.setNumberRange(0,waypoints.length);
                thisAV.rainbowGradiant.setSpectrum('ff0000','ffc000','00ff00','00ffff','0000ff','c700ff');
                //let fhc = fixedHilbertCurve();

                updateAVControlEntry("undiscovered",thisAV.numVUndiscovered + " vertices not yet visited");

                thisAV.option = document.getElementById("traversalOrdering").value;
                thisAV.refinement = document.getElementById("refinement").value;

                hdxAV.nextAction = "topForLoop";
                switch(thisAV.option){
                    case "morton":
                        thisAV.findExtremePoints();
                        thisAV.mortonQT = new Quadtree(thisAV.s,thisAV.n,thisAV.w,thisAV.e,thisAV.refinement);
                        for(var i = 0; i < waypoints.length; i++){
                            waypoints[i].num = i;
                            thisAV.mortonQT.add(waypoints[i]);
                        }
                        waypoints = [];
                        mortonOrder(thisAV.mortonQT,waypoints);
                    default:
                        for(var i = 0; i < waypoints.length; i++){
                            waypoints[i].num = i;
                        }
                    break;
                }

                switch(thisAV.option){
                    case "byLat":
                        waypoints.sort(function(a, b){return a.lat - b.lat});
                        break;
                    case "byLng":
                        waypoints.sort(function(a, b){return a.lon - b.lon});
                        break;
                    case "rand":
                        waypoints.sort(function(a, b){return Math.random() * 2 - 1});
                        break;
                    case "fixedHilbert":
                    //case "fixedGrey":
                        waypoints.sort(function(a, b){return a.value - b.value});
                        break;
                    case "morton":
                        break;
                    case "default":
                        waypoints.sort(function(a,b){return a.num - b.num});
                    default:
                        break;
                };

            },
            logMessage: function(thisAV){
                return "Sorting waypoints based on the selected ordering";
            }

        },

        {
            label: "topForLoop",
            comment: "",
            code: function(thisAV){

                highlightPseudocode(this.label, visualSettings.visiting);
                thisAV.nextToCheck++;

                
                if(thisAV.nextToCheck < waypoints.length - 1){
                    thisAV.v1 = waypoints[thisAV.nextToCheck].num;
                    thisAV.v2 = waypoints[thisAV.nextToCheck + 1].num;
                    updateMarkerAndTable(thisAV.v1, visualSettings.v1,
                        30, false);
                    updateMarkerAndTable(thisAV.v2, visualSettings.v2,
                        30, false);

                    hdxAV.nextAction = "addEdge";

                    numVUndiscovered--;
                    updateAVControlEntry("undiscovered",thisAV.numVUndiscovered + " vertices not yet visited");
                    updateAVControlEntry("v1","v1: #" + thisAV.v1 + " " + waypoints[thisAV.nextToCheck].label);
                    updateAVControlEntry("v2","v2: #" + thisAV.v2 + " " + waypoints[thisAV.nextToCheck + 1].label);

                } else {
                    hdxAV.nextAction = "cleanup";
                }
            
                hdxAV.iterationDone = true;

            },
            logMessage: function(thisAV){
                return "Iterating over the sorted array of vertices";
            }

        },

        {
            label: "addEdge",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);
                let color = {
                    color: "#" + thisAV.rainbowGradiant.colorAt(
                        thisAV.nextToCheck),
                        textColor: "white",
                        scale: 6,
                        name: "color",
                        value: 0,
                        opacity: 0.8
                    }
                updateMarkerAndTable(thisAV.v1, color, 30, false);
                updateMarkerAndTable(thisAV.v2, color, 30, false);

 
                thisAV.drawLineVisiting();
                hdxAV.nextAction = "topForLoop"

            },
            logMessage: function(thisAV){
                return "Adding edge between " + waypoints[thisAV.nextToCheck].num + " and "
                    + waypoints[thisAV.nextToCheck + 1].num;
            }

        },
        {
            label: "cleanup",
            description: "",
            code: function(thisAV){
                waypoints = thisAV.originalWaypoints;
                hdxAV.algStat.innerHTML =
                "Done! Visited " + waypoints.length + " waypoints.";
                hdxAV.nextAction = "DONE";
                updateAVControlEntry("undiscovered","0 vertices not yet visited");
                updateAVControlEntry("v1","");
                updateAVControlEntry("v2","");
        
                hdxAV.iterationDone = true;
            },
            logMessage: function(thisAV) {
                return "Cleanup and finalize visualization";
            }
        }


        
    ],

    prepToStart() {
        hdxAV.algStat.innerHTML = "Initializing";
        let lineCount = 0;
        updateMap();
        initWaypointsAndConnections(true, false, visualSettings.undiscovered);
        this.Stack = new HDXLinear(hdxLinearTypes.STACK,
            "Stack");this.Stack = new HDXLinear(hdxLinearTypes.STACK,
            "Stack");

        //pseudocode
        this.code = '<table class="pseudocode"><tr id="START" class="pseudocode"><td class="pseudocode">';
        this.code += `g &larr; new Graph(V[], null)<br />`;
        this.code += `sortedV[] &larr; sort(V)`;


        this.code += '</td></tr>' +
            pcEntry(0,'for(check &larr; 0 to |sortedV| - 1)',"topForLoop");
        
        this.code += '</td></tr>' +
            pcEntry(1,'g.addEdge(sortedV[check], sortedV[check + 1])',"addEdge");

    },
    setupUI() {
        hdxAV.algStat.style.display = "";
        hdxAV.algStat.innerHTML = "Setting up";
        hdxAV.logMessageArr = [];
        hdxAV.logMessageArr.push("Setting up");
        //I'm going to need to learn how to make the AO change depending on which ordering is selected


        let newAO = `Order: <select id="traversalOrdering" onchange="refinementChanged();">
        <option value="byLat">By Latitude</option>
        <option value="byLng">By Longitude</option>
        <option value="rand">Random</option>
        <option value="morton">Morton/Z Curve</option>
        <option value="default">Default</option>

        <!--<option value="fixedGrey">Fixed Grey Curve</option>-->
        <!--option value="fixedHilbert">Fixed Hilbert Curve</option-->
        </select>`;

        newAO += '<br />Refinement/Iteration<input type="number" id="refinement" min="1" max="' 
        + (waypoints.length) + '" value="3">';

        hdxAV.algOptions.innerHTML = newAO;

        addEntryToAVControlPanel("undiscovered", visualSettings.undiscovered); 
        addEntryToAVControlPanel("v1",visualSettings.v1);
        addEntryToAVControlPanel("v2", visualSettings.v2);


        let refSelector = document.getElementById("refinement");
        refSelector.disabled = true;
    },

    cleanupUI() {
        waypoints = this.originalWaypoints;
        for(var i = 0; i < this.polyLines.length; i++){
            this.polyLines[i].remove();
        }
        this.polyLines = [];

    },

    idOfAction(action) {
	
        return action.label;
    },
    //this was copied directly over from hdxextremepairsav with some slight modifications
    drawLineVisiting() {

        let visitingLine = [];
        visitingLine[0] = [waypoints[this.nextToCheck].lat, waypoints[this.nextToCheck].lon];
        visitingLine[1] = [waypoints[this.nextToCheck + 1].lat, waypoints[this.nextToCheck + 1].lon];
        this.polyLines.push(
            L.polyline(visitingLine, {
            color: "#" + this.rainbowGradiant.colorAt(
               this.nextToCheck),
            opacity: 0.6,
            weight: 4
            })
        );
        for(var i = 0; i < this.polyLines.length; i++){
            this.polyLines[i].addTo(map);
        }  

    },

    inverseHilbert(n,x,y){
        let rx, ry, s, d = 0;
        for(s = n/2; s > 0; s = s/2){
           // console.log(s);
            //this calculates the orientation of the section
            //of the Hilbert curve
            rx = (x & s) > 0;
           // console.log(rx);
            ry = (y & s) > 0;
            //console.log(ry);
            //this is what actually calculates the double value
            d += s * s * ((3 * rx) ^ ry);
            //console.log(d);
            this.xCoord = x;
            this.yCorrd = y;
            this.rotate(n,rx,ry);
        }
        return d;
    },

    rotate(n, rx, ry) {
        if (ry == 0) {
            if (rx == 1) {
                this.xCoord = n-1 - this.xCoord;
                this.yCoord = n-1 - this.yCoord;
            }
    
            //Swap x and y
            let t  = this.xCoord;
            this.xCoord = this.yCoord;
            this.yCoord = t;
        }
    },

    setConditionalBreakpoints(name) {
        return "No innerHTML";
    },
    hasConditionalBreakpoints(name){
        return false;
    },

    findExtremePoints(){
        this.n = parseFloat(waypoints[0].lat);
        this.s = parseFloat(waypoints[0].lat);
        this.e = parseFloat(waypoints[0].lon);
        this.w = parseFloat(waypoints[0].lon);
        for(var i = 1; i < waypoints.length; i++){

            if(waypoints[i].lat > this.n){
                this.n = parseFloat(waypoints[i].lat);
            } else if (waypoints[i].lat < this.s){
                this.s = parseFloat(waypoints[i].lat);
            }
            if(waypoints[i].lon > this.e){
                this.e = parseFloat(waypoints[i].lon);
            } else if (waypoints[i].lon < this.w){
                this.w = parseFloat(waypoints[i].lon);
            }
        }
    }
};

function refinementChanged(){
    let selector = document.getElementById("traversalOrdering");
    let refSelector = document.getElementById("refinement");
    switch(selector.options[selector.selectedIndex].value){
        case "fixedHilbert":
        //case "fixedGrey":
            refSelector.disabled = false;
            break;
        default:
            refSelector.disabled = true;
            break;
    }
        
};

/* function fixedHilbertCurve(){

    this.pointToDist = function(n,x,y){
        let rx, ry, s, d = 0;
        for(s = n/2; s > 0; s /= 2){
            //this calculates the orientation of the section
            //of the Hilbert curve
            rx = (x & s) > 0;
            ry = (y & s) > 0;
            //this is what actually calculates the double value
            d += s * s * ((3 * rx) ^ ry);
            this.x = x;
            this.y = y;
            this.rotate(n,rx,ry);
        }
        return d;
    }

    this.rotate = function(n, rx, ry) {
        if (ry == 0) {
            if (rx == 1) {
                this.x = n-1 - this.x;
                this.y = n-1 - this.y;
            }
    
            //Swap x and y
            let t  = this.x;
            this.x = this.y;
            this.y = t;
        }
    }
} */


/* hdxOrderingAV.extraAlgOptions = `<br />
Order: <select id="traversalOrdering">
<option value="byLat">Order by Latitude</option>
<option value="byLng">Order by Longitude</option>
<option value="rand">Random Order</option>
<option value="morton">Morton/Z Order</option>
<option value="hilbert">Hilbert Curve Order</option>
</select>`; */

// waypoints[i].value = thisAV.inverseHilbert(
//     Math.pow(2,thisAV.refinement),waypoints[i].lon * Math.pow(10,6),waypoints[i].lat * Math.pow(10,6));
// console.log(waypoints[i].value);