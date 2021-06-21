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
    //this is used to determine the universe of our quadtree
    n: 0,
    e: 0,
    w: 0,
    s: 0,

    quadtreeVList: [],
    numVQuadtree: 0,
    // this to work like the call stack in recursive dfs so we can track exactly what quadtree
    // is adding what point so we can better demonstrate the recursive nature of quadtrees
    currentQuadtree: null,
    // this is used to return to the specific location in the pseudocode when necessary
    callStack: [],
    //this is used to find what specific quadtree a point is being added to
    qtStack: [],

    //show which waypoint is being added
    nextToCheck: 0,
    //# leaf quadrants so far
    numLeafQuads: 0,
    // # empty quadtrees
    numEmptyQuads: 0,
    //refinement threshold, should be deterimined with a fill in box before the av runs
    refinement: 3,
    //loop common variable for the refinement loop
    refI: 0,
    //remaining waypoints to be added to the tree
    numVUndiscovered: waypoints.length,

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
                highlightPseudocode(this.label, visualSettings.visiting);
                thisAV.quadtreeVList = [];
                thisAV.refinement = document.getElementById("refinement").value;
                thisAV.nextToCheck = 0;
                thisAV.numLeafQuads = 0;
                thisAV.callStack = [];
                thisAV.qtStack = [];
                thisAV.refI = 0; 
                thisAV.numVUndiscovered = waypoints.length;


                //other stuff needs to go here but at least the boundingBox should be generated from here
                thisAV.boundingPoly = [];
                thisAV.generateBoundingBox();
                console.log(thisAV.s);
                console.log(thisAV.n);
                console.log(thisAV.e);
                console.log(thisAV.w);

                thisAV.currentQuadtree = new Quadtree(thisAV.s,thisAV.n,thisAV.w,thisAV.e,thisAV.refinement);

                console.log((parseFloat(thisAV.s) + parseFloat(thisAV.n)) / 2);
                console.log(thisAV.currentQuadtree.midLat);


                hdxAV.iterationDone = true;
                hdxAV.nextAction = "topForLoop";
            },
            logMessage: function(thisAV){
                return "Creating bounding box that contains all waypoints";
            }

        },

        {
            label: "topForLoop",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone = true;
                if(thisAV.numVUndiscovered > 0){
                    updateMarkerAndTable(thisAV.nextToCheck, visualSettings.visiting,
                        30, false);
                    hdxAV.nextAction = "topAddPoint";
                } else {
                    hdxAV.nextAction = "cleanup";
                }

            },
            logMessage: function(thisAV){
                return "Top of main for loop over vertices, check=" + thisAV.nextToCheck;
            }

        },

        {
            label: "topAddPoint",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);


                
                hdxAV.iterationDone = true;
                hdxAV.nextAction = "bottomAddPoint";

            },
            logMessage: function(thisAV){
                return "Adding vertex " + thisAV.nextToCheck + " to quadtree";
            }

        },

        {
            label: "bottomAddPoint",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);
                
                hdxAV.iterationDone = true;
                hdxAV.nextAction = "isLeaf";

            },
            logMessage: function(thisAV){
                return "Calling method that adds vertex " + thisAV.nextToCheck + " to quadtree";
            }

        },

        {
            label: "isLeaf",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone = true;

                if(thisAV.currentQuadtree.isLeaf()){
                    hdxAV.nextAction = "pushPoint";
                }  else {
                    hdxAV.nextAction = "notLeafFindChild";
                }

            },
            logMessage: function(thisAV){
                return "Checking if the current quadtree is a leaf";
            }

        },

        {
            label: "pushPoint",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                thisAV.currentQuadtree.points.push(waypoints[thisAV.nextToCheck]);

                hdxAV.iterationDone = true;
                hdxAV.nextAction = "ifRefine";

            },
            logMessage: function(thisAV){
                return "Adding vertex #" + thisAV.nextToCheck + " " + waypoints[thisAV.nextToCheck].label + " to points";
            }

        },

        {
            label: "ifRefine",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone  = true;
                if(thisAV.currentQuadtree.points.length < thisAV.refinement){
                    updateMarkerAndTable(thisAV.nextToCheck, visualSettings.spanningTree,
                        30, false);
                    hdxAV.nextAction = "topForLoop";
                    thisAV.nextToCheck++;
                } else {
                    hdxAV.nextAction = "makeChildren";
                }
            },
            logMessage: function(thisAV){
                return "Checking if our quadtree leaf has more vertices than the refinement threshold";
            }

        },

        {
            label: "makeChildren",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);
                
                console.log(thisAV.currentQuadtree);
                console.log(thisAV.currentQuadtree.sw);

                thisAV.currentQuadtree.nw = new Quadtree(thisAV.currentQuadtree.midLat,  thisAV.currentQuadtree.maxLat,  thisAV.currentQuadtree.minLng,  thisAV.currentQuadtree.midLng,  thisAV.refinement);
                thisAV.currentQuadtree.ne = new Quadtree(thisAV.currentQuadtree.midLat,  thisAV.currentQuadtree.maxLat,  thisAV.currentQuadtree.midLng,  thisAV.currentQuadtree.maxLng, thisAV.refinement);
                thisAV.currentQuadtree.sw = new Quadtree(thisAV.currentQuadtree.minLat,  thisAV.currentQuadtree.midLat,  thisAV.currentQuadtree.minLng,  thisAV.currentQuadtree.midLng, thisAV.refinement);
                thisAV.currentQuadtree.se = new Quadtree(thisAV.currentQuadtree.minLat,  thisAV.currentQuadtree.midLat,  thisAV.currentQuadtree.midLng,  thisAV.currentQuadtree.maxLng, thisAV.refinement);
                let nsEdge = [[thisAV.currentQuadtree.minLat,thisAV.currentQuadtree.midLng],[thisAV.currentQuadtree.maxLat,thisAV.currentQuadtree.midLng]];
                let ewEdge = [[thisAV.currentQuadtree.midLat,thisAV.currentQuadtree.minLng],[thisAV.currentQuadtree.midLat,thisAV.currentQuadtree.maxLng]];

                console.log(thisAV.currentQuadtree.sw);
                console.log(nsEdge);
                
                thisAV.boundingPoly.push(
                    L.polyline(nsEdge, {
                        color: visualSettings.undiscovered.color,
                        opacity: 0.6,
                        weight: 3
                    })
                );
                thisAV.boundingPoly.push(
                    L.polyline(ewEdge, {
                        color: visualSettings.undiscovered.color,
                        opacity: 0.6,
                        weight: 3
                    })
                );

                //this will overwrite existing polylines
                for(var i = 0; i < thisAV.boundingPoly; i++){
                    thisAV.boundingPoly.addTo(map);
                }

                hdxAV.iterationDone = true;
                hdxAV.nextAction = "topRefLoop";

            },
            logMessage: function(thisAV){
                return "Making children for the current quadtree";
            }

        },

        {
            label: "topRefLoop",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone = true;
                if(thisAV.refI < thisAV.refinement){
                    hdxAV.nextAction = "loopFindChild";
                } else {
                    hdxAV.nextAction = "pointsNull";
                }

            },
            logMessage: function(thisAV){
                return "Top of for loop over points array in the current quadtree";
            }

        },

        {
            label: "loopFindChild",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                //something needs to be pushed onto the call stack so we know where to return to after

                hdxAV.iterationDone = true;
                hdxAV.nextAction = "bottomFindChild";
            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "loopChildAdd",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone = true;
                hdxAV.nextAction = "bottomAddPoint";

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "pointsNull",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                thisAV.refI = 0;

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "notLeafFindChild",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "notLeafChildAdd",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "bottomFindChild",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone = true;
                hdxAV.nextAction = "findChildLat";

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "findChildLat",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone = true;
                if(thisAV.currentQuadtree.points[thisAV.refI].lat < thisAV.currentQuadtree.midLat){

                    hdxAV.nextAction = "topFindChildLng";
                } else {
                    
                    hdx.nextAction = "bottomFindChildLng";
                }

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "topFindChildLng",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone = true;
                if(thisAV.currentQuadtree.points[thisAV.refI].lon < thisAV.currentQuadtree.midLng){

                    hdxAV.nextAction = "returnSW";
                } else {

                    hdxAV.nextAction = "returnSE";
                }

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "bottomFindChildLng",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                hdxAV.iterationDone = true;
                if(thisAV.currentQuadtree.points[thisAV.refI].lon < thisAV.currentQuadtree.midLng){

                    hdxAV.nextAction = "returnNW";
                } else {

                    hdxAV.nextAction = "returnNE";
                }

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "returnSW",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);
                thisAV.qtStack.push(thisAV.currentQuadtree);
                //children should be made by this point, if not there is a big problem
                console.log(thisAV.currentQuadtree);
                thisAV.currentQuadtree = thisAV.currentQuadtree.sw;
                console.log(thisAV.currentQuadtree);
                hdxAV.nextAction = "cleanup";
            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "returnSE",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                thisAV.qtStack.push(thisAV.currentQuadtree);
                thisAV.currentQuadtree = thisAV.currentQuadtree.se;

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "returnNW",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                thisAV.qtStack.push(thisAV.currentQuadtree);
                thisAV.currentQuadtree = thisAV.currentQuadtree.nw;

            },
            logMessage: function(thisAV){
                return "";
            }

        },

        {
            label: "returnNE",
            comment: "",
            code: function(thisAV){
                highlightPseudocode(this.label, visualSettings.visiting);

                thisAV.qtStack.push(thisAV.currentQuadtree);
                thisAV.currentQuadtree = thisAV.currentQuadtree.ne;

            },
            logMessage: function(thisAV){
                return "";
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
        hdxAV.algStat.innerHTML = "Initializing";
        let lineCount = 0;
        updateMap();
        initWaypointsAndConnections(true, false, visualSettings.undiscovered);
        this.Stack = new HDXLinear(hdxLinearTypes.STACK,
            "Stack");this.Stack = new HDXLinear(hdxLinearTypes.STACK,
            "Stack");

        //pseudocode for the start state    
        this.code = '<table class="pseudocode"><tr id="START" class="pseudocode"><td class="pseudocode">';
        this.code += `qt &larr; new Quadtree(minLat,maxLat,minLng,maxLng,refinement)<br />`;
        this.code += `qt.points &larr; []<br />`
        this.code += `qt.nw, qt.ne, qt.sw, qt.se <- null<br />`;

        //pseudocode for the top loop
        this.code += '</td></tr>' +
            pcEntry(0,'for(check &larr; 0 to |V| - 1)',"topForLoop");
        this.code += '</td></tr>' +
            pcEntry(1,'qt.add(v[check])',"topAddPoint");

        //pseudocode for add function
        this.code += '</td></tr>' +
            pcEntry(0,'add(vertex)',"bottomAddPoint");
        this.code += '</td></tr>' +
            pcEntry(1,'(ifLeaf())',"isLeaf");
        this.code += '</td></tr>' +
            pcEntry(2,'qt.points.push[vertex]',"pushPoint");
        this.code += '</td></tr>' +
            pcEntry(3,'if(qt.points.length >= refinement)',"ifRefine");
        this.code += '</td></tr>' +
            pcEntry(4,'midLat &larr; (maxLat + minLat) / 2<br />' +
                pcIndent(8) + 'midLng &larr; (maxLng + minLng) / 2<br />' +
                pcIndent(8) + 'qt.nw &larr; new Quadtree(midLat,maxLat,minLng,midLng,refinement)<br />' +
                pcIndent(8) + 'qt.ne &larr; new Quadtree(midLat,maxLat,midLng,maxLng,refinement)<br />' +
                pcIndent(8) + 'qt.sw &larr; new Quadtree(minLat,midLat minLng,midLng,refinement)<br />' +
                pcIndent(8) + 'qt.se &larr; new Quadtree(minLat,midLat,midLng,maxLng,refinement)',"makeChildren");
        this.code += '</td></tr>' +
            pcEntry(4,'for(i &larr; 0 to qt.points.length',"toRefLoop");
        this.code += '</td></tr>' +
            pcEntry(5,'c &larr; childThatContains(qt.points[i])',"loopFindChild");
        this.code += '</td></tr>' +
            pcEntry(5,'c.add()',"loopChildAdd");
        this.code += '</td></tr>' +
            pcEntry(4,'qt.points &larr; []',"pointsNull");
        this.code += '</td></tr>' + 
            pcEntry(3,'else',"");
        this.code += '</td></tr>' +
            pcEntry(4,'c &larr; childThatContains(qt.points[i])',"notLeafFindChild");
        this.code += '</td></tr>' +
            pcEntry(4,'c.add()',"notLeafChildAdd");

        //pseudocode for childThatContains
        this.code += '</td></tr>' +
            pcEntry(0,'childThatContains(vertex)',"bottomFindChild");
        this.code += '</td></tr>' +
            pcEntry(1,'if(vertex.lat < midLat)',"findChildLat");
        this.code += '</td></tr>' +
            pcEntry(2,'if(vertex.lng < midLng)',"topFindChildLng");
        this.code += '</td></tr>' +
            pcEntry(3,'return sw',"returnSW");
        this.code += '</td></tr>' + 
            pcEntry(2,'else',"");
        this.code += '</td></tr>' +
            pcEntry(3,'return se',"returnSE");
        this.code += '</td></tr>' +
            pcEntry(1,'else',"");
        this.code += '</td></tr>' +
            pcEntry(2,'if(vertex.lng < midLng)',"bottomFindChildLng");
        this.code += '</td></tr>' +
            pcEntry(3,'return nw',"returnNW");
        this.code += '</td></tr>' +
            pcEntry(2,'else',"");
        this.code += '</td></tr>' +
            pcEntry(3,'return ne',"returnNE");
    },

    setupUI() {
        hdxAV.algStat.style.display = "";
        hdxAV.algStat.innerHTML = "Setting up";
        hdxAV.logMessageArr = [];
        hdxAV.logMessageArr.push("Setting up");
        let newAO = 'Refinement threshold <input type="number" id="refinement" min="1" max="' 
        + (waypoints.length) + '" value="3">';
        hdxAV.algOptions.innerHTML = newAO;
        addEntryToAVControlPanel("undiscovered", visualSettings.undiscovered); 
        addEntryToAVControlPanel("totalChecked", visualSettings.visiting);
        addEntryToAVControlPanel("numLeaves",visualSettings.searchFailed);
        //this is important to add later because then we need to decide what exactly we need to show
    },

    cleanupUI() {
        //remove all the polylines made by the bounding box and the quadtree
        for (var i = 0; i < this.boundingPoly.length; i++) {
            this.boundingPoly[i].remove();
        }
        this.boundingPoly = [];
    },

    idOfAction(action) {
	
        return action.label;
    },
    //this function generates the bounding box that represents the universe of the quadtree
    generateBoundingBox(){
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

        //creating the polylines for the bounding box
        let nEnds = [[this.n,this.w],[this.n,this.e]];
        let sEnds = [[this.s,this.w],[this.s,this.e]];
        let eEnds = [[this.n,this.e],[this.s,this.e]];
        let wEnds = [[this.n,this.w],[this.s,this.w]];

            this.boundingPoly.push(
                L.polyline(nEnds, {
                    color: visualSettings.undiscovered.color,
                    opacity: 0.6,
                    weight: 3
                })
            );
            this.boundingPoly.push(
                L.polyline(sEnds, {
                    color: visualSettings.undiscovered.color,
                    opacity: 0.6,
                    weight: 3
                })
            );
            this.boundingPoly.push(
                L.polyline(eEnds, {
                    color: visualSettings.undiscovered.color,
                    opacity: 0.6,
                    weight: 3
                })
            );
            this.boundingPoly.push(
                L.polyline(wEnds, {
                    color: visualSettings.undiscovered.color,
                    opacity: 0.6,
                    weight: 3
                }) 
            );

            for (var i = 0; i < 4; i++) {
                this.boundingPoly[i].addTo(map);
            }
    },

    setConditionalBreakpoints(name) {
        return name;
    },

    hasConditionalBreakpoints(name){
        return false;
    }


};


