// archived functions for reference, formerly part of tmjsfuncs.js
// when HDX allowed users to change units on the fly

// functions related to changes of units in the display
function changeUnits(event) {
    prevUnit = curUnit;
    curUnit = event.target.value;
    if (event.target.value == "miles") {
        changeUnitsInner("feet", "km", "meters", .000189394, .621371, .000621371);
    }
    else if (event.target.value == "feet") {
        changeUnitsInner("miles", "km", "meters", 5280, 3280.84, 3.28084);
    }
    else if (event.target.value == "meters") {
        changeUnitsInner("feet", "km", "miles", .3048, 1000, 1609.34);  
    }
    else if (event.target.value == "km") {
        changeUnitsInner("feet", "meters", "miles", .0003048, .001, 1.60934);
    }
}

function changeUnitsInner(un1, un2, un3, mult1, mult2, mult3) {
    loopChangeUnits(un1, mult1);
    loopChangeUnits(un2, mult2);
    loopChangeUnits(un3, mult3);
}

function loopChangeUnits(oldUnit, mult) {
    var arr = document.getElementsByClassName(oldUnit);
    for (var i = arr.length-1; i >= 0; i--) {
        if (arr[i].innerHTML.indexOf(oldUnit) == -1)
            arr[i].innerHTML =
            Math.round(parseFloat(arr[i].innerHTML)*mult*1000)/1000;
        else
            arr[i].innerHTML =
            Math.round(parseFloat(arr[i].innerHTML.substring(0, (arr[i].innerHTML.length-1-oldUnit.length)))*mult*1000)/1000+" "+curUnit;
        arr[i].classList.add(curUnit);
        arr[i].classList.remove(oldUnit);               
    }   
}
var curUnit = "miles";
var prevUnit;

function generateUnit(lat1, lon1, lat2, lon2) {
    prevUnit = curUnit;
    curUnit = document.getElementById("distUnits").value;
    if (curUnit == "miles") {
        return Math.round(distanceInMiles(lat1, lon1, lat2, lon2)*1000)/1000 +
            " miles";
    }
    else if (curUnit == "feet") {
        return Math.round(distanceInFeet(lat1, lon1, lat2, lon2)*1000)/1000 +
            " feet";
    }
    else if (curUnit == "meters") {
        return Math.round(distanceInFeet(lat1, lon1, lat2, lon2)*.3048*1000)/1000
            + " meters";
    }
    else if (curUnit == "km") {
        return Math.round(distanceInFeet(lat1, lon1, lat2, lon2)*.0003048*1000)/1000
            + " km";
    }
}

function convertMiles(num) {
    if (curUnit == "feet") {
        return Math.round(num*5280*1000)/1000;
    }
    else if (curUnit == "meters") {
        return Math.round(num*1609.34*1000)/1000;
    }
    else if (curUnit == "km") {
        return Math.round(num*1.60934*1000)/1000;
    }
    else {
        return Math.round(num*1000)/1000;
    }
}

