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
    v1 = 0,
    v2 = 0,

    //used to help calculate Hilbert Curve Order
    x = 0,
    y = 0,

    //loop variable that tracks which point is currently being added to graph
    nextToCheck: -1,
    sortedWaypoints = [],
    
    //used to keep track of all the polylines added to the map
    polyLines = [],

    avActions: [
        {
            label: "START",
            comment: "",
            code: function(thisAV){
                thisAV.nextToCheck = -1;

                hdxAV.nextAction = "topForLoop";

            },
            logMessage: function(thisAV){
                return "Sorting waypoints based on the selected ordering";
            }

        },

        {
            label: "topForLoop",
            comment: "",
            code: function(thisAV){
                nextToCheck++;

                
                if(nextToCheck < wayPoints.length){
                hdxAV.nextAction = "topForLoop";
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

                hdxAV.nextToCheck = "topForLoop"

            },
            logMessage: function(thisAV){
                return "Adding edge between" + thisAV.sortedWaypoints[thisAV.nextToCheck].num + "and"
                    + thisAV.sortedWaypoints[thisAV.nextToCheck + 1].num;
            }

        },
        
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
            pcEntry(1,'g.addEdge(order[i], order[i + 1])',"addEdge");

    },
    setupUI() {
        hdxAV.algStat.style.display = "";
        hdxAV.algStat.innerHTML = "Setting up";
        hdxAV.logMessageArr = [];
        hdxAV.logMessageArr.push("Setting up");
        //I'm going to need to learn how to make the AO change depending on which ordering is selected


        //let newAO = 'Refinement threshold <input type="number" id="refinement" min="1" max="' 
        //+ (waypoints.length) + '" value="3">';
        //hdxAV.algOptions.innerHTML = newAO;

    },

    cleanupUI() {

    },

    idOfAction(action) {
	
        return action.label;
    },

    //this was copied directly over from hdxextremepairsav
    drawLineVisiting() {

        let visitingLine = [];
        visitingLine[0] = [waypoints[this.v1].lat, waypoints[this.v1].lon];
        visitingLine[1] = [waypoints[this.v2].lat, waypoints[this.v2].lon];
        this.lineVisiting = L.polyline(visitingLine, {
            color: visualSettings.visiting.color,
            opacity: 0.6,
            weight: 4
        });
        this.lineVisiting.addTo(map);   
    },

    inverseHilbert(n,x,y){
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
            rot(n,rx,ry);
        }
    },

    rot(n, rx, ry) {
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
};

comparator(a,b){
    if(a.value < b.value){
        return -1;
    } else if (a.value > b.value){
        return 1;
    } else {
        return 0;
    }
}


/* hdxOrderingAV.extraAlgOptions = `<br />
Order: <select id="traversalOrdering">
<option value="byLat">Order by Latitude</option>
<option value="byLng">Order by Longitude</option>
<option value="rand">Random Order</option>
<option value="morton">Morton/Z Order</option>
<option value="hilbert">Hilbert Curve Order</option>
</select>`; */