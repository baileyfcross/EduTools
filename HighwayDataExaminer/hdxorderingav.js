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
    decription: "Visualize different ways of sorting vertices in a 2D space.",

    avActions: [
        {
            label: "START",
            comment: "",
            code: function(thisAV){

            },
            logMessage: function(thisAV){
                return "Sorting waypoints based on the selected ordering";
            }

        }
    ],
    
    prepToStart() {
    },
    
    nextStep() {

    },

    setupUI() {},

    cleanupUI() {}
}