//Quadtree object constructor
function Quadtree(minLat,maxLat,minLng,maxLng,refinement){
    this.maxLat = maxLat;
    this.maxLng = maxLng;
    this.minLat = minLat;
    this.minLng = minLng;
    this.midLat = (maxLat + minLat) / 2;
    this.midLng = (maxLng + minLng) / 2;
    this.nw = null;
    this.ne = null;
    this.sw = null;
    this.se = null;
    
    //determines the refinement factor of the quadtree
    this.refinement = refinement;

    //contains waypoint objects
    this.points = [];

    this.refineIfNeeded = function() {
        if (points.length > refinement){
           
            this.nw = Quadtree(midLat, maxLat, minLng, midLng, refinement);
            this.ne = Quadtree(midLat, maxLat, midLng, maxLng, refinement);
            this.sw = Quadtree(minLat, midLat, minLng, midLng, refinement);
            this.se = Quadtree(minLat, midLat, midLng, maxLng, refinement);

            for(var i = 0; i < points.length; i++){
                childThatContains(points[i].lat,points[i],points[i].lon).push(points[i]);
            }
        }
    }
    this.childThatContains = function(lat,lng){
        if (lat < midLat) {
            if (lng < midLng) {
            return this.sw;
            }
            else {
            return this.se;
            }
        }
        else {
            if (lng < midLng) {
            return this.nw;
            }
            else {
            return this.ne;
            }
        }
    }
    this.get = function(lat,lng){
        if(isLeaf()){
            for(var i = 0; i < points.length; i++){
                if(this.points[i].lat == lat && points[i].lon == lng){
                    return points[i];
                }
            }
            return null;
        } 
        //if not a leaf return the quadtree that would contain this point
        return childThatContains(lat,lng).get(lat,lng);
    }
    this.isLeaf = function(){
        return this.se == null;
    }
    this.add = function(waypoint){
        if(this.isLeaf()){
            this.points.push(waypoint);
            this.refineIfNeeded();
        } else {
            this.childThatContains(waypoint.lat,waypoint.lon).add(waypoint);
        }
    }
}