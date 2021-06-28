//
// HDX AV Visual Settings
//
// METAL Project
//
// Primary Author: Jim Teresco
//

// algorithm visualization color settings and other parameters
var visualSettings = {
    // first, some used by many algorithms

    undiscovered: {
        color: "#202020",
        textColor: "#e0e0e0",
        scale: 4,
        name: "undiscovered",
        value: 0,
        weight: 5,
        opacity: 0.6
    },
    visiting: {
        color: "gold",
        textColor: "black",
        scale: 8,
        name: "visiting",
        value: 0,
        weight: 8,
        opacity: 0.8
    },
    leader: {
        color: "darkBlue",
        textColor: "white",
        scale: 6,
        name: "leader",
        value: 0
    },
    leader2: {
        color: "DodgerBlue",
        textColor: "white",
        scale: 6,
        name: "leader",
        value: 0
    },
    searchFailed: {
        color: "firebrick",
        textColor: "white",
        scale: 6,
        name: "searchFailed",
        value: 0
    },
    discarded: { //discard on removal
        color: "dimGrey",
        textColor: "white",
        scale: 3,
        name: "discarded",
        value: 0,
        weight: 5,
        opacity: 0.5
    },

    // these are in graph traversals and Dijkstra's so far
    discardedOnDiscovery: {
        color: "plum",
        textColor: "black",
        scale: 4,
        name: "discardedOnDiscovery",
        value: 0,
        weight: 5,
        opacity: 0.6
    },
    startVertex: {
        color: "darkviolet",
        textColor: "white",
        scale: 7,
        name: "startVertex",
        value: 0
    },
    endVertex: {
        color: "violet",
        textColor: "white",
        scale: 7,
        name: "endVertex",
        value: 0
    },

    // both vertex and edge search
    shortLabelLeader: {
        color: "#654321",
        textColor: "white",
        scale: 6,
        name: "shortLabelLeader",
        value: 0,
        weight: 8,
        opacity: 0.6
    },
    longLabelLeader: {
        color: "#006400",
        textColor: "white",
        scale: 6,
        name: "longLabelLeader",
        value: 0,
        weight: 8,
        opacity: 0.6
    },
    firstLabelLeader: {
        color: "#876543",
        textColor: "white",
        scale: 6,
        name: "firstLabelLeader",
        value: 0,
        weight: 8,
        opacity: 0.6
    },
    lastLabelLeader: {
        color: "#00B400",
        textColor: "white",
        scale: 6,
        name: "lastLabelLeader",
        value: 0,
        weight: 8,
        opacity: 0.6
    },
    averageCoord: {
        color: "darkviolet",
        textColor: "white",
        scale: 4,
        name: "averageCoord",
        value: 0,
        weight: 5,
        opacity: 0.6
    },
    spanningTree: {
        color: "#0050f0",
        textColor: "white",
        scale: 4,
        name: "spanningTree",
        value: 0,
        weight: 5,
        opacity: 0.6
    },
    discovered: {
        color: "#00a000",
        textColor: "white",
        scale: 4,
        name: "discovered",
        value: 0,
        weight: 5,
        opacity: 0.6
    },
    hoverV: {
        color: "fuchsia",
        textColor: "white",
        scale: 6,
        name: "hoverV",
        value: 0
    },
    pseudocodeDefault: {
        color: "white",
        textColor: "black"
    },
    highlightBounding: {
        color: "red",
        textColor: "black",
        name: "highlightBounding",
        weight: 4,
        opacity: 0.7
    },
    quadtree: {
        color: "pink",
        textColor: "black"

    }
};
