//
// HDX "no algorithm selected" dummy AV entry
//
// METAL Project
//
// Primary Author: Jim Teresco
//

// dummy AV entry for main menu

var hdxNoAV = {

    // entries for list of AVs
    value: "NONE",
    name: "No Algorithm Visualization",
    description: "No algorithm is selected, please select.",

    code: "Select and start an algorithm to view pseudocode.",
    
    // provide prepToStart, nextStep, setupUI, just in case buttons are
    // somehow active when this option is selected
    prepToStart() {

        alert("Please select an algorithm first.");
    },
    
    nextStep() {

        alert("Please select an algorithm first.");
    },

    setupUI() {
        var algDescription = document.getElementById("algDescription");
        algDescription.innerHTML = this.description;
    },

    cleanupUI() {}
};